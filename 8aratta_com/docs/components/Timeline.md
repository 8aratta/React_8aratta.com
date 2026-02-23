# Timeline

A reusable, generic timeline component with snap scrolling between parent sections, inner-scrollable child entries, orientation alternation, and animated connecting lines.

## Location

`src/components/Timeline/`

## Files

| File | Purpose |
|------|---------|
| `Timeline.tsx` | Container — mounts snap scroll, renders sections with connectors |
| `TimelineSection.tsx` | Parent node — snappable checkpoint with pinned header and scrollable entries |
| `TimelineEntry.tsx` | Child node — content block inside a section's scroll area |
| `TimelineNode.tsx` | Visual circle with active dot indicator |
| `TimelineConnector.tsx` | 50vh gap between sections — straight line or SVG S-curve |
| `useSnapScroll.ts` | Wheel-event hook for snapping between sections |
| `useTimelineScroll.ts` | Per-section scroll hook tracking the active entry |
| `Timeline.module.css` | All styles, with left/right orientation variants and theme support |
| `types.ts` | Shared TypeScript interfaces |
| `index.ts` | Barrel export |

## Import

```typescript
import { Timeline, TimelineSection, TimelineEntry } from '../components';
```

## Usage

```tsx
import { Timeline, TimelineSection, TimelineEntry } from '../components';

function MyPage() {
  return (
    <Timeline>
      <TimelineSection
        id="chapter-1"
        title="Chapter 1"
        description="The beginning"
        orientation="left"
      >
        <TimelineEntry id="ch1-start" title="Starting Out">
          <p>Content for this entry.</p>
        </TimelineEntry>
        <TimelineEntry id="ch1-growth" title="Growth" minHeight="150vh">
          <p>Taller entry with more content.</p>
        </TimelineEntry>
      </TimelineSection>

      <TimelineSection
        id="chapter-2"
        title="Chapter 2"
        description="A new direction"
        orientation="right"
      >
        <TimelineEntry id="ch2-pivot" title="The Pivot">
          <p>Content mirrored to the left side.</p>
        </TimelineEntry>
      </TimelineSection>
    </Timeline>
  );
}
```

## Components

---

### `<Timeline>`

The outermost container. Mounts the snap scroll hook and renders `TimelineConnector` elements between each section.

**Props**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Should be `<TimelineSection>` elements |

---

### `<TimelineSection>`

A snappable section occupying `100vh`. Contains a pinned header (circle + label) and a scrollable content area. The header displays `"Section Title - Active Entry Title"` and updates live as entries are scrolled.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique identifier, used for snap targeting |
| `title` | `string` | — | Section title shown in the pinned header |
| `description` | `string` | — | Optional subtitle shown below the title |
| `orientation` | `'left' \| 'right'` | `'left'` | Which side the timeline node and line appear on. Mirrors content to the opposite side |

---

### `<TimelineEntry>`

A content block rendered inside a section's scrollable area. The section's header subtitle updates to reflect whichever entry is currently at the top of the scroll.

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique identifier |
| `title` | `string` | — | Entry heading, also shown in section header when active |
| `minHeight` | `string` | — | Optional CSS min-height (e.g. `'150vh'`) for taller entries |
| `children` | `React.ReactNode` | — | Entry body content |

---

### `<TimelineConnector>`

Rendered automatically by `<Timeline>` in the 50vh gap between sections. Not typically used directly.

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `from` | `Orientation` | Orientation of the preceding section |
| `to` | `Orientation` | Orientation of the following section |

- **Same orientation** → straight vertical line on that side
- **Different orientation** → SVG cubic Bézier S-curve connecting left ↔ right

## Scroll Behavior

### Within a section
The page does not scroll. Only the inner scrollable div (hidden scrollbar) scrolls. The section header and timeline node stay pinned at the top.

### Between sections
Triggered by **wheel overflow**: when the user reaches the absolute end (or start) of a section's inner scroll area and continues scrolling, the next (or previous) section snaps smoothly into view via `scrollIntoView`. A 700ms lock prevents re-triggering during animation.

## Orientation

Each `TimelineSection` can be `orientation="left"` (default) or `orientation="right"`.

| Orientation | Node position | Content position |
|-------------|--------------|-----------------|
| `left` | Left edge | Right of node |
| `right` | Right edge | Left of node (mirrored) |

The `TimelineConnector` between sections of **different** orientations renders an SVG S-curve. Between sections of the **same** orientation it renders a straight vertical line.

## Active Entry Label

The pinned header always shows the format **`Section Title - Entry Title`** based on which entry is currently at the top of the scroll area. This is driven by `useActiveEntry` tracking `scrollTop` inside the section's inner div.

## Theme Support

Styles respond to `data-theme="light"` on any ancestor:

| Token | Dark | Light |
|-------|------|-------|
| `--timeline-line-color` | `rgba(255,255,255,0.15)` | `rgba(0,0,0,0.15)` |
| `--timeline-node-border` | `rgba(255,255,255,0.4)` | `rgba(0,0,0,0.3)` |
| `--timeline-node-bg` | `#0a0a0a` | `#ffffff` |
| `--timeline-node-active` | `#ffffff` | `#000000` |
| `--timeline-title-color` | `#ffffff` | `#000000` |

## Responsive Behavior

### Desktop (>768px)
- Node column: 50px wide
- Section scroll area: `padding-left: 50px`
- Full SVG curve width used for connectors

### Tablet (≤768px)
- Node column: 34px
- Section header padding maintained at `15%` top to clear navigation
- Right-orientation scroll padding adjusts

### Mobile (≤480px)
- Node column: 26px
- Line positions and padding scaled down accordingly

## Related

- [useActiveEntry](../hooks/useActiveEntry.md) — tracks the visible entry inside a section
- [useSnapScroll](../hooks/useSnapScroll.md) — handles wheel-based snap between sections
