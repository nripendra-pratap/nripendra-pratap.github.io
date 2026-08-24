// ============================================================
//  Railway Union cricket stats — data + rendering.
//
//  TO UPDATE AFTER A MATCH (or at the end of a season):
//    1. Open the source page:
//       https://www2.cricketstatz.com/ss/p.aspx?color=&club=4530&playerid=397222
//    2. Pick the season from the "Seas" filter and copy the two
//       summary rows into the matching entry in SEASONS below.
//       A new season is just a new object at the top of the array.
//    3. Copy the all-time strike rate into CAREER_SR (it is the one
//       number that cannot be recomputed from the season rows,
//       because balls faced are not published per season).
//    4. Bump UPDATED to the date you refreshed the numbers.
//
//  Everything else on the page (career totals, averages, economy,
//  strike rates, highs, best figures) is derived from SEASONS, so
//  the season table and the career panel can never disagree.
// ============================================================

const UPDATED = "2026-08-24";

const PROFILE = {
  club: "Railway Union CC",
  ground: "Park Avenue, Sandymount, Dublin",
  competition: "Cricket Leinster Open Competitions",
  role: "Middle-order batter, right-arm bowler, occasional keeper",
  sourceUrl: "https://www2.cricketstatz.com/ss/p.aspx?color=&club=4530&playerid=397222"
};

// All-time batting strike rate, straight from the source page.
const CAREER_SR = "84.36";

// ---- Hero carousel -----------------------------------------------------
// TO ADD A PHOTO: drop <slug>-1000.webp, <slug>-1800.webp and <slug>-1400.jpg
// into assets/cricket/, then add one line here. Order = display order.
//   focus — object-position, i.e. the part of the frame to keep when the
//           photo is cropped to the hero. Nudge the second value up (e.g.
//           "50% 30%") when the subject's head sits high in the frame.
const PHOTO_DIR = "assets/cricket";
const PHOTO_CAPTION = "Ed Sports Russell Court Trophy final · 2026";
const SLIDE_MS = 6500;

const PHOTOS = [
  { slug: "bowling",  focus: "50% 26%", alt: "A Railway Union bowler in his delivery stride during the Russell Court Trophy final." },
  { slug: "pull",     focus: "50% 26%", alt: "A Railway Union batter pulling a short ball away through the leg side." },
  { slug: "cut",      focus: "50% 34%", alt: "A Railway Union batter cutting square of the wicket as the keeper watches." },
  { slug: "fielding", focus: "50% 28%", alt: "Railway Union fielders sharing a laugh between deliveries." },
  { slug: "medal",    focus: "50% 30%", alt: "A Railway Union player collecting his medal after the final." },
  { slug: "team",     focus: "50% 26%", alt: "The Railway Union squad together with their medals after the final." }
];

// Newest season first. `balls`/`ballsBowled` drive the derived rates.
const SEASONS = [
  {
    year: 2026, matches: 18,
    bat: { inns: 18, no: 4, runs: 372, sr: "121.56", hs: "68*", hsVs: "Ashbourne 2", fours: 31, sixes: 20, fifties: 1, hundreds: 0, ducks: 2 },
    bowl: { ballsBowled: 390, maidens: 3, conceded: 387, wickets: 15, best: "4-45", bestVs: "DLR County 2" },
    field: { ctKeeper: 0, ctField: 4, stumpings: 0, runOuts: 2 }
  },
  {
    year: 2025, matches: 17,
    bat: { inns: 16, no: 6, runs: 259, sr: "83.56", hs: "52", hsVs: "Laois 3", fours: 17, sixes: 8, fifties: 2, hundreds: 0, ducks: 2 },
    bowl: { ballsBowled: 246, maidens: 1, conceded: 225, wickets: 13, best: "3-41", bestVs: "Athlone 2" },
    field: { ctKeeper: 0, ctField: 9, stumpings: 0, runOuts: 1 }
  },
  {
    year: 2024, matches: 15,
    bat: { inns: 12, no: 3, runs: 259, sr: "85.51", hs: "106*", hsVs: "The Hills 4", fours: 30, sixes: 3, fifties: 0, hundreds: 1, ducks: 1 },
    bowl: { ballsBowled: 228, maidens: 0, conceded: 266, wickets: 7, best: "3-19", bestVs: "Merrion 6" },
    field: { ctKeeper: 0, ctField: 6, stumpings: 0, runOuts: 3 }
  },
  {
    year: 2023, matches: 12,
    bat: { inns: 10, no: 2, runs: 120, sr: "62.61", hs: "48", hsVs: "Tyrrelstown 4", fours: 7, sixes: 3, fifties: 0, hundreds: 0, ducks: 2 },
    bowl: { ballsBowled: 318, maidens: 3, conceded: 208, wickets: 14, best: "3-15", bestVs: "Malahide 4" },
    field: { ctKeeper: 0, ctField: 4, stumpings: 0, runOuts: 2 }
  },
  {
    year: 2022, matches: 21,
    bat: { inns: 15, no: 1, runs: 216, sr: "71.50", hs: "85", hsVs: "Pembroke 5", fours: 22, sixes: 3, fifties: 1, hundreds: 0, ducks: 3 },
    bowl: { ballsBowled: 530, maidens: 2, conceded: 465, wickets: 26, best: "3-11", bestVs: "Clondalkin 2" },
    field: { ctKeeper: 0, ctField: 8, stumpings: 0, runOuts: 2 }
  },
  {
    year: 2021, matches: 9,
    bat: { inns: 7, no: 1, runs: 112, sr: "37.74", hs: "31", hsVs: "Laois 3", fours: 1, sixes: 0, fifties: 0, hundreds: 0, ducks: 0 },
    bowl: { ballsBowled: 30, maidens: 0, conceded: 19, wickets: 2, best: "1-7", bestVs: "Adamstown 6" },
    field: { ctKeeper: 1, ctField: 2, stumpings: 1, runOuts: 1 }
  },
  {
    year: 2020, matches: 4,
    bat: { inns: 4, no: 0, runs: 19, sr: "-", hs: "16", hsVs: "Pembroke 5", fours: 0, sixes: 0, fifties: 0, hundreds: 0, ducks: 1 },
    bowl: { ballsBowled: 0, maidens: 0, conceded: 0, wickets: 0, best: "-", bestVs: "" },
    field: { ctKeeper: 1, ctField: 0, stumpings: 0, runOuts: 0 }
  }
];

// Innings worth remembering. Add a line whenever one is worth adding.
const HIGHLIGHTS = [
  { date: "31 Aug 2024", line: "106* (15x4)", opp: "The Hills 4", venue: "The Vineyard",
    note: "Opened the batting and finished unbeaten on three figures — the first hundred of my career." },
  { date: "20 Aug 2022", line: "85 off 93 (10x4)", opp: "Pembroke 5", venue: "Park Avenue",
    note: "The innings that made the top order feel like a place I was allowed to stand." },
  { date: "16 Aug 2026", line: "68* off 58 (8x4, 2x6)", opp: "Ashbourne 2", venue: "Park Avenue",
    note: "Unbeaten at better than a run a ball — the clearest sign of how much the 2026 gear change stuck." },
  { date: "9 May 2026", line: "4-45", opp: "DLR County 2", venue: "Park Avenue",
    note: "Career-best figures: three of the four caught behind, one trapped in front." },
  { date: "9 Aug 2025", line: "52 off 52 (5x4, 2x6)", opp: "Laois 3", venue: "Stradbally",
    note: "A proper away-day fifty on a ground that has never given me anything for free." },
  { date: "7 May 2023", line: "3-15", opp: "Malahide 4", venue: "Park Avenue",
    note: "Two bowled and one LBW inside a tidy spell, and an unbeaten 14 with the bat in the same game." }
];

/* ---------- Derivation helpers ---------- */

const round2 = n => (Math.round(n * 100) / 100).toFixed(2);

// Balls -> cricket over notation, e.g. 1742 -> "290.2".
const toOvers = balls => `${Math.floor(balls / 6)}.${balls % 6}`;

// "106*" -> 106, so highs compare numerically.
const hsValue = hs => parseInt(String(hs).replace("*", ""), 10) || 0;

// "4-45" -> sorts on most wickets, then fewest runs.
function bestRank(best) {
  const m = /^(\d+)-(\d+)$/.exec(String(best));
  return m ? Number(m[1]) * 1000 + (999 - Number(m[2])) : -1;
}

function career(seasons) {
  const c = {
    matches: 0, inns: 0, no: 0, runs: 0, fours: 0, sixes: 0, fifties: 0, hundreds: 0, ducks: 0,
    ballsBowled: 0, maidens: 0, conceded: 0, wickets: 0,
    ctKeeper: 0, ctField: 0, stumpings: 0, runOuts: 0,
    hs: "-", hsVs: "", best: "-", bestVs: ""
  };
  seasons.forEach(s => {
    c.matches += s.matches;
    ["inns", "no", "runs", "fours", "sixes", "fifties", "hundreds", "ducks"].forEach(k => (c[k] += s.bat[k]));
    ["ballsBowled", "maidens", "conceded", "wickets"].forEach(k => (c[k] += s.bowl[k]));
    ["ctKeeper", "ctField", "stumpings", "runOuts"].forEach(k => (c[k] += s.field[k]));
    if (hsValue(s.bat.hs) > hsValue(c.hs)) { c.hs = s.bat.hs; c.hsVs = s.bat.hsVs; }
    if (bestRank(s.bowl.best) > bestRank(c.best)) { c.best = s.bowl.best; c.bestVs = s.bowl.bestVs; }
  });
  return c;
}

const batAvg = b => (b.inns - b.no > 0 ? round2(b.runs / (b.inns - b.no)) : "-");
const bowlAvg = b => (b.wickets ? round2(b.conceded / b.wickets) : "-");
const econ = b => (b.ballsBowled ? round2(b.conceded / (b.ballsBowled / 6)) : "-");
const bowlSR = b => (b.wickets ? round2(b.ballsBowled / b.wickets) : "-");

/* ---------- Hero carousel ---------- */

/* Cross-fading photo backdrop. Auto-advance is paused when the tab is
   hidden, when the visitor asks for reduced motion, or on request via the
   pause button (WCAG 2.2.2 — moving content needs a stop control). */
function renderHero() {
  const media = el("ck-hero-media");
  if (!media || !PHOTOS.length) return;

  media.innerHTML = PHOTOS.map((ph, i) => `
    <div class="ck-hero__slide${i === 0 ? " is-active" : ""}">
      <picture>
        <source type="image/webp" sizes="100vw"
                srcset="${PHOTO_DIR}/${ph.slug}-1000.webp 1000w, ${PHOTO_DIR}/${ph.slug}-1800.webp 1800w" />
        <img src="${PHOTO_DIR}/${ph.slug}-1400.jpg" alt="${ph.alt}"
             style="object-position:${ph.focus}" decoding="async"
             ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
      </picture>
    </div>`).join("");

  const caption = el("ck-hero-caption");
  if (caption) caption.textContent = PHOTO_CAPTION;

  const slides = [...media.querySelectorAll(".ck-hero__slide")];
  const controls = el("ck-hero-controls");
  if (slides.length < 2 || !controls) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer = null;
  let paused = reduced.matches;

  controls.innerHTML = `
    <div class="ck-hero__dots" role="tablist" aria-label="Choose a photo">
      ${PHOTOS.map((_, i) => `
        <button class="ck-hero__dot${i === 0 ? " is-active" : ""}" type="button" role="tab"
                aria-label="Photo ${i + 1} of ${PHOTOS.length}" aria-selected="${i === 0}"></button>`).join("")}
    </div>
    <button class="ck-hero__toggle" type="button" aria-label="Pause photos" aria-pressed="false">
      <svg class="ck-hero__icon-pause" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>
      <svg class="ck-hero__icon-play" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M8 5l11 7-11 7z"/></svg>
    </button>`;

  const dots = [...controls.querySelectorAll(".ck-hero__dot")];
  const toggle = controls.querySelector(".ck-hero__toggle");

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === index);
      d.setAttribute("aria-selected", String(i === index));
    });
  }

  function stop() { clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (paused || reduced.matches || document.hidden) return;
    timer = setInterval(() => show(index + 1), SLIDE_MS);
  }

  function setPaused(state) {
    paused = state;
    toggle.setAttribute("aria-pressed", String(state));
    toggle.setAttribute("aria-label", state ? "Play photos" : "Pause photos");
    toggle.classList.toggle("is-paused", state);
    start();
  }

  dots.forEach((d, i) => d.addEventListener("click", () => { show(i); start(); }));
  toggle.addEventListener("click", () => setPaused(!paused));
  document.addEventListener("visibilitychange", start);
  reduced.addEventListener("change", () => setPaused(reduced.matches));

  setPaused(paused);
}

/* ---------- Rendering ---------- */

const el = (id) => document.getElementById(id);

function renderCards(c) {
  const dismissals = c.ctField + c.ctKeeper + c.stumpings + c.runOuts;
  const cards = [
    { v: c.matches, l: "Matches", s: `${SEASONS.length} seasons` },
    { v: c.runs.toLocaleString(), l: "Runs", s: `avg ${batAvg(c)} · SR ${CAREER_SR}` },
    { v: c.wickets, l: "Wickets", s: `avg ${bowlAvg(c)} · econ ${econ(c)}` },
    { v: c.hs, l: "High score", s: `vs ${c.hsVs}` },
    { v: c.best, l: "Best bowling", s: `vs ${c.bestVs}` },
    { v: dismissals, l: "Dismissals in the field", s: `${c.ctField + c.ctKeeper} ct · ${c.stumpings} st · ${c.runOuts} ro` }
  ];
  el("ck-cards").innerHTML = cards.map(card => `
    <div class="ck-card">
      <span class="ck-card__value">${card.v}</span>
      <span class="ck-card__label">${card.l}</span>
      <span class="ck-card__sub">${card.s}</span>
    </div>`).join("");
}

function table(headers, rows, foot) {
  const th = headers.map((h, i) => `<th${i ? ' class="num"' : ""}>${h}</th>`).join("");
  const body = rows.map(r => `<tr>${r.map((c, i) => `<td${i ? ' class="num"' : ""}>${c}</td>`).join("")}</tr>`).join("");
  const tf = foot ? `<tfoot><tr>${foot.map((c, i) => `<td${i ? ' class="num"' : ""}>${c}</td>`).join("")}</tr></tfoot>` : "";
  return `<div class="ck-table-wrap"><table class="ck-table"><thead><tr>${th}</tr></thead><tbody>${body}</tbody>${tf}</table></div>`;
}

function renderBatting(c) {
  const rows = SEASONS.map(s => {
    const b = s.bat;
    return [s.year, s.matches, b.inns, b.no, b.runs, batAvg(b), b.sr,
            `${b.hs}<span class="ck-vs"> v ${b.hsVs}</span>`, b.fours, b.sixes, b.fifties, b.hundreds, b.ducks];
  });
  const foot = ["Career", c.matches, c.inns, c.no, c.runs, batAvg(c), CAREER_SR,
                `${c.hs}<span class="ck-vs"> v ${c.hsVs}</span>`, c.fours, c.sixes, c.fifties, c.hundreds, c.ducks];
  el("ck-batting").innerHTML =
    table(["Season", "M", "Inns", "NO", "Runs", "Avg", "SR", "HS", "4s", "6s", "50s", "100s", "0s"], rows, foot);
}

function renderBowling(c) {
  const rows = SEASONS.map(s => {
    const b = s.bowl;
    return [s.year, s.matches, toOvers(b.ballsBowled), b.maidens, b.conceded, b.wickets,
            b.best === "-" ? "-" : `${b.best}<span class="ck-vs"> v ${b.bestVs}</span>`,
            bowlAvg(b), econ(b), bowlSR(b)];
  });
  const foot = ["Career", c.matches, toOvers(c.ballsBowled), c.maidens, c.conceded, c.wickets,
                `${c.best}<span class="ck-vs"> v ${c.bestVs}</span>`, bowlAvg(c), econ(c), bowlSR(c)];
  el("ck-bowling").innerHTML =
    table(["Season", "M", "Overs", "Mdns", "Runs", "Wkts", "Best", "Avg", "Econ", "SR"], rows, foot);
}

function renderFielding(c) {
  const rows = SEASONS.map(s => {
    const f = s.field;
    return [s.year, f.ctField, f.ctKeeper, f.stumpings, f.runOuts,
            f.ctField + f.ctKeeper + f.stumpings + f.runOuts];
  });
  const foot = ["Career", c.ctField, c.ctKeeper, c.stumpings, c.runOuts,
                c.ctField + c.ctKeeper + c.stumpings + c.runOuts];
  el("ck-fielding").innerHTML =
    table(["Season", "Ct (field)", "Ct (keeping)", "St", "Run outs", "Total"], rows, foot);
}

function renderHighlights() {
  el("ck-highlights").innerHTML = HIGHLIGHTS.map(h => `
    <li class="ck-highlight">
      <div class="ck-highlight__head">
        <span class="ck-highlight__line">${h.line}</span>
        <span class="ck-highlight__opp">vs ${h.opp}</span>
      </div>
      <div class="ck-highlight__meta">${h.date} · ${h.venue}</div>
      <p class="ck-highlight__note">${h.note}</p>
    </li>`).join("");
}

function renderMeta(c) {
  const d = new Date(UPDATED);
  const stamp = isNaN(d) ? UPDATED : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const years = SEASONS.map(s => s.year);
  const set = (attr, value) =>
    document.querySelectorAll(`[data-ck-${attr}]`).forEach(n => (n.textContent = value));

  set("updated", stamp);
  set("first", Math.min(...years));
  set("latest", Math.max(...years));
  set("seasons", SEASONS.length);
  set("matches", c.matches);
  set("runs", c.runs.toLocaleString());
  set("wickets", c.wickets);
  document.querySelectorAll("[data-ck-source]").forEach(n => (n.href = PROFILE.sourceUrl));
}

document.addEventListener("DOMContentLoaded", () => {
  Site.initChrome();
  const c = career(SEASONS);
  renderMeta(c);
  renderHero();
  renderCards(c);
  renderBatting(c);
  renderBowling(c);
  renderFielding(c);
  renderHighlights();
  Site.observeReveals();
});
