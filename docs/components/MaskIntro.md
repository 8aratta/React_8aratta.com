# MaskIntro

MaskIntro is your animated portal into the site. Instead of a boring fade, you get a dramatic fly-through — the page is hidden behind a mask (any image you want), and you burst through it like you’re entering a secret club. The mask can be your logo, a shape, a squiggle, or a smiley face. You pick.

---

## What It Does

- Covers the whole page with a solid color and a custom-shaped hole (from your PNG)
- Animates the mask flying toward you, so it feels like you’re zooming through the logo
- Hides everything until the animation is done — no peeking!
- Works with any color and any mask image
- Lets you run code before and after the animation (for sound effects, confetti, or whatever)

---

## Where It Lives

```
src/components/MaskIntro/
├── MaskIntro.tsx         ← the magic
├── ...                   ← (no config needed, just use it)
```

---

## How It’s Used

You drop it at the top of your page, pass in your favorite PNG, and let it do its thing:

```jsx
<MaskIntro
  onComplete={() => setIntroDone(true)}
  beforeStart={() => console.log('Ready for liftoff!')}
  backgroundColor="#fff"
  mask="/assets/images/logo.png"
  logoScale={0.3} // optional, makes the hole smaller or bigger
/>
```

- **onComplete** — fires when the animation is done (show your page now)
- **beforeStart** — fires right before the animation starts (play a sound?)
- **backgroundColor** — any color you want (black, white, hot pink)
- **mask** — path to your PNG (transparent part = hole)
- **logoScale** — optional, controls how big the hole is (default: 0.3)

---

## The Vibe

- The mask is solid at first, so nobody sees your page until you say so
- The hole can be any shape — logo, blob, text, whatever
- The animation is a swoop, not a fade — feels like you’re flying through a portal
- Works on any screen size, ultrawide or phone
- You can sync other effects (music, confetti, etc.) with the callbacks

---

## Tips & Tricks

- Use a PNG with transparency for the mask — the transparent part is the hole
- Want a tiny hole? Set `logoScale={0.15}`. Want a big reveal? Try `logoScale={0.5}`
- The background color can match your brand, or just be wild
- You can use it for splash screens, page transitions, or just to show off

---

MaskIntro is for creative entrances, like mine lul