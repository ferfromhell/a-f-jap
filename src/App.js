import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Japan, { japanConfig } from './destinations/Japan';

const APP_VERSION = '2.1.0';

// All available destinations
const destinations = [
  japanConfig,
  // Add more destinations here as they're created
];

// Theme utilities
const THEME_KEY = 'adventure-blog-theme';

function getInitialTheme() {
  // Check localStorage first
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  
  // Fall back to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  
  return 'dark';
}

function App() {
  const [expandAction, setExpandAction] = useState(null);
  const [currentDestination, setCurrentDestination] = useState('japan');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
    handleResize();
    
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

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
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
        theme={theme}
        onThemeToggle={handleThemeToggle}
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
