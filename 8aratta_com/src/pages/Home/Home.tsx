import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground } from '../../components';
import { DEFAULT_GRADIENT_CONFIG, MOUSE_SMOOTHING } from '../../constants/gradient';
import { useTheme } from '../../contexts';
import styles from './Home.module.css';

function Home() {
  const { theme } = useTheme();
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(MOUSE_SMOOTHING);
  const rotation = useGradientRotation({
    mousePos,
    baseRotation: DEFAULT_GRADIENT_CONFIG.baseRotation,
  });

  return (
    <div
      className={styles.container}
      data-theme={theme}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GradientBackground rotation={rotation} />

      <div className={styles.heroImageContainer}>
        <img src="/assets/images/enso.png" alt="" className={styles.ensoBackground} aria-hidden="true" draggable="false" />
        <img src="/assets/images/Me.png" alt="Domenico Baratta" className={styles.heroImage} loading="lazy" draggable="false" />
      </div>

      <div className={styles.heroText}>
        <h1 className={styles.heroName}>
          <span>Barat<span className={styles.spacedT}>t</span>a</span>
          <span>Domenico</span>
        </h1>

        <h2 className={styles.heroDescription}>
          <span>Web Designer</span>
          <span>Developer</span>
        </h2>
      </div>
    </div>
  );
}

export default Home;