import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground } from '../../components';
import { DEFAULT_GRADIENT_CONFIG } from '../../constants/gradient';
import styles from './About.module.css';

function About() {
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
      <div className={styles.content}>
        <h2>About Me</h2>
        <p>This my personal website... as you can see im still working things out</p>
      </div>
    </div>
  );
}

export default About;
