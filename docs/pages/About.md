# 📖 About Page

The About page tells the story of 8aratta — what it is, why it exists, and where the name comes from. It's a scroll-snapping narrative experience with reveal animations. Think of it as a visual storytelling page.

---

## What You See

The page is divided into **5 snap-scroll sections**, each revealing a piece of the story:

### Section 1: Hero
- Large logo and title: **"About 8aratta"**
- Subtitle: *"Personal Label · Portfolio · Creative Outlet"*
- Parallax background with the Ensō circle
- Scroll indicator at the bottom prompting you to keep going

### Section 2: What Is 8aratta
- Explains that 8aratta is a personal label / unofficial brand
- Text slides in from the left as you scroll

### Section 3: Purpose
- Describes the site as a portfolio, blog, and creative outlet
- Notes that it's "still evolving, still being shaped, and still in progress"
- Content appears within a styled border

### Section 4: Identity & Name Origin
- Shows the name transformation: **Baratta → 8aratta**
- Explains the "B" to "8" substitution
- Slides in from the right

### Section 5: Why 8?
- Answers the big question: why the number eight?
- Reveals fun coincidences:
  - **8 letters** in "Domenico"
  - **August 8th** is St. Dominic's Day (8/8)
- But ultimately: it just felt right ¯\\\_(ツ)\_/¯

---

## Where It Lives

```
src/pages/About/
├── About.tsx
└── About.module.css
```

---

## Cool Features

### Snap Scrolling
The page uses CSS scroll-snap to create section-by-section navigation. Each section takes up the full viewport, and scrolling snaps cleanly from one to the next.

### Scroll Reveal Animations
A custom `useScrollReveal` hook (defined within the About component) uses `IntersectionObserver` to detect when sections enter the viewport. When they do, a `.visible` CSS class is applied, triggering CSS animations like fade-in and slide.

Each section only reveals **once** — the observer disconnects after the first intersection. No repeated animations on scroll-back.

### Parallax Hero Background
As you scroll down from the hero section, the gradient background shifts at 30% of the scroll speed, creating a subtle parallax depth effect. It's a small detail, but it makes the hero feel more immersive.

---

## Theme Awareness

- Logo switches between dark and light versions
- `data-theme` attribute drives color scheme changes throughout all sections
- The Ensō background and text colors adapt automatically

---

## The Name Transformation Visual

```
Baratta  →  8aratta
```

This is presented as an animated visual element with the original name, an arrow, and the stylized name where the "8" is highlighted with an accent style. Simple but effective storytelling.
