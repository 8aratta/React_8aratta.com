# 🛠️ Workspace Page

The Workspace page is where things get three-dimensional — literally. It features a full-screen 3D model viewer showing Domenico's workspace (or at least a digital model of it). Currently a work-in-progress, but already pretty cool.

---

## What You See

- A **full-screen 3D scene** rendering a GLB model of a workspace
- **Orbit controls** — drag to rotate, scroll to zoom, right-click/two-finger to pan
- A **hint overlay** that appears once the model has loaded: *"Drag to rotate · Scroll to zoom"*
- A note that it's still a preview (honesty is the best policy)

---

## Where It Lives

```
src/pages/Workspace/
├── Workspace.tsx
└── Workspace.module.css
```

---

## How It Works

The page uses the `ModelViewer` component with the following configuration:

| Setting | Value | Why |
|---------|-------|-----|
| **Model** | `Workspace.glb` from public assets | The actual 3D model |
| **Camera position** | `[45, 45, 45]` | Starts with a nice isometric-ish view |
| **Model rotation** | `[0, π, 0]` | Rotated 180° so the front faces the camera |
| **Orbit target** | `[0, 10, 0]` | Camera orbits around a point above the floor |
| **Zoom range** | 20 to 80 | Close enough to see details, far enough for overview |
| **Pan limits** | X: ±10, Y: -5 to 15, Z: ±10 | Keeps the camera from wandering off |
| **Vertical rotation** | 30° to 90° | Can't look from directly above or below |
| **Horizontal rotation** | ~-7° to 90° | Restricted to a natural viewing arc |
| **Environment** | `'night'` (dark) / `'apartment'` (light) | Lighting preset changes with theme |

---

## Loading State

While the 3D model downloads (these can be hefty files), the ModelViewer shows a progress bar. Once loaded, the `onReady` callback fires and the hint overlay fades in.

---

## The Hint Overlay

After the model loads, a subtle overlay appears at the bottom:

```
Drag to rotate · Scroll to zoom
This is just a preview im still modelling
```

Helpful for first-time visitors who might not realize they can interact with the scene. And refreshingly honest about the model being a work in progress. We respect that.

---

## Theme Awareness

The 3D environment preset changes based on the theme:
- **Dark mode** → `'night'` environment (moody, atmospheric lighting)
- **Light mode** → `'apartment'` environment (bright, neutral lighting)

The surrounding page styles also adapt via `data-theme`.

---

## Controls Summary

| Action | Desktop | Trackpad |
|--------|---------|----------|
| **Rotate** | Left-click drag | One-finger drag |
| **Zoom** | Scroll wheel | Pinch |
| **Pan** | Right-click drag | Two-finger drag |

All within the configured limits — you can't break it even if you try. Go ahead, we dare you.
