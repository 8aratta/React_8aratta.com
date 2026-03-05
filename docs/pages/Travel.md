# 🗺️ Travel

A scrollable, animated travel diary page for Japan 2023, featuring immersive stories, parallax backgrounds, and scroll-reveal effects. Each section highlights a different city or experience, blending photos, videos, and narrative text for a rich, interactive journey.

---

## What It Does

- Renders a vertical, snap-scroll travel diary with animated section transitions
- Tracks active section and displays indicator dots for navigation
- Uses scroll-reveal hooks for smooth, staged content appearance
- Integrates background images and videos for each story
- Parallax and overlay effects for visual depth
- Responsive and theme-aware (adapts to dark/light mode)
- Accessibility: keyboard navigation, non-selectable media, clear sectioning

---

## Where It Lives

```
src/pages/Travel/
├── Travel.tsx
├── Travel.module.css
└── index.ts
```

---

## How It's Used

```tsx
// In your router or main app
import Travel from './pages/Travel/Travel';

<Travel />
```

---

## Props

This page does not accept props directly. All configuration is internal.

---

## Type Definitions

```ts
// No exported types; all hooks and state are internal.
```

---

## Operating Modes / Advanced Features

- **Scroll-reveal animation**: Each story section animates in as it enters the viewport.
- **Section dot tracking**: Dots update to show which story is currently in view.
- **Parallax backgrounds**: Hero section background shifts with scroll for depth.
- **Media overlays**: Directional overlays and blurred videos for cinematic effect.

---

## Animation & Interaction

- Scroll to navigate through stories; indicator dots update in real time
- Animated transitions for text panels and polaroid insets
- Parallax and overlay effects for immersive visuals
- All media is non-selectable and non-draggable for smooth UX

---

## Related Components

- [About](../About.md): Personal label and site identity
- [ThemeContext](../../contexts/ThemeContext.md): Theme switching logic

---

## Theme Awareness

- Adapts logo and background colors based on current theme (dark/light)
- Uses CSS variables and context for theme switching

---

## Closing Behavior / Reset

- No explicit closing/reset; scroll position determines active section

---

## Pro Tips & Fun Facts

- Each story section can be extended with new cities or experiences by adding to the `sectionRefs` and `dots` arrays.
- Parallax and scroll-reveal hooks are reusable for other pages.

---

## Coming Soon

### Japan & Korea 2024
- New stories, photos, and videos from the next trip
- Expanded diary sections for Tokyo, Seoul, Busan, and more

### Korea 2025
- Future travel plans and diary entries will be added here

Stay tuned for updates!
