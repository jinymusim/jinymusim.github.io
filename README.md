# jinymusim.github.io

Personal page of Michal Chudoba: a short about text, the CV and the publication list.

**Live:** https://jinymusim.github.io

## Contents

```
index.html          about, links, publications
404.html            minimal not-found page
pdfs/cv.pdf         CV
assets/css/site.css one hand-written stylesheet
assets/img/         social preview (og-cover.png|webp)
```

There is no build step, no framework and no webfonts. Pages use root-relative
paths, so preview with a local server rather than the `file://` protocol:

```bash
cd jinymusim.github.io && python3 -m http.server 8000   # http://localhost:8000
```

## Editing

- About text: the `#about` section of `index.html`.
- Publications: the `<ol class="pub-list">` in `index.html`, newest first. Each entry
  is a title (linked to the DOI, arXiv or ACL Anthology), then authors and venue.
- CV: replace `pdfs/cv.pdf`.
- Colours and type: the token block at the top of `assets/css/site.css`.

Presentations, talks and blog notes are deliberately not included.

## Deploying

GitHub Pages serves this repository from `main` (branch root):

```bash
git add -A && git commit -m "Simplify site to about, CV and publications" && git push
```

## Licence

Content © Michal Chudoba. Code and layout under the terms in `LICENSE`.
