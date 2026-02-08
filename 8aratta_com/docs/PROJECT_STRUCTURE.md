# Project Structure

This document outlines the folder structure and organization of the codebase.



## Directory Layout

```
src/
├── assets/                    # Static assets (images, fonts, etc.)
├── components/                # Reusable UI components
│   ├── index.ts              # Barrel export for all components
│   ├── Navigation.tsx        # Main navigation component
│   ├── DebugPanel/           # Debug overlay component
│   │   ├── index.ts
│   │   ├── DebugPanel.tsx
│   │   └── DebugPanel.module.css
│   └── GradientBackground/   # Shader gradient component
│       ├── index.ts
│       ├── GradientBackground.tsx
│       └── GradientBackground.module.css
├── constants/                 # Application constants
│   ├── index.ts              # Barrel export
│   └── gradient.ts           # Gradient configuration
├── hooks/                     # Custom React hooks
│   ├── index.ts              # Barrel export
│   ├── useMousePosition.ts   # Mouse tracking hook
│   └── useGradientRotation.ts # Rotation calculation hook
├── pages/                     # Page components (routes)
│   ├── Home/                 # Home page
│   │   ├── index.ts
│   │   ├── Home.tsx
│   │   └── Home.module.css
│   └── About/                # About page (WIP)
│       ├── About.tsx
├── types/                     # TypeScript type definitions
│   └── index.ts              # All type interfaces
├── App.tsx                    # Main application component
├── App.css                    # Global app styles
├── index.tsx                  # Application entry point
├── index.css                  # Global styles
└── custom.d.ts               # Custom TypeScript declarations
```