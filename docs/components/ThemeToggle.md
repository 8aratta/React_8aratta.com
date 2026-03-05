# 🌗 ThemeToggle

The ThemeToggle is a tiny but mighty button that lets you switch between dark and light mode. That's it. That's the component. But it does it with *style* — and now it also plays hide and seek.

---

## What It Does

- Renders a button with a **circle emoji** — ⚪ for dark mode (click to go light) and ⚫ for light mode (click to go dark)
- Fires the `toggleTheme()` function from the ThemeContext when clicked
- **Auto-hides** after 3 seconds of inactivity — slides left until only a 10px sliver peeks out from the edge
- **Proximity-aware** — hovering near the bottom-left corner partially reveals it, then retreats when you leave
- **Fully reveals** when you hover directly over it, and restarts the 3s idle timer when you leave
- Includes proper `aria-label` for accessibility — because screen readers deserve nice things too

---

## Where It Lives

```
src/components/ThemeToggle/
├── ThemeToggle.tsx
├── ThemeToggle.module.css
└── index.ts
```

---

## How It's Used

In the main `App.tsx`, it's rendered globally alongside the Navigation:

```tsx
<ThemeToggle />
```

No props needed — it always uses the fixed floating pill style. Previously had an `isMobile` prop, but since the mobile style is the only style now, that prop got axed.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Extra CSS class if you need custom styling |

---

## Auto-Hide Behaviour

The button has three states, all driven by CSS `transition: transform 0.4s ease` — no animation keyframes needed:

| State | What's happening | Transform |
|-------|-----------------|-----------|
| **Visible** | Fully on screen | `none` |
| **Hidden** | 3s idle timer fired | `translateX(-100% - 2rem + 10px)` — 10px peek |
| **Proximity** | Cursor near bottom-left | `translateX(-100% - 2rem + 50%)` — half revealed |

And how the states transition:
- **On mount** → 3s timer starts
- **Timer fires** → hidden
- **Cursor enters proximity zone** → half-revealed (smooth slide, no animation)
- **Cursor leaves proximity zone** → back to hidden
- **Cursor reaches button** → fully revealed, timer restarts on leave

### The Proximity Zone

There's a transparent `5rem × 7rem` fixed div covering the bottom-left corner of the viewport. It's invisible and sits just behind the button (`z-index: 999`). Its only job is to catch `onMouseEnter` / `onMouseLeave` and toggle the proximity state — which lets the button react before the cursor actually reaches it.

---

## Theme Logic

The toggle reads and writes theme state through the `useTheme()` hook:
- Current theme is `'dark'`? Show ⚪ (the light beckons)
- Current theme is `'light'`? Show ⚫ (embrace the darkness)

The actual theme persistence happens in the ThemeContext — this button just calls `toggleTheme()` and lets someone else do the heavy lifting. Smart delegation.
