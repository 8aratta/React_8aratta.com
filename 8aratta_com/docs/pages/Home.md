# Home Page

The main landing page featuring an animated hero section with gradient background.

## Location

`src/pages/Home/`

## Import

```typescript
import { Home } from '../pages/Home';
```

## Usage

```tsx
import { Home } from '../pages/Home';

function App() {
  return <Home />;
}
```

## Features

- **Animated Hero Section**: Slide-in image with staggered text animations
- **Interactive Gradient Background**: Mouse-responsive WebGL gradient
- **Responsive Design**: Optimized layout for all device sizes
- **Custom Typography**: Resoft font for brand consistency
- **Non-selectable Content**: App-like user experience

## Hero Section Components

### Hero Image
- **File**: Me.png (located in assets/Images/)
- **Animation**: Slides in from left over 1.5 seconds
- **Positioning**: Bottom-left anchor point
- **Responsive**: Scales appropriately for mobile devices

### Hero Name
- **Content**: Large display text with custom font
- **Animation**: Fades in with upward movement (0.3s delay)
- **Typography**: Clamp sizing from 8rem to 10rem on desktop
- **Blend Mode**: Uses mix-blend-mode for contrast

### Hero Description
- **Content**: Descriptive text with decorative borders
- **Animation**: Fades in with upward movement (0.6s delay)
- **Styling**: Bordered frame effect using CSS pseudo-elements
- **Layout**: Responsive text sizing and positioning

## Animation System

### Keyframes

```css
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Animation Sequence

1. **Hero Image** (0s): Slides in from left - 1.5s duration
2. **Hero Name** (0.3s): Fades in from bottom - 1.5s duration  
3. **Hero Description** (0.6s): Fades in from bottom - 1.5s duration

### Animation Properties
- **Duration**: All animations are exactly 1.5 seconds
- **Timing**: Smooth ease-out curves for natural movement
- **Fill Mode**: `both` ensures elements start/end in correct states
- **Performance**: GPU-accelerated transforms for smooth playback

## Responsive Breakpoints

### Desktop (>1024px)
- Full hero layout with image and text positioned optimally
- Large typography scaling with clamp functions
- Right-aligned text positioning

### Tablet (≤1024px)
- Adjusted text sizing and positioning
- Maintained layout proportions

### Mobile (≤768px)
- Image height reduced to 70vh
- Text repositioned to left side
- Simplified color scheme (solid white text)
- Left-aligned text for readability

### Small Mobile (≤480px)
- Further reduced image height to 60vh
- Compact typography sizing
- Minimal bottom spacing

## Background Integration

The page integrates with the `GradientBackground` component:
- **Mouse Tracking**: Uses `useMousePosition` hook
- **Rotation Logic**: Uses `useGradientRotation` hook  
- **Interactive**: Background responds to cursor movement
- **Performance**: WebGL acceleration for smooth animation

## Typography System

### Font Loading
```css
@font-face {
  font-family: 'Resoft';
  src: url('../../assets/Fonts/Resoft.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

### Responsive Text Sizing
- Uses CSS `clamp()` for fluid typography
- Scales naturally between breakpoints
- Maintains readability across devices

## User Experience

- **Non-selectable**: All text elements prevent selection
- **Pointer Events**: Image is non-interactive (pointer-events: none)
- **Smooth Scrolling**: Optimized for performance
- **Accessibility**: Semantic HTML structure
- **Visual Hierarchy**: Clear content prioritization

## CSS Modules

```css
.container { /* Full viewport container */ }
.heroImage { /* Hero image positioning & animation */ }
.heroText { /* Text container positioning */ }
.heroName { /* Main heading styling */ }
.heroDescription { /* Description text with borders */ }
.content { /* Additional content area */ }
```

## Dependencies

- React hooks for gradient interaction
- GradientBackground component
- CSS Modules for scoped styling
- Resoft font family
- Mouse position tracking hooks