# ⚙️ Constants

This is where all the magic numbers and configuration values live. Instead of scattering random numbers throughout the codebase, they're collected here so you can tweak things from one place. Organized chaos > actual chaos.

---

## Available Configs

| File | What It Contains |
|------|-----------------|
| **[gradient.ts](./gradient.md)** | Gradient color schemes, animation settings, mouse sensitivity, and smoothing |

---

## Barrel Export

All constants are re-exported from `index.ts`:

```tsx
import { 
  DEFAULT_GRADIENT_CONFIG,
  DARK_GRADIENT_CONFIG,
  LIGHT_GRADIENT_CONFIG,
  MOUSE_SENSITIVITY,
  MOUSE_SMOOTHING 
} from './constants';
```
