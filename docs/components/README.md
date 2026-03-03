# 🧩 Components

This is where all the reusable UI building blocks live. Think of components as LEGO bricks — each one does one thing well, and together they build the whole site.

All components are exported from a central `index.ts` barrel file, so importing them is as easy as:

```tsx
import { Navigation, ThemeToggle, GradientBackground, ModelViewer, DebugPanel } from './components';
```

No hunting through folders. You're welcome.

---

## The Component Family

| Component | What It Does | Used In |
|-----------|-------------|---------|
| **[Navigation](./Navigation.md)** | Top nav bar with logo, clock, and CircularMenu | Every page (via App) |
| **[CircularMenu](./CircularMenu.md)** | Radial nav menu with liquid glass effect | Inside Navigation |
| **[ThemeToggle](./ThemeToggle.md)** | Dark/Light mode toggle button | Every page (via App) |
| **[GradientBackground](./GradientBackground.md)** | Animated shader gradient that reacts to your mouse | Home page |
| **[ModelViewer](./ModelViewer.md)** | 3D GLB model renderer with orbit controls | Workspace page |
| **[DebugPanel](./DebugPanel.md)** | Developer overlay showing mouse & rotation data | Development only |

---

## How They're Organized

Each component lives in its own folder with:

```
ComponentName/
├── ComponentName.tsx          → The actual component
├── ComponentName.module.css   → Scoped CSS styles
└── index.ts                   → Clean re-export
```

CSS Modules keep styles scoped, so `Navigation`'s `.link` class won't accidentally mess with `ModelViewer`'s layout. Separation of concerns, baby.

---

## Styling Convention

All components use **CSS Modules** with the naming pattern `ComponentName.module.css`. Styles are imported as objects:

```tsx
import styles from './Navigation.module.css';
// Use as: className={styles.nav}
```

Theme-awareness is handled via `data-theme` attributes and the `useTheme()` hook from the ThemeContext.
