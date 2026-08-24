// ============================================================
//  Fitness page — static content, shared site chrome only.
//  Content lives in fitness.html; this just boots nav/theme
//  and the reveal observer, mirroring the other page scripts.
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  Site.initChrome();
  Site.observeReveals();
});
