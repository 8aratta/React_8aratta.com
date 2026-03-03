# 🏠 Home Page

The Home page is the landing page — the first thing visitors see. It's designed to make a strong impression with a gorgeous animated gradient background and a clean hero section.

---

## What You See

- **Animated shader gradient background** that reacts to your mouse movement (smooth and hypnotic)
- **Enso circle** — a calligraphic background image adding a Japanese artistic touch
- **Hero image** — a photo of Domenico Baratta
- **Hero text** — Name ("Baratta Domenico") and title ("Developer")

---

## Where It Lives

```
src/pages/Home/
├── Home.tsx
└── Home.module.css
```

---

## How It Works

1. `useMousePosition(MOUSE_SMOOTHING)` tracks the cursor with smooth interpolation
2. `useGradientRotation()` converts mouse position into rotation values
3. `<GradientBackground>` renders the animated shader gradient with those rotation values
4. The hero section floats on top with the portrait and name

The whole page container listens for `onMouseMove` and `onMouseLeave` to feed the mouse tracking hook.

---

## Layout

```
┌──────────────────────────────────────┐
│          [Animated Gradient]         │  ← fullscreen background
│                                      │
│            ╭─────────╮               │
│            │  Ensō   │               │  ← decorative background circle
│            │  [Photo]│               │  ← hero portrait
│            ╰─────────╯               │
│                                      │
│         Baratta  Domenico            │  ← hero name
│            Developer                 │  ← subtitle
│                                      │
└──────────────────────────────────────┘
```

---

## The Name Display

The name is displayed as:

```
Barat t a        ← "Baratta" with a special spaced "t" for typographic flair
Domenico
```

There's a `spacedT` CSS class that adds extra letter-spacing to the "t" in "Baratta" — a subtle design detail that gives the typography character.

---

## Theme Awareness

- The `data-theme` attribute is set on the container
- The gradient switches between dark and light color palettes automatically
- Background images and text colors adapt accordingly

---

## The Gradient Experience

Move your mouse around the page. See how the background subtly shifts? That's the full pipeline in action:

```
🖱️ Mouse move → useMousePosition → useGradientRotation → GradientBackground
```

Leave the page area, and the gradient smoothly returns to its neutral position. It's like the page is breathing.
