# 🔒 useClampedControls

This hook keeps the 3D camera under control (literally). It runs every frame and clamps the orbit controls' pan target within specified boundaries so users can't accidentally pan the camera into the abyss.

---

## What It Does

- Returns a `ref` to attach to `<OrbitControls>`
- Every frame, checks the controls' target position (where the camera is looking)
- Clamps X, Y, and Z within the provided min/max bounds
- If no limits are provided, it does nothing — no unnecessary restrictions

---

## Where It Lives

```
src/hooks/useClampedControls.ts
```

---

## How To Use

```tsx
const controlsRef = useClampedControls({
  x: [-10, 10],
  y: [-5, 15],
  z: [-10, 10],
});

return <OrbitControls ref={controlsRef} enablePan />;
```

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limits` | `PanLimits` (optional) | Axis bounds for X, Y, and Z |

### PanLimits Type

```ts
interface PanLimits {
  x?: [min: number, max: number];
  y?: [min: number, max: number];
  z?: [min: number, max: number];
}
```

Each axis is optional — you can clamp only the axes you care about.

---

## Returns

| Type | Description |
|------|-------------|
| `React.RefObject` | A ref to attach to your `<OrbitControls>` component |

---

## How It Works

The hook uses `useFrame()` from React Three Fiber, which runs a callback **every render frame** (typically 60fps). Each frame:

1. Check if the controls ref exists and limits are defined
2. Read the current `target` position (a Three.js Vector3)
3. Clamp each axis: `Math.max(min, Math.min(max, currentValue))`
4. The controls automatically pick up the clamped values

It's like invisible walls around the 3D scene. The user can pan freely within the bounds, but the moment they try to go further — nope. Clamped.

---

## Why Every Frame?

OrbitControls updates the target position continuously as the user drags. If you only clamped once, the user could drag past the limits before the next check. Running every frame ensures the boundaries are enforced smoothly and immediately. No escape.

---

## Used By

The ModelViewer component passes `panLimits` through to this hook internally. End users of ModelViewer just set the limits in the `controls` prop and everything is handled behind the scenes.
