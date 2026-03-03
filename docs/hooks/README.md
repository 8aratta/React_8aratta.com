# 🪝 Hooks

Custom React hooks — the unsung heroes of this codebase. They handle all the behind-the-scenes logic so the components can stay clean and focused on looking pretty.

All hooks are exported from a central `index.ts`:

```tsx
import { useMousePosition, useGradientRotation, useClampedControls } from './hooks';
```

---

## The Hook Squad

| Hook | What It Does | Used By |
|------|-------------|---------|
| **[useMousePosition](./useMousePosition.md)** | Tracks and smoothly interpolates mouse position | Home page |
| **[useGradientRotation](./useGradientRotation.md)** | Converts mouse position into gradient rotation | Home page |
| **[useClampedControls](./useClampedControls.md)** | Clamps 3D camera pan within boundaries | ModelViewer |

---

## The Data Flow

Here's how the hooks work together on the Home page:

```
User moves mouse
       ↓
useMousePosition()  →  smooth { x, y } values (0 to 1)
       ↓
useGradientRotation()  →  { rotationX, rotationY, rotationZ }
       ↓
<GradientBackground rotation={...} />
       ↓
✨ Pretty animated gradient ✨
```

And in the Workspace (ModelViewer):

```
User pans the 3D camera
       ↓
useClampedControls()  →  clamps target.x/y/z within limits
       ↓
Camera stays within bounds
       ↓
🎯 User can't yeet the camera into space
```
