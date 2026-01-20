import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Japan, { japanConfig } from './destinations/Japan';

const APP_VERSION = '2.0.0';

// All available destinations
const destinations = [
  japanConfig,
  // Add more destinations here as they're created
  // { id: 'italy', name: 'Italy', icon: '🇮🇹', ... }
];

function App() {
  const [expandAction, setExpandAction] = useState(null);
  const [currentDestination, setCurrentDestination] = useState('japan');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExpandAll = () => {
    setExpandAction('expand');
    setTimeout(() => setExpandAction(null), 100);
  };

  const handleCollapseAll = () => {
    setExpandAction('collapse');
    setTimeout(() => setExpandAction(null), 100);
  };

  const handleNavigate = (destinationId) => {
    setCurrentDestination(destinationId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleMenuToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Get current destination config
  const destConfig = destinations.find(d => d.id === currentDestination) || destinations[0];

  // Render destination content
  const renderDestination = () => {
    switch (currentDestination) {
      case 'japan':
        return <Japan expandAction={expandAction} />;
      default:
        return <Japan expandAction={expandAction} />;
    }
  };

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen || !isMobile}
        isCollapsed={sidebarCollapsed && !isMobile}
        onToggle={handleMenuToggle}
        onClose={handleSidebarClose}
        currentDestination={currentDestination}
        onNavigate={handleNavigate}
        destinations={destinations}
      />
      
      <main className="main-content">
        <div className="wrap">
          <Header
            onExpandAll={handleExpandAll}
            onCollapseAll={handleCollapseAll}
            destination={destConfig}
            onMenuToggle={handleMenuToggle}
          />

          {renderDestination()}

          <div className="version-badge">v{APP_VERSION}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
