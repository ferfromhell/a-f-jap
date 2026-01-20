import React from 'react';

function ThemeToggle({ theme, onToggle, collapsed }) {
  const isDark = theme === 'dark';
  
  return (
    <button 
      className="theme-toggle" 
      onClick={onToggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-icon">
        {isDark ? '☀️' : '🌙'}
      </span>
      {!collapsed && (
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  );
}

export default ThemeToggle;
