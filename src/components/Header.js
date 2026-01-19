import React from 'react';

function Header({ onExpandAll, onCollapseAll }) {
  return (
    <>
      <div className="main-title">
        <h1>
          <span className="emoji-decor">✈️</span>
          Ana <span className="ampersand">&</span> Fer
          <span className="emoji-decor">🌸</span>
        </h1>
        <div className="subtitle">Japan Adventure 2026</div>
      </div>
      <header>
        <div className="hero">
          <div className="badge">🇯🇵 Japón Express · 7 días · Sakura + Kyoto + Nara + Osaka + teamLab</div>
          <h1>Itinerario Detallado y Optimizado</h1>
          <p className="sub">Salida desde <b>Houston (IAH)</b> → llegada a <b>Tokyo (HND o NRT)</b>. Ritmo ágil pero realista, con opciones “si sobra energía”.</p>
          <div className="actions">
            <button className="btn primary" onClick={onExpandAll}>Abrir todos los días</button>
            <button className="btn" onClick={onCollapseAll}>Cerrar todos</button>
            <button className="btn" onClick={() => window.print()}>Imprimir / PDF</button>
          </div>
        </div>

        <aside className="side">
          <h3>Resumen rápido</h3>
          <div className="kvs">
            <div className="kv"><b>Fechas</b><span>28 Mar → 4 Abr (ajustable)</span></div>
            <div className="kv"><b>Ciudades</b><span>Tokyo · Kyoto · Nara · Osaka</span></div>
            <div className="kv"><b>Must-do</b><span>Torii rojos · Sakura · teamLab</span></div>
            <div className="kv"><b>Transporte</b><span>Suica/PASMO + Shinkansen</span></div>
          </div>
          <p className="muted" style={{ margin: '12px 0 0' }}>
            <span className="pill"><span className="star">★</span> = súper turístico / imperdible</span>
            <span className="pill">⏱️ tiempos reales</span>
          </p>
        </aside>
      </header>
    </>
  );
}

export default Header;
