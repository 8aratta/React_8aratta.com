# useMousePosition

Tracks the normalized mouse position within an element with smooth interpolation.

## Location

`src/hooks/useMousePosition.ts`

## Import

```typescript
import { useMousePosition } from '../hooks';
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `smoothing` | `number` | `0.1` | Interpolation factor (0-1). Lower = smoother but slower, higher = faster but less smooth |

## Usage

### Basic Usage

```tsx
import { useMousePosition } from '../hooks';

function MyComponent() {
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition();

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Mouse X: {mousePos.x}, Y: {mousePos.y}
    </div>
  );
}
```

### Custom Smoothing

```tsx
import { useMousePosition } from '../hooks';
import { MOUSE_SMOOTHING } from '../constants/gradient';

function MyComponent() {
  // Use the app-wide smoothing constant
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(MOUSE_SMOOTHING);

  // Or use a custom value (0.05 = very smooth, 0.3 = fast response)
  const { mousePos } = useMousePosition(0.15);

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Mouse X: {mousePos.x}, Y: {mousePos.y}
    </div>
  );
}
```

## Returns

| Property | Type | Description |
|----------|------|-------------|
| `mousePos` | `MousePosition` | Current position `{ x: number, y: number }` normalized 0-1 |
| `handleMouseMove` | `(e: React.MouseEvent) => void` | Mouse move event handler |
| `handleMouseLeave` | `() => void` | Resets position to center (0.5, 0.5) |

## Behavior

- Returns values between 0 and 1 for both axes
- `(0, 0)` = top-left corner
- `(1, 1)` = bottom-right corner
- `(0.5, 0.5)` = center (default/reset value)
- Position is relative to the element receiving the event

### Smooth Interpolation

The hook uses **lerp (linear interpolation)** to smoothly transition between positions:

- **Mouse moves**: Position smoothly follows the cursor instead of snapping instantly
- **Mouse leaves**: Position smoothly returns to center (0.5, 0.5)
- **Mouse re-enters**: Position smoothly transitions from current location to new position (no jumping)
- Uses `requestAnimationFrame` for smooth 60fps animation

The smoothing factor controls how quickly the position catches up to the target:
- `0.05` = Very smooth, slower response (more lag)
- `0.1` = Balanced smoothness (default via `MOUSE_SMOOTHING`)
- `0.2` = Faster response, less smooth
- `Configuration

The default smoothing value can be configured in `src/constants/gradient.ts`:

```typescript
export const MOUSE_SMOOTHING = 0.1; // Adjust for app-wide smoothing
```

## Related

- [useGradientRotation](./useGradientRotation.md) - Uses this hook's output
- [MousePosition Type](../types/MousePosition.md)
- [gradient.ts](../constants/gradient.md) - Contains `MOUSE_SMOOTHING` constant
### Event Handlers

```typescript
const handleMouseMove = useCallback((e: React.MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  targetPos.current = { x, y }; // Sets target, actual position interpolates
}, []);
```

### Animation Loop

```typescript
useEffect(() => {
  const animate = () => {
    setMousePos((current) => {
      const dx = targetPos.current.x - current.x;
      const dy = targetPos.current.y - current.y;

      // Snap to target if close enough
      if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
        return targetPos.current;
      }

      // Lerp towards target
      return {
        x: current.x + dx * smoothing,
        y: current.y + dy * smoothing,
      };
    });

    animationFrameId.current = requestAnimationFrame(animate);
  };

  animationFrameId.current = requestAnimationFrame(animate);

  return () => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };
}, [smoothing]);
```

The hook uses `useCallback` to memoize event handlers and `requestAnimationFrame` for efficient smooth animation.

## Related

- [useGradientRotation](./useGradientRotation.md) - Uses this hook's output
- [MousePosition Type](../types/MousePosition.md)
