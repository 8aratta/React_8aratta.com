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
3. The `useIsMobile()` hook detects viewport width (≤ 768 px) and toggles the CircularMenu between **carousel mode** on mobile and **standard radial mode** on desktop.
4. Navigation links are defined as a `NAV_LINKS` array and handed off to the `CircularMenu` component.

```tsx
const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/workspace', label: 'Workspace' },
  // ... more links as needed
];

const isMobile = useIsMobile();

<CircularMenu
  radius={130}
  links={NAV_LINKS}
  carousel={isMobile}
  snap={isMobile}
  emphasize={isMobile ? 225 : false}
  emphasisScale={isMobile ? 1.35 : undefined}
  neutralScale={isMobile ? 0.33 : undefined}
/>
```

### Desktop (> 768 px)

The CircularMenu renders as a **standard radial menu** — items fan out in an arc without carousel dragging, snapping, or emphasis scaling. Clean and simple.

### Mobile (≤ 768 px)

The CircularMenu switches to **carousel mode** with the following config:
- **`carousel`** — full 360° rotation via drag and scroll wheel
- **`snap`** — nearest item smoothly snaps to the emphasis angle when you stop interacting
- **`emphasize={225}`** — items scale up when they reach the 225° position (bottom-left)
- **`emphasisScale={1.35}`** — the emphasized item grows to 1.35× its normal size
- **`neutralScale={0.33}`** — items on the opposite side shrink down for a depth effect

---

## Layout

```
┌──────────────────────────────────────────────────┐
│  [Logo]  3:47 PM                            [☰]  │
│  ← left section →              ← hamburger btn →│
└──────────────────────────────────────────────────┘
```

The left side has the logo (which links back to Home) and the clock. The right side has the CircularMenu hamburger button. When clicked, links fan out in a full ring that you can drag or scroll to spin.

---

## Theme Awareness

The nav applies a `data-theme` attribute based on the current theme. This lets CSS styles adapt:
- **Dark mode** → white logo, dark-friendly colors
- **Light mode** → dark logo, light-friendly colors

---

## TODO

- [ ] **Hover animations** — Add theme-aware hover effects to navigation items:
  - **Dark mode** → illuminating / glow animation on hover
  - **Light mode** → darkening / dim animation on hover

---

## Related

- **[CircularMenu](./CircularMenu.md)** — the radial menu component that lives inside Navigation

---

## Fun Fact

The clock starts ticking the moment you load the page and cleans up its interval when the component unmounts. No memory leaks here — we're responsible adults. Mostly.
