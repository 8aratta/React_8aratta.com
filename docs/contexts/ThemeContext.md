# 🌓 ThemeContext

The ThemeContext is the brain behind the dark/light mode system. It manages the current theme, persists it across visits, and provides a simple toggle function.

---

## What It Does

- Stores the current theme: `'dark'` or `'light'`
- **Persists to localStorage** — your theme preference survives page refreshes and revisits
- Sets a `data-theme` attribute on `<html>` for global CSS targeting
- Provides a `toggleTheme()` function to switch between modes
- Defaults to **dark mode** if no saved preference exists (good taste is the default)

---

## Where It Lives

```
src/contexts/ThemeContext.tsx
```

---

## What It Exports

### `ThemeProvider`
A wrapper component that provides theme state to all children:

```tsx
<ThemeProvider>
  <App />   {/* Everything inside can access the theme */}
</ThemeProvider>
```

### `useTheme()`
A hook to consume the theme context:

```tsx
const { theme, toggleTheme } = useTheme();

// theme → 'dark' | 'light'
// toggleTheme() → switches between them
```

If you try to use `useTheme()` outside of a `ThemeProvider`, it throws an error. Because rules matter.

---

## Persistence Flow

```
1. Page loads
2. Check localStorage for 'theme' key
3. Found? → Use that value
   Not found? → Default to 'dark'
4. User toggles theme
5. New theme saved to localStorage
6. document.documentElement gets data-theme attribute updated
7. All components re-render with new theme
8. CSS picks up the data-theme change
```

---

## How Components Use It

Basically every component in the app calls `useTheme()`:

- **Navigation** — picks the right logo
- **ThemeToggle** — shows the toggle button and fires `toggleTheme()`
- **GradientBackground** — picks dark or light gradient config
- **Pages** — set `data-theme` on their containers

---

## Why data-theme on `<html>`?

By setting the attribute on the document root, CSS can target it globally:

```css
[data-theme='dark'] {
  --bg-color: #000;
  --text-color: #fff;
}
[data-theme='light'] {
  --bg-color: #fff;
  --text-color: #000;
}
```

This means theme switching happens with zero JavaScript style manipulation in components — it's all CSS-driven. Clean, performant, and elegant.
