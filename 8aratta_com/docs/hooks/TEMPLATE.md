# Hook Documentation Template

Use this template when documenting new hooks.

---

# useHookName

Brief one-line description of what the hook does.

## Location

`src/hooks/useHookName.ts`

## Import

```typescript
import { useHookName } from '../hooks';
```

## Usage

```tsx
function MyComponent() {
  const result = useHookName(options);
  
  return <div>{/* ... */}</div>;
}
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `param1` | `string` | Yes | - | Description |
| `param2` | `number` | No | `0` | Description |

## Returns

| Property | Type | Description |
|----------|------|-------------|
| `value` | `T` | Description |
| `handler` | `() => void` | Description |

## How It Works

Explain the internal logic and any important implementation details.

## Performance Considerations

Note any memoization, when re-renders occur, etc.

## Related

- [RelatedHook](./RelatedHook.md)
- [RelatedComponent](../components/RelatedComponent.md)
