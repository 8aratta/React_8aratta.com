# 🎨 Contexts

React Contexts provide global state that any component can access without prop-drilling. In this project, there's one context — but it's an important one.

---

## Available Contexts

| Context | What It Manages |
|---------|----------------|
| **[ThemeContext](./ThemeContext.md)** | Dark/Light theme state, persistence, and toggling |

---

## How They're Used

Contexts are exported from a central `index.ts`:

```tsx
import { ThemeProvider, useTheme } from './contexts';
```

The `ThemeProvider` wraps the entire app in `App.tsx`, making theme state available everywhere. Individual components then use the `useTheme()` hook to read the current theme or toggle it.
