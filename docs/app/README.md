# 🚀 App & Entry Point

This is where everything starts. The entry point boots up React, and the App component wires all the pieces together.

---

## Entry Point: `index.tsx`

The very first file that runs. It does three things:

1. **Creates the React root** and renders `<App />` inside `<React.StrictMode>`
2. **Registers (or unregisters) the Service Worker** — currently set to `unregister()` (offline support is off by default)
3. **Reports Web Vitals** — performance metrics logged to the console

```tsx
ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
```

StrictMode runs extra checks during development (double-renders, deprecated API warnings) and has zero impact in production.

---

## App Component: `App.tsx`

The root component that sets up the app structure:

```tsx
<ThemeProvider>           ← Theme state available everywhere
  <Router>                ← Hash-based routing
    <Navigation />        ← Top nav bar (always visible)
    <ThemeToggle />       ← Dark/Light toggle (always visible)
    <Routes>
      / → <Home />        ← Landing page
      /about → <About />  ← About page
      /workspace → <Workspace />  ← 3D workspace
      /travel → <Travel />  ← Travel diary page
    </Routes>
  </Router>
</ThemeProvider>
```

### What's happening here:

1. **ThemeProvider** wraps everything — all components can access `useTheme()`
2. **HashRouter** provides client-side routing (hash-based for GitHub Pages compatibility)
3. **Navigation** and **ThemeToggle** are outside `<Routes>`, so they appear on every page
4. **Routes** define the four pages and their paths

---

## Service Worker

The project includes a Workbox-based service worker (`service-worker.tsx`) that can cache assets for offline use. It handles:

- **Precaching** — all build assets are cached on install
- **App Shell routing** — navigation requests fall back to `index.html`
- **Asset caching** — images, fonts, and other files use a stale-while-revalidate strategy

Currently **unregistered** by default. To enable offline support, change `serviceWorkerRegistration.unregister()` to `serviceWorkerRegistration.register()` in `index.tsx`.

---

## TypeScript Config

The project uses TypeScript with strict typing. Custom type definitions live in `src/types/index.ts` and `src/custom.d.ts`.

---

## Where These Files Live

```
src/
├── index.tsx              → App bootstrap & render
├── App.tsx                → Root component with routing
├── App.css                → Global app styles
├── index.css              → Global base styles
├── service-worker.tsx     → Workbox service worker
├── serviceWorkerRegistration.tsx → SW registration logic
├── reportWebVitals.tsx    → Performance monitoring
├── custom.d.ts            → Custom TypeScript declarations
pages/
├── Home/                  → Landing page
├── About/                 → About page
├── Workspace/             → 3D workspace page
└── Travel/                → Travel diary page
```
