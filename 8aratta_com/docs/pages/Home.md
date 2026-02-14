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
- **Interactive Gradient Background**: Mouse-responsive WebGL gradient with smooth interpolation
- **Enso Background Element**: Rotating circular element behind hero image
- **Hover Interactions**: Hero image zoom and continuous enso rotation on hover
- **Responsive Design**: Optimized layout for all device sizes
- **Custom Typography**: Resoft font for brand consistency
- **Non-selectable Content**: App-like user experience
- **Undraggable Images**: All images prevent dragging

## Hero Section Components

### Hero Image Container
- **Purpose**: Wraps hero image and enso background for coordinated positioning
- **Positioning**: Bottom-left anchor point
- **Interaction**: Enables hover detection for zoom and rotation effects
- **Responsive**: Scales container height appropriately for mobile devices

### Enso Background
- **File**: enso.png (converted from enso.eps)
- **Positioning**: Anchored to hero image at 20% from top, 30% from left
- **Animation**: Rotates 360° over 5 seconds on page load, stops at end
- **Hover Effect**: Rotates continuously (360° per 10 seconds) when hovering over hero image
- **Blend Mode**: Uses `mix-blend-mode: multiply` for visual integration
- **Opacity**: 0.5 on desktop, 0.2 on mobile

### Hero Image
- **File**: Me.png (located in assets/images/)
- **Animation**: Slides in from left over 1.5 seconds
- **Positioning**: Positioned within hero image container
- **Hover Effect**: Scales to 1.03x (3% zoom) when hovering
- **Responsive**: Scales appropriately for mobile devices
- **Undraggable**: Cannot be dragged

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

@keyframes slideInAndRotate {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(0deg);
  }
  30% {
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
    opacity: 0.5;
  }
}

@keyframes continuousRotate {
  from {
    transform: translate(-50%, -50%) rotate(360deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}
```

### Animation SeHero animations are 1.5 seconds, enso initial rotation is 5 seconds
- **Timing**: Smooth ease-out curves for natural movement
- **Fill Mode**: `both` and `forwards` ensure elements remain in finaluration
2. **Hero Image** (0s): Slides in from left - 1.5s duration
3. **Hero Name** (0.3s): Fades in from bottom - 1.5s duration  
4. **Hero Description** (0.6s): Fades in from bottom - 1.5s duration

### Hover Animations
- **Hero Image Zoom**: Scales to 1.03x with 0.6s smooth transition
- **Enso Continuous Rotation**: Infinite rotation at 10s per cycle
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
- **Fill Mode**: `both` ensures elements start/end with smooth interpolation (MOUSE_SMOOTHING constant)
- **Rotation Logic**: Uses `useGradientRotation` hook  
- **Interactive**: Background responds to cursor movement with smooth transitions
- **Smooth Movement**: Mouse position interpolates at 0.1 factor (configurable) preventing jumps
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
Undraggable Images**: Hero image and enso cannot be dragged
- **Hover Interactions**: Smooth zoom and rotation effects on hero section hover
- **Smooth Mouse Tracking**: Gradient rotation smoothly follows cursor with interpolation
- **Accessibility**: Semantic HTML structure with proper alt attributes
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
  src: url('../../assets/fonts/Resoft.ttf') format('truetype');
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

```cssContainer { /* Wraps hero image and enso */ }
.ensoBackground { /* Enso circle positioning and animation */ }
.heroImage { /* Hero image styling and hover transition */ }
.heroText { /* Text container positioning */ }
.heroName { /* Main heading styling */ }
.heroDescription { /* Description text with borders */ }
.content { /* Additional content area */ }
```

## Dependencies

- React hooks for gradient interaction (useMousePosition, useGradientRotation)
- GradientBackground component
- CSS Modules for scoped styling
- Resoft font family
- Mouse position tracking with smooth interpolation
- enso.png and Me.png image assetng
- Resoft font family
- Mouse position tracking hooks