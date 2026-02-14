import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground } from '../../components';
import { DEFAULT_GRADIENT_CONFIG, MOUSE_SMOOTHING } from '../../constants/gradient';
import styles from './Home.module.css';
import MeImage from '../../assets/images/Me.png';
import EnsoImage from '../../assets/images/enso.png'; // Uncomment when converted from .eps
// import DebugPanel from '../../components/DebugPanel/DebugPanel';

function Home() {
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(MOUSE_SMOOTHING);
  const rotation = useGradientRotation({
    mousePos,
    baseRotation: DEFAULT_GRADIENT_CONFIG.baseRotation,
  });

  return (
    <div
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* <DebugPanel mousePos={mousePos} rotation={rotation} /> */}
      <GradientBackground rotation={rotation} />

      <div className={styles.heroImageContainer}>
        <img src={EnsoImage} alt="" className={styles.ensoBackground} aria-hidden="true" draggable="false" />
        <img src={MeImage} alt="Domenico Baratta" className={styles.heroImage} loading="lazy" draggable="false" />
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
