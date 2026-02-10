import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const [time, setTime] = useState(new Date());

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

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoFull}>8aratta</span>
          <span className={styles.logoShort}>‹8›</span>
        </Link>
        <span className={styles.clock}>{formatTime(time)}</span>
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/about" className={styles.link}>About</Link>
      </div>
    </nav>
  );
}

export default Navigation;
