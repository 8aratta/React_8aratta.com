# 📐 Types

Shared TypeScript type definitions used across the codebase. These live in one place so everyone agrees on what shapes data should be.

---

## Where It Lives

```
src/types/index.ts
```

---

## Available Types

### MousePosition

Represents a normalized mouse position within an element.

```ts
interface MousePosition {
  x: number;  // 0 to 1 (left to right)
  y: number;  // 0 to 1 (top to bottom)
}
```

Center of the element = `{ x: 0.5, y: 0.5 }`. Used by `useMousePosition` and `DebugPanel`.

---

### RotationValues

Represents rotation angles for the shader gradient.

```ts
interface RotationValues {
  rotationX: number;
  rotationY: number;
  rotationZ: number;
}
```

These values are passed to the `GradientBackground` component and control how the shader tilts and spins. Produced by `useGradientRotation`.

---

### GradientConfig

The full configuration object for a gradient preset.

```ts
interface GradientConfig {
  colors: {
    color1: string;   // Hex color
    color2: string;   // Hex color
    color3: string;   // Hex color
  };
  baseRotation: RotationValues;  // Starting rotation before mouse influence
  animation: {
    speed: number;     // How fast the gradient animates
    density: number;   // Wave density
    strength: number;  // Wave intensity
  };
  camera: {
    azimuthAngle: number;   // Horizontal camera angle
    polarAngle: number;     // Vertical camera angle
    distance: number;       // Camera distance from center
    zoom: number;           // Camera zoom level
  };
}
```

Used in `constants/gradient.ts` to define the dark and light theme gradient configurations.

---

## Why a Separate Types File?

When multiple files need the same type — like `MousePosition` being used by hooks, components, and debug panels — it's cleaner to define it once and import it everywhere. No copy-pasting, no drift, no "wait, did I add that property to all three versions?" moments.

Single source of truth. The way types should be.
