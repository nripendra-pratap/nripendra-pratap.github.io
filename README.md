# Nripendra Pratap Singh — Personal Portfolio Website

An interactive, single-page personal/info website built from my résumé.
Pure **HTML + CSS + vanilla JavaScript** — no build step, no dependencies. Just static files.

## ✨ Features

- Responsive design (desktop → mobile) with a hamburger menu
- **Light / dark theme** toggle (remembers your choice, respects system preference)
- Animated hero with a typing effect
- Scroll-reveal animations, animated stat counters, scroll progress bar
- Interactive timeline of work experience, skills, and education
- Downloadable résumé PDF
- Accessible & respects `prefers-reduced-motion`

## 📁 Structure

```
nripendra-portfolio/
├── index.html              # Page markup
├── .nojekyll               # Tells GitHub Pages to serve files as-is
├── assets/
│   ├── style.css           # All styling + theme tokens
│   ├── script.js           # Interactivity (theme, nav, animations, rendering)
│   ├── data.js             # ← Edit this to update your content
│   └── Nripendra-Pratap-Singh-Resume.pdf
└── README.md
```

## ✏️ Editing content

All text (experience, skills, education, typed roles) lives in **`assets/data.js`**.
Update that file and refresh — no rebuild needed. Contact details are in `index.html`.

## 👀 Preview locally

Just open `index.html` in a browser. Or run a tiny local server (better for the PDF/download):

```powershell
# From inside the nripendra-portfolio folder
python -m http.server 8000
# then visit http://localhost:8000
```

---

## 🚀 Free hosting options

### Option 1 — GitHub Pages (recommended)

1. Create a new **public** repo, e.g. `nripendra-portfolio` (or `<username>.github.io` for a root URL).
2. Push these files to the repo:
   ```powershell
   cd "C:\Users\ujjwa\Desktop\nripendra-portfolio"
   git init
   git add .
   git commit -m "Add portfolio website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nripendra-portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment**.
   Set **Source = Deploy from a branch**, **Branch = `main` / `root`**, then **Save**.
4. Your site goes live at `https://<your-username>.github.io/nripendra-portfolio/` in ~1 minute.

> The included `.nojekyll` file makes sure everything (including the `assets/` folder) is served correctly.

### Option 2 — Netlify (drag & drop, no git needed)

1. Go to <https://app.netlify.com/drop>.
2. Drag the entire `nripendra-portfolio` folder onto the page.
3. Done — you get an instant live URL (customizable to `your-name.netlify.app`). Free HTTPS included.

### Option 3 — Vercel

1. Install the CLI: `npm i -g vercel`
2. From the folder, run `vercel` and follow the prompts (choose "static").
3. Free `.vercel.app` domain with HTTPS.

### Option 4 — Cloudflare Pages

1. Go to <https://pages.cloudflare.com>, connect your GitHub repo (or upload directly).
2. No build command needed; output directory = `/`.
3. Free `.pages.dev` domain with a global CDN.

### 🌐 Custom domain (optional)

All four providers support connecting a custom domain (e.g. `nripendra.dev`) for free — you only pay your domain registrar (~€10/year). Add it in the provider's dashboard and update your DNS records as instructed.

---

## 🔧 Tech

No frameworks, no npm packages. Fonts loaded from Google Fonts via CDN.
Works offline except for web fonts (which gracefully fall back to system fonts).
