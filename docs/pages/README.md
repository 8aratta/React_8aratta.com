# 📄 Pages

These are the actual pages you navigate to on the site. Each page is a full-screen view with its own layout, styling, and personality.

---

## The Pages

| Page | Route | Description |
|------|-------|-------------|
| **[Home](./Home.md)** | `/` | Landing page — hero image, animated gradient, vibes |
| **[About](./About.md)** | `/about` | The story behind 8aratta with scroll-reveal sections |
| **[Workspace](./Workspace.md)** | `/workspace` | 3D model viewer showing Domenico's workspace |

---

## Routing

The app uses **HashRouter** from React Router v7. That means URLs look like:

```
https://8aratta.com/#/
https://8aratta.com/#/about
https://8aratta.com/#/workspace
```

Why hash routing? GitHub Pages doesn't support server-side routing, so the hash (`#`) keeps everything client-side. It works everywhere without needing special server config. Practical > pretty.

---

## Page Structure

Each page lives in its own folder:

```
src/pages/
├── Home/
│   ├── Home.tsx
│   └── Home.module.css
├── About/
│   ├── About.tsx
│   └── About.module.css
└── Workspace/
    ├── Workspace.tsx
    └── Workspace.module.css
```

All pages are theme-aware via `useTheme()` and apply `data-theme` to their root container.
