# useSnapScroll

Listens for `wheel` events on the inner scrollable areas of `TimelineSection` elements. When the user scrolls past the end (or before the start) of a section's content, the next (or previous) section is smoothly snapped into view.

## Location

`src/components/Timeline/useSnapScroll.ts`

## Import

```typescript
import { useSnapScroll } from '../../components/Timeline/useSnapScroll';
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `containerRef` | `RefObject<HTMLElement \| null>` | Ref attached to the `<Timeline>` container div |

## Usage

```tsx
import { useRef } from 'react';
import { useSnapScroll } from './useSnapScroll';

function Timeline({ children }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useSnapScroll(containerRef);

  return <div ref={containerRef}>{children}</div>;
}
```

## Behavior

The hook attaches a **non-passive** `wheel` event listener to the container (non-passive is required to call `preventDefault` and block native scroll).

### Snap down (next section)
Triggered when **all three** conditions are true:
1. `deltaY > 0` (scrolling down)
2. `scrollTop + clientHeight >= scrollHeight - 1` (inner container is at the bottom)
3. There is a next `[data-timeline-section]` element

### Snap up (previous section)
Triggered when:
1. `deltaY < 0` (scrolling up)
2. `scrollTop <= 0` (inner container is at the top)
3. There is a previous `[data-timeline-section]` element

### Snap execution
Calls `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` on the target section. An `isSnapping` ref is set to `true` for **700ms** to block further snap triggers during the scroll animation.

## Data Attributes

The hook uses these DOM attributes to find elements:

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-timeline-section` | `TimelineSection` root div | List of all snap targets |
| `data-timeline-scroll` | Inner scrollable div | Scroll position source |

## Notes

- Works on the outer container element, not `window` — keeps the Timeline self-contained
- The 700ms lock may need tuning on very slow connections or if `scrollIntoView` duration changes
- Touch/trackpad momentum scrolling may fire multiple wheel events; the lock handles this
- Sections must be direct descendants of the container and use the `data-timeline-section` attribute for targeting to work

## Related

- [Timeline](../components/Timeline.md) — the component that mounts this hook
- [useActiveEntry](./useActiveEntry.md) — companion hook for tracking visible entries inside a section
