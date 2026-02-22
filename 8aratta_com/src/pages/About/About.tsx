import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground, Timeline, TimelineSection, TimelineEntry } from '../../components';
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

        <Timeline>
          <TimelineSection
            id="early-life"
            title="Early Life"
            description="Where it all began"
          >
            <TimelineEntry id="early-childhood" title="Childhood">
              <p>Growing up and discovering interests.</p>
            </TimelineEntry>
            <TimelineEntry id="early-school" title="School Years">
              <p>Formative experiences in education.</p>
            </TimelineEntry>
          </TimelineSection>

          <TimelineSection
            id="career"
            title="Career"
            description="Professional journey"
          >
            <TimelineEntry id="career-first-job" title="First Role">
              <p>Starting out in the industry.</p>
            </TimelineEntry>
            <TimelineEntry id="career-growth" title="Growth" minHeight="2000px">
              <p>
                Taking on bigger challenges and expanding skill sets.
                This entry is taller to demonstrate sticky titles and
                scroll behavior within a child node.
              </p>
            </TimelineEntry>
          </TimelineSection>

          <TimelineSection
            id="projects"
            title="Projects"
            description="Things I've built"
          >
            <TimelineEntry id="projects-website" title="Personal Website">
              <p>Building this very site you're looking at.</p>
            </TimelineEntry>
            <TimelineEntry id="projects-oss" title="Open Source">
              <p>Contributing to the community.</p>
            </TimelineEntry>
          </TimelineSection>
        </Timeline>
      </div>
    </div>
  );
}

export default About;
