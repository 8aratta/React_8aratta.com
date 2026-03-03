# 🌗 ThemeToggle

The ThemeToggle is a tiny but mighty button that lets you switch between dark and light mode. That's it. That's the component. But it does it with *style*.

---

## What It Does

- Renders a button with a **circle emoji** — ⚪ for dark mode (click to go light) and ⚫ for light mode (click to go dark)
- Fires the `toggleTheme()` function from the ThemeContext when clicked
- Supports an optional `isMobile` prop for responsive positioning
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
<ThemeToggle isMobile={true} />
```

The `isMobile` prop applies an additional CSS class for mobile-specific positioning. When `true`, the toggle is styled to sit nicely on smaller screens.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Extra CSS class if you need custom styling |
| `isMobile` | `boolean` | `false` | Applies mobile-specific positioning styles |

---

## Theme Logic

The toggle reads and writes theme state through the `useTheme()` hook:
- Current theme is `'dark'`? Show ⚪ (the light beckons)
- Current theme is `'light'`? Show ⚫ (embrace the darkness)

The actual theme persistence happens in the ThemeContext — this button just calls `toggleTheme()` and lets someone else do the heavy lifting. Smart delegation.
