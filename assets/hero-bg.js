// ============================================================
//  Hero animated background — a looping canvas montage that
//  cycles through three themed scenes:
//    1) a live scrolling terminal
//    2) an AI / neural-network node graph (human ↔ AI)
//    3) a backend service-flow diagram
//  Self-contained, license-free, lightweight. No video files.
// ============================================================

(function () {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Palette (adapts to light / dark theme) ----
  function palette() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    return dark
      ? { fg: "#818cf8", fg2: "#22d3ee", accent: "#f472b6", dim: "rgba(154,166,184,0.55)", ok: "#34d399" }
      : { fg: "#4f46e5", fg2: "#06b6d4", accent: "#ec4899", dim: "rgba(85,96,112,0.5)", ok: "#059669" };
  }
  let COL = palette();

  // ---- Hi-DPI sizing ----
  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    scenes.forEach(s => s.layout && s.layout());
  }

  // =========================================================
  //  Scene 1 — Terminal
  // =========================================================
  const Terminal = (function () {
    const script = [
      { t: "cmd", s: "$ kubectl get pods -n editor-service" },
      { t: "out", s: "gateway-7c9f   3/3   Running   2d" },
      { t: "out", s: "grammar-api    5/5   Running   6h" },
      { t: "cmd", s: "$ python deploy.py --cloud bleu --region eu-west" },
      { t: "ok",  s: "✓ build passed  ·  coverage 94%" },
      { t: "ok",  s: "✓ rolled out 26 regions  ·  0 errors" },
      { t: "cmd", s: "$ curl -s /health | jq .status" },
      { t: "out", s: '"healthy"  ·  p99 41ms  ·  1.2B req/day' },
      { t: "cmd", s: "$ git commit -m 'ship agent mode'" },
      { t: "ok",  s: "✓ 1 file changed  ·  main ↑" },
    ];
    let lines = [];       // {text, color, done}
    let typing = "";      // current partial line
    let idx = 0, char = 0, timer = 0, maxLines = 9;
    const speed = 0.028;  // seconds per char

    function colorFor(t) {
      if (t === "cmd") return COL.fg2;
      if (t === "ok") return COL.ok;
      return COL.dim;
    }
    function reset() { lines = []; typing = ""; idx = 0; char = 0; timer = 0; }
    function update(dt) {
      const cur = script[idx % script.length];
      timer += dt;
      while (timer >= speed && char < cur.s.length) {
        timer -= speed; char++;
        typing = cur.s.substring(0, char);
      }
      if (char >= cur.s.length) {
        timer += dt;
        if (timer > 0.5) {
          lines.push({ text: cur.s, color: colorFor(cur.t) });
          if (lines.length > maxLines) lines.shift();
          idx++; char = 0; timer = 0; typing = "";
        }
      }
    }
    function draw(a) {
      const size = Math.max(13, Math.min(18, W / 46));
      ctx.font = `500 ${size}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      const lh = size * 1.7;
      const x = W * 0.5, y0 = H * 0.16;
      const cur = script[idx % script.length];
      const all = lines.concat([{ text: typing, color: colorFor(cur.t), caret: true }]);
      for (let i = 0; i < all.length; i++) {
        const ln = all[i];
        const fade = a * (0.35 + 0.65 * (i / all.length));
        ctx.globalAlpha = fade;
        ctx.fillStyle = ln.color;
        ctx.fillText(ln.text, x, y0 + i * lh);
        if (ln.caret && Math.floor(performance.now() / 500) % 2 === 0) {
          const w = ctx.measureText(ln.text).width;
          ctx.fillStyle = COL.accent;
          ctx.fillText("▋", x + w + 2, y0 + i * lh);
        }
      }
      ctx.globalAlpha = 1;
    }
    return { reset, update, draw };
  })();

  // =========================================================
  //  Scene 2 — AI / neural-network node graph
  // =========================================================
  const Neural = (function () {
    let nodes = [];
    let pulses = [];
    const N = 42;
    function layout() {
      nodes = [];
      for (let i = 0; i < N; i++) {
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.5) * 12,
          r: 1.5 + Math.random() * 2.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
      pulses = [];
    }
    function reset() { if (!nodes.length) layout(); pulses = []; }
    function update(dt) {
      for (const n of nodes) {
        n.x += n.vx * dt; n.y += n.vy * dt; n.phase += dt * 2;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.x = Math.max(0, Math.min(W, n.x));
        n.y = Math.max(0, Math.min(H, n.y));
      }
      if (Math.random() < dt * 3 && nodes.length > 1) {
        const a = nodes[(Math.random() * nodes.length) | 0];
        const b = nodes[(Math.random() * nodes.length) | 0];
        if (a !== b) pulses.push({ a, b, t: 0 });
      }
      for (const p of pulses) p.t += dt * 1.3;
      pulses = pulses.filter(p => p.t < 1);
    }
    function draw(a) {
      const maxD = Math.min(W, H) * 0.22;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            ctx.globalAlpha = a * (1 - d / maxD) * 0.5;
            ctx.strokeStyle = COL.fg;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const glow = 0.6 + 0.4 * Math.sin(n.phase);
        ctx.globalAlpha = a * glow;
        ctx.fillStyle = COL.fg2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const p of pulses) {
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.globalAlpha = a * (1 - p.t);
        ctx.fillStyle = COL.accent;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    return { reset, update, draw, layout };
  })();

  // =========================================================
  //  Scene 3 — Backend service-flow diagram
  // =========================================================
  const Backend = (function () {
    let nodes = [], edges = [], packets = [];
    const defs = [
      { id: "client", label: "Client", gx: 0.5, gy: 0.16 },
      { id: "gw",     label: "API Gateway", gx: 0.5, gy: 0.40 },
      { id: "auth",   label: "Auth", gx: 0.72, gy: 0.62 },
      { id: "svc",    label: "Orders", gx: 0.50, gy: 0.66 },
      { id: "cache",  label: "Cache", gx: 0.28, gy: 0.62 },
      { id: "db",     label: "Postgres", gx: 0.50, gy: 0.88 },
    ];
    const links = [
      ["client", "gw"], ["gw", "auth"], ["gw", "svc"], ["gw", "cache"], ["svc", "db"],
    ];
    function layout() {
      const bw = Math.max(74, Math.min(120, W * 0.13)), bh = 34;
      nodes = defs.map(d => ({ ...d, x: d.gx * W, y: d.gy * H, w: bw, h: bh }));
      const byId = {}; nodes.forEach(n => byId[n.id] = n);
      edges = links.map(([a, b]) => ({ a: byId[a], b: byId[b] }));
      packets = [];
    }
    function reset() { if (!nodes.length) layout(); packets = []; }
    function update(dt) {
      if (Math.random() < dt * 4 && edges.length) {
        const e = edges[(Math.random() * edges.length) | 0];
        packets.push({ e, t: 0, back: Math.random() < 0.4 });
      }
      for (const p of packets) p.t += dt * 0.8;
      packets = packets.filter(p => p.t < 1);
    }
    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    function draw(a) {
      ctx.lineWidth = 1.4;
      for (const e of edges) {
        ctx.globalAlpha = a * 0.4;
        ctx.strokeStyle = COL.dim;
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y);
        ctx.lineTo(e.b.x, e.b.y);
        ctx.stroke();
      }
      for (const p of packets) {
        const from = p.back ? p.e.b : p.e.a, to = p.back ? p.e.a : p.e.b;
        const x = from.x + (to.x - from.x) * p.t;
        const y = from.y + (to.y - from.y) * p.t;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.back ? COL.fg2 : COL.accent;
        ctx.beginPath();
        ctx.arc(x, y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      const fs = Math.max(11, Math.min(14, W / 60));
      ctx.font = `600 ${fs}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (const n of nodes) {
        ctx.globalAlpha = a * 0.9;
        roundRect(n.x - n.w / 2, n.y - n.h / 2, n.w, n.h, 9);
        ctx.strokeStyle = COL.fg;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = COL.fg;
        ctx.fillText(n.label, n.x, n.y + 1);
      }
      ctx.textAlign = "start";
      ctx.globalAlpha = 1;
    }
    return { reset, update, draw, layout };
  })();

  // =========================================================
  //  Scene manager (crossfade loop)
  // =========================================================
  const scenes = [Terminal, Neural, Backend];
  const HOLD = 7.5, FADE = 1.4;   // seconds
  let cycle = 0, active = 0, last = performance.now(), running = true;

  function frame(now) {
    if (!running) return;
    let dt = (now - last) / 1000; last = now;
    dt = Math.min(dt, 0.05);
    cycle += dt;

    const span = HOLD + FADE;
    if (cycle > span) {
      cycle -= span;
      active = (active + 1) % scenes.length;
      scenes[(active + 1) % scenes.length].reset();
    }
    const nextIdx = (active + 1) % scenes.length;
    let aCur = 1, aNext = 0;
    if (cycle > HOLD) {
      const f = (cycle - HOLD) / FADE;
      aCur = 1 - f; aNext = f;
    }

    scenes[active].update(dt);
    if (aNext > 0) scenes[nextIdx].update(dt);

    ctx.clearRect(0, 0, W, H);
    scenes[active].draw(aCur);
    if (aNext > 0) scenes[nextIdx].draw(aNext);

    requestAnimationFrame(frame);
  }

  // ---- Init ----
  function start() {
    resize();
    scenes.forEach(s => s.reset());
    if (reduceMotion) {
      // Draw a single static frame, no animation loop.
      Neural.update(0); Neural.draw(0.8);
      return;
    }
    last = performance.now();
    running = true;
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);

  // Update palette live when the theme toggles.
  new MutationObserver(() => { COL = palette(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Pause the loop when the hero is off-screen to save CPU/battery.
  const hero = document.getElementById("hero");
  if (hero && "IntersectionObserver" in window && !reduceMotion) {
    new IntersectionObserver((entries) => {
      const vis = entries[0].isIntersecting;
      if (vis && !running) { running = true; last = performance.now(); requestAnimationFrame(frame); }
      else if (!vis) { running = false; }
    }, { threshold: 0.02 }).observe(hero);
  }

  start();
})();
