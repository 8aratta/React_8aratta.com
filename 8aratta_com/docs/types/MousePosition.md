# MousePosition

Represents a normalized mouse position within an element.

## Location

`src/types/index.ts`

## Definition

```typescript
interface MousePosition {
  x: number;  // 0-1, where 0 = left edge, 1 = right edge
  y: number;  // 0-1, where 0 = top edge, 1 = bottom edge
}
```

## Properties

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| `x` | `number` | 0 - 1 | Horizontal position (0 = left, 1 = right) |
| `y` | `number` | 0 - 1 | Vertical position (0 = top, 1 = bottom) |

## Usage

```typescript
import { MousePosition } from '../types';

const center: MousePosition = { x: 0.5, y: 0.5 };
const topLeft: MousePosition = { x: 0, y: 0 };
const bottomRight: MousePosition = { x: 1, y: 1 };
```

## Visual Representation

```
     x=0         x=0.5        x=1
      │            │            │
y=0 ──┼────────────┼────────────┼── top
      │            │            │
      │    (0,0)   │  (0.5,0)   │  (1,0)
      │            │            │
y=0.5 ┼────────────●────────────┼── middle
      │            │            │
      │   (0,0.5)  │  CENTER    │  (1,0.5)
      │            │            │
y=1 ──┼────────────┼────────────┼── bottom
      │            │            │
      │    (0,1)   │  (0.5,1)   │  (1,1)
```

## Related

- [useMousePosition](../hooks/useMousePosition.md) - Hook that returns this type
- [useGradientRotation](../hooks/useGradientRotation.md) - Consumes this type
