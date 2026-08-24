# Nripendra Pratap Singh — Personal Website

This repository holds the source for my personal website — a little corner of the internet
about who I am, what I've built, and the things I write about.

🔗 **Live at:** <https://nripendra-pratap.github.io/>

## What's here

- **Portfolio** — a quick intro, my work experience, technical skills, and education.
- **SideQuests** — my side projects and writing, grouped under one nav menu:
  - **Cricket** (`railway-union-stats.html`) — a living stats page for my Railway Union CC career.
  - **Fitness** (`fitness.html`) — a 12-week training programme.
  - **Articles** (`sidequests.html`) — write-ups on backend systems, cloud & reliability, and AI / agent tooling.

It's a single, hand-built static site — plain HTML, CSS, and vanilla JavaScript, with a
light/dark theme, subtle animations, and an animated hero. No frameworks, no build step.

## Working on it

There's no build step, so a couple of things are done by hand:

- **Bump the asset version when you change CSS or JS.** Every page links its assets with a
  `?v=YYYYMMDD` stamp (e.g. `assets/style.css?v=20260824-2`, adding `-2`, `-3` … for more than
  one deploy in a day). GitHub Pages serves assets with `Cache-Control: max-age=600`, so without
  a fresh stamp a visitor can load new HTML against ten-minute-old CSS and get a badly broken
  layout. Bump the stamp in *all* HTML files together.
- **The nav is duplicated in every page.** Adding a SideQuest sub-page means updating the
  `.nav__menu` block in each HTML file and setting the right `.active` classes.
- **Adding an article** means a new page at the repo root plus an entry in the `ARTICLES`
  array in `assets/sidequests.js`.

## A note

This is my personal site and a reflection of me — it isn't a template or starter kit, so
please don't clone it and redeploy it as your own. That said, you're very welcome to look
around, peek at the code, and borrow an idea or two.

If you'd like to get in touch, the contact links are on the [site](https://nripendra-pratap.github.io/).

---

© Nripendra Pratap Singh
