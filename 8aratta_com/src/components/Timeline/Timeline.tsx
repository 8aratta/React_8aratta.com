import React, { useRef } from 'react';
import { useSnapScroll } from './useSnapScroll';
import styles from './Timeline.module.css';

interface TimelineProps {
  children: React.ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useSnapScroll(containerRef);

  const childArray = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.line} />
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {/* 50vh gap between sections (not after last) */}
          {index < childArray.length - 1 && (
            <div className={styles.sectionGap} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
