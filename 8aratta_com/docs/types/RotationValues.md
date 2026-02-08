# RotationValues

Represents 3D rotation angles in degrees.

## Location

`src/types/index.ts`

## Definition

```typescript
interface RotationValues {
  rotationX: number;  // Rotation around X-axis (degrees)
  rotationY: number;  // Rotation around Y-axis (degrees)
  rotationZ: number;  // Rotation around Z-axis (degrees)
}
```

## Properties

| Property | Type | Unit | Description |
|----------|------|------|-------------|
| `rotationX` | `number` | degrees | Rotation around X-axis (pitch) |
| `rotationY` | `number` | degrees | Rotation around Y-axis (yaw) |
| `rotationZ` | `number` | degrees | Rotation around Z-axis (roll) |

## Usage

```typescript
import { RotationValues } from '../types';

const rotation: RotationValues = {
  rotationX: 45,   // Tilted forward 45°
  rotationY: -45,  // Rotated left 45°
  rotationZ: 45,   // Rolled right 45°
};
```

## 3D Rotation Axes

```
        Y (Yaw)
        │
        │    
        │   ╱ Z (Roll)
        │  ╱
        │ ╱
        │╱
        ●───────── X (Pitch)
       ╱
      ╱
     ╱
```

- **rotationX (Pitch)**: Tilts up/down like nodding your head
- **rotationY (Yaw)**: Rotates left/right like shaking your head
- **rotationZ (Roll)**: Tilts sideways like tilting your head

## Common Values

| Description | rotationX | rotationY | rotationZ |
|-------------|-----------|-----------|-----------|
| Default | 45 | -45 | 45 |
| Flat view | 0 | 0 | 0 |
| Top-down | 90 | 0 | 0 |
| Side view | 0 | 90 | 0 |

## Related

- [useGradientRotation](../hooks/useGradientRotation.md) - Returns this type
- [GradientBackground](../components/GradientBackground.md) - Consumes this type
- [GradientConfig](./GradientConfig.md) - Contains baseRotation of this type
