# Studio Cerebrum — Landing Page

A single-page, static landing page. Plain HTML + CSS + vanilla JS — **no frameworks, no build step**.
Concept: *"a studio as a slow gallery."* A centred statement and a large slideshow of works.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works (or just open `index.html`).

## Files

```
index.html     # the page (hero, slideshow, themes, colophon — single scroll)
styles.css     # three colours only: #000 ink / #fff paper / #d5e8dc sage
script.js      # slideshow (black-curtain transition) + corner mark; respects prefers-reduced-motion
.nojekyll      # disables Jekyll on GitHub Pages
assets/        # wordmark + three work images
```

## Contact (live in the footer)

- Address: Tokyo
- Enquiries: info.studiocerebrum@gmail.com
- Instagram: [@studio_cerebrum](https://www.instagram.com/studio_cerebrum/)

## Custom domain (GitHub Pages + Onamae.com)

Add a `CNAME` file in the repo root containing only your apex domain (one line, no
`https://`, no trailing slash), then point DNS at GitHub. Full step-by-step is in the
build doc and was provided at hand-off.

## Notes for the owner

- The slideshow image filenames and their captions: `work-zine.jpg` holds the **Prato textile**
  case-study spread and `work-prato.jpg` holds the **foam-nets zine** — i.e. their contents are
  swapped relative to the filenames. The page maps each caption to the file whose picture actually
  matches it, so on screen everything is correct. Rename the files + `src` attributes together if
  you want the names to match.
- The wordmark was scanned on kraft paper, so it carries a faint warm-grey background against the
  white page. This is left as-is to preserve the hand-made signature. For a clean knockout, supply a
  transparent PNG named `assets/wordmark.png` and update the two `src` references.
- `assets/work-rug.jpg` is ~11 MB. The black-curtain transition masks its load, but resizing it to
  ~1600 px wide (a few hundred KB) would make the page noticeably faster. Ask and I'll optimise it.
