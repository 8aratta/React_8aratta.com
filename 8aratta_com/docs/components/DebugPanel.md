# DebugPanel

A development overlay that displays mouse position and rotation values for debugging.

## Location

`src/components/DebugPanel/`

## Import

```typescript
import { DebugPanel } from '../components';
```

## Usage

```tsx
import { DebugPanel } from '../components';
import { useMousePosition, useGradientRotation } from '../hooks';

function MyPage() {
  const { mousePos } = useMousePosition();
  const rotation = useGradientRotation({ mousePos, baseRotation });

  return (
    <div>
      <DebugPanel 
        mousePos={mousePos}
        rotation={rotation}
        visible={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `mousePos` | `MousePosition` | Yes | - | Current mouse position (0-1 normalized) |
| `rotation` | `RotationValues` | Yes | - | Current rotation values |
| `visible` | `boolean` | No | `true` | Toggle panel visibility |

## Display

The panel shows:

```
┌─────────────────────┐
│ Mouse Position      │
│ X: 0.500            │
│ Y: 0.500            │
│ ─────────────────── │
│ Rotation Values     │
│ rotationX: 45.00    │
│ rotationY: -45.00   │
│ rotationZ: 45.00    │
└─────────────────────┘
```

## Styling

The component uses CSS Modules:

```css
/* DebugPanel.module.css */
.panel {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
}
```

## Best Practices

### Hide in Production

```tsx
<DebugPanel 
  mousePos={mousePos}
  rotation={rotation}
  visible={process.env.NODE_ENV === 'development'}
/>
```

### Conditional Rendering

```tsx
{showDebug && (
  <DebugPanel mousePos={mousePos} rotation={rotation} />
)}
```

### Toggle with Keyboard

```tsx
function MyPage() {
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' && e.ctrlKey) {
        setShowDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <DebugPanel visible={showDebug} /* ... */ />;
}
```

## Related

- [useMousePosition](../hooks/useMousePosition.md)
- [useGradientRotation](../hooks/useGradientRotation.md)
- [MousePosition Type](../types/MousePosition.md)
- [RotationValues Type](../types/RotationValues.md)
