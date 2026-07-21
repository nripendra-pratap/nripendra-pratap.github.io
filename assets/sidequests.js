// ============================================================
//  SideQuests page — articles list + shared interactivity.
//  Add an entry to ARTICLES to publish a new article card.
// ============================================================

// Article shape (example):
// {
//   title: "Scaling a billion-request spell checker",
//   date: "2026-08-01",              // ISO date, used for sorting + display
//   readingMins: 7,                   // estimated read time
//   summary: "How we kept p99 latency flat while ...",
//   url: "https://example.com/post",  // external link (Medium, dev.to, blog, ...)
//   tags: ["Distributed Systems", "C#", "Azure"]
// }
const ARTICLES = [];

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Feature gates ---------- */
  document.querySelectorAll("[data-feature]").forEach(el => {
    const enabled = typeof FEATURES !== "undefined" && FEATURES[el.dataset.feature];
    if (enabled) el.removeAttribute("hidden");
    else el.remove();
  });

  /* ---------- Theme ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---------- Nav scroll state + progress ---------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        navLinks.classList.remove("open");
      })
    );
  }

  /* ---------- Render articles ---------- */
  const grid = document.getElementById("sq-grid");
  if (grid) {
    if (!ARTICLES.length) {
      grid.innerHTML = `
        <div class="sq-empty reveal">
          <div class="sq-empty__icon">🧭</div>
          <h3>No side quests logged yet</h3>
          <p>The first write-up is in progress. When it's published, articles will show up right here.</p>
          <a class="btn btn--ghost" href="index.html">← Back to portfolio</a>
        </div>`;
    } else {
      const sorted = [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
      const fmt = d => {
        const dt = new Date(d);
        return isNaN(dt) ? d : dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
      };
      grid.innerHTML = sorted.map(a => `
        <article class="sq-card reveal">
          <div class="sq-card__meta">
            <span>${fmt(a.date)}</span>${a.readingMins ? ` · <span>${a.readingMins} min read</span>` : ""}
          </div>
          <h3 class="sq-card__title">
            ${a.url ? `<a href="${a.url}" target="_blank" rel="noopener">${a.title}</a>` : a.title}
          </h3>
          ${a.summary ? `<p class="sq-card__summary">${a.summary}</p>` : ""}
          ${a.tags && a.tags.length ? `<div class="sq-card__tags">${a.tags.map(t => `<span>${t}</span>`).join("")}</div>` : ""}
        </article>
      `).join("");
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
});
