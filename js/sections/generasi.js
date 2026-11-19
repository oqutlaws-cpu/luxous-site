/* SECTION GENERASI: tampilan + logika */
/* muat data isi generasi: generasi-data.js, satu folder dengan file ini */
(() => {
  const cs = document.currentScript;
  if (window.GENERASI_DATA || !cs || !cs.src) return;
  const s = document.createElement("script");
  s.src = cs.src.replace(/[^/?#]*([?#].*)?$/, "generasi-data.js");
  document.head.appendChild(s);
})();
const AC = ["#c41212", "#ffc918", "#e9e4da", "#2a272e", "#c41212", "#7d0c0c"],
  AK = ["#fff", "#111", "#111", "#ffc918", "#ffc918", "#fff"];
/* palet cadangan untuk glow rak / tema (dipakai kalau warna poster gagal diambil) */
const GL = ["#c41212", "#ffc918", "#e9e4da", "#ffc918", "#c41212", "#9a1010"];

/* ---------- helper ---------- */
const gTC = []; /* warna tema hasil ekstraksi poster */
const gCur0 = { i: 0 };
let gsI = 0 /* stage aktif */,
  gsMoved = 0; /* true setelah geser, supaya klik ikutan tidak membuka lightbox */
const gEsc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const gIsVid = (s) => /\.(mp4|webm|ogv)(\?|$)/i.test(s || "");
const gMedia = (src, alt) =>
  gIsVid(src)
    ? `<video src="${src}" muted loop autoplay playsinline preload="metadata" aria-label="${gEsc(alt)}"></video>`
    : `<img src="${src}" alt="${gEsc(alt)}">`;
const gPlay = (root) =>
  [...root.querySelectorAll("video")].forEach((v) => {
    v.muted = true;
    const p = v.play();
    p && p.catch(() => {});
  });
/* gabungan data isi (generasi-data.js) + G; nilai kosong di G tidak menimpa data */
const gG = (i) => {
  const o = Object.assign({}, (window.GENERASI_DATA || {})[G[i].n]);
  for (const k in G[i]) {
    const v = G[i][k];
    if (v == null || v === "" || (Array.isArray(v) && !v.length)) continue;
    o[k] = v;
  }
  return o;
};
/* urutan prioritas: field c manual > hasil ekstraksi poster > palet */
const gTheme = (i) => gG(i).c || gTC[i] || GL[i % 6];
const gSetG = (i) => {
  const r = $(".gd-rack");
  r && r.style.setProperty("--g", gTheme(i));
};
const gReduce = () => matchMedia("(prefers-reduced-motion:reduce)").matches;

/* ---------- ekstraksi warna tema dari poster ---------- */
function gNorm(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const mx = Math.max(r, g, b),
    mn = Math.min(r, g, b),
    d = mx - mn;
  let h = 0;
  if (d) {
    h =
      mx === r
        ? ((g - b) / d) % 6
        : mx === g
          ? (b - r) / d + 2
          : (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  let l = (mx + mn) / 2,
    s = d ? d / (1 - Math.abs(2 * l - 1) || 1) : 0;
  s = Math.min(0.9, Math.max(0.62, s));
  l = Math.min(0.58, Math.max(0.48, l));
  const a = s * Math.min(l, 1 - l),
    f = (n) => {
      const k = (n + h / 30) % 12;
      return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    },
    x = (v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, "0");
  return "#" + x(f(0)) + x(f(8)) + x(f(4));
}
function gPick(d) {
  const B = Array.from({ length: 24 }, () => ({ w: 0, r: 0, g: 0, b: 0 }));
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i],
      g = d[i + 1],
      b = d[i + 2];
    if (d[i + 3] < 200) continue;
    const mx = Math.max(r, g, b),
      mn = Math.min(r, g, b),
      c = mx - mn,
      l = (mx + mn) / 510;
    if (l < 0.12 || l > 0.92 || c < 40)
      continue; /* buang gelap, terang, abu-abu */
    let h =
      mx === r
        ? ((g - b) / c) % 6
        : mx === g
          ? (b - r) / c + 2
          : (r - g) / c + 4;
    h = (h * 60 + 360) % 360;
    const o = B[Math.floor(h / 15) % 24],
      w = c * c; /* makin jenuh makin berbobot */
    o.w += w;
    o.r += r * w;
    o.g += g * w;
    o.b += b * w;
  }
  let bi = 0,
    bs = -1;
  B.forEach((o, k) => {
    const s = o.w + 0.5 * (B[(k + 1) % 24].w + B[(k + 23) % 24].w);
    if (s > bs) {
      bs = s;
      bi = k;
    }
  });
  const o = B[bi];
  if (!o.w || bs < (d.length / 4) * 1600 * 0.02)
    return null; /* warna terlalu sedikit */
  return gNorm(o.r / o.w, o.g / o.w, o.b / o.w);
}
function gShot(src) {
  return new Promise((ok) => {
    const done = (el) => {
      try {
        const c = document.createElement("canvas");
        c.width = c.height = 48;
        const x = c.getContext("2d", { willReadFrequently: true });
        x.drawImage(el, 0, 0, 48, 48);
        ok(gPick(x.getImageData(0, 0, 48, 48).data));
      } catch (e) {
        ok(null); /* mis. file:// -> canvas diblokir, pakai palet */
      }
    };
    setTimeout(() => ok(null), 8000);
    if (gIsVid(src)) {
      const v = document.createElement("video");
      v.muted = true;
      v.playsInline = true;
      v.crossOrigin = "anonymous";
      v.preload = "auto";
      v.onloadeddata = () => {
        v.currentTime = Math.min(1, (v.duration || 2) / 2);
      };
      v.onseeked = () => done(v);
      v.onerror = () => ok(null);
      v.src = src;
    } else {
      const im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = () => done(im);
      im.onerror = () => ok(null);
      im.src = src;
    }
  });
}

/* ---------- poster penuh ---------- */
function openP(i, e) {
  const g = G[i],
    p = $("#poster");
  p.style.setProperty("--ox", (e.clientX || innerWidth / 2) + "px");
  p.style.setProperty("--oy", (e.clientY || innerHeight / 2) + "px");
  $("#pb").innerHTML = g.p
    ? gMedia(g.p, `Poster Generasi ${pad(g.n)}`)
    : `<div class="pz"><h2 class="big d">${pad(g.n)}</h2><h3>Generasi ${pad(g.n)}</h3><p class="mono">Ganti dengan poster asli</p></div>`;
  gPlay($("#pb"));
  p.classList.add("on");
}
const closeP = () => $("#poster").classList.remove("on");

/* ---------- halaman detail generasi ---------- */
const gCover = (i) => {
  const g = G[i],
    n = pad(g.n);
  return g.p
    ? gMedia(g.p, `Poster Generasi ${n}`)
    : `<div class="pc"><b class="d">${n}</b><small class="d">Generasi ${n}</small></div>`;
};
/* ---------- stage (menggantikan daftar anggota) ----------
   Isi di generasi-data.js, per generasi:
   stages: [{ t: "Stage One", img: "assets/generasi/13/stage-1.avif", note: "kesan stage ini...", link: "https://padlet.com/..." }, ...]
   Item terakhir boleh "Teamwork" (foto tim management + masukan trainee), bentuk datanya sama. */
const gsList = (i) => [].concat(gG(i).stages || []).filter(Boolean);
const gsUrl = (u) => (/^https?:\/\//i.test(u || "") ? gEsc(u) : "");
const gsImg = (s) =>
  s.img
    ? `<img src="${gEsc(s.img)}" alt="${gEsc(s.t || "Stage")}" decoding="async">`
    : `<div class="gs-ph">Gambar belum ada</div>`;
const gsNote = (s) =>
  `<span class="mono">Kisah balik</span><h4 class="gs-nt d">${gEsc(s.t || "Stage")}</h4><p class="gs-tx${s.note ? "" : " gd-ph"}">${gEsc(s.note || "Kisah balik stage ini belum diisi.")}</p>${gsUrl(s.link) ? `<a class="gs-ln" href="${gsUrl(s.link)}" target="_blank" rel="noopener noreferrer">Buka di Padlet ↗</a>` : ""}`;
function gStages(i, n) {
  const L = gsList(i);
  if (!L.length)
    return `<div class="gd-mem gd-stg gd-st" style="--s:4"><div class="gd-mh"><div class="gd-mt d">Stage</div></div><p class="mono gd-empty">Stage Generasi ${n} belum diisi.</p></div>`;
  const one = L.length < 2 ? " one" : "",
    s = L[0];
  return `<div class="gd-mem gd-stg gd-st${one}" style="--s:4"><div class="gd-mh"><div class="gd-mt d">Stage</div><span class="mono">${L.length} bagian</span></div>
<div class="gs-view"><div class="gs-img swap" title="Klik untuk memperbesar">${gsImg(s)}</div><button type="button" class="gs-ar p" data-gsd="-1" aria-label="Sebelumnya">‹</button><button type="button" class="gs-ar n" data-gsd="1" aria-label="Berikutnya">›</button><span class="gs-cnt mono">${pad(1)} / ${pad(L.length)}</span></div>
<div class="gs-tabs">${L.map((x, k) => `<button type="button" class="gs-th${k ? "" : " act"}" data-gs="${k}" aria-label="${gEsc(x.t || "Stage " + (k + 1))}">${x.img ? `<img src="${gEsc(x.img)}" alt="" loading="lazy" decoding="async">` : ""}<span>${gEsc(x.t || "Stage " + (k + 1))}</span></button>`).join("")}</div>
<div class="gs-note">${gsNote(s)}</div></div>`;
}
function gDetail(i) {
  const g = gG(i),
    n = pad(g.n),
    pv = G[i - 1],
    nx = G[i + 1];
  const info = [
    `<div class="gd-no d gd-st" style="--s:0">${n}</div>`,
    `<div class="gd-t d gd-st" style="--s:1" role="heading" aria-level="2">${gEsc(g.t || "Generasi " + n)}</div>`,
    `<p class="gd-y mono gd-st" style="--s:2">Generasi ${n}${g.y ? " · " + gEsc(g.y) : ""}</p>`,
    `<p class="gd-d gd-st${g.d ? "" : " gd-ph"}" style="--s:3">${gEsc(g.d || "Deskripsi Generasi " + n + " belum diisi. Isi di generasi-data.js.")}</p>`,
  ].join("");
  return `<div class="gd-hero"><button type="button" class="gd-cover" style="--a:${AC[i % 6]};--k:${AK[i % 6]}" aria-label="Buka poster Generasi ${n}">${gCover(i)}</button><div class="gd-info">${info}</div></div>
${gStages(i, n)}
<div class="gd-nav">${pv ? `<button type="button" class="gb" data-gd="${i - 1}">← ${pad(pv.n)}</button>` : "<span></span>"}${nx ? `<button type="button" class="gb" data-gd="${i + 1}">${pad(nx.n)} →</button>` : "<span></span>"}</div>`;
}
/* pindah stage: ganti gambar, kesan, thumbnail aktif (tanpa render ulang seluruh detail) */
function gStage(k, dir) {
  const L = gsList(gCur0.i);
  if (!L.length) return;
  k = (k + L.length) % L.length;
  const d = dir || (k >= gsI ? 1 : -1),
    s = L[k],
    v = $("#gd .gs-view"),
    im = $("#gd .gs-img");
  gsI = k;
  if (v && im) {
    v.style.setProperty("--dir", d);
    im.innerHTML = gsImg(s);
    im.classList.remove("swap");
    void im.offsetWidth;
    im.classList.add("swap");
    $("#gd .gs-cnt").textContent = `${pad(k + 1)} / ${pad(L.length)}`;
    $("#gd .gs-note").innerHTML = gsNote(s);
    $$("#gd .gs-th").forEach((b, j) => b.classList.toggle("act", j === k));
    const act = $("#gd .gs-th.act");
    act && act.scrollIntoView({ block: "nearest", inline: "center", behavior: gReduce() ? "auto" : "smooth" });
  }
  $("#gs-lb").classList.contains("on") && gsLbFill();
}
/* lightbox gambar stage: melebar dari titik klik (seperti poster) */
function gsLbFill() {
  const L = gsList(gCur0.i),
    s = L[gsI];
  if (!s) return;
  $("#gs-in").innerHTML = `${gsImg(s)}<div id="gs-cap" class="mono">${gEsc(s.t || "Stage")} · ${pad(gsI + 1)} / ${pad(L.length)}</div>`;
  $("#gs-lb").classList.toggle("one", L.length < 2);
}
function gsLb(open, e) {
  const lb = $("#gs-lb");
  if (!open) return lb.classList.remove("on");
  lb.style.setProperty("--ox", ((e && e.clientX) || innerWidth / 2) + "px");
  lb.style.setProperty("--oy", ((e && e.clientY) || innerHeight / 2) + "px");
  lb.style.setProperty("--th", gTheme(gCur0.i));
  gsLbFill();
  lb.classList.add("on");
}
function gRender(i) {
  const d = $("#gd");
  gCur0.i = i;
  gsI = 0;
  d.style.setProperty("--th", gTheme(i));
  $("#gdb").innerHTML = gDetail(i);
  gPlay(d);
}
/* sampul "terbang" dari satu kotak ke kotak lain */
function gFly(i, a, b, end) {
  const f = document.createElement("div"),
    box = (r) => ({
      left: r.left + "px",
      top: r.top + "px",
      width: r.width + "px",
      height: r.height + "px",
    });
  f.className = "gd-fly";
  f.style.cssText = `--a:${AC[i % 6]};--k:${AK[i % 6]}`;
  Object.assign(f.style, box(a));
  f.innerHTML = gCover(i);
  document.body.appendChild(f);
  gPlay(f);
  const an = f.animate([box(a), box(b)], {
    duration: 760,
    easing: "cubic-bezier(.7,0,.2,1)",
    fill: "forwards",
  });
  an.onfinish = an.oncancel = () => {
    f.remove();
    end();
  };
}
function openD(i, s) {
  const d = $("#gd"),
    src = s.getBoundingClientRect();
  d.scrollTop = 0;
  d.classList.remove("ready");
  gRender(i);
  d.classList.add("on");
  if (gReduce()) {
    d.classList.add("ready");
    return;
  }
  d.classList.add("fly");
  const dst = d.querySelector(".gd-cover").getBoundingClientRect();
  gFly(i, src, dst, () => {
    d.classList.remove("fly");
    d.classList.add("ready");
  });
  $("#gdx").focus({ preventScroll: true });
}
function closeD(now) {
  const d = $("#gd");
  if (!d.classList.contains("on")) return;
  const cv = d.querySelector(".gd-cover"),
    a = cv.getBoundingClientRect(),
    s = document.querySelector(`.sp[data-i="${gCur0.i}"]`),
    seen = a.bottom > 0 && a.top < innerHeight;
  if (now || gReduce() || !seen || !s) {
    d.classList.remove("on", "ready", "fly");
    return;
  }
  s.scrollIntoView({ behavior: "instant", inline: "center", block: "nearest" });
  const b = s.getBoundingClientRect();
  d.classList.add("fly");
  d.classList.remove("on", "ready");
  gFly(gCur0.i, a, b, () => d.classList.remove("fly"));
  s.focus({ preventScroll: true });
}
function swapD(j) {
  if (!G[j]) return;
  const d = $("#gd");
  $$(".sp").forEach((x) => x.classList.toggle("act", +x.dataset.i === j));
  gSetG(j);
  d.classList.remove("ready");
  d.scrollTop = 0;
  gRender(j);
  void d.offsetWidth;
  d.classList.add("ready");
}

/* klik kaset = tarik keluar sampulnya; klik sampul yang sudah keluar = buka detail generasi */
function pick(s, e) {
  if (s.classList.contains("act")) {
    openD(+s.dataset.i, s);
    return;
  }
  $$(".sp").forEach((x) => x.classList.toggle("act", x === s));
  gSetG(+s.dataset.i);
  setTimeout(
    () =>
      s.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      }),
    650,
  );
}
register({
  id: "generasi",
  label: "Generasi",
  html: `<section class="v" id="v-generasi"><div class="wrap"><h2 class="rise">Generasi</h2><p class="mono rise" style="--i:1">Pilih kaset untuk melihat sampulnya, klik sampul untuk membuka detail generasi.</p></div><div class="gd-rack rise" style="--i:2"><div class="shelf" id="shelf"></div><div class="gd-board"></div></div></section><div id="poster"><button type="button" id="px" class="gb gx" aria-label="Tutup poster">✕<kbd>Esc</kbd></button><div id="pb"></div></div><div id="gd" role="dialog" aria-modal="true" aria-label="Detail generasi"><div class="gd-bg"></div><button type="button" id="gdx" class="gb gx" aria-label="Tutup detail, kembali ke rak"><span aria-hidden="true">←</span> Rak<kbd>Esc</kbd></button><div id="gdb"></div></div><div id="gs-lb" role="dialog" aria-modal="true" aria-label="Gambar stage"><button type="button" id="gs-x" class="gb gx" aria-label="Tutup gambar">✕<kbd>Esc</kbd></button><button type="button" class="gs-ar p" data-gsl="-1" aria-label="Sebelumnya">‹</button><div id="gs-in"></div><button type="button" class="gs-ar n" data-gsl="1" aria-label="Berikutnya">›</button></div>`,
  init() {
    $("#shelf").innerHTML = G.map((g, i) => {
      const n = pad(g.n);
      return `<div class="sp${i ? "" : " act"}${g.p ? "" : " np"}" tabindex="0" data-i="${i}" style="--n:${i};--a:${AC[i % 6]};--k:${AK[i % 6]}${g.pos ? `;--pos:${g.pos}` : ""}"><span class="d">Generasi ${n}</span><div class="cv">${g.p ? gMedia(g.p, `Sampul Generasi ${n}`) : `<div class="pc"><b class="d">${n}</b><small class="d">Generasi ${n}</small></div>`}</div></div>`;
    }).join("");
    gPlay($("#shelf"));
    $("#shelf").onclick = (e) => {
      const s = e.target.closest(".sp");
      s && pick(s, e);
    };
    $("#shelf").onkeydown = (e) => {
      const s = e.target.closest(".sp");
      if (s && e.key === "Enter") pick(s, e);
    };
    $("#px").onclick = closeP;
    $("#gd").onclick = (e) => {
      const t = e.target;
      if (t.closest("#gdx")) return closeD();
      const go = t.closest("[data-gd]");
      if (go) return swapD(+go.dataset.gd);
      const th = t.closest("[data-gs]");
      if (th) return gStage(+th.dataset.gs);
      const ar = t.closest("[data-gsd]");
      if (ar) return gStage(gsI + +ar.dataset.gsd, +ar.dataset.gsd);
      if (t.closest(".gs-img")) {
        if (gsMoved) return (gsMoved = 0);
        return gsLb(true, e);
      }
      if (t.closest(".gd-cover")) openP(gCur0.i, e);
    };
    /* geser kiri/kanan di gambar stage untuk pindah */
    let gx = null;
    $("#gd").addEventListener("pointerdown", (e) => {
      gx = e.target.closest(".gs-img") ? e.clientX : null;
    });
    $("#gd").addEventListener("pointerup", (e) => {
      if (gx == null) return;
      const dx = e.clientX - gx;
      gx = null;
      if (Math.abs(dx) > 50) {
        gsMoved = 1;
        gStage(gsI + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      }
    });
    $("#gs-lb").onclick = (e) => {
      const t = e.target,
        a = t.closest("[data-gsl]");
      if (a) return gStage(gsI + +a.dataset.gsl, +a.dataset.gsl);
      if (t.closest("#gs-x") || t.id === "gs-lb" || t.id === "gs-in") gsLb(false);
    };
    gSetG(0);
    /* ambil warna tema tiap poster (kalau G[i].c kosong) */
    G.forEach((g, i) => {
      if (g.c || !g.p) return;
      gShot(g.p).then((c) => {
        if (!c) return;
        gTC[i] = c;
        const a = $$(".sp").findIndex((x) => x.classList.contains("act"));
        if (a === i) gSetG(i);
        if (gCur0.i === i && $("#gd").classList.contains("on"))
          $("#gd").style.setProperty("--th", c);
      });
    });
  },
  leave() {
    gsLb(false);
    closeP();
    closeD(true);
  },
  key(e) {
    const on = (q) => $(q).classList.contains("on");
    if (on("#gs-lb")) {
      const k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (e.key === "Escape") gsLb(false);
      else if (k) gStage(gsI + k, k);
      return;
    }
    if (e.key === "Escape") {
      if (on("#poster")) closeP();
      else if (on("#gd")) closeD();
      return;
    }
    if (on("#poster")) return;
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (on("#gd")) {
      d && swapD(gCur0.i + d);
      return;
    }
    const a = $$(".sp"),
      i = a.findIndex((x) => x.classList.contains("act"));
    if (d && a[i + d]) pick(a[i + d], e);
  },
});