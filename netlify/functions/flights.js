// netlify/functions/flights.js
// No need for node-fetch if using Node 18+ (default on Netlify)

exports.handler = async (event, context) => {
  const SERPAPI_KEY = process.env.SERPAPI_KEY;

  if (!SERPAPI_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "SERPAPI_KEY not configured on Netlify." })
    };
  }

  try {
    const targetUrl = `https://serpapi.com/search.json?engine=google_flights&departure_id=IAH&arrival_id=NRT&outbound_date=2026-03-28&return_date=2026-04-04&currency=USD&hl=en&api_key=${SERPAPI_KEY}`;

    const response = await fetch(targetUrl);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `SerpApi error: ${response.statusText}` })
      };
    }

    const data = await response.json();
    const rawFlights = data.best_flights || data.other_flights || [];

    // Map SerpApi results to our component format
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

    return {
      statusCode: 200,
      body: JSON.stringify(formattedFlights)
    };
  } catch (error) {
    console.error("Proxy error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};
