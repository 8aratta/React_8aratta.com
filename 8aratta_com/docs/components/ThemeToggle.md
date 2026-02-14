# ThemeToggle

A reusable theme toggle button component with responsive positioning behavior.

## Location

`src/components/ThemeToggle/`

## Import

```typescript
import { ThemeToggle } from '../components';
// or
import ThemeToggle from '../components/ThemeToggle';
```

## Usage

### Desktop (Navigation Bar)

```tsx
import ThemeToggle from '../ThemeToggle';

function Navigation() {
  return (
    <nav>
      {/* Other navigation elements */}
      <ThemeToggle className={styles.desktopOnly} />
    </nav>
  );
}
```

### Mobile (Floating Button)

```tsx
import { ThemeToggle } from '../components';

function App() {
  return (
    <div>
      {/* Page content */}
      <ThemeToggle isMobile={true} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class for styling |
| `isMobile` | `boolean` | `false` | Enables mobile floating button styling |

## Features

- **Dual Display Modes**: Desktop inline or mobile floating button
- **Theme Icons**: 
  - Dark mode: ⚪ (white circle)
  - Light mode: ⚫️ (black circle)
- **Accessible**: Includes aria-label for screen readers
- **Smooth Animations**: Hover effects with opacity and scale transitions
- **Responsive**: Automatically hides/shows based on screen size
- **Backdrop Blur**: Mobile version has glassmorphism effect

## Behavior

### Desktop Mode (default)
- Renders as inline button
- Uses `mix-blend-mode: difference` for contrast
- Visible only on screens >768px width
- Appears in Navigation component

### Mobile Mode (`isMobile={true}`)
- Fixed positioning in bottom left corner
- Circular floating button design
- Backdrop blur effect with shadow
- Visible only on screens ≤768px width
- Appears in App root, outside Navigation

## Responsive Design

### Desktop (>768px)
```css
.themeToggle:not(.mobile) {
  display: flex;          /* Visible */
}

.themeToggle.mobile {
  display: none;          /* Hidden */
}
```

### Mobile (≤768px)
```css
.themeToggle:not(.mobile) {
  display: none;          /* Hidden */
}

.themeToggle.mobile {
  display: flex;          /* Visible */
  position: fixed;
  bottom: 2rem;
  left: 2rem;
}
```

### Small Mobile (≤480px)
- Reduced size: 3rem × 3rem
- Closer to edge: 1.5rem from bottom and left

## Styling

### Desktop Button
- Transparent background
- Font size: 1.5rem
- Padding: 0.5rem
- Mix blend mode for automatic contrast

### Mobile Floating Button
- Semi-transparent white background: `rgba(255, 255, 255, 0.1)`
- Backdrop filter: `blur(10px)`
- Border radius: 50% (circular)
- Size: 3.5rem × 3.5rem (desktop), 3rem × 3rem (mobile)
- Box shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Z-index: 1000 (above all content)

### Hover Effects
- Opacity: 0.7
- Scale: 1.1 (desktop) / 1.05 (mobile)
- Smooth transitions: 0.2s ease

### Active State
- Scale: 0.95 (pressed effect)

## Theme Integration

The component uses `useTheme` hook from ThemeContext:

```tsx
const { theme, toggleTheme } = useTheme();

<button 
  onClick={toggleTheme}
  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
>
  {theme === 'dark' ? '⚪' : '⚫️'}
</button>
```

## CSS Modules

```css
.themeToggle { /* Base button styles */ }
.themeToggle.mobile { /* Fixed floating button */ }
.themeToggle:not(.mobile) { /* Inline navigation button */ }
```

## Implementation Pattern

The ThemeToggle component is instantiated twice in the application:

1. **Desktop Instance** (Navigation.tsx)
   ```tsx
   <ThemeToggle className={styles.desktopOnly} />
   ```
   - Hidden on mobile via `.desktopOnly` class
   - Integrated into navigation bar

2. **Mobile Instance** (App.tsx)
   ```tsx
   <ThemeToggle isMobile={true} />
   ```
   - Hidden on desktop via internal `.mobile` styles
   - Floats above all content

This ensures only one theme toggle is visible at any screen size, preventing duplicate controls.

## Accessibility

- **Keyboard Navigation**: Fully accessible via keyboard
- **Screen Readers**: Descriptive aria-label indicates current action
- **Focus Visible**: Standard browser focus indicators
- **High Contrast**: Mix blend mode ensures visibility on all backgrounds

## Dependencies

- ThemeContext (`useTheme` hook)
- CSS Modules for scoped styling

## Related

- [Navigation Component](./Navigation.md) - Uses ThemeToggle in desktop mode
- [ThemeContext](../contexts/ThemeContext.md) - Theme state management
- [App Component](../../src/App.tsx) - Uses ThemeToggle in mobile mode

## Performance

- No re-renders except when theme changes
- Lightweight component with minimal DOM elements
- CSS-based animations (hardware accelerated)
- Single event listener (onClick)
