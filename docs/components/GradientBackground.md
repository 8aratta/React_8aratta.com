# 🌊 GradientBackground

This is the gorgeous animated background you see on the Home page. It's a full-screen shader gradient that subtly reacts to your mouse movement, creating this hypnotic, fluid visual. Honestly, you could just stare at it for a while.

---

## What It Does

- Renders a **full-screen animated shader gradient** using the `@shadergradient/react` library
- Accepts **rotation values** (driven by mouse position) to make the gradient tilt and shift as you move your cursor
- Automatically switches between **dark and light color palettes** based on the current theme
- Supports custom config overrides if the defaults don't vibe with you

---

## Where It Lives

```
src/components/GradientBackground/
├── GradientBackground.tsx
└── index.ts
```

No CSS module here — the styling is inline because the gradient canvas needs to be absolutely positioned as a fullscreen backdrop.

---

## How It Works

1. Reads the current theme via `useTheme()`
2. Picks the matching gradient config (`DARK_GRADIENT_CONFIG` or `LIGHT_GRADIENT_CONFIG`)
3. Merges any custom config passed via props
4. Renders a `<ShaderGradientCanvas>` with a `<ShaderGradient>` inside it
5. The `rotation` prop (coming from mouse tracking) makes the gradient move in real-time

---

## Props

| Prop | Type | Description |
|------|------|-------------|
| `rotation` | `RotationValues` | Current X/Y/Z rotation (driven by mouse position) |
| `config` | `Partial<GradientConfig>` | Optional overrides for colors, animation, camera settings |

---

## Gradient Configs

There are two preset configurations defined in `constants/gradient.ts`:

**Dark Theme** — Moody grays and blacks. Like a rainy evening.
- Colors: `#888888`, `#555555`, `#000000`

**Light Theme** — Bright whites and soft grays. Like a cloudy morning.
- Colors: `#ffffff`, `#dddddd`, `#8f8f8f`

Both use the same animation settings (speed, density, strength) and camera angles. The gradient type is `'waterPlane'`, which gives it that liquid, flowing feel.

---

## The Cool Part

The gradient doesn't just sit there looking pretty — it **reacts to your mouse**. As you move the cursor across the page, the rotation values change, and the gradient shifts accordingly. It's subtle enough to be mesmerizing without being distracting. The perfect background flex.

The mouse → rotation pipeline:
```
Mouse position → useMousePosition → useGradientRotation → GradientBackground rotation prop
```

---

## Performance Note

The shader runs on the GPU, so it's buttery smooth. The `pointerEvents='none'` prop ensures it doesn't interfere with clicking on actual content. It's literally just there to look pretty and not get in the way. The ideal coworker.
