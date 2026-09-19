# evanhockings.github.io

Personal website, built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions.

## Local development

```
npm install
npm run dev
```

Then open http://localhost:4321.

## Structure

- `src/pages/index.astro` — home page
- `src/data/cv.ts` — the CV: single source for the `/cv/` page and the PDFs
- `src/content/blog/*.md` — blog posts; the filename becomes the URL slug
- `public/files/` — PDFs served at `/files/...`
- `public/fonts/` — Erewhon (SIL OFL), also the font of the PDFs
- `src/styles/global.css` — all styling

## CV PDFs

`npm run cv` regenerates `public/files/cv.pdf` (everything) and `public/files/resume.pdf`
(items marked `resume: true`) from `src/data/cv.ts`, using `latex/preamble.tex` and a local
TeX Live. Commit the PDFs after editing the CV.
