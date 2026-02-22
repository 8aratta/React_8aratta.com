import React, { useRef } from 'react';
import { TimelineNode } from './TimelineNode';
import { useActiveEntry } from './useTimelineScroll';
import styles from './Timeline.module.css';

interface TimelineSectionProps {
  id: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function TimelineSection({
  id,
  title,
  description,
  children,
}: TimelineSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { activeTitle } = useActiveEntry(scrollRef);

  const displayTitle = activeTitle ? `${title} - ${activeTitle}` : title;

  return (
    <div className={styles.section} data-timeline-section={id}>
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
