# 🎯 CircularMenu

The CircularMenu is the fancy radial navigation menu that fans out from the hamburger button. Instead of a boring dropdown list, links arc out in a circle like a peacock showing off its feathers. With a *liquid glass* effect on top, because regular menus are for regular websites.

---

## What It Does

- Renders a **hamburger button** (☰) that toggles into an **X** when open
- On click, **navigation links fan out in a radial arc** with staggered animations
- Each link is positioned along a configurable circular arc (default: quarter-circle from left to bottom)
- Applies a **liquid glass SVG displacement filter** to the menu items for that frosted-glass-meets-jelly aesthetic
- **Automatically closes** when you navigate to a new page or click outside the menu
- Dynamically **adjusts spacing** so pills don't overlap, even if labels have different lengths

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

<CircularMenu links={NAV_LINKS} />
```

You pass it an array of links and it handles the rest — positioning, animations, opening, closing, all of it.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `NavLink[]` | *required* | Array of `{ to, label }` objects for each menu item |
| `radius` | `number` | `130` | Radius in pixels for the radial arc |
| `startAngle` | `number` | `180` | Start angle in degrees (180 = straight left) |
| `endAngle` | `number` | `270` | End angle in degrees (270 = straight down) |
| `staggerMs` | `number` | `50` | Delay in ms between each item's animation |

### NavLink Type

```ts
interface NavLink {
  to: string;    // Route path
  label: string; // Display text
}
```

---

## The Radial Layout

Items are placed on an arc of a circle centered on the hamburger button:

```
         180° (left)
          ←─── · ───
          │         │
          │   [☰]   │
          │         │
          ↓         
         270° (down)
```

With default settings, the first link appears directly to the left and the last one directly below, with others equally spaced along the quarter-circle in between.

The component doesn't just dump items at equal angles though — it **measures the actual pill sizes** after rendering and iteratively adjusts angles so the *visual gaps* between items are equal. Even if "Home" is tiny and "Workspace" is wide, they'll be evenly spaced along the arc. Smart stuff.

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
- A **link is clicked** (navigates and closes)
- The **overlay** is clicked (clicking anywhere outside the menu)
- The **route changes** (via `useLocation()` watching `location.pathname`)

The overlay is a transparent full-screen div that appears when the menu is open. It catches outside clicks without interfering with the visual layout.

---

## Theme Awareness

The component reads the current theme via `useTheme()` and applies `data-theme` to its root container. CSS can then style the hamburger icon, pills, and overlay differently for dark and light modes.

---

## The Math Corner (for the curious)

The equal-spacing algorithm works like this:

1. Place items at naively equal angles along the arc
2. Measure the DOM size of each pill
3. Project each pill's bounding box onto the circle's tangent line to get "angular extent"
4. Calculate total angular space occupied by pills vs. available arc
5. Distribute remaining space as equal gaps
6. Repeat 15 times with dampening (40/60 blend) for numeric stability
7. Convert final angles to (x, y) pixel positions

It's basically a mini physics simulation that runs in a `useMemo`. Over-engineered? Perhaps. Does it look good? Absolutely.
