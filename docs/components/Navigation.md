# 🧭 Navigation

The Navigation component is the top bar you see on every page. It's always there, like a good friend who never leaves you hanging.

---

## What It Does

- Shows the **8aratta logo** (swaps between dark and light versions depending on the theme — fancy, right?)
- Displays a **live clock** that updates every second. Because knowing it's 3:47 AM while you're still coding is important life information.
- Provides **navigation links** to all the pages: Home, About, and Workspace.

---

## Where It Lives

```
src/components/Navigation/
├── Navigation.tsx
├── Navigation.module.css
└── index.ts
```

---

## How It Works

1. The component grabs the current theme via `useTheme()` to decide which logo to show.
2. A `setInterval` ticks every second to update the displayed time — formatted in a nice `h:mm AM/PM` style.
3. Navigation links use React Router's `<Link>` component, so page transitions are smooth and don't reload the entire app.

---

## Layout

```
┌──────────────────────────────────────────────────┐
│  [Logo]  3:47 PM               Home  About  Work │
│  ← left section →              ← right links →   │
└──────────────────────────────────────────────────┘
```

The left side has the logo (which links back to Home) and the clock. The right side has the page links.

---

## Theme Awareness

The nav applies a `data-theme` attribute based on the current theme. This lets CSS styles adapt:
- **Dark mode** → white logo, dark-friendly colors
- **Light mode** → dark logo, light-friendly colors

---

## Fun Fact

The clock starts ticking the moment you load the page and cleans up its interval when the component unmounts. No memory leaks here — we're responsible adults. Mostly.
