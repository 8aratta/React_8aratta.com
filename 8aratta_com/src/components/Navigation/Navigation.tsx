import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useTheme } from '../../contexts';
import { useIsMobile } from '../../hooks';
import { CircularMenu } from '../CircularMenu';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/workspace', label: 'Workspace' },
  // Extra links for testing mobile carousel behavior:
  // TODO: Make links non drag on mobile
  // { to: '/', label: 'Link 3' },
  // { to: '/', label: 'Link 4' },
  // { to: '/', label: 'Link 5' },
  // { to: '/', label: 'Link 7' },
  // { to: '/', label: 'Link 8' },
  // { to: '/', label: 'Link 9' },
];

function Navigation() {
  const [time, setTime] = useState(new Date());
  const { theme } = useTheme();
  const isMobile = useIsMobile();

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
      <CircularMenu
        radius={130}
        links={NAV_LINKS}
        carousel={isMobile}
        snap={isMobile}
        emphasize={isMobile ? 225 : false}
        emphasisScale={isMobile ? 1.35 : undefined}
        neutralScale={isMobile ? 0.33 : undefined}
        angle={isMobile ? 'bottom' : 220} // With three links open up to bottom because emphasis would be on 225 then... idk maybe angle should define start point instead of direction
        carryMomentum
        introSpin
      />
    </nav>
  );
}

export default Navigation;
