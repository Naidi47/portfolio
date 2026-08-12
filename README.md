# Muchukuntla Brahmanaidu — Premium Portfolio

Static multi-page portfolio ready for deployment to Vercel, Netlify, GitHub Pages, or any static web host.

## Pages

- `index.html` — About, profile, experience and education
- `projects.html` — Project showcase, filters, three-image galleries and click-to-open lightbox
- `skills.html` — Technical stack, AI/ML tools, certifications and learning areas
- `ai-assistant.html` — Frontend-only curated portfolio assistant
- `contact.html` — Contact form that opens the visitor's email client

## Assets

All local assets are stored in `resources/`. The primary profile image is served as a high-resolution 4:5 WebP with the original PNG as fallback.

Resume: `Brahmanaidu_Resume.pdf`

## Interaction behavior

- Desktop: sidebar and main portfolio content scroll independently.
- Mobile/tablet: normal single-page scrolling with the compact expandable profile header and fixed bottom navigation.
- Project cards are horizontal/16:9 and responsive. Project-card side arrows are intentionally removed.
- Clicking a project image opens the lightbox; previous/next arrows appear only inside the lightbox.
- Project galleries support dots, keyboard navigation and touch swipe.
- Project filters support `ALL`, `RAG / LLM`, `COMPUTER VISION`, `AGENTS` and `SEARCH`.
- Skills use centered wrapping cards so incomplete rows remain centered.
- Theme toggle, command palette, reveal animations and reduced-motion handling are implemented in `main.js` / `main.css`.
- The profile portrait is static; no portrait animation is applied.
- The portfolio assistant is intentionally frontend-only and does not claim to be a live AI backend.
- The contact form uses `mailto:`; deployment does not require a backend service.

## Deployment checklist

1. Upload the contents of this folder without changing relative paths.
2. Make sure `index.html` is the published root entry point.
3. Confirm `Brahmanaidu_Resume.pdf` remains at the site root.
4. Confirm the `resources/` directory is published unchanged.
5. Test every page on desktop and mobile after deployment.
6. Test the project lightbox, filters, GitHub buttons, resume, theme switcher, command palette and contact form.
7. If a custom domain is added, add the final canonical URL / Open Graph URL later; this package intentionally does not invent a domain.
