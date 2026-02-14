import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground } from '../../components';
import { DEFAULT_GRADIENT_CONFIG, MOUSE_SMOOTHING } from '../../constants/gradient';
import { useTheme } from '../../contexts';
import styles from './About.module.css';

function About() {
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
      <div className={styles.content}>
        <h2>About Me</h2>
        <p>This my personal website... as you can see im still working things out</p>
      </div>
    </div>
  );
}

export default About;
