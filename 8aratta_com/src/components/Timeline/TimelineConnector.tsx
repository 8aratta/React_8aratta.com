import React from 'react';
import styles from './Timeline.module.css';

export type Orientation = 'left' | 'right';

interface TimelineConnectorProps {
  from: Orientation;
  to: Orientation;
}

/**
 * Renders in the 80vh gap between TimelineSections.
 * - Same orientation: straight vertical line on that side.
 * - Different orientation: SVG S-curve connecting left ↔ right.
 */
export function TimelineConnector({ from, to }: TimelineConnectorProps) {
  if (from === to) {
    // Straight line on the same side
    return (
      <div className={styles.connector}>
        <div
          className={[
            styles.connectorLine,
            from === 'right' ? styles.connectorLineRight : styles.connectorLineLeft,
          ].join(' ')}
        />
      </div>
    );
  }

  // Curved SVG connecting left ↔ right
  // The line sits at 25px from each edge (matching node center position)
  const leftX = 25;
  const rightX = 875; // 900 (max-width) - 25

  const startX = from === 'left' ? leftX : rightX;
  const endX = to === 'left' ? leftX : rightX;

  return (
    <div className={styles.connector}>
      <svg
        className={styles.connectorSvg}
        viewBox={`0 0 900 100`}
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={`M ${startX} 0 C ${startX} 50, ${endX} 50, ${endX} 100`}
          stroke="var(--timeline-line-color, rgba(255, 255, 255, 0.15))"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
