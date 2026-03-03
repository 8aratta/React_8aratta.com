# 🧭 Navigation

The Navigation component is the top bar you see on every page. It's always there, like a good friend who never leaves you hanging.

---

## What It Does

- Shows the **8aratta logo** (swaps between dark and light versions depending on the theme — fancy, right?)
- Displays a **live clock** that updates every second. Because knowing it's 3:47 AM while you're still coding is important life information.
- Houses the **[CircularMenu](./CircularMenu.md)** — a radial navigation menu that fans out from a hamburger button with a liquid glass effect. Because plain link lists are so 2019.

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
3. Navigation links are defined as a `NAV_LINKS` array and handed off to the `CircularMenu` component, which handles the radial layout, animations, and interactions.

```tsx
const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/workspace', label: 'Workspace' },
];
```

---

## Layout

```
┌──────────────────────────────────────────────────┐
│  [Logo]  3:47 PM                            [☰]  │
│  ← left section →              ← hamburger btn →│
└──────────────────────────────────────────────────┘
```

The left side has the logo (which links back to Home) and the clock. The right side has the CircularMenu hamburger button that, when clicked, fans out the nav links in a radial arc.

---

## Theme Awareness

The nav applies a `data-theme` attribute based on the current theme. This lets CSS styles adapt:
- **Dark mode** → white logo, dark-friendly colors
- **Light mode** → dark logo, light-friendly colors

---

## Related

- **[CircularMenu](./CircularMenu.md)** — the radial menu component that lives inside Navigation

---

## Fun Fact

The clock starts ticking the moment you load the page and cleans up its interval when the component unmounts. No memory leaks here — we're responsible adults. Mostly.
