import React, { useState } from 'react';

const AIRPORTS = [
  { code: 'IAH', name: 'Houston', country: '🇺🇸' },
  { code: 'MEX', name: 'Mexico City', country: '🇲🇽' },
];

function Flights({ flightsData }) {
  const [flights, setFlights] = useState(flightsData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState('IAH');

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      const response = await fetch(`/api/flights?departure=${selectedAirport}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch flight data');
      }

      const newFlights = await response.json();
      setFlights(newFlights);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAirportChange = (code) => {
    setSelectedAirport(code);
  };

  const currentAirport = AIRPORTS.find(a => a.code === selectedAirport);

  return (
    <section className="flights-section">
      <h2>✈️ Available Flights</h2>
      <p className="subtitle-text">
        Flight options for March 28 - April 4, 2026 ({currentAirport?.name} → Tokyo)
      </p>

      {/* Airport Toggle */}
      <div className="airport-toggle-container">
        <span className="airport-toggle-label">Departure from:</span>
        <div className="airport-toggle">
          {AIRPORTS.map((airport) => (
            <button
              key={airport.code}
              className={`airport-option ${selectedAirport === airport.code ? 'active' : ''}`}
              onClick={() => handleAirportChange(airport.code)}
            >
              <span className="airport-flag">{airport.country}</span>
              <span className="airport-code">{airport.code}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          id="btnRefresh"
          className="btn primary"
          style={{ fontSize: '14px', padding: '10px 20px', opacity: isRefreshing ? 0.7 : 1 }}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? '🔄 Searching...' : '🔄 Search Flights'}
        </button>
      </div>

      {/* Scrollable Results */}
      {flights && flights.length > 0 ? (
        <>
          <div className="flights-results-header">
            <span>{flights.length} flight{flights.length !== 1 ? 's' : ''} found</span>
          </div>
          <div className="flights-scroll-container">
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
        </>
      ) : (
        <div className="flights-empty">
          <p>Click "Search Flights" to find available options</p>
        </div>
      )}

      <p className="muted" style={{ marginTop: '16px', textAlign: 'center', fontSize: '13px' }}>
        💡 Prices are estimates and subject to change. Book early for best rates! Check <a className="link" href="https://www.google.com/travel/flights" target="_blank" rel="noopener noreferrer">Google Flights</a> for real-time availability.
      </p>
    </section>
  );
}

export default Flights;
