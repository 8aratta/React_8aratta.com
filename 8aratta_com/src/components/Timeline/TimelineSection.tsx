import React, { useRef } from 'react';
import { TimelineNode } from './TimelineNode';
import { useActiveEntry } from './useTimelineScroll';
import type { Orientation } from './TimelineConnector';
import styles from './Timeline.module.css';

interface TimelineSectionProps {
  id: string;
  title: string;
  description?: string;
  orientation?: Orientation;
  children?: React.ReactNode;
}

export function TimelineSection({
  id,
  title,
  description,
  orientation = 'left',
  children,
}: TimelineSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { activeTitle } = useActiveEntry(scrollRef);

  const displayTitle = activeTitle ? `${title} - ${activeTitle}` : title;
  const isRight = orientation === 'right';

  const sectionClasses = [
    styles.section,
    isRight ? styles.sectionRight : '',
  ].filter(Boolean).join(' ');

  const lineClasses = [
    styles.sectionLine,
    isRight ? styles.sectionLineRight : styles.sectionLineLeft,
  ].join(' ');

  return (
    <div className={sectionClasses} data-timeline-section={id} data-orientation={orientation}>
      {/* Per-section vertical line */}
      <div className={lineClasses} />

      {/* Pinned header: circle + label */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionNodeColumn}>
          <TimelineNode isActive={true} isParent={true} />
        </div>
        <div className={styles.sectionLabel}>
          <h2 className={styles.sectionTitle}>{displayTitle}</h2>
          {description && (
            <p className={styles.sectionSubtitle}>{description}</p>
          )}
        </div>
      </div>

      {/* Scrollable entries area */}
      <div
        ref={scrollRef}
        className={styles.sectionScroll}
        data-timeline-scroll
      >
        {children}
      </div>
    </div>
  );
}
