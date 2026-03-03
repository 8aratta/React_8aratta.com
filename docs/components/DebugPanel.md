# 🐛 DebugPanel

The DebugPanel is a developer-only overlay that shows you exactly what's going on under the hood. It's like those flight instruments in a cockpit — mostly for nerds, but incredibly useful when you need them.

---

## What It Does

- Displays the current **mouse position** (normalized X and Y values)
- Displays the current **rotation values** (rotationX, rotationY, rotationZ) applied to the gradient
- Can be toggled on/off via the `visible` prop

---

## Where It Lives

```
src/components/DebugPanel/
├── DebugPanel.tsx
├── DebugPanel.module.css
└── index.ts
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mousePos` | `MousePosition` | *required* | Current mouse X/Y (0-1 range) |
| `rotation` | `RotationValues` | *required* | Current gradient rotation values |
| `visible` | `boolean` | `true` | Whether to show the panel |

---

## What It Looks Like

```
┌─────────────────────┐
│  Mouse Position     │
│  X: 0.523           │
│  Y: 0.341           │
│  ─────────────────  │
│  Rotation Values    │
│  rotationX: -6.84   │
│  rotationY: 1.04    │
│  rotationZ: 46.04   │
└─────────────────────┘
```

Values are displayed with `.toFixed(3)` for mouse position and `.toFixed(2)` for rotation — enough precision to be useful without turning your screen into a spreadsheet.

---

## When To Use It

This panel is meant for development. It helps you:
- Verify mouse tracking is working correctly
- Fine-tune gradient rotation sensitivity
- Debug weird visual issues by seeing the raw numbers

When `visible` is `false`, the component returns `null` — it literally doesn't render anything. Zero overhead. A truly polite component that knows when to leave.
