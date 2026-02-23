# useActiveEntry

Tracks which `TimelineEntry` is currently visible at the top of a section's inner scrollable container. Used internally by `TimelineSection` to update the pinned header label.

## Location

`src/components/Timeline/useTimelineScroll.ts`

## Import

```typescript
import { useActiveEntry } from '../../components/Timeline/useTimelineScroll';
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `scrollRef` | `RefObject<HTMLElement \| null>` | Ref attached to the inner scrollable `div` inside a `TimelineSection` |

## Usage

```tsx
import { useRef } from 'react';
import { useActiveEntry } from './useTimelineScroll';

function MySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { activeId, activeTitle } = useActiveEntry(scrollRef);

  return (
    <div>
      <div>Currently reading: {activeTitle}</div>
      <div ref={scrollRef} style={{ overflowY: 'auto', height: '100%' }}>
        {/* TimelineEntry children */}
      </div>
    </div>
  );
}
```

## Returns

| Property | Type | Description |
|----------|------|-------------|
| `activeId` | `string \| null` | `id` of the entry currently at the top of the scroll area |
| `activeTitle` | `string \| null` | `title` of that entry, for display in the section header |

## Behavior

- Runs an initial detection on mount (before any scroll occurs)
- Attaches a passive `scroll` event listener to the container element
- Iterates all `[data-timeline-entry]` elements inside the container
- The active entry is the **last one whose `offsetTop` is ≤ `scrollTop + 4px`** — i.e. the entry that has scrolled to or past the top
- Only updates state when `activeId` or `activeTitle` actually changes (avoids needless re-renders)

## Data Attributes

The hook reads DOM attributes set by `<TimelineEntry>`:

| Attribute | Set by | Used for |
|-----------|--------|---------|
| `data-timeline-entry` | `TimelineEntry` | Entry id lookup |
| `data-timeline-entry-title` | `TimelineEntry` | Title display in section header |

## Related

- [Timeline](../components/Timeline.md) — the component that uses this hook via `TimelineSection`
- [useSnapScroll](./useSnapScroll.md) — companion hook for snap-scrolling between sections
