// ============================================================
//  Shared site chrome used by every page:
//  feature gates, footer year, theme toggle, nav scroll/progress,
//  mobile menu and the scroll-reveal observer.
//
//  Loaded (after data.js) before each page-specific script, which
//  calls Site.initChrome() on startup and Site.observeReveals()
//  after it has rendered any dynamic content.
// ============================================================
window.Site = (function () {
  /* Elements with [data-feature] are shown only when the matching flag
     in FEATURES (data.js) is true; otherwise removed from the DOM. */
  function featureGates() {
    document.querySelectorAll("[data-feature]").forEach(el => {
      const enabled = typeof FEATURES !== "undefined" && FEATURES[el.dataset.feature];
      if (enabled) el.removeAttribute("hidden");
      else el.remove();
    });
  }

  function setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function initTheme() {
    const toggle = document.getElementById("themeToggle");
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  function initNav() {
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
  }

  function initMobileMenu() {
    const burger = document.getElementById("navBurger");
    const navLinks = document.getElementById("navLinks");
    if (!burger || !navLinks) return;
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

  /* Order-independent startup — does not depend on rendered content. */
  function initChrome() {
    featureGates();
    setYear();
    initTheme();
    initNav();
    initMobileMenu();
  }

  /* Observe .reveal elements. Call AFTER dynamic content is rendered so
     freshly-injected cards are picked up. */
  function observeReveals() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
  }

  return { initChrome, observeReveals };
})();
