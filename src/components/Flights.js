import React, { useState } from 'react';

function Flights({ flightsData }) {
  const [flights, setFlights] = useState(flightsData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    // Note: Environment variables used in React must start with REACT_APP_
    const SERPAPI_KEY = process.env.REACT_APP_SERPAPI_KEY;

    if (!SERPAPI_KEY || SERPAPI_KEY === "YOUR_SERPAPI_KEY_HERE") {
      alert("Please set REACT_APP_SERPAPI_KEY in your .env file or GitHub Secrets!");
      return;
    }

    setIsRefreshing(true);

    try {
      const targetUrl = `https://serpapi.com/search.json?engine=google_flights&departure_id=IAH&arrival_id=NRT&outbound_date=2026-03-28&return_date=2026-04-04&currency=USD&hl=en&api_key=${SERPAPI_KEY}`;

      // Using a CORS proxy because SerpApi doesn't allow direct browser requests
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Network response was not ok');

      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents); // AllOrigins wraps the result in 'contents'

      const rawFlights = data.best_flights || data.other_flights || [];

      if (rawFlights.length === 0) {
        alert("No flights found for these dates.");
        setIsRefreshing(false);
        return;
      }

      // Map SerpApi results to our component's format
      const newFlights = rawFlights.slice(0, 3).map(f => {
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

      setFlights(newFlights);
      alert('Prices Updated with Real Data ⚡️');
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("Failed to fetch flight data. Check console and CORS settings.");
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!flights) return null;

  return (
    <section className="flights-section">
      <h2>✈️ Available Flights</h2>
      <p className="subtitle-text">Current flight options for March 28 - April 4, 2026 (Houston → Tokyo)</p>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          id="btnRefresh"
          className="btn primary"
          style={{ fontSize: '14px', padding: '8px 16px', opacity: isRefreshing ? 0.7 : 1 }}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? '🔄 Checking...' : '🔄 Refresh Prices'}
        </button>
      </div>

      <div className="flights-container">
        {flights.map((flight, index) => (
          <div className="flight-card" key={index}>
            <div className="flight-header">
              <div className="flight-airline">{flight.airline}</div>
              <div className="flight-price">
                <span className="from">from</span> {flight.price}
              </div>
            </div>
            <div className="flight-route">
              <div className="flight-city">
                <div className="code">{flight.route.from.code}</div>
                <div className="time">{flight.route.from.time}</div>
              </div>
              <div className="flight-arrow">→</div>
              <div className="flight-city">
                <div className="code">{flight.route.to.code}</div>
                <div className="time">{flight.route.to.time}</div>
              </div>
            </div>
            <div className="flight-details">
              {flight.details.map((detail, idx) => {
                if (detail.type === 'badge') {
                  return (
                    <div className="flight-detail" key={idx}>
                      <span className={`flight-badge ${detail.class}`}>{detail.text}</span>
                    </div>
                  );
                }
                return (
                  <div className="flight-detail" key={idx}>{detail.text}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="muted" style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px' }}>
        💡 Prices are estimates and subject to change. Book early for best rates! Check <a className="link" href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer">Google Flights</a> for real-time availability.
      </p>
    </section>
  );
}

export default Flights;
