import React from 'react';

function Sidebar({ isOpen, isCollapsed, onToggle, onClose, currentDestination, onNavigate, destinations }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && !isCollapsed && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!isCollapsed && <span className="sidebar-logo">🌍 Adventures</span>}
          <button className="sidebar-toggle" onClick={onToggle} title={isCollapsed ? 'Expand menu' : 'Collapse menu'}>
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            {!isCollapsed && <div className="nav-section-title">Destinations</div>}
            
            {destinations.map((dest) => (
              <button
                key={dest.id}
                className={`nav-item ${currentDestination === dest.id ? 'active' : ''}`}
                onClick={() => onNavigate(dest.id)}
                title={dest.name}
              >
                <span className="nav-icon">{dest.icon}</span>
                {!isCollapsed && <span className="nav-label">{dest.name}</span>}
              </button>
            ))}
          </div>
          
          <div className="nav-section">
            {!isCollapsed && <div className="nav-section-title">Quick Links</div>}
            
            <button className="nav-item" title="Home">
              <span className="nav-icon">🏠</span>
              {!isCollapsed && <span className="nav-label">Home</span>}
            </button>
            
            <button className="nav-item" title="All Trips">
              <span className="nav-icon">📋</span>
              {!isCollapsed && <span className="nav-label">All Trips</span>}
            </button>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="sidebar-credit">
              Ana & Fer Adventures
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
