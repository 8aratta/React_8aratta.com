# ThemeContext

A React Context for managing global theme state (dark/light mode) with localStorage persistence.

## Location

`src/contexts/ThemeContext.tsx`

## Import

```typescript
import { ThemeProvider, useTheme } from '../contexts';
```

---

## Overview

The ThemeContext provides a centralized theme management system that:
- Manages global dark/light theme state
- Persists theme preference in localStorage
- Provides easy theme switching
- Automatically applies theme to all consuming components

## Theme Type

```typescript
type Theme = 'light' | 'dark';
```

---

## ThemeProvider

### Description

Wrapper component that provides theme state to the entire application.

### Props

None - uses default dark theme and reads from localStorage if available.

### Usage

Wrap your root component with ThemeProvider:

```tsx
import { ThemeProvider } from './contexts';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* Your app components */}
      </Router>
    </ThemeProvider>
  );
}
```

### Implementation Details

```typescript
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme, default to 'dark'
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    // Persist theme changes to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## useTheme Hook

### Description

Custom hook to access theme state and toggle function.

### Returns

```typescript
{
  theme: Theme;           // Current theme: 'light' | 'dark'
  toggleTheme: () => void; // Function to switch between themes
}
```

### Usage

```tsx
import { useTheme } from '../../contexts';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

### Example: Theme-aware Styling

```tsx
function StyledComponent() {
  const { theme } = useTheme();

  return (
    <div className={styles.container} data-theme={theme}>
      <h1>Hello World</h1>
    </div>
  );
}
```

```css
/* Component CSS Module */
.container {
  background: #000;
  color: #fff;
}

.container[data-theme="light"] {
  background: #fff;
  color: #000;
}
```

---

## Components Using ThemeContext

### ThemeToggle
- Dedicated theme switching button component
- Desktop: Appears in Navigation bar (inline)
- Mobile: Appears as floating button in bottom left
- Uses responsive display logic to prevent duplicates
- Provides theme toggle button with emoji icons

### Navigation
- Switches logo between `logo_white.png` and `logo.png`
- Updates text colors for clock and links
- Integrates ThemeToggle component (desktop only)

### GradientBackground
- Switches between `DARK_GRADIENT_CONFIG` and `LIGHT_GRADIENT_CONFIG`
- Updates gradient colors automatically

### Home Page
- Adapts hero text colors (white → black)
- Updates border decorations
- Maintains readability across themes

### About Page
- Adapts content text colors
- Ensures proper contrast with gradient background

---

## LocalStorage Persistence

The theme preference is automatically saved to localStorage:

```typescript
// Storage key
'theme'

// Possible values
'dark' | 'light'

// Read on mount
const saved = localStorage.getItem('theme');

// Write on change
localStorage.setItem('theme', theme);
```

### Benefits

1. **User Preference Persistence**: Theme choice survives page refreshes
2. **Cross-Session Memory**: Theme persists across browser sessions
3. **Instant Load**: No flash of wrong theme on page load

---

## Default Theme

The application defaults to **dark theme** if:
- No localStorage value exists
- localStorage value is invalid
- First-time visitor

```typescript
const defaultTheme: Theme = 'dark';
```

---

## Error Handling

The ThemeContext includes built-in error handling:

```typescript
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

This ensures the hook is only used within components wrapped by ThemeProvider.

---

## Related

- [ThemeToggle Component](../components/ThemeToggle.md) - Dedicated theme toggle button
- [Navigation Component](../components/Navigation.md) - Theme toggle implementation (desktop)
- [GradientBackground Component](../components/GradientBackground.md) - Theme-based gradients
- [Gradient Constants](../constants/gradient.md) - DARK/LIGHT configurations
- [Home Page](../pages/Home.md) - Theme-aware hero section
