import React, { useState } from 'react';

function Flights({ flightsData }) {
  const [flights, setFlights] = useState(flightsData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      // Now calling our own backend instead of direct API
      const response = await fetch('/api/flights');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch flight data');
      }

      const newFlights = await response.json();
      setFlights(newFlights);
      console.log('✅ Prices Updated via Backend ⚡️');
    } catch (error) {
      console.error("Error fetching flights:", error);
      console.log(`❌ Refresh Failed: ${error.message}`);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTestApi = async () => {
    try {
      const response = await fetch('/api/test');
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`✅ API Test Success:`, data);
    } catch (error) {
      console.log(`❌ API Test Failed: ${error.message}`);
    }
  };

  const handleTestHelloWorld = async () => {
    try {
      const response = await fetch('/.netlify/functions/hello-world');
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      const text = await response.text();
      console.log(`✅ Hello World Success: ${text}`);
    } catch (error) {
      console.log(`❌ Hello World Failed: ${error.message}`);
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
        <button
          className="btn secondary"
          style={{ fontSize: '12px', padding: '8px 12px', marginLeft: '10px', background: '#444', color: '#fff' }}
          onClick={handleTestApi}
        >
          🧪 Test Connection
        </button>
        <button
          className="btn secondary"
          style={{ fontSize: '12px', padding: '8px 12px', marginLeft: '10px', background: '#222', color: '#fff' }}
          onClick={handleTestHelloWorld}
        >
          👋 Hello World
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
