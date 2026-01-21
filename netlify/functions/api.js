// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');
const fetch = require('node-fetch');

const api = express();
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Test route working!', timestamp: new Date().toISOString() });
});

// Define flight route with dynamic departure airport
router.get('/flights', async (req, res) => {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;
  
  // Get departure airport from query param, default to IAH
  const departureId = req.query.departure || 'IAH';
  
  // Validate airport code
  const validAirports = ['IAH', 'MEX'];
  if (!validAirports.includes(departureId.toUpperCase())) {
    return res.status(400).json({ error: `Invalid departure airport. Must be one of: ${validAirports.join(', ')}` });
  }

  if (!SERPAPI_KEY) {
    return res.status(500).json({ error: "SERPAPI_KEY not configured on Netlify." });
  }

  try {
    const targetUrl = `https://serpapi.com/search.json?engine=google_flights&departure_id=${departureId.toUpperCase()}&arrival_id=NRT&outbound_date=2026-03-28&return_date=2026-04-04&currency=USD&hl=en&api_key=${SERPAPI_KEY}`;

    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: `SerpApi error: ${response.statusText}` });
    }

    const data = await response.json();
    
    // Combine best_flights and other_flights for more results
    const bestFlights = data.best_flights || [];
    const otherFlights = data.other_flights || [];
    const allFlights = [...bestFlights, ...otherFlights];

    // Map all results (no limit)
    const formattedFlights = allFlights.map(f => {
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
            text: f.flights.length === 1 ? 'Nonstop' : `${f.flights.length - 1} stop${f.flights.length > 2 ? 's' : ''}`
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
module.exports.handler = serverless(api);
