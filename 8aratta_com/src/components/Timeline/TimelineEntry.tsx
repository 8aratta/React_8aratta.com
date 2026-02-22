import React from 'react';
import styles from './Timeline.module.css';

interface TimelineEntryProps {
  id: string;
  title: string;
  minHeight?: string;
  children?: React.ReactNode;
}

export function TimelineEntry({ id, title, minHeight, children }: TimelineEntryProps) {
  return (
    <div
      className={styles.entry}
      data-timeline-entry={id}
      data-timeline-entry-title={title}
      style={minHeight ? { minHeight } : undefined}
    >
      <h3 className={styles.entryTitle}>{title}</h3>
      <div className={styles.entryBody}>{children}</div>
    </div>
  );
}
