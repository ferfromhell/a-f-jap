import React from 'react';

function Header({ onExpandAll, onCollapseAll, destination, onMenuToggle }) {
  // Default values for when no destination is provided
  const {
    title = 'Adventure Blog',
    subtitle = 'Explore the World',
    badge = '🌍 Travel Adventures',
    heroTitle = 'Your Next Adventure Awaits',
    heroSubtitle = 'Discover amazing destinations and plan your perfect trip.',
    summary = null,
    emojis = ['✈️', '🌍']
  } = destination || {};

  return (
    <>
      <div className="main-title">
        <h1>
          <span className="emoji-decor">{emojis[0]}</span>
          {title}
          <span className="emoji-decor">{emojis[1]}</span>
        </h1>
        <div className="subtitle">{subtitle}</div>
      </div>
      <header>
        <div className="hero">
          <div className="badge">{badge}</div>
          <h1>{heroTitle}</h1>
          <p className="sub">{heroSubtitle}</p>
          <div className="actions">
            <button className="btn mobile-menu-btn" onClick={onMenuToggle}>
              ☰ Menu
            </button>
            <button className="btn primary" onClick={onExpandAll}>Abrir todos los días</button>
            <button className="btn" onClick={onCollapseAll}>Cerrar todos</button>
            <button className="btn" onClick={() => window.print()}>Imprimir / PDF</button>
          </div>
        </div>

        {summary && (
          <aside className="side">
            <h3>{summary.title || 'Quick Summary'}</h3>
            <div className="kvs">
              {summary.items?.map((item, index) => (
                <div className="kv" key={index}>
                  <b>{item.label}</b>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            {summary.notes && (
              <p className="muted" style={{ margin: '12px 0 0' }}>
                {summary.notes.map((note, index) => (
                  <span className="pill" key={index}>{note}</span>
                ))}
              </p>
            )}
          </aside>
        )}
      </header>
    </>
  );
}

export default Header;
