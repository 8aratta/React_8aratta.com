# 🎮 ModelViewer

The ModelViewer is the heavy hitter of the component lineup. It renders 3D `.glb`/`.gltf` models right in your browser with orbit controls, lighting, and environment maps. Because 2D is so last decade.

---

## What It Does

- Loads and displays a **3D model** (GLB/GLTF format) using React Three Fiber
- Provides **orbit controls** — drag to rotate, scroll to zoom, right-click to pan
- Shows a **loading progress bar** while the model downloads
- Supports configurable **camera position, FOV, lighting, and environment presets**
- Allows **clamping** of pan and rotation to keep users from flying off into the void

---

## Where It Lives

```
src/components/ModelViewer/
├── ModelViewer.tsx
├── ModelViewer.module.css
└── index.ts
```

---

## How It Works

Under the hood, the ModelViewer is a `<Canvas>` from React Three Fiber containing:

1. **Lights** — An ambient light for base illumination and a directional light for shadows/highlights
2. **Environment** — An optional drei `<Environment>` preset (e.g., `'night'`, `'apartment'`, `'sunset'`)
3. **Model** — The actual 3D model loaded via `useGLTF()`, wrapped in `<Suspense>` with a loading fallback
4. **Controls** — `<OrbitControls>` with configurable limits, using the `useClampedControls` hook for pan boundaries

---

## Props

Here's the full menu of things you can configure:

### Main Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelPath` | `string` | *required* | Path to the .glb/.gltf file |
| `rotation` | `[x, y, z]` | `[0, 0, 0]` | Model rotation in radians |
| `environment` | `string` | `undefined` | drei Environment preset name |
| `onReady` | `() => void` | `undefined` | Callback when the Canvas is ready |
| `className` | `string` | `undefined` | Extra CSS class for the wrapper |

### Camera Config
| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `position` | `[x, y, z]` | `[4, 3, 4]` | Camera position in world space |
| `fov` | `number` | `50` | Vertical field of view in degrees |

### Controls Config
| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enablePan` | `boolean` | `true` | Allow panning |
| `enableZoom` | `boolean` | `true` | Allow zooming |
| `enableRotate` | `boolean` | `true` | Allow rotating |
| `autoRotate` | `boolean` | `false` | Auto-rotate the camera |
| `autoRotateSpeed` | `number` | `1` | How fast it spins |
| `target` | `[x, y, z]` | `[0, 0, 0]` | What the camera orbits around |
| `minDistance` / `maxDistance` | `number` | — | Zoom limits |
| `minPolarAngle` / `maxPolarAngle` | `number` | — | Vertical rotation limits (radians) |
| `minAzimuthAngle` / `maxAzimuthAngle` | `number` | — | Horizontal rotation limits (radians) |
| `panLimits` | `PanLimits` | — | Clamp the pan target within axis bounds |

### Lighting Config
| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `ambientIntensity` | `number` | `0.4` | Ambient light brightness |
| `directionalPosition` | `[x, y, z]` | `[5, 5, 5]` | Where the directional light shines from |
| `directionalIntensity` | `number` | `1` | Directional light brightness |

---

## Loading State

While the 3D model is downloading, a nice progress bar appears in the center of the canvas. The `useProgress()` hook from drei tracks the loading percentage and displays it. No staring at a blank screen wondering if something broke.

---

## Usage Example

Here's how the Workspace page uses it:

```tsx
<ModelViewer
  modelPath="/assets/models/Workspace.glb"
  camera={{ position: [45, 45, 45], fov: 50 }}
  rotation={[0, Math.PI, 0]}
  controls={{
    enablePan: true,
    enableZoom: true,
    target: [0, 10, 0],
    minDistance: 20,
    maxDistance: 80,
    panLimits: { x: [-10, 10], y: [-5, 15], z: [-10, 10] },
  }}
  environment="night"
  onReady={() => console.log('3D world is ready!')}
/>
```

---

## Internal Sub-Components

The ModelViewer uses a few internal helpers (not exported — they're shy):

- **`Model`** — Loads the GLB file and drops it into the scene
- **`Loader`** — The HTML loading progress bar overlay
- **`SceneControls`** — Wraps `<OrbitControls>` and hooks up the clamped controls

---

## Pro Tip

The `panLimits` prop + `useClampedControls` hook keeps users from panning the camera target off into deep space. It runs every frame and clamps the target position. Very thoughtful. Very responsible. 10/10 UX.
