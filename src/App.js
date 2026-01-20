import React, { useState } from 'react';
import './index.css';
import Header from './components/Header';
import Itinerary from './components/Itinerary';
import Gallery from './components/Gallery';
import Flights from './components/Flights';
import Tips from './components/Tips';

// Import data directly since it's JSON
import data from './data/data.json';

const APP_VERSION = '1.0.7';

function App() {
  const [expandAction, setExpandAction] = useState(null); // 'expand' | 'collapse' | null

  const handleExpandAll = () => {
    setExpandAction('expand');
    // Reset after a tick to allow re-triggering
    setTimeout(() => setExpandAction(null), 100);
  };

  const handleCollapseAll = () => {
    setExpandAction('collapse');
    setTimeout(() => setExpandAction(null), 100);
  };

  return (
    <div className="wrap">
      <Header
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
      />

      <section className="grid">
        <div className="card">
          <h2>✈️ Vuelos sugeridos (Houston → Tokyo)</h2>
          <p className="muted">Recomendación: busca <b>nonstop</b> si el precio no se dispara. En Houston, normalmente sales de <b>IAH</b> (George Bush Intercontinental).</p>
          <div style={{ marginTop: '10px' }}>
            <div className="pill">✅ Nonstop posible: IAH → NRT (Narita)</div>
            <div className="pill">✅ Nonstop posible: IAH → HND (Haneda)</div>
            <div className="pill">⏱️ ~14 h (aprox.)</div>
          </div>
          <div className="sections" style={{ marginTop: '10px' }}>
            <div className="sec">
              <h4>Opción 1 (prioridad): Nonstop</h4>
              <ul>
                <li><b>United</b> y <b>ANA</b> suelen ofrecer rutas Houston ↔ Tokyo (HND/NRT).</li>
                <li>En algunos periodos también aparece <b>ZIPAIR</b> entre IAH ↔ NRT (revisar si aplica a tus fechas).</li>
                <li><span className="time">Tip:</span> llega a IAH con <b>3 horas</b> de anticipación para vuelos internacionales.</li>
              </ul>
            </div>
            <div className="sec">
              <h4>Opción 2: 1 escala (si sale mucho más barato)</h4>
              <ul>
                <li>Escalas típicas: <b>Dallas (DFW)</b>, <b>Los Ángeles (LAX)</b>, <b>San Francisco (SFO)</b>, <b>Seattle (SEA)</b>, <b>Vancouver (YVR)</b>.</li>
                <li><span className="time">Tip:</span> evita escalas de &lt; 1h 30m para reducir riesgo de perder conexión.</li>
              </ul>
            </div>
          </div>
          <p className="muted" style={{ marginTop: '10px' }}>
            Búsqueda rápida: <a className="link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/travel/flights">Google Flights</a> · <a className="link" target="_blank" rel="noopener noreferrer" href="https://www.united.com/">United</a> · <a className="link" target="_blank" rel="noopener noreferrer" href="https://www.ana.co.jp/">ANA</a>
          </p>
        </div>

        <div className="card">
          <h2>🧠 Tips clave para que el viaje sea fácil</h2>
          <ul style={{ margin: '8px 0 0 18px' }}>
            <li><b>IC Card (Suica/PASMO):</b> úsala para metro, tren local y tiendas de conveniencia. Si traes iPhone, revisa “Wallet” para versión digital.</li>
            <li><b>Shinkansen:</b> compra boletos con antelación si viajas en fechas muy demandadas; asientos reservados reducen estrés.</li>
            <li><b>Efectivo:</b> Japón sigue siendo “cash-friendly”. Saca yenes en 7-Eleven/JP Post.</li>
            <li><b>Jet lag:</b> el Día 1 es para sobrevivir: comer ligero, caminar poco, dormir temprano.</li>
            <li><b>Sakura:</b> prioriza mañanas (menos gente). Si llueve, mueve el hanami a un parque grande (más “aguanta”).</li>
          </ul>
          <div className="footnote">
            🎟️ <b>teamLab Borderless</b>: entrada con horario fijo y se agota. Compra en cuanto tengas fechas cerradas.
          </div>
        </div>
      </section>

      <Itinerary daysData={data.days} expandAction={expandAction} />

      <Gallery galleryData={data.gallery} />

      <Flights flightsData={data.flights} />

      <Tips />

      <div className="footnote" style={{ marginTop: '16px' }}>
        <b>Nota sobre vuelos:</b> horarios y disponibilidad cambian por temporada. Este plan asume llegada a Tokyo (HND/NRT) el Día 1 y regreso la noche del Día 7.
        <br />
        <span className="muted">Fuentes sugeridas para validar rutas: sitios oficiales de aerolíneas y metabuscadores.</span>
      </div>

      <div className="version-badge">v{APP_VERSION}</div>
    </div>
  );
}

export default App;
