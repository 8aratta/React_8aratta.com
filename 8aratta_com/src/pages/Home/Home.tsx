import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground } from '../../components';
import { DEFAULT_GRADIENT_CONFIG } from '../../constants/gradient';
import styles from './Home.module.css';

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
      <GradientBackground rotation={rotation} />

      {/* <DebugPanel mousePos={mousePos} rotation={rotation} /> */}
    </div>
  );
}

export default Home;
