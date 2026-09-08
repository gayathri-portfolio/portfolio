# Gayathri V — Portfolio

React + TypeScript + Vite, styled with Tailwind CSS v4, animated with Framer Motion,
with an accessible FAQ accordion (Radix) and a light/dark theme toggle whose sun↔moon
icon morph was pulled from the 21st.dev registry.

## Run it

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
```

Outputs a static site to `dist/` — deploy it as-is to Vercel, Netlify, GitHub Pages,
or any static host. No server/backend required.

## Swap in the real photo

The hero currently shows a placeholder portrait (a generic silhouette in a soft blob
frame with a paw badge). To use the real photo of Gayathri with her cat:

1. Drop the photo into `src/assets/` (e.g. `hero.jpg`).
2. Open `src/components/HeroPortrait.tsx` and replace the placeholder `<svg>` block
   with an `<img src={heroPhoto} className="h-full w-full object-cover" />`.

## Case studies

Case study copy and structure live in `src/data/ultragymPro.ts` and
`src/data/ultragymUxStudy.ts` as arrays of typed content blocks (paragraph, callout,
quote, before/after, image, etc. — see `src/data/caseStudyTypes.ts`). Edit the data,
not the layout, to change copy. `src/components/CaseStudyLayout.tsx` renders any
case study that follows this shape, so adding a third case study is just:

1. Add a new `CaseStudyContent` object in `src/data/`.
2. Add a route in `src/App.tsx`.
3. Add it to `caseStudies` in `src/data/projects.ts` so it shows on the homepage.

The UltraGym Pro exhibits (`public/case-studies/ultragym-pro/*.webp`) were rendered
from `UltraGym_Pro.pdf` via `scripts/render-pdf.mjs` + `scripts/optimize-images.mjs`
(WASM PDF rendering via `mupdf`, no external binaries needed) — rerun those if the
source PDF changes.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, light/dark tokens in `src/index.css`)
- Framer Motion (scroll reveals, page/section transitions, the theme toggle icon)
- React Router (client-side routing for the two case study pages)
- Radix UI primitive for the FAQ accordion (`@radix-ui/react-accordion`)
- Self-hosted variable fonts via `@fontsource-variable/*` (Bricolage Grotesque, Fraunces, Inter)
