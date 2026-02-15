# Navigation

A responsive navigation component with logo image, real-time clock, page links, and theme toggle.

## Location

`src/components/Navigation/`

## Import

```typescript
import { Navigation } from '../components';
```

## Usage

```tsx
import { Navigation } from '../components';

function App() {
  return (
    <>
      <Navigation />
      {/* Your page content here */}
    </>
  );
}
```

## Features

- **Real-time Clock**: Displays current time with automatic updates every second
- **Dynamic Logo**: Switches between logo_white.png (dark theme) and logo.png (light theme)
- **Undraggable Logo**: Logo image cannot be dragged
- **Theme-aware Text**: Clock and links change color based on active theme
- **Mix Blend Mode**: Uses `mix-blend-mode: difference` for optimal contrast over backgrounds
- **Non-selectable**: All text is made non-selectable for app-like feel
- **Home Navigation**: Logo functions as clickable home button
- **Responsive Layout**: Adapts to all screen sizes

## Structure

### Left Section
- **Logo**: Image-based logo (logo.png)
  - Desktop: 75px width
  - Tablet: 40px width
  - Mobile: 35px width
- **Clock**: Real-time display with AM/PM format

### Right Section
- **Navigation Links**: Home and About pages with visual separators

**Note**: Theme toggle is implemented as a separate floating button (see [ThemeToggle](./ThemeToggle.md)), not part of the Navigation component.

## Theme Integration

The Navigation component integrates with the ThemeContext to provide:

1. **Dynamic Logo Switching**
   - Dark theme: Uses `logo_white.png`
   - Light theme: Uses `logo.png`
   - Seamless transition when theme changes

2. **Text Color Adaptation**
   - Clock and navigation links automatically adjust:
   - Dark theme: White text (#fff)
   - Light theme: Black text (#000)

**Theme Switching**: Handled by separate ThemeToggle component (floating button in bottom left)

## Responsive Behavior

### Desktop (>768px)
- Full navigation with logo, clock, and links
- Logo width: 75px
- Standard padding and spacing

### Tablet (≤768px)
- Reduced padding and font sizes
- Logo width: 40px

### Mobile (≤480px)
- Further reduced font sizes
- Logo width: 35px
- Minimal padding for compact display
- Maintains vertical centering

## Styling Features

- **Fixed Positioning**: Always visible at top of viewport
- **High Z-Index**: Appears above other content (z-index: 100)
- **Flexbox Layout**: Responsive alignment and spacing
- **Hover Effects**: Subtle opacity changes on interactive elements
- **Smooth Transitions**: 0.2s ease transitions for hover states

## CSS Modules

The component uses scoped CSS modules for styling isolation:

```css
.nav { /* Main navigation container with data-theme attribute */ }
.leftSection { /* Logo and clock container */ }
.logo { /* Logo styling with responsive sizing */ }
.logo img { /* Logo image with responsive sizing */ }
.clock { /* Real-time clock styling - theme-aware colors */ }
.links { /* Navigation links container */ }
.link { /* Individual link styling - theme-aware colors */ }
```

### Theme-aware Styles

```css
/* Dark theme (default) */
.clock { color: #fff; }
.link { color: #fff; }

/* Light theme */
.nav[data-theme="light"] .clock { color: #000; }
.nav[data-theme="light"] .link { color: #000; }
```

## Dependencies

- React Router (`Link` component for navigation)
- ThemeContext (`useTheme` hook for theme state)
- CSS Modules for scoped styling
- Image assets (in `public/assets/images/`):
  - `logo_white.png` (dark theme)
  - `logo.png` (light theme)

### Image References

Images are served from the public folder and referenced with absolute paths:

```tsx
const logo = theme === 'dark' 
  ? '/assets/images/logo_white.png' 
  : '/assets/images/logo.png';
```
## Auto-Updates

The clock automatically updates every second using:
- `useState` for time state management
- `useEffect` with `setInterval` for continuous updates
- Cleanup function to prevent memory leaks on unmount

## Related Components

- [ThemeToggle](./ThemeToggle.md) - Separate theme toggle button component
- [ThemeContext](../contexts/ThemeContext.md) - Theme state management

## Accessibility

- Semantic `<nav>` element for screen readers
- Proper link structure for keyboard navigation
- Non-selectable text prevents accidental highlighting
- High contrast text with mix-blend-mode