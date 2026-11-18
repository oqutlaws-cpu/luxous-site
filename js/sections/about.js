/* SECTION ABOUT: tampilan + logika */
let ti, tt;
function typeIt() {
  const p = $("#typ");
  clearInterval(ti);
  clearTimeout(tt);
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
    p.textContent = AT;
    return;
  }
  p.textContent = "";
  let i = 0;
  tt = setTimeout(() => {
    ti = setInterval(() => {
      p.textContent = AT.slice(0, ++i);
      if (i >= AT.length) clearInterval(ti);
    }, 26);
  }, 800);
}
/* timeline menyala saat di-scroll: garis terisi, node + kartu menyala satu per satu */
let afx = 0,
  araf = 0;
function aboutLit() {
  const tl = $("#v-about .tl");
  if (!tl || !tl.offsetParent) return;
  const r = tl.getBoundingClientRect(),
    line = innerHeight * 0.72; /* garis acuan di layar */
  const full = r.height + 44;
  tl.style.setProperty("--p", Math.max(0, line - r.top + 22).toFixed(0));
  tl.style.setProperty("--full", full.toFixed(0));
  let cur = null;
  $$("#v-about .ti").forEach((t) => {
    const n = t.querySelector(".tn").getBoundingClientRect(),
      on = n.top + n.height / 2 < line;
    /* warna kartu = warna garis di posisinya: merah (atas) -> warna tema/kuning (bawah) */
    const f = Math.min(1, Math.max(0, (n.top + n.height / 2 - r.top + 22) / full));
    t.style.setProperty(
      "--ab",
      `color-mix(in srgb, var(--ab0) ${(f * 100).toFixed(0)}%, var(--r))`,
    );
    t.classList.toggle("lit", on);
    t.classList.remove("cur");
    if (on) cur = t;
  });
  cur && cur.classList.add("cur");
}
function aboutFx() {
  const tl = $("#v-about .tl");
  if (!tl || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  tl.classList.add("fx");
  if (!afx) {
    afx = 1;
    /* scroll tidak menggelembung, jadi pakai capture supaya wadah scroll mana pun tertangkap */
    document.addEventListener(
      "scroll",
      () => {
        cancelAnimationFrame(araf);
        araf = requestAnimationFrame(aboutLit);
      },
      true,
    );
  }
  setTimeout(aboutLit, 60);
}
register({
  id: "about",
  label: "About",
  html: `<section class="v" id="v-about"><div class="ab"><div><i class="big rise" data-logo style="--i:0"></i><h1 class="gl rise" data-t="Luxous" style="--i:1">Luxous</h1><p class="mono rise" style="--i:2">We play and live here, and killing was the fun part.</p><div class="dlg rise" style="--i:3"><b class="d">About</b><p id="typ"></p><div class="fac" id="fac" role="group" aria-label="Fasilitas Luxous"></div></div><div class="bars rise" id="bars" style="--i:4"></div></div><div class="ap rise" id="ap" style="--i:3"></div></div></section>`,
  init() {
    const h = $("#v-about h1.gl");
    if (h) {
      h.textContent = "Uxous";
      h.dataset.t = "Uxous";
      h.setAttribute("aria-label", "Luxous");
    }
    /* icon Fasilitas di dalam kartu About (isi/link diatur di data/footer.js) */
    const fac = $("#fac");
    fac && typeof ftIcons === "function" && (fac.innerHTML = ftIcons());
    $("#bars").innerHTML = (typeof AB !== "undefined" ? AB : [])
      .map(
        (b) =>
          `<div class="br"><span class="mono">${b[0]}</span><i><b style="--w:${b[1]}%"></b></i></div>`,
      )
      .join("");
    /* roadmap */
    if (typeof ABRM !== "undefined" && typeof ABBD !== "undefined") {
      /* ikon per kartu (urutan sama dengan ABRM); kartu "Survivor" pakai IC[7] */
      const IC = [
        '<svg viewBox="0 0 24 24"><path d="M5 21V4M5 4h13l-3 4 3 4H5"/></svg>' /* berdiri */,
        '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>' /* Luxe Mysterious */,
        '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>' /* Era Luxous */,
        '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5M10.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5"/></svg>' /* dua generasi */,
        '<svg viewBox="0 0 24 24"><circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/></svg>' /* kolaborasi */,
        '<svg viewBox="0 0 24 24"><path d="M12 3l9.5 17h-19zM12 3v17"/></svg>' /* pyramid */,
        '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="1.5"/><path d="M12 8l3 4-3 4-3-4z"/></svg>' /* kartu / Borderland */,
        '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8c-2-4-6-3-5 0 .5 1.5 3 1 5 0zM12 8c2-4 6-3 5 0-.5 1.5-3 1-5 0z"/></svg>' /* Survivor */,
      ];
      const item = (n, ic, g, h, body) =>
        `<div class="ti"><span class="tn d">${n}</span><div class="tc"><i class="tic">${ic}</i><span class="mono">${g}</span><h3>${h}</h3>${body}<i class="tbar"></i><i class="tcr"></i></div></div>`;
      $("#v-about .ab").insertAdjacentHTML(
        "beforeend",
        `<section class="rm rise" style="--i:5">
          <h2>History</h2>
          <p class="mono">Perjalanan Luxous dari awal sampai sekarang</p>
          <div class="tl">${ABRM.map((r, i) =>
            item(pad(i + 1), IC[i % (IC.length - 1)], r.g, r.h, `<p>${r.p}</p>`),
          ).join("")}${item(
            "◆",
            IC[IC.length - 1],
            "Survivor",
            "B U D A Y A",
            `<div class="chips">${ABBD.map((n) => `<b class="d">${n}</b>`).join("")}</div>`,
          )}</div>
        </section>`,
      );
    }
  },
  enter() {
    typeIt();
    aboutFx();
  },
  resize() {
    aboutLit();
  },
});