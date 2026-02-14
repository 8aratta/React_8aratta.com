import React from 'react';
import { useTheme } from '../../contexts';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
  isMobile?: boolean;
}

function ThemeToggle({ className, isMobile = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className={`${styles.themeToggle} ${isMobile ? styles.mobile : ''} ${className || ''}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '⚪' : '⚫️'}
    </button>
  );
}

export default ThemeToggle;
