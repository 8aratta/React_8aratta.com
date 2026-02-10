import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground } from '../../components';
import { DEFAULT_GRADIENT_CONFIG } from '../../constants/gradient';
import styles from './Home.module.css';
import MeImage from '../../assets/Me.png';
// import DebugPanel from '../../components/DebugPanel/DebugPanel';

function Home() {
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition();
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
      
      <img src={MeImage} alt="Domenico Baratta" className={styles.heroImage} />
      
      <div className={styles.heroText}>
        <h1 className={styles.heroName}>
          <span>Baratta</span>
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
