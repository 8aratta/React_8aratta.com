# GradientBackground

An animated 3D shader gradient background that responds to rotation values.

Creds to [HankTheTank](https://www.youtube.com/@HankTheTankCoding), check out his Tutorial on [YouTube](https://www.youtube.com/watch?v=KPM48d7iBAQ&t=459s)

## Location

`src/components/GradientBackground/`

## Import

```typescript
import { GradientBackground } from '../components';
```

## Usage

```tsx
import { GradientBackground } from '../components';
import { RotationValues } from '../types';

const rotation: RotationValues = {
  rotationX: 45,
  rotationY: -45,
  rotationZ: 45,
};

function MyPage() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <GradientBackground rotation={rotation} />
      {/* Your content here */}
    </div>
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `rotation` | `RotationValues` | Yes | - | Current rotation values for the gradient |
| `config` | `Partial<GradientConfig>` | No | `DEFAULT_GRADIENT_CONFIG` | Override default configuration |

## Features

- **WebGL-powered**: Uses `@shadergradient/react` for smooth 3D animations
- **Mouse interactive**: Responds to rotation changes for hover effects
- **Configurable**: Customize colors, animation, and camera settings
- **Grayscale default**: Ships with a subtle grayscale color scheme

## Configuration

### Default Colors

```typescript
colors: {
  color1: '#606060',  // Dark gray
  color2: '#909090',  // Medium gray
  color3: '#212121',  // Near black
}
```

### Customizing Colors

```tsx
<GradientBackground 
  rotation={rotation}
  config={{
    colors: {
      color1: '#3366ff',  // Blue
      color2: '#6699ff',  // Light blue
      color3: '#001133',  // Dark navy
    },
  }}
/>
```

### Animation Settings

```tsx
<GradientBackground 
  rotation={rotation}
  config={{
    animation: {
      speed: 0.5,     // Faster animation
      density: 2.0,   // More wave density
      strength: 2.0,  // Larger waves
    },
  }}
/>
```

### Camera Settings

```tsx
<GradientBackground 
  rotation={rotation}
  config={{
    camera: {
      azimuthAngle: 180,
      polarAngle: 80,
      distance: 2.8,
      zoom: 9.1,
    },
  }}
/>
```

## Styling

The component uses CSS Modules for scoped styling:

```css
/* GradientBackground.module.css */
.canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}
```

## Implementation Notes

- The canvas has `pointerEvents='none'` to allow clicks to pass through
- Uses `control='props'` mode for dynamic rotation updates
- Merges partial config with defaults for easy customization

## Dependencies

- `@shadergradient/react` - Shader gradient library
- `three` - 3D graphics (peer dependency)
- `@react-three/fiber` - React renderer for Three.js (peer dependency)

## Related

- [useGradientRotation](../hooks/useGradientRotation.md) - Calculates rotation values
- [GradientConfig Type](../types/GradientConfig.md)
- [DEFAULT_GRADIENT_CONFIG](../constants/gradient.md#default_gradient_config)
