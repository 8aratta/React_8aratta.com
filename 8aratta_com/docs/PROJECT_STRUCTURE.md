# Project Structure

This document outlines the folder structure and organization of the codebase.



## Directory Layout

```
public/
├── assets/                    # Static assets (images, fonts, etc.)
│   ├── fonts/                # Custom fonts
│   │   └── Resoft.ttf       # Primary brand font
│   └── images/               # Image files
│       ├── Me.png           # Hero image
│       ├── enso.png         # Enso circle background
│       ├── Home_Light.gif   # Home Page Gif in light mode used in about page (dark mode)
│       ├── Home_Dark.gif    # Home Page Gif in dark mode used in about page (light mode)
│       ├── logo.png         # Logo (light theme)
│       └── logo_white.png   # Logo (dark theme)
├── CNAME
├── index.html
├── manifest.json
└── robots.txt

src/
├── components/                # Reusable UI components
│   ├── index.ts              # Barrel export for all components
│   ├── Navigation/           # Main navigation component
│   │   ├── index.ts
│   │   ├── Navigation.tsx
│   │   └── Navigation.module.css
│   ├── ThemeToggle/          # Theme switcher button component
│   │   ├── index.ts
│   │   ├── ThemeToggle.tsx
│   │   └── ThemeToggle.module.css
│   ├── DebugPanel/           # Debug overlay component
│   │   ├── index.ts
│   │   ├── DebugPanel.tsx
│   │   └── DebugPanel.module.css
│   ├── GradientBackground/   # Shader gradient component
│   │   ├── index.ts
│   │   ├── GradientBackground.tsx
│   │   └── GradientBackground.module.css
│   │
│   └── Timeline/             # Reusable timeline component
│       ├── index.ts
│       ├── Timeline.tsx              # Container with snap scroll
│       ├── TimelineSection.tsx       # Parent node (snap checkpoint)
│       ├── TimelineEntry.tsx         # Child node (content block)
│       ├── TimelineNode.tsx          # Circle visual
│       ├── TimelineConnector.tsx     # Straight line / SVG curve between sections
│       ├── useSnapScroll.ts          # Wheel-based section snapping
│       ├── useTimelineScroll.ts      # Active entry tracking per section
│       ├── Timeline.module.css       # All styles + orientation variants
│       └── types.ts                  # Shared type interfaces
├── constants/                 # Application constants
│   ├── index.ts              # Barrel export
│   └── gradient.ts           # Gradient configuration (dark/light themes)
├── contexts/                  # React Context providers
│   ├── index.ts              # Barrel export
│   └── ThemeContext.tsx      # Theme state management
├── hooks/                     # Custom React hooks
│   ├── index.ts              # Barrel export
│   ├── useMousePosition.ts   # Mouse tracking hook with smoothing
│   └── useGradientRotation.ts # Rotation calculation hook
├── pages/                     # Page components (routes)
│   ├── Home/                 # Home page with hero section
│   │   ├── index.ts
│   │   ├── Home.tsx
│   │   └── Home.module.css   # Includes animations & responsive design
│   └── About/                # About page
│       ├── index.ts
│       ├── About.tsx         # Timeline-driven About page with theme-aware styling
│       └── About.module.css  # Card-like content, theme-aware headings, responsive
├── types/                     # TypeScript type definitions
│   └── index.ts              # All type interfaces
├── App.tsx                    # Main application component (wrapped with ThemeProvider)
├── App.css                    # Global app styles
├── index.tsx                  # Application entry point
├── index.css                  # Global styles
└── custom.d.ts               # Custom TypeScript declarations
```

## Documentation Structure

```
docs/
├── PROJECT_STRUCTURE.md      # This file - overall project layout
├── GitHubPages.md            # Deployment documentation
├── components/               # Component documentation
│   ├── Navigation.md         # Navigation with clock, logo & theme toggle
│   ├── ThemeToggle.md        # Responsive theme toggle button
│   ├── GradientBackground.md # Shader gradient background
│   ├── DebugPanel.md        # Debug overlay component
│   └── Timeline.md          # Timeline with snap scroll & orientation support
├── contexts/                 # Context documentation
│   └── ThemeContext.md      # Theme state management
├── pages/                    # Page documentation
│   ├── Home.md              # Home page with animations & theme support
│   └── About.md             # About page with gradient background
├── hooks/                    # Custom hooks documentation
│   ├── TEMPLATE.md          # Template for new hook docs
│   ├── useMousePosition.md  # Mouse tracking with smooth interpolation
│   ├── useGradientRotation.md # Rotation calculation hook
│   ├── useActiveEntry.md    # Active entry tracking inside a TimelineSection
│   └── useSnapScroll.md     # Wheel-based snap scrolling between sections
├── types/                    # Type definitions documentation
│   ├── GradientConfig.md    # Gradient configuration types
│   ├── MousePosition.md     # Mouse position types
│   └── RotationValues.md    # Rotation value types
└── constants/                # Constants documentation
    └── gradient.md          # Gradient configs (dark/light themes) & mouse settings
```