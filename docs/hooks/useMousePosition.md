# 🖱️ useMousePosition

This hook tracks your mouse position within an element and returns smooth, normalized coordinates. It's the first step in the "make the gradient follow your cursor" pipeline.

---

## What It Does

- Tracks mouse position within the target element
- Normalizes coordinates to a **0 to 1 range** (where `0.5, 0.5` is the center)
- Applies **smooth interpolation** (lerp) so the values glide instead of jumping
- Returns to center (`0.5, 0.5`) when the mouse leaves the element

---

## Where It Lives

```
src/hooks/useMousePosition.ts
```

---

## How To Use

```tsx
const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(0.1);

return (
  <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
    {/* mousePos.x and mousePos.y are smooth 0-1 values */}
  </div>
);
```

---

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `smoothing` | `number` | `0.1` | Interpolation factor (0.1 = silky smooth, 1.0 = instant snap) |

---

## Returns

| Property | Type | Description |
|----------|------|-------------|
| `mousePos` | `MousePosition` | Current smoothed `{ x, y }` values (0 to 1) |
| `handleMouseMove` | `(e: React.MouseEvent) => void` | Attach to `onMouseMove` |
| `handleMouseLeave` | `() => void` | Attach to `onMouseLeave` |

---

## How The Smoothing Works

Instead of jumping directly to the mouse position, the hook uses **linear interpolation (lerp)** running on `requestAnimationFrame`:

```
newPosition = currentPosition + (target - currentPosition) × smoothing
```

With `smoothing = 0.1`, it moves 10% closer to the target each frame. This creates that satisfying, floaty feel where the gradient lazily follows your cursor.

When the difference becomes tiny (< 0.001), it snaps to the target to avoid infinite micro-animations. Efficient *and* smooth.

---

## What Happens When The Mouse Leaves

The target position resets to `(0.5, 0.5)` — dead center. The smoothing kicks in and the values gracefully slide back to neutral. No jarring snaps. Very zen.

---

## Cleanup

The `requestAnimationFrame` loop is properly cleaned up on unmount via `cancelAnimationFrame`. No ghost animations haunting your browser. 👻
