# Navigation

A responsive navigation component with logo image, real-time clock, and page links.

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
- **Image Logo**: Displays logo.png with responsive sizing
- **Undraggable Logo**: Logo image cannot be dragged
- **Mix Blend Mode**: Uses `mix-blend-mode: difference` for optimal contrast over backgrounds
- **Non-selectable**: All text is made non-selectable for app-like feel
- **Home Navigation**: Logo functions as clickable home button

## Structure

### Left Section
- **Logo**: Image-based logo (logo.png)
  - Desktop: 75px width
  - Tablet: 40px width
  - Mobile: 35px width
- **Clock**: Real-time display with AM/PM format

### Right Section
- **Navigation Links**: Home and About pages with visual separators

## Responsive Behavior

### Desktop (>768px)
- Full navigation with 200px logo width
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
.nav { /* Main navigation container */ }
.leftSection { /* Logo and clock container */ }
.logo { /* Logo styling with responsive font */ }
.logoFull { /* Flink wrapper */ }
.logo img { /* Logo image with responsive sizing */ }
.clock { /* Real-time clock styling */ }
.links { /* Navigation links container */ }
.link { /* Individual link styling */ }
```

## Dependencies

- React Router (`Link` component for navigation)
- CSS Modules for scoped styling
- logo.png image asset
## Auto-Updates

The clock automatically updates every second using:
- `useState` for time state management
- `useEffect` with `setInterval` for continuous updates
- Cleanup function to prevent memory leaks on unmount

## Accessibility

- Semantic `<nav>` element for screen readers
- Proper link structure for keyboard navigation
- Non-selectable text prevents accidental highlighting
- High contrast text with mix-blend-mode