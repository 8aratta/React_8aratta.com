# 🔄 useGradientRotation

This hook takes a mouse position and turns it into rotation values for the gradient background. It's basically a translator: "Your mouse is here → the gradient should tilt like this."

---

## What It Does

- Takes the current `mousePos` (from `useMousePosition`) and a `baseRotation`
- Calculates offset from center (0.5, 0.5)
- Applies sensitivity multipliers to produce `rotationX`, `rotationY`, and `rotationZ`
- Memoizes the result so it only recalculates when inputs change

---

## Where It Lives

```
src/hooks/useGradientRotation.ts
```

---

## How To Use

```tsx
const rotation = useGradientRotation({
  mousePos,
  baseRotation: { rotationX: 0, rotationY: 0, rotationZ: 45 },
});

return <GradientBackground rotation={rotation} />;
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `mousePos` | `MousePosition` | Current mouse `{ x, y }` (0-1 range) |
| `baseRotation` | `RotationValues` | Starting rotation before mouse influence |

---

## Returns

| Type | Description |
|------|-------------|
| `RotationValues` | Object with `rotationX`, `rotationY`, `rotationZ` |

---

## The Math

The calculation is refreshingly simple:

```
offsetX = mousePos.x - 0.5    // -0.5 to +0.5
offsetY = mousePos.y - 0.5    // -0.5 to +0.5

rotationX = baseRotation.X + offsetY × sensitivity.X    // vertical mouse → X rotation
rotationY = baseRotation.Y + offsetX × sensitivity.Y    // horizontal mouse → Y rotation
rotationZ = baseRotation.Z + offsetX × sensitivity.Z    // horizontal mouse → Z rotation
```

The sensitivity values (from `MOUSE_SENSITIVITY` in constants) are:
- `rotationX`: **-45** (inverted so moving mouse down tilts gradient up — feels natural)
- `rotationY`: **45**
- `rotationZ`: **45**

So at maximum offset (mouse at edge), the gradient rotates up to ±22.5° from its base rotation. Enough to feel responsive without going full roller coaster.

---

## Why useMemo?

The rotation is wrapped in `useMemo` keyed on `mousePos` and `baseRotation`. This means it only recalculates when the mouse actually moves or the base config changes — not on every random re-render. Performance-conscious. We love to see it.
