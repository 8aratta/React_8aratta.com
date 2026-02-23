import React, { useRef } from 'react';
import { useSnapScroll } from './useSnapScroll';
import { TimelineConnector, Orientation } from './TimelineConnector';
import styles from './Timeline.module.css';

interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useSnapScroll(containerRef);

  const childArray = React.Children.toArray(children);

  // Extract orientation from each TimelineSection child
  const orientations: Orientation[] = childArray.map((child) => {
    if (React.isValidElement<{ orientation?: Orientation }>(child)) {
      return child.props.orientation ?? 'left';
    }
    return 'left';
  });

  return (
    <div ref={containerRef} className={styles.container}>
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {/* Connector between sections (not after last) */}
          {index < childArray.length - 1 && (
            <TimelineConnector
              from={orientations[index]}
              to={orientations[index + 1]}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
