# Gradient Constants

Configuration constants for the shader gradient with theme support.

## Location

`src/constants/gradient.ts`

## Import

```typescript
import { 
  DEFAULT_GRADIENT_CONFIG, 
  DARK_GRADIENT_CONFIG,
  LIGHT_GRADIENT_CONFIG,
  MOUSE_SENSITIVITY,
  MOUSE_SMOOTHING
} from '../constants';
```

---

## Theme-based Gradient Configurations

The gradient system now supports dark and light themes with separate configurations.

### DARK_GRADIENT_CONFIG

The default dark theme gradient configuration.

```typescript
const DARK_GRADIENT_CONFIG: GradientConfig = {
  colors: {
    color1: '#888888',  // Light gray
    color2: '#555555',  // Medium gray
    color3: '#000000',  // Black
  },
  baseRotation: {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 45,
  },
  animation: {
    speed: 0.3,
    density: 5,
    strength: 0.8,
  },
  camera: {
    azimuthAngle: 180,
    polarAngle: 90,
    distance: 1,
    zoom: 8,
  },
};
```

### LIGHT_GRADIENT_CONFIG

The light theme gradient configuration (inverted colors).

```typescript
const LIGHT_GRADIENT_CONFIG: GradientConfig = {
  colors: {
    color1: '#ffffff',  // White
    color2: '#dddddd',  // Light gray
    color3: '#8f8f8f',  // Medium gray
  },
  baseRotation: {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 45,
  },
  animation: {
    speed: 0.3,
    density: 5,
    strength: 0.8,
  },
  camera: {
    azimuthAngle: 180,
    polarAngle: 90,
    distance: 1,
    zoom: 8,
  },
};
```

### DEFAULT_GRADIENT_CONFIG

Points to the dark theme configuration by default.

```typescript
export const DEFAULT_GRADIENT_CONFIG = DARK_GRADIENT_CONFIG;
```
---

## MOUSE_SENSITIVITY

Controls how much the gradient rotates in response to mouse movement.

### Definition

```typescript
const MOUSE_SENSITIVITY = {
  rotationX: -45,  // ±22.5° range based on vertical mouse position
  rotationY: 45,   // ±22.5° range based on horizontal mouse position
  rotationZ: 45,   // ±22.5° range based on horizontal mouse position
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
  rotationX: -90,  // ±45° range
  rotationY: 90,
  rotationZ: 90,
};

// Standard (current)
const MOUSE_SENSITIVITY = {
  rotationX: -45,  // ±22.5° range
  rotationY: 45,
  rotationZ: 45,
};

// Subtle
const MOUSE_SENSITIVITY = {
  rotationX: -20,  // ±10° range
  rotationY: 20,
  rotationZ: 20,
};

// Very subtle
const MOUSE_SENSITIVITY = {
  rotationX: -10,  // ±5° range
  rotationY: 10,
  rotationZ: 10,
};
```

---

## MOUSE_SMOOTHING

Controls the smoothness of mouse movement interpolation.

### Definition

```typescript
const MOUSE_SMOOTHING = 0.1;
```

### How It Works

The smoothing factor controls linear interpolation (lerp) between current and target mouse positions:

- **Value range**: 0.0 to 1.0
- **Lower values** (0.05 - 0.15): Smoother, more delayed response - prevents jittery movement
- **Higher values** (0.5 - 1.0): Faster, more direct response - follows cursor closely

```javascript
// In useMousePosition hook:
currentPos = lerp(currentPos, targetPos, MOUSE_SMOOTHING);
```

### Effect Examples

```typescript
// Very smooth (recommended for precise animations)
const MOUSE_SMOOTHING = 0.1;  // Default

// Smooth
const MOUSE_SMOOTHING = 0.2;

// Responsive
const MOUSE_SMOOTHING = 0.5;

// Instant (no smoothing)
const MOUSE_SMOOTHING = 1.0;
```

### Benefits

1. **Prevents Jumping**: Smooth interpolation prevents gradient from jumping when mouse re-enters viewport
2. **Natural Feel**: Creates fluid, organic motion that feels more polished
3. **Performance**: Reduces sudden rotation changes that could cause visual artifacts

---

## Usage with Themes

The GradientBackground component automatically switches between DARK and LIGHT configurations based on the current theme:

```tsx
import { useTheme } from '../../contexts';
import { DARK_GRADIENT_CONFIG, LIGHT_GRADIENT_CONFIG } from '../../constants';

function GradientBackground() {
  const { theme } = useTheme();
  const baseConfig = theme === 'dark' ? DARK_GRADIENT_CONFIG : LIGHT_GRADIENT_CONFIG;
  // ... rest of component
}
```

---

## Related

- [GradientConfig Type](../types/GradientConfig.md)
- [GradientBackground Component](../components/GradientBackground.md)
- [useGradientRotation Hook](../hooks/useGradientRotation.md)
- [useMousePosition Hook](../hooks/useMousePosition.md)
- [ThemeContext](../contexts/ThemeContext.md)
