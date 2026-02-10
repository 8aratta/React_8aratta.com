# Navigation

A responsive navigation component with logo, real-time clock, and page links.

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
- **Responsive Logo**: Shows full "8aratta" text on desktop, abbreviated "8" on mobile
- **Mix Blend Mode**: Uses `mix-blend-mode: difference` for optimal contrast over backgrounds
- **Non-selectable**: All text is made non-selectable for app-like feel
- **Custom Font**: Uses Resoft font family for brand consistency
- **Home Navigation**: Logo functions as clickable home button

## Structure

### Left Section
- **Logo**: Text-based logo using Resoft font
  - Desktop: "8aratta" (full text)
  - Mobile/Tablet: "8" (abbreviated)
- **Clock**: Real-time display with AM/PM format

### Right Section
- **Navigation Links**: Home and About pages with visual separators

## Responsive Behavior

### Desktop (>768px)
- Full navigation with 200px logo width
- 1.5rem font size for logo
- Standard padding and spacing

### Tablet (≤768px)
- Reduced padding and font sizes
- Logo width: 40px
- Shows abbreviated logo

### Mobile (≤480px)
- Further reduced font sizes
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
.logoFull { /* Full text display */ }
.logoShort { /* Abbreviated display */ }
.clock { /* Real-time clock styling */ }
.links { /* Navigation links container */ }
.link { /* Individual link styling */ }
```

## Dependencies

- React Router (`Link` component for navigation)
- CSS Modules for scoped styling
- Resoft font family (loaded via @font-face)

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