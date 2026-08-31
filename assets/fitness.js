// ============================================================
//  Fitness page — shared chrome + the in-session workout logger.
//
//  The logger lives entirely in sessionStorage: it survives an
//  accidental refresh but is wiped when the tab closes. Nothing is
//  uploaded, persisted to the repo, or shared anywhere.
// ============================================================

/* Day templates. Targets reflect the Weeks 1-4 foundation block —
   they are hints only, every field stays editable. */
const DAY_PLAN = [
  { id: "mon", label: "Mon — Lower (Strength)", work: [
    { name: "Trap-Bar Jump",           target: "3 × 3",  sets: 3 },
    { name: "Back Squat",              target: "4 × 6",  sets: 4 },
    { name: "Romanian Deadlift",       target: "4 × 6",  sets: 4 },
    { name: "Bulgarian Split Squat",   target: "3 × 10", sets: 3 },
    { name: "Leg Press",               target: "3 × 12", sets: 3 },
    { name: "Seated Leg Curl",         target: "3 × 12", sets: 3 },
    { name: "Standing Calf Raise",     target: "3 × 15", sets: 3 }
  ]},
  { id: "tue", label: "Tue — Upper (Push)", work: [
    { name: "Rotational Scoop Throw",  target: "3 × 5/side", sets: 3 },
    { name: "Barbell Bench Press",     target: "4 × 6",  sets: 4 },
    { name: "Incline Dumbbell Press",  target: "3 × 10", sets: 3 },
    { name: "Seated DB Shoulder Press",target: "3 × 10", sets: 3 },
    { name: "Cable Lateral Raise",     target: "3 × 15", sets: 3 },
    { name: "Overhead Triceps Ext.",   target: "3 × 12", sets: 3 },
    { name: "Rope Pushdown",           target: "3 × 15", sets: 3 }
  ]},
  { id: "wed", label: "Wed — Active recovery", work: [
    { name: "Bat Swings / Tee Work",   target: "25 min", sets: 1, type: "time" },
    { name: "Thoracic Rotation",       target: "5 min",  sets: 1, type: "time" },
    { name: "Hip Flexor Mobility",     target: "5 min",  sets: 1, type: "time" },
    { name: "Zone 2 Cardio",           target: "30 min", sets: 1, type: "time" },
    { name: "Mobility Flow",           target: "10 min", sets: 1, type: "time" },
    { name: "Easy Walk",               target: "20 min", sets: 1, type: "time" }
  ]},
  { id: "thu", label: "Thu — Full body + conditioning", work: [
    { name: "Overhead-to-Floor Slam",  target: "3 × 4/side", sets: 3 },
    { name: "Landmine Rotation",       target: "3 × 6/side", sets: 3 },
    { name: "Deadlift",                target: "4 × 6",  sets: 4 },
    { name: "DB Walking Lunge",        target: "3 × 12", sets: 3 },
    { name: "Pull-Up",                 target: "3 × 8",  sets: 3 },
    { name: "Dumbbell Bench Press",    target: "3 × 10", sets: 3 },
    { name: "Cable Row",               target: "3 × 12", sets: 3 },
    { name: "Conditioning Finisher",   target: "12 min", sets: 1, type: "time" }
  ]},
  { id: "fri", label: "Fri — Upper (Pull)", work: [
    { name: "High-to-Low Cable Chop",  target: "3 × 5/side", sets: 3 },
    { name: "Barbell Row",             target: "4 × 6",  sets: 4 },
    { name: "Lat Pulldown",            target: "3 × 10", sets: 3 },
    { name: "Chest-Supported Row",     target: "3 × 12", sets: 3 },
    { name: "Face Pull",               target: "3 × 15", sets: 3 },
    { name: "EZ-Bar Curl",             target: "3 × 12", sets: 3 },
    { name: "Hammer Curl",             target: "3 × 15", sets: 3 },
    { name: "Dead Hang",               target: "2 × 45s",sets: 2, type: "time" }
  ]},
  { id: "sat", label: "Sat — Lower (Hypertrophy + core)", work: [
    { name: "Hack Squat",              target: "3 × 10", sets: 3 },
    { name: "Barbell Hip Thrust",      target: "3 × 12", sets: 3 },
    { name: "Leg Extension",           target: "3 × 15", sets: 3 },
    { name: "Lying Leg Curl",          target: "3 × 15", sets: 3 },
    { name: "Hanging Leg Raise",       target: "3 × 15", sets: 3 },
    { name: "Pallof Press",            target: "3 × 20s/side", sets: 3, type: "time" },
    { name: "Suitcase Carry",          target: "2 × 40 m/side", sets: 2, type: "time" },
    { name: "Plate Pinch",             target: "2 × 30s",sets: 2, type: "time" }
  ]},
  { id: "sun", label: "Sun — Rest + refeed", work: [] }
];

const KEY = "fitSession";
const WEEKDAY = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const Logger = (() => {
  let state, tick = null, rest = null;

  /* ---------------- state ---------------- */
  function blank(dayId) {
    const day = DAY_PLAN.find(d => d.id === dayId) || DAY_PLAN[0];
    return {
      day: day.id,
      startedAt: null,
      finishedMs: null,
      exercises: day.work.map(w => ({
        name: w.name,
        target: w.target,
        type: w.type || "lift",
        sets: Array.from({ length: w.sets }, () => ({ kg: "", reps: "", done: false }))
      }))
    };
  }

  function load() {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* corrupt or blocked storage — fall through to a fresh session */ }
    return blank(WEEKDAY[new Date().getDay()]);
  }

  function save() {
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  /* ---------------- helpers ---------------- */
  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, "0");

  function clockText(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return (h ? h + ":" + pad(m) : pad(m)) + ":" + pad(s % 60);
  }

  function elapsed() {
    if (state.finishedMs != null) return state.finishedMs;
    return state.startedAt ? Date.now() - state.startedAt : 0;
  }

  function totals() {
    let sets = 0, vol = 0, exs = new Set();
    state.exercises.forEach((ex, i) => ex.sets.forEach(s => {
      if (!s.done) return;
      sets++; exs.add(i);
      if (ex.type === "lift") vol += (parseFloat(s.kg) || 0) * (parseInt(s.reps, 10) || 0);
    }));
    return { sets, vol, exs: exs.size };
  }

  function refreshStats() {
    const t = totals();
    $("statSets").textContent = t.sets;
    $("statVol").textContent = Math.round(t.vol).toLocaleString() + " kg";
    $("statEx").textContent = t.exs;
  }

  /* ---------------- session clock ---------------- */
  function paintClock() {
    const el = $("logClock");
    el.textContent = clockText(elapsed());
    el.classList.toggle("is-live", !!state.startedAt && state.finishedMs == null);
  }

  function runClock() {
    if (tick) clearInterval(tick);
    if (state.startedAt && state.finishedMs == null) tick = setInterval(paintClock, 1000);
    paintClock();
  }

  /* ---------------- rest timer ---------------- */
  function beep() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx(), osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.frequency.value = 880; osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(); osc.stop(ctx.currentTime + 0.4);
      setTimeout(() => ctx.close(), 600);
    } catch (e) { /* audio unavailable — the visual countdown still works */ }
  }

  function stopRest() {
    if (rest) { clearInterval(rest); rest = null; }
    $("restBar").hidden = true;
    $("restBar").classList.remove("is-done");
  }

  function startRest() {
    const secs = parseInt($("logRest").value, 10);
    /* Clear any running timer first — otherwise switching to "off"
       mid-session would leave the previous bar stranded on screen. */
    stopRest();
    if (!secs) return;
    const bar = $("restBar"), fill = $("restFill"), label = $("restTime");
    const endAt = Date.now() + secs * 1000;
    bar.hidden = false;

    const paint = () => {
      const left = Math.max(0, endAt - Date.now());
      const s = Math.ceil(left / 1000);
      label.textContent = Math.floor(s / 60) + ":" + pad(s % 60);
      fill.style.width = (left / (secs * 1000)) * 100 + "%";
      if (left <= 0) {
        clearInterval(rest); rest = null;
        bar.classList.add("is-done");
        label.textContent = "Rest done";
        beep();
        setTimeout(() => { if (!rest) stopRest(); }, 4000);
      }
    };
    paint();
    rest = setInterval(paint, 250);
  }

  /* ---------------- rendering ---------------- */
  function render() {
    const list = $("logList");
    list.innerHTML = "";

    if (!state.exercises.length) {
      list.innerHTML = '<div class="fit-empty">Rest day — nothing scheduled. ' +
        'Pick another day above, or use <strong>+ Add exercise</strong> if you are training anyway.</div>';
      refreshStats();
      return;
    }

    state.exercises.forEach((ex, ei) => {
      const time = ex.type === "time";
      const card = document.createElement("article");
      card.className = "fit-ex";

      const head = document.createElement("div");
      head.className = "fit-ex__head";
      head.innerHTML =
        '<span class="fit-ex__name"></span>' +
        '<span class="fit-ex__target"></span>' +
        '<button class="fit-ex__kill" title="Remove exercise" aria-label="Remove exercise">✕</button>';
      head.querySelector(".fit-ex__name").textContent = ex.name;
      head.querySelector(".fit-ex__target").textContent = "target " + ex.target;
      head.querySelector(".fit-ex__kill").addEventListener("click", () => {
        state.exercises.splice(ei, 1); save(); render();
      });
      card.appendChild(head);

      const cols = document.createElement("div");
      cols.className = "fit-set__row-head" + (time ? " fit-set__row-head--time" : "");
      cols.innerHTML = time
        ? "<span>Set</span><span>Minutes</span><span>Done</span>"
        : "<span>Set</span><span>kg</span><span>Reps</span><span>Done</span>";
      card.appendChild(cols);

      ex.sets.forEach((set, si) => card.appendChild(setRow(ex, ei, set, si, time)));

      const add = document.createElement("button");
      add.className = "fit-btn fit-btn--sm fit-ex__addset";
      add.textContent = "+ Add set";
      add.addEventListener("click", () => {
        ex.sets.push({ kg: "", reps: "", done: false }); save(); render();
      });
      card.appendChild(add);
      list.appendChild(card);
    });

    refreshStats();
  }

  function setRow(ex, ei, set, si, time) {
    const row = document.createElement("div");
    row.className = "fit-set" + (time ? " fit-set--time" : "") + (set.done ? " is-done" : "");

    const n = document.createElement("span");
    n.className = "fit-set__n";
    n.textContent = si + 1;
    row.appendChild(n);

    const field = (val, ph, key, mode) => {
      const i = document.createElement("input");
      i.className = "fit-set__in";
      i.type = "number"; i.min = "0"; i.step = key === "kg" ? "0.5" : "1";
      i.inputMode = mode; i.placeholder = ph; i.value = val;
      i.setAttribute("aria-label", ph + ", " + ex.name + " set " + (si + 1));
      /* Input only mutates state — no re-render, so focus is never stolen mid-typing. */
      i.addEventListener("input", () => { set[key] = i.value; save(); refreshStats(); });
      return i;
    };

    if (time) {
      row.appendChild(field(set.reps, "min", "reps", "decimal"));
    } else {
      row.appendChild(field(set.kg, "kg", "kg", "decimal"));
      row.appendChild(field(set.reps, "reps", "reps", "numeric"));
    }

    const done = document.createElement("button");
    done.className = "fit-set__done";
    done.textContent = "✓";
    done.setAttribute("aria-pressed", String(set.done));
    done.setAttribute("aria-label", "Complete set " + (si + 1) + " of " + ex.name);
    done.addEventListener("click", () => {
      set.done = !set.done;
      row.classList.toggle("is-done", set.done);
      done.setAttribute("aria-pressed", String(set.done));
      if (set.done && !state.startedAt) begin();
      if (set.done) startRest(); else stopRest();
      save(); refreshStats();
    });
    row.appendChild(done);
    return row;
  }

  /* ---------------- actions ---------------- */
  function begin() {
    state.startedAt = Date.now();
    state.finishedMs = null;
    $("logStart").textContent = "▶ Running";
    save(); runClock();
  }

  function finish() {
    if (!state.startedAt) { alert("Start the session first — or just tick a set and it starts itself."); return; }
    state.finishedMs = Date.now() - state.startedAt;
    if (tick) { clearInterval(tick); tick = null; }
    stopRest();
    paintClock();

    const t = totals();
    const box = document.createElement("div");
    box.className = "fit-summary";
    box.innerHTML =
      "<h3>Session complete 💪</h3>" +
      '<div class="fit-summary__grid">' +
        '<div class="fit-stat fit-stat--sm"><span class="fit-stat__label">Duration</span><span class="fit-stat__value">' + clockText(state.finishedMs) + "</span></div>" +
        '<div class="fit-stat fit-stat--sm"><span class="fit-stat__label">Sets</span><span class="fit-stat__value">' + t.sets + "</span></div>" +
        '<div class="fit-stat fit-stat--sm"><span class="fit-stat__label">Volume</span><span class="fit-stat__value">' + Math.round(t.vol).toLocaleString() + " kg</span></div>" +
        '<div class="fit-stat fit-stat--sm"><span class="fit-stat__label">Exercises</span><span class="fit-stat__value">' + t.exs + "</span></div>" +
      "</div>";

    const list = $("logList");
    const old = list.previousElementSibling;
    if (old && old.classList.contains("fit-summary")) old.remove();
    list.parentNode.insertBefore(box, list);
    box.scrollIntoView({ behavior: "smooth", block: "center" });
    save();
  }

  function reset(dayId) {
    if (tick) { clearInterval(tick); tick = null; }
    stopRest();
    const box = document.querySelector(".fit-summary");
    if (box) box.remove();
    state = blank(dayId || state.day);
    $("logStart").textContent = "▶ Start session";
    $("logDay").value = state.day;
    save(); render(); runClock();
  }

  /* ---------------- boot ---------------- */
  function init() {
    if (!document.getElementById("logList")) return;
    state = load();

    const sel = $("logDay");
    DAY_PLAN.forEach(d => sel.add(new Option(d.label, d.id)));
    sel.value = state.day;

    sel.addEventListener("change", () => {
      const dirty = state.startedAt || state.exercises.some(e => e.sets.some(s => s.done || s.kg || s.reps));
      if (dirty && !confirm("Switch day and clear the current session?")) { sel.value = state.day; return; }
      reset(sel.value);
    });

    $("logStart").addEventListener("click", () => { if (!state.startedAt) begin(); });
    $("logFinish").addEventListener("click", finish);
    $("logReset").addEventListener("click", () => {
      if (confirm("Clear this session and start over?")) reset(state.day);
    });
    $("restSkip").addEventListener("click", stopRest);
    $("logRest").addEventListener("change", () => {
      if (!parseInt($("logRest").value, 10)) stopRest();
    });

    $("logAddEx").addEventListener("click", () => {
      const name = (prompt("Exercise name") || "").trim();
      if (!name) return;
      state.exercises.push({ name, target: "3 × 10", type: "lift",
        sets: [{ kg: "", reps: "", done: false }, { kg: "", reps: "", done: false }, { kg: "", reps: "", done: false }] });
      save(); render();
      document.querySelector(".fit-ex:last-child").scrollIntoView({ behavior: "smooth", block: "center" });
    });

    if (state.startedAt) $("logStart").textContent = "▶ Running";
    render();
    runClock();
  }

  return { init };
})();

/* ---------------- tabs ---------------- */
function initTabs() {
  const tabs = [...document.querySelectorAll(".fit-tab")];
  if (!tabs.length) return;

  const show = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => show(tab));
    tab.addEventListener("keydown", e => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      show(next); next.focus();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Site.initChrome();
  initTabs();
  Logger.init();
  Site.observeReveals();
});

