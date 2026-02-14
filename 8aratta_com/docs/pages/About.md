# About Page

A simple content page with interactive gradient background and theme support.

## Location

`src/pages/About/`

## Import

```typescript
import { About } from '../pages/About';
```

## Usage

```tsx
import { About } from '../pages/About';

function App() {
  return <About />;
}
```

## Features

- **Interactive Gradient Background**: Mouse-responsive WebGL gradient with smooth interpolation
- **Theme-aware Styling**: Text colors automatically adapt to dark/light theme
- **Smooth Mouse Tracking**: Gradient rotation smoothly follows cursor with interpolation
- **Responsive Design**: Optimized layout for all device sizes
- **Non-selectable Content**: App-like user experience

## Structure

### Container
- Full viewport dimensions with relative positioning
- Integrated mouse tracking (onMouseMove, onMouseLeave)
- Data-theme attribute for CSS targeting

### Content Section
- Positioned above gradient background (z-index: 1)
- Responsive padding that adapts to screen size
- Theme-aware text colors

## Theme Support

The About page integrates with ThemeContext to provide theme-aware styling:

### Text Colors

**Dark Theme (Default)**
- Content text: `#fff` (white)

**Light Theme**
- Content text: `#000` (black)

### Implementation

The component uses `data-theme` attribute for CSS targeting:

```tsx
<div className={styles.container} data-theme={theme}>
  <GradientBackground rotation={rotation} />
  <div className={styles.content}>
    {/* Content */}
  </div>
</div>
```

```css
/* Default (dark theme) */
.content { color: #fff; }

/* Light theme override */
.container[data-theme="light"] .content { color: #000; }
```

### Gradient Background

The gradient colors automatically switch based on theme:
- Dark theme: Gray scale (#888888 → #555555 → #000000)
- Light theme: Inverted scale (#ffffff → #dddddd → #8f8f8f)

## Responsive Breakpoints

### Desktop (>768px)
- Full padding: 6rem top, 2rem horizontal
- Standard font sizes
- Maximum content width: 600px

### Tablet (≤768px)
- Reduced padding: 5rem top, 1.5rem horizontal
- Heading: 2rem
- Paragraph: 1rem

### Mobile (≤480px)
- Minimal padding: 4rem top, 1rem horizontal
- Heading: 1.75rem
- Paragraph: 0.95rem with tighter line height

## Interactive Gradient

The page integrates with the `GradientBackground` component:
- **Mouse Tracking**: Uses `useMousePosition` hook with smooth interpolation (MOUSE_SMOOTHING = 0.1)
- **Rotation Logic**: Uses `useGradientRotation` hook with base rotation from gradient config
- **Interactive**: Background responds to cursor movement with smooth transitions
- **Performance**: WebGL acceleration for smooth animation
- **Smooth Movement**: Mouse position interpolates preventing jumps when mouse re-enters viewport

## CSS Modules

```css
.container { /* Full viewport container with mouse tracking */ }
.content { /* Content area with theme-aware text colors */ }
```

## Dependencies

- React hooks for gradient interaction (useMousePosition, useGradientRotation)
- ThemeContext (useTheme hook) for theme state
- GradientBackground component with theme support
- CSS Modules for scoped styling
- Mouse position tracking with smooth interpolation (MOUSE_SMOOTHING constant)

## Related

- [Home Page](./Home.md) - Main landing page with hero section
- [GradientBackground Component](../components/GradientBackground.md) - Gradient implementation
- [useMousePosition Hook](../hooks/useMousePosition.md) - Mouse tracking with smoothing
- [useGradientRotation Hook](../hooks/useGradientRotation.md) - Rotation calculation
- [ThemeContext](../contexts/ThemeContext.md) - Theme state management
- [Gradient Constants](../constants/gradient.md) - Theme-based gradient configurations
