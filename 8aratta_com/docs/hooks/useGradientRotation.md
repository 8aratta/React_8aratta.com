# useGradientRotation

Calculates gradient rotation values based on mouse position.

## Location

`src/hooks/useGradientRotation.ts`

## Import

```typescript
import { useGradientRotation } from '../hooks';
```

## Usage

```tsx
import { useMousePosition, useGradientRotation } from '../hooks';
import { DEFAULT_GRADIENT_CONFIG } from '../constants';

function MyComponent() {
  const { mousePos, handleMouseMove } = useMousePosition();
  
  const rotation = useGradientRotation({
    mousePos,
    baseRotation: DEFAULT_GRADIENT_CONFIG.baseRotation,
  });

  return (
    <div onMouseMove={handleMouseMove}>
      <GradientBackground rotation={rotation} />
    </div>
  );
}
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mousePos` | `MousePosition` | Yes | Current mouse position from `useMousePosition` |
| `baseRotation` | `RotationValues` | Yes | Base rotation values to offset from |

## Returns

Returns a `RotationValues` object:

| Property | Type | Description |
|----------|------|-------------|
| `rotationX` | `number` | Calculated X rotation (degrees) |
| `rotationY` | `number` | Calculated Y rotation (degrees) |
| `rotationZ` | `number` | Calculated Z rotation (degrees) |

## How It Works

The hook calculates rotation offsets based on the mouse position relative to the center of the element.

### Calculation Logic

```typescript
const offsetX = mousePos.x - 0.5;  // -0.5 to 0.5
const offsetY = mousePos.y - 0.5;  // -0.5 to 0.5

return {
  rotationX: baseRotation.rotationX + offsetY * MOUSE_SENSITIVITY.rotationX,
  rotationY: baseRotation.rotationY + offsetX * MOUSE_SENSITIVITY.rotationY,
  rotationZ: baseRotation.rotationZ + offsetX * MOUSE_SENSITIVITY.rotationZ,
};
```

### Sensitivity Values

From `constants/gradient.ts`:

| Axis | Sensitivity | Effective Range |
|------|-------------|-----------------|
| rotationX | 20 | ±10° from base |
| rotationY | 20 | ±10° from base |
| rotationZ | 10 | ±5° from base |

### Visual Representation

```
Mouse Position:     Rotation Effect:
┌─────────────┐     
│  ↖   ↑   ↗  │     Top: rotationX decreases
│             │     
│  ←   ●   →  │     Left/Right: rotationY & rotationZ change
│             │     
│  ↙   ↓   ↘  │     Bottom: rotationX increases
└─────────────┘     
    Center = No offset (base rotation)
```

## Performance

The hook uses `useMemo` to memoize the rotation calculation, only recalculating when `mousePos` or `baseRotation` changes.

```typescript
const rotation = useMemo(() => {
  // ... calculation
}, [mousePos, baseRotation]);
```

## Customization

To adjust sensitivity, modify `MOUSE_SENSITIVITY` in `constants/gradient.ts`:

```typescript
// More reactive
const MOUSE_SENSITIVITY = {
  rotationX: 40,  // ±20° range
  rotationY: 40,
  rotationZ: 20,
};

// More subtle
const MOUSE_SENSITIVITY = {
  rotationX: 10,  // ±5° range
  rotationY: 10,
  rotationZ: 5,
};
```

## Related

- [useMousePosition](./useMousePosition.md) - Provides input to this hook
- [GradientBackground](../components/GradientBackground.md) - Uses this hook's output
- [RotationValues Type](../types/RotationValues.md)
- [MOUSE_SENSITIVITY Constant](../constants/gradient.md#mouse_sensitivity)
