# ThemeToggle

A floating theme toggle button component that appears in the bottom left corner of the screen on all devices.

## Location

`src/components/ThemeToggle/`

## Import

```typescript
import { ThemeToggle } from '../components';
// or
import ThemeToggle from '../components/ThemeToggle';
```

## Usage

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

- **Fixed Positioning**: Always appears in bottom left corner
- **Floating Button**: Circular design with backdrop blur effect
- **Theme Icons**: 
  - Dark mode: ⚪ (white circle)
  - Light mode: ⚫️ (black circle)
- **Accessible**: Includes aria-label for screen readers
- **Smooth Animations**: Hover effects with opacity and scale transitions
- **Glassmorphism**: Backdrop blur with semi-transparent background
- **Always Visible**: Available on all screen sizes

## Behavior

The ThemeToggle appears as a fixed floating button in the bottom left corner on all devices:

- Fixed positioning: `bottom: 2rem; left: 2rem`
- Circular button design with backdrop blur
- Floats above all content (z-index: 1000)
- No responsive visibility changes - always visible

## Responsive Design

### All Screen Sizes
```css
.themeToggle.mobile {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  /* Glassmorphism styling */
}
```

### Small Mobile (≤480px)
- Reduced size: 3rem × 3rem
- Closer to edge: 1.5rem from bottom and left

## Styling

### Floating Button
- Semi-transparent white background: `rgba(255, 255, 255, 0.1)`
- Backdrop filter: `blur(10px)`
- Border radius: 50% (circular)
- Size: 3.5rem × 3.5rem (desktop), 3rem × 3rem (mobile)
- Box shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Z-index: 1000 (above all content)
- Font size: 1.5rem (desktop), 1.3rem (mobile)

### Hover Effects
- Background opacity increase: `rgba(255, 255, 255, 0.2)`
- Scale: 1.05
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
.themeToggle { /* Base button styles (hidden by default) */ }
.themeToggle.mobile { /* Fixed floating button (always visible) */ }
```

## Implementation Pattern

The ThemeToggle component is instantiated once in the application root (App.tsx):

```tsx
<ThemeToggle isMobile={true} />
```

This creates a single floating button that's visible on all screen sizes and floats above all content.

## Accessibility

- **Keyboard Navigation**: Fully accessible via keyboard
- **Screen Readers**: Descriptive aria-label indicates current action
- **Focus Visible**: Standard browser focus indicators
- **High Contrast**: Mix blend mode ensures visibility on all backgrounds

## Dependencies

- ThemeContext (`useTheme` hook)
- CSS Modules for scoped styling

## Related

- [Navigation Component](./Navigation.md) - Main navigation bar
- [ThemeContext](../contexts/ThemeContext.md) - Theme state management
- [App Component](../../src/App.tsx) - Uses ThemeToggle as floating button

## Performance

- No re-renders except when theme changes
- Lightweight component with minimal DOM elements
- CSS-based animations (hardware accelerated)
- Single event listener (onClick)
