# useMousePosition

Tracks the normalized mouse position within an element.

## Location

`src/hooks/useMousePosition.ts`

## Import

```typescript
import { useMousePosition } from '../hooks';
```

## Usage

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

## Implementation Details

```typescript
const handleMouseMove = useCallback((e: React.MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  setMousePos({ x, y });
}, []);
```

The hook uses `useCallback` to memoize event handlers, preventing unnecessary re-renders when passed as props.

## Related

- [useGradientRotation](./useGradientRotation.md) - Uses this hook's output
- [MousePosition Type](../types/MousePosition.md)
