# GradientConfig

Complete configuration for the shader gradient background.

## Location

`src/types/index.ts`

## Definition

```typescript
interface GradientConfig {
  colors: {
    color1: string;  // Primary color (hex)
    color2: string;  // Secondary color (hex)
    color3: string;  // Tertiary color (hex)
  };
  baseRotation: RotationValues;  // Initial rotation state
  animation: {
    speed: number;    // Animation speed (0.1 - 1.0 recommended)
    density: number;  // Wave density
    strength: number; // Wave strength/amplitude
  };
  camera: {
    azimuthAngle: number;  // Horizontal camera angle
    polarAngle: number;    // Vertical camera angle
    distance: number;      // Camera distance from subject
    zoom: number;          // Camera zoom level
  };
}
```

## Properties

### colors

| Property | Type | Description |
|----------|------|-------------|
| `color1` | `string` | Primary gradient color (hex format) |
| `color2` | `string` | Secondary gradient color (hex format) |
| `color3` | `string` | Tertiary gradient color (hex format) |

### baseRotation

See [RotationValues](./RotationValues.md) for details.

### animation

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| `speed` | `number` | 0.1 - 1.0 | How fast the gradient animates |
| `density` | `number` | 0.5 - 3.0 | Wave pattern density |
| `strength` | `number` | 0.5 - 3.0 | Wave amplitude/height |

### camera

| Property | Type | Description |
|----------|------|-------------|
| `azimuthAngle` | `number` | Horizontal camera rotation (degrees) |
| `polarAngle` | `number` | Vertical camera angle (degrees) |
| `distance` | `number` | Camera distance from center |
| `zoom` | `number` | Camera zoom level |

## Usage

```typescript
import { GradientConfig } from '../types';

const config: GradientConfig = {
  colors: {
    color1: '#606060',
    color2: '#909090',
    color3: '#212121',
  },
  baseRotation: {
    rotationX: 45,
    rotationY: -45,
    rotationZ: 45,
  },
  animation: {
    speed: 0.3,
    density: 1.5,
    strength: 1.5,
  },
  camera: {
    azimuthAngle: 180,
    polarAngle: 80,
    distance: 2.8,
    zoom: 9.1,
  },
};
```

## Partial Configuration

When using with `GradientBackground`, you can provide a partial config:

```tsx
<GradientBackground 
  rotation={rotation}
  config={{
    colors: {
      color1: '#ff0000',  // Only override what you need
    },
  }}
/>
```

## Related

- [DEFAULT_GRADIENT_CONFIG](../constants/gradient.md#default_gradient_config)
- [GradientBackground](../components/GradientBackground.md)
- [RotationValues](./RotationValues.md)
