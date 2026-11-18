/* INTI: fungsi bantu, perpindahan antar section, background 3D. Biasanya tidak perlu diubah. */
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  pad = (n) => String(n).padStart(2, "0");
const LOGO = '<img src="assets/Logo_Luxous.png" alt="Luxous" style="width:50px;height:50px;object-fit:contain;">';
const sil = () =>
  '<svg viewBox="0 0 100 220" fill="currentColor"><circle cx="50" cy="26" r="17"/><path d="M26 52h48l8 70H70l-4 96H54l-4-60-4 60H34l-4-96H18z"/></svg>';
const SECTIONS = [],
  register = (s) => SECTIONS.push(s),
  sec = (id) => SECTIONS.find((s) => s.id === id);
let cur;
const sw = $("#sw"),
  hh = () =>
    document.documentElement.style.setProperty(
      "--hh",
      $("#hd").offsetHeight + "px",
    );
function go(id, first) {
  if (!sec(id)) id = "about";
  if (id === cur) return;
  const o = sec(cur);
  o && o.leave && o.leave();
  if (!first) {
    sw.classList.remove("go");
    void sw.offsetWidth;
    sw.classList.add("go");
  }
  const on = $(".v.on");
  on && on.classList.remove("on");
  const v = $("#v-" + id);
  v.scrollTop = 0;
  v.classList.add("on");
  cur = id;
  $$("nav a").forEach((a) => a.classList.toggle("on", a.dataset.p === id));
  const n = sec(id);
  n.enter && n.enter();
}
/* background 3D */
const cv = $("#bg3"),
  cx = cv.getContext("2d");
const CB = [...Array(18)].map(() => ({
  x: Math.random() * 2 - 1,
  y: Math.random() * 2 - 1,
  z: 0.7 + Math.random() * 1.5,
  s: 0.07 + Math.random() * 0.12,
  a: Math.random() * 6,
  b: Math.random() * 6,
  v: 0.003 + Math.random() * 0.006,
  c: Math.random() < 0.6 ? "#c41212" : "#ffc918",
}));
const E = [
  [0, 1],
  [1, 3],
  [3, 2],
  [2, 0],
  [4, 5],
  [5, 7],
  [7, 6],
  [6, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];
let tx = 0,
  ty = 0,
  rx = 0,
  ry = 0;
addEventListener("pointermove", (e) => {
  tx = e.clientX / innerWidth - 0.5;
  ty = e.clientY / innerHeight - 0.5;
});
function fr() {
  requestAnimationFrame(fr);
  const w = innerWidth,
    h = innerHeight,
    d = Math.min(devicePixelRatio || 1, 2),
    T = Date.now() / 3000;
  if (cv.width !== Math.round(w * d)) {
    cv.width = Math.round(w * d);
    cv.height = Math.round(h * d);
  }
  cx.setTransform(d, 0, 0, d, 0, 0);
  cx.clearRect(0, 0, w, h);
  rx += (tx + Math.sin(T) * 0.08 - rx) * 0.05;
  ry += (ty + Math.cos(T * 0.8) * 0.06 - ry) * 0.05;
  const sc = Math.max(w, h) * 0.55;
  CB.forEach((c) => {
    c.a += c.v;
    c.b += c.v * 1.3;
    c.z -= 0.0015;
    if (c.z < 0.6) c.z = 2.2;
    const Q = [];
    for (let i = 0; i < 8; i++) {
      let x = (i & 1 ? 1 : -1) * c.s,
        y = (i & 2 ? 1 : -1) * c.s,
        z = (i & 4 ? 1 : -1) * c.s,
        t = x * Math.cos(c.a) - z * Math.sin(c.a);
      z = x * Math.sin(c.a) + z * Math.cos(c.a);
      x = t;
      t = y * Math.cos(c.b) - z * Math.sin(c.b);
      z = y * Math.sin(c.b) + z * Math.cos(c.b);
      y = t;
      x += c.x - rx * 1.4;
      y += c.y - ry * 1.4;
      z += c.z;
      Q.push([w / 2 + (x * sc) / z, h / 2 + (y * sc) / z]);
    }
    cx.strokeStyle = c.c;
    cx.globalAlpha = Math.min(0.45, 0.38 / c.z);
    cx.lineWidth = 1.4;
    cx.beginPath();
    E.forEach(([i, j]) => {
      cx.moveTo(Q[i][0], Q[i][1]);
      cx.lineTo(Q[j][0], Q[j][1]);
    });
    cx.stroke();
  });
}
matchMedia("(prefers-reduced-motion:reduce)").matches || fr();
