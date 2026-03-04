# 🎯 CircularMenu

The CircularMenu is the fancy radial navigation menu that fans out from the hamburger button. Instead of a boring dropdown list, links arc out in a circle like a peacock showing off its feathers. With a *liquid glass* effect on top, because regular menus are for regular websites.

Now with **carousel mode** — drag or scroll to spin the whole ring of links around like a vinyl record. Because one axis of interaction was never enough.

---

## What It Does

- Renders a **hamburger button** (☰) that toggles into an **X** when open
- On click, **navigation links fan out in a radial arc** with staggered animations
- Each link is positioned along a configurable circular arc (default: 90° quarter-arc centered at 225°)
- Applies a **liquid glass SVG displacement filter** to the menu items for that frosted-glass-meets-jelly aesthetic
- **Carousel mode** — enables full 360° rotation via **drag** and **scroll wheel**
- **Emphasis & snap** — scale items up when they reach a focal angle, and optionally snap the nearest item into place when interaction stops
- **Elliptical angle warping** — rectangular text pills get visually even spacing via an aspect-ratio distortion on the circle
- **Automatically closes** when you navigate to a new page or click outside the menu

---

## Where It Lives

```
src/components/CircularMenu/
├── CircularMenu.tsx
├── CircularMenu.module.css
└── index.ts
```

---

## How It's Used

The CircularMenu is embedded inside the Navigation component:

```tsx
const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/workspace', label: 'Workspace' },
];

// Simple arc mode
<CircularMenu links={NAV_LINKS} />

// Full carousel with snap
<CircularMenu
  radius={175}
  links={NAV_LINKS}
  carousel
  emphasize={225}
  snap
/>
```

You pass it an array of links and it handles the rest — positioning, animations, dragging, snapping, all of it.

---

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `NavLink[]` | *required* | Array of `{ to, label }` objects for each menu item |
| `radius` | `number` | `130` | Radius in pixels for the radial arc |
| `staggerMs` | `number` | `50` | Delay in ms between each item's animation |

### Angle Props

You can define the arc two ways:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `angle` | `number \| 'top' \| 'right' \| 'bottom' \| 'left'` | `225` (bottom-left) | Center of the arc — a ±45° spread is applied automatically |
| `startAngle` | `number` | — | Explicit start angle (overrides `angle`) |
| `endAngle` | `number` | — | Explicit end angle (overrides `angle`) |

The `angle` prop is a shorthand: set `angle="bottom"` and you get a 270°±45° arc. Set `angle={225}` and items spread from 180° to 270°. Or go manual with `startAngle` / `endAngle` for full control.

### Carousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `carousel` | `boolean` | `false` | Enables full 360° rotation via drag and scroll |
| `emphasize` | `boolean \| number \| 'top' \| 'right' \| 'bottom' \| 'left'` | `false` | Scale up items when they reach this focal angle |
| `snap` | `boolean` | `false` | Snap the nearest item to the emphasis angle when interaction stops |
| `emphasisScale` | `number` | — | Max scale factor at the emphasis angle (e.g. `1.33`) |
| `neutralScale` | `number` | — | Scale factor at the opposite side (e.g. `0.33`) — enables continuous interpolation |

### NavLink Type

```ts
interface NavLink {
  to: string;    // Route path
  label: string; // Display text
}
```

---

## Operating Modes

### Static Arc Mode (default)

Items fan out along a fixed arc (quarter-circle by default). No dragging, no spinning — just a clean radial menu.

```
         180° (left)
          ←─── · ───
          │         │
          │   [☰]   │
          │         │
          ↓         
         270° (down)
```

### Carousel Mode (`carousel={true}`)

Items are placed around a **full 360° ring** and can be **rotated** by:

- **Dragging** — click and drag anywhere on the overlay to spin the ring (pointer capture keeps it smooth)
- **Scroll wheel** — scroll up/down to rotate the ring

In carousel mode the arc spans a full circle, so items wrap around seamlessly. The overlay gets a `grab` cursor to hint at the interaction. During active dragging, link clicks are suppressed so you don't accidentally navigate while spinning.

---

## Emphasis & Snap

These features shine in carousel mode but work in static arc mode too.

### Emphasis

When `emphasize` is set, items near the focal angle get **scaled up**. The scaling works in two modes:

1. **Bump mode** (only `emphasisScale` set) — items within ±45° of the focus get a cosine-smoothed scale boost. Items further away stay at scale 1.

2. **Continuous mode** (`emphasisScale` + `neutralScale` set) — *all* items interpolate between `emphasisScale` (at the focus) and `neutralScale` (at 180° away) using a smooth cosine curve. This creates a "fish-eye" effect where the focused item is big and items on the far side are tiny.

### Snap

When `snap={true}`, the component watches for the end of interaction (150ms idle after drag/scroll) and then smoothly animates the closest item to land exactly on the emphasis angle. It even accounts for **scroll direction momentum** — if you were scrolling down, it prefers snapping to the next item in that direction rather than jumping back.

The snap animation uses a dedicated `.snapping` CSS class with its own transition timing, separate from the drag state.

---

## Interaction States

The CSS handles three distinct states for menu items:

| State | CSS Class | What Happens |
|-------|-----------|-------------|
| **Default** | `.menuItem.open` | Normal spring animation with stagger |
| **Dragging** | `.menuItem.open.interacting` | All transitions disabled — items follow the pointer instantly |
| **Snapping** | `.menuItem.open.snapping` | Smooth 0.4s spring transition for the snap animation |

This prevents the carousel from feeling sluggish during drag (no transition delay) while still giving that satisfying bounce when items snap into place.

---

## The Liquid Glass Effect

This is the wild part. The component generates an **SVG displacement map filter** at runtime that creates a refraction/glass distortion effect on each menu pill. Here's the pipeline:

1. **Calculate a refraction profile** — simulates light bending through glass with configurable thickness, bezel width, and index of refraction (IOR)
2. **Generate a displacement map** — renders a canvas with per-pixel displacement vectors based on the refraction profile
3. **Build an SVG filter** — uses `<feDisplacementMap>`, `<feGaussianBlur>`, and `<feColorMatrix>` to apply the glass effect
4. **Apply via CSS** — menu items reference the SVG filter by ID

The filter is only built **once**, on the first menu open, to avoid unnecessary computation. The parameters:

| Setting | Value | What It Controls |
|---------|-------|-----------------|
| Thickness | 40 | How "deep" the glass appears |
| Bezel | 20 | Width of the edge refraction |
| IOR | 2.0 | Index of refraction (higher = more distortion) |
| Blur | 0.3 | Subtle blur for the frosted look |
| Radius | 20 | Corner radius of the pill shape |

---

## Animation

### Opening
Items fly out from the center with a **staggered delay** — each item waits `staggerMs` longer than the previous one. First item pops out immediately, second after 50ms, third after 100ms, etc. Creates a nice cascading fan effect.

### Closing
The stagger reverses — the last item goes first, the first item goes last. The close stagger is slightly faster (80% of open speed) so it feels snappy.

### The Hamburger → X Transition
The three-line hamburger icon morphs into an X when the menu opens. Classic, clean, satisfying.

---

## Closing Behavior

The menu closes when:
- A **link is clicked** (navigates and closes — unless you were dragging, in which case the click is swallowed)
- The **overlay** is clicked (clicking outside, without dragging)
- The **route changes** (via `useLocation()` watching `location.pathname` — also resets rotation offset)

The overlay is a transparent full-screen div that appears when the menu is open. In carousel mode it also handles drag and wheel events. Smart multitasking.

---

## Theme Awareness

The component reads the current theme via `useTheme()` and applies `data-theme` to its root container. CSS can then style the hamburger icon, pills, and overlay differently for dark and light modes.

---

## The Math Corner (for the curious)

### Elliptical Angle Warping

Since menu items are rectangular text pills (wider than they are tall), placing them at equal mathematical angles on a circle would make items at 0°/180° (left/right) look cramped and items at 90°/270° (top/bottom) look sparse.

To fix this, the component applies an **elliptical distortion** with an aspect ratio of 1.35:

```
distortedAngle = atan2(sin(angle), cos(angle) × 1.35)
```

This stretches gaps at top/bottom and compresses left/right, making the visual spacing feel even despite the rectangular shapes. Sneaky.

### Snap Algorithm

1. For each item, calculate its current visual angle (including rotation offset + elliptical warp)
2. Find the shortest angular distance to the emphasis target
3. Apply momentum bias — penalize snapping against the recent scroll direction
4. Pick the item with the smallest total penalty
5. Apply the angular correction to `rotationOffset`
6. Transition via CSS `.snapping` class for a smooth spring animation

### Carousel Distribution

In carousel mode, items are spaced equally around 360° (no gap-balancing needed since it wraps). In static arc mode, items are evenly distributed between `startAngle` and `endAngle`. Both then go through the rotation offset and elliptical warp before final pixel positions are computed.
