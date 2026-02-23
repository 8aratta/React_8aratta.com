
# About Page

The About page presents a timeline-driven overview of the website, featuring interactive gradient backgrounds, theme-aware styling, and a modern, responsive layout. It highlights the site's structure, custom components, web design principles, and planned features.

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

- **Timeline Navigation**: Website features and history are presented as a scrollable, snap-scrolling timeline with sticky section headers.
- **Interactive Gradient Background**: Mouse-responsive, theme-aware WebGL gradient for visual depth and interactivity.
- **Theme-aware Styling**: Headings and content colors adapt to dark/light mode (white in dark, black in light).
- **Smooth Mouse Tracking**: Gradient rotation smoothly follows cursor with interpolation (MOUSE_SMOOTHING = 0.1).
- **Responsive Design**: Optimized for all device sizes with adaptive padding and font sizes.
- **Custom Components**: Uses Timeline, GradientBackground, ThemeToggle, and more.
- **Planned Features Section**: Highlights upcoming features and improvements.


## Structure

- **Container**: Full viewport, relative positioning, mouse tracking (onMouseMove, onMouseLeave), and `data-theme` attribute for theme targeting.
- **Content Section**: Card-like area above the gradient background, with responsive padding, border radius, and theme-aware text colors.
- **Timeline**: Multiple `TimelineSection` and `TimelineEntry` components organize content into themed sections (General, Structure, Web Components, Web Design, Planned Features).


## Theme Support

The About page uses `ThemeContext` for theme-aware styling. Headings (`h2`) are white in dark mode and black in light mode, with smooth transitions. The `data-theme` attribute enables CSS targeting for both content and headings.


### Gradient Background

Gradient colors switch based on theme:
- **Dark theme**: #888888 → #555555 → #000000
- **Light theme**: #ffffff → #dddddd → #8f8f8f


## Responsive Design

The layout adapts to all device sizes:
- **Desktop**: Large padding, max-width 820px, large headings.
- **Tablet**: Reduced padding, smaller headings and text.
- **Mobile**: Minimal padding, compact headings and text, rounded corners.


## Interactive Gradient

The About page uses the `GradientBackground` component:
- **Mouse Tracking**: `useMousePosition` hook with smoothing
- **Rotation Logic**: `useGradientRotation` hook with theme-based base rotation
- **Performance**: WebGL acceleration for smooth animation


## CSS Modules

```css
.container { /* Full viewport, mouse tracking, theme targeting */ }
.content { /* Card-like content area, theme-aware text and headings */ }
```


## Dependencies

- React hooks: `useMousePosition`, `useGradientRotation`
- ThemeContext: `useTheme` hook
- Components: `GradientBackground`, `Timeline`, `TimelineSection`, `TimelineEntry`, `ThemeToggle`
- CSS Modules for scoped styling


## Related

- [Home Page](./Home.md) - Main landing page with hero section
- [Timeline Component](../components/Timeline.md) - Timeline with snap scroll & orientation support
- [GradientBackground Component](../components/GradientBackground.md) - Gradient implementation
- [useMousePosition Hook](../hooks/useMousePosition.md) - Mouse tracking with smoothing
- [useGradientRotation Hook](../hooks/useGradientRotation.md) - Rotation calculation
- [ThemeContext](../contexts/ThemeContext.md) - Theme state management
- [Gradient Constants](../constants/gradient.md) - Theme-based gradient configurations
