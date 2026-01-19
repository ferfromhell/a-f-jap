// netlify/functions/api.js

import express, { Router } from 'express';
import serverless from "serverless-http";
import fetch from "node-fetch";

const api = express();
const router = Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Define flight route
router.get('/flights', async (req, res) => {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;

  if (!SERPAPI_KEY) {
    return res.status(500).json({ error: "SERPAPI_KEY not configured on Netlify." });
  }

  try {
    const targetUrl = `https://serpapi.com/search.json?engine=google_flights&departure_id=IAH&arrival_id=NRT&outbound_date=2026-03-28&return_date=2026-04-04&currency=USD&hl=en&api_key=${SERPAPI_KEY}`;

    // Using node-fetch
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: `SerpApi error: ${response.statusText}` });
    }

    const data = await response.json();
    const rawFlights = data.best_flights || data.other_flights || [];

    // Map results
    const formattedFlights = rawFlights.slice(0, 3).map(f => {
      const firstLeg = f.flights[0];
      const lastLeg = f.flights[f.flights.length - 1];

      return {
        airline: firstLeg.airline,
        price: `$${f.price.toLocaleString()}`,
        route: {
          from: {
            code: firstLeg.departure_airport.id,
            time: firstLeg.departure_airport.time.split(' ')[1] + ' ' + firstLeg.departure_airport.time.split(' ')[2]
          },
          to: {
            code: lastLeg.arrival_airport.id,
            time: lastLeg.arrival_airport.time.split(' ')[1] + ' ' + lastLeg.arrival_airport.time.split(' ')[2]
          }
        },
        details: [
          {
            type: 'badge',
            class: f.flights.length === 1 ? 'nonstop' : 'transit',
            text: f.flights.length === 1 ? 'Nonstop' : `${f.flights.length - 1} stops`
          },
          { text: `${Math.floor(f.total_duration / 60)}h ${f.total_duration % 60}m` }
        ]
      };
    });

    res.json(formattedFlights);
  } catch (error) {
    console.error("Express Proxy error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Mount router at /api/
api.use('/api/', router);

// Export handler
export const handler = serverless(api);

