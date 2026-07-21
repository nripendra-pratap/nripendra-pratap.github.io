// ============================================================
//  Home page: renders Experience / Skills / Education from data.js,
//  plus animated counters, active-nav spy and the typing effect.
//  Shared chrome (theme, nav, menu, reveals) lives in common.js.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  Site.initChrome();

  /* ---------- Render Experience ---------- */
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = EXPERIENCE.map(job => `
    <div class="tl-item reveal ${job.current ? "current" : ""}">
      <div class="tl-card" style="--brand-logo:${job.brand};">
        <div class="tl-notch"><svg class="tl-notch__logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${LOGOS[job.logo]}"/></svg></div>
        <div class="tl-body">
          <div class="tl-head">
            <div>
              <span class="tl-title-row">
                <span class="tl-role">${job.role}</span>
                ${job.current ? '<span class="tl-badge">Current</span>' : ""}
              </span>
              <div class="tl-company">${job.company} · ${job.location}</div>
            </div>
            <span class="tl-period">${job.period}</span>
          </div>
          <ul class="tl-points">
            ${job.points.map(p => `<li>${p}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `).join("");

  /* ---------- Render Skills ---------- */
  const skillsGrid = document.getElementById("skills-grid");
  skillsGrid.innerHTML = SKILLS.map(s => `
    <div class="skill-card reveal">
      <h3><span class="skill-card__icon">${s.icon}</span>${s.group}</h3>
      <div class="skill-tags">
        ${s.items.map(i => `<span>${i}</span>`).join("")}
      </div>
    </div>
  `).join("");

  /* ---------- Render Education ---------- */
  const eduGrid = document.getElementById("edu-grid");
  eduGrid.innerHTML = EDUCATION.map(e => `
    <div class="edu-card reveal">
      <div class="edu-card__logo"><img src="${e.logo}" alt="${e.school} logo" loading="lazy" /></div>
      <div>
        <h3>${e.degree}</h3>
        <div class="school">${e.school}</div>
        <div class="meta">${e.period} · ${e.detail}</div>
      </div>
    </div>
  `).join("");

  /* ---------- Reveal on scroll (after content is rendered) ---------- */
  Site.observeReveals();

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const numEl = el.querySelector(".stat__num");
      const target = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        cur = Math.min(target, cur + step);
        numEl.textContent = cur;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const linkFor = id => document.querySelector(`.nav__links a[href="#${id}"]`);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = linkFor(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav__links a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  /* ---------- Typing effect ---------- */
  const typed = document.getElementById("typed");
  let ri = 0, ci = 0, deleting = false;
  const type = () => {
    const word = ROLES_TYPED[ri];
    typed.textContent = word.substring(0, ci);
    if (!deleting && ci < word.length) {
      ci++; setTimeout(type, 65);
    } else if (deleting && ci > 0) {
      ci--; setTimeout(type, 30);
    } else if (!deleting && ci === word.length) {
      deleting = true; setTimeout(type, 1600);
    } else {
      deleting = false; ri = (ri + 1) % ROLES_TYPED.length; setTimeout(type, 300);
    }
  };
  type();
});
