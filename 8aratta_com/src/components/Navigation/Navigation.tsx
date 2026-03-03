import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useTheme } from '../../contexts';
import { CircularMenu } from '../CircularMenu';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/workspace', label: 'Workspace' },
];

function Navigation() {
  const [time, setTime] = useState(new Date());
  const { theme } = useTheme();

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

  const logo =
    theme === 'dark'
      ? '/assets/images/logo_white.png'
      : '/assets/images/logo.png';

  return (
    <nav className={styles.nav} data-theme={theme}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="8aratta" draggable="false" />
        </Link>
        <span className={styles.clock}>{formatTime(time)}</span>
      </div>
      <CircularMenu links={NAV_LINKS} />
    </nav>
  );
}

export default Navigation;
