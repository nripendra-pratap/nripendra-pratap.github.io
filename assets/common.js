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

  /* Nav dropdowns open on hover/focus via CSS. This only keeps aria-expanded
     honest for screen readers and lets Escape dismiss an open menu. */
  function initNavMenus() {
    document.querySelectorAll(".nav__item").forEach(item => {
      const parent = item.querySelector(".nav__parent");
      if (!parent) return;
      const set = open => parent.setAttribute("aria-expanded", String(open));
      item.addEventListener("mouseenter", () => set(true));
      item.addEventListener("mouseleave", () => set(false));
      item.addEventListener("focusin", () => set(true));
      item.addEventListener("focusout", e => {
        if (!item.contains(e.relatedTarget)) set(false);
      });
      item.addEventListener("keydown", e => {
        if (e.key === "Escape") {
          set(false);
          parent.blur();
        }
      });
    });
  }

  /* Order-independent startup — does not depend on rendered content. */
  function initChrome() {
    featureGates();
    setYear();
    initTheme();
    initNav();
    initMobileMenu();
    initNavMenus();
  }

  /* Observe .reveal elements. Call AFTER dynamic content is rendered so
     freshly-injected cards are picked up.

     rootMargin extends the viewport downwards so content sitting just below
     the fold reveals on load instead of staying at opacity 0 until the user
     scrolls. Without it, a short page can render as a blank void. */
  function observeReveals() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px 200px 0px" });
    els.forEach(el => obs.observe(el));
  }

  return { initChrome, observeReveals };
})();
