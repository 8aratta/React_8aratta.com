# 🎨 Gradient Configuration

This file is the control center for the animated shader gradient and mouse interaction. Want different colors? Change them here. Want the gradient to be more reactive to your mouse? Tweak a number. It's like a settings panel but in code form.

---

## Where It Lives

```
src/constants/gradient.ts
```

---

## Gradient Configs

There are two theme-specific gradient configurations:

### DARK_GRADIENT_CONFIG 🌑

The moody one. Used when dark theme is active.

| Setting | Value |
|---------|-------|
| **Colors** | `#888888`, `#555555`, `#000000` |
| **Base rotation** | X: 0°, Y: 0°, Z: 45° |
| **Animation speed** | 0.3 |
| **Animation density** | 5 |
| **Animation strength** | 0.8 |
| **Camera azimuth** | 180° |
| **Camera polar angle** | 90° |
| **Camera distance** | 1 |
| **Camera zoom** | 8 |

### LIGHT_GRADIENT_CONFIG ☀️

The bright one. Used when light theme is active.

| Setting | Value |
|---------|-------|
| **Colors** | `#ffffff`, `#dddddd`, `#8f8f8f` |
| **Base rotation** | X: 0°, Y: 0°, Z: 45° |
| **Animation speed** | 0.3 |
| **Animation density** | 5 |
| **Animation strength** | 0.8 |
| **Camera azimuth** | 180° |
| **Camera polar angle** | 90° |
| **Camera distance** | 1 |
| **Camera zoom** | 8 |

Both configs share the same animation and camera settings — only the colors differ. The dark theme uses grays-to-black, while the light theme uses whites-to-gray.

### DEFAULT_GRADIENT_CONFIG

This is just an alias for `DARK_GRADIENT_CONFIG`. Used as the default when no theme preference is specified.

---

## Mouse Sensitivity

Controls how much the gradient rotates in response to mouse movement:

```ts
MOUSE_SENSITIVITY = {
  rotationX: -45,   // vertical mouse movement → X rotation (negative = inverted)
  rotationY: 45,    // horizontal mouse → Y rotation
  rotationZ: 45,    // horizontal mouse → Z rotation
}
```

Higher numbers = more reactive. The negative on `rotationX` means moving the mouse down tilts the gradient up, which feels more intuitive (like tilting a physical surface).

---

## Mouse Smoothing

```ts
MOUSE_SMOOTHING = 0.1
```

This controls the interpolation speed in `useMousePosition`:
- **0.1** = smooth and floaty (current setting — very zen)
- **0.5** = responsive but still soft
- **1.0** = instant snap (no smoothing at all)

Think of it as: "each frame, move 10% closer to where the mouse actually is." Lower = lazier follow. Higher = snappier follow.

---

## Tuning Tips

Want to experiment? Here's a quick guide:

| I want... | Change this |
|-----------|------------|
| Different gradient colors | `colors` in the gradient configs |
| Faster/slower animation | `animation.speed` |
| More/less wavy | `animation.density` and `animation.strength` |
| More reactive to mouse | Increase `MOUSE_SENSITIVITY` values |
| Smoother mouse follow | Decrease `MOUSE_SMOOTHING` (closer to 0) |
| Snappier mouse follow | Increase `MOUSE_SMOOTHING` (closer to 1) |
