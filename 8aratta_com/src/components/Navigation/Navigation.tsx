import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import logoWhite from '../../assets/images/logo_white.png';
import logoDark from '../../assets/images/logo.png';
import { useTheme } from '../../contexts';

function Navigation() {
  const [time, setTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const logo = theme === 'dark' ? logoWhite : logoDark;

  return (
    <nav className={styles.nav} data-theme={theme}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="8aratta" draggable="false" />
        </Link>
        <span className={styles.clock}>{formatTime(time)}</span>
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <button 
          onClick={toggleTheme} 
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '⚪' : '⚫️'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
