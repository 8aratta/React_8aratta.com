import React from 'react';
import styles from './Timeline.module.css';

interface TimelineNodeProps {
  isActive: boolean;
  isParent: boolean;
}

export function TimelineNode({ isActive, isParent }: TimelineNodeProps) {
  return (
    <div
      className={[
        styles.node,
        isParent ? styles.nodeParent : styles.nodeChild,
        isActive ? styles.nodeActive : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isActive && <div className={styles.nodeDot} />}
    </div>
  );
}
