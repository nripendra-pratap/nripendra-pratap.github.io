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
  Site.initChrome();

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

  /* ---------- Reveal on scroll (after content is rendered) ---------- */
  Site.observeReveals();
});
