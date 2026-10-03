# Gayathri V — Portfolio

React + TypeScript + Vite, styled with Tailwind CSS v4 and animated with Framer Motion.
Case studies use a pinned scroll deck; the FAQ accordion uses Radix; the light/dark theme
toggle icon morph was pulled from the 21st.dev registry.

## Run it locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `dist/`. The build uses the base path `/` (set in
`vite.config.ts`), so the site expects to be served from a domain root.

## Deploy to GitHub Pages

Deploys happen automatically from `.github/workflows/deploy.yml` on every push to `main`.

One-time setup in the repository:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

The site is served from the custom domain set under **Settings → Pages → Custom domain**.
If the site is ever served from a subpath such as `https://<username>.github.io/portfolio/`,
set `base` in `vite.config.ts` to `'/portfolio/'` instead.

## Case studies

Case study copy and structure live in `src/data/ultragymPro.ts` and
`src/data/ultragymUxStudy.ts` as arrays of typed content blocks (paragraph, callout,
quote, before/after, image, etc. — see `src/data/caseStudyTypes.ts`). Edit the data,
not the layout, to change copy. `src/components/CaseStudyLayout.tsx` renders any
case study that follows this shape. To add another:

1. Add a new `CaseStudyContent` object in `src/data/`.
2. Add a route in `src/App.tsx`.
3. Add it to `caseStudies` in `src/data/projects.ts` so it shows on the homepage.

Images in `public/` must be referenced through `import.meta.env.BASE_URL` (as the
existing data files do) so they still resolve under the configured base path.

The UltraGym Pro exhibits (`public/case-studies/ultragym-pro/*.webp`) were rendered
from `UltraGym_Pro.pdf` via `scripts/render-pdf.mjs` and `scripts/optimize-images.mjs`
(WASM PDF rendering via `mupdf`, no external binaries needed). Rerun those if the
source PDF changes.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, light/dark tokens in `src/index.css`)
- Framer Motion (scroll reveals, case study deck, theme toggle icon)
- React Router (client-side routing, with `404.html` handling direct visits on Pages)
- Radix UI primitive for the FAQ accordion (`@radix-ui/react-accordion`)
- Self-hosted variable fonts via `@fontsource-variable/*` (Bricolage Grotesque, Fraunces, Inter)
