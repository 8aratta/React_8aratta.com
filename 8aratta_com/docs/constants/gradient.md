# Gradient Constants

Configuration constants for the shader gradient.

## Location

`src/constants/gradient.ts`

## Import

```typescript
import { DEFAULT_GRADIENT_CONFIG, MOUSE_SENSITIVITY } from '../constants';
```

---

## DEFAULT_GRADIENT_CONFIG

The default configuration for the shader gradient background.

### Definition

```typescript
const DEFAULT_GRADIENT_CONFIG: GradientConfig = {
  colors: {
    color1: '#606060',  // Dark gray
    color2: '#909090',  // Medium gray
    color3: '#212121',  // Near black
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
---

## MOUSE_SENSITIVITY

Controls how much the gradient rotates in response to mouse movement.

### Definition

```typescript
const MOUSE_SENSITIVITY = {
  rotationX: 20,  // ±10° range based on vertical mouse position
  rotationY: 20,  // ±10° range based on horizontal mouse position
  rotationZ: 10,  // ±5° range based on horizontal mouse position
};
```

### How It Works

The sensitivity values represent the total rotation range:

```
Mouse at center (0.5):  offset = 0
Mouse at edge (0 or 1): offset = ±(sensitivity / 2)

Formula: offset = (mousePos - 0.5) * sensitivity
```

### Presets

```typescript
// Highly reactive
const MOUSE_SENSITIVITY = {
  rotationX: 40,  // ±20° range
  rotationY: 40,
  rotationZ: 20,
};

// Standard (default)
const MOUSE_SENSITIVITY = {
  rotationX: 20,  // ±10° range
  rotationY: 20,
  rotationZ: 10,
};

// Subtle
const MOUSE_SENSITIVITY = {
  rotationX: 10,  // ±5° range
  rotationY: 10,
  rotationZ: 5,
};

// Very subtle
const MOUSE_SENSITIVITY = {
  rotationX: 5,   // ±2.5° range
  rotationY: 5,
  rotationZ: 2,
};
```

---

## Related

- [GradientConfig Type](../types/GradientConfig.md)
- [GradientBackground Component](../components/GradientBackground.md)
- [useGradientRotation Hook](../hooks/useGradientRotation.md)
