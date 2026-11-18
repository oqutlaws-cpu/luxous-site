/* SECTION MANAGEMENT: tampilan + logika */
let dv = "Game Maker", // tab utama
  sv = null, // sub-tab (hanya Guardian)
  mi = 0,
  mc = 0,
  moved = 0,
  lt = 0,
  sx = null;
let wh;

const hasSub = (k) => !Array.isArray(D[k]);

/* daftar anggota aktif, bentuk seragam {n: nama, r: jabatan} */
function getM() {
  const v = D[dv];
  if (Array.isArray(v)) return v.map((n) => ({ n, r: dv }));
  return v[sv].map((n) => ({ n, r: dv + " · " + sv }));
}

/* geser indikator merah di tab utama & sub-tab */
function moveI() {
    const dt = $("#dt"), st = $("#st");                       
    if (dt && st && dt.offsetWidth) st.style.width = dt.offsetWidth + "px"; 
  ["#dt"].forEach((id) => {
    const box = $(id),
      b = $(id + " button.on"),
      i = $(id + " i");
    if (!box || box.hidden || !b || !i) return;
    i.style.width = b.offsetWidth + "px";
    i.style.transform = `translateX(${b.offsetLeft}px)`;
  });
}

/* kecilkan huruf nama kalau satu kata masih terlalu lebar (nama hanya pindah baris antar kata, tidak pernah terpotong) */
function fitName() {
  const h = $("#mp h3");
  if (!h) return;
  h.style.fontSize = "";
  let s = parseFloat(getComputedStyle(h).fontSize);
  while (h.scrollWidth > h.clientWidth + 1 && s > 14) {
    s -= 1;
    h.style.fontSize = s + "px";
  }
}

function closeSd() {
  const box = $("#st");
  if (!box) return;
  box.classList.remove("open");
  const b = $("#st .sd-btn");
  b && b.setAttribute("aria-expanded", "false");
}

/* bangun dropdown sub-divisi; sembunyikan kalau divisi tidak punya sub */
function buildS() {
  const box = $("#st"),
    v = D[dv];
  box.hidden = !hasSub(dv);
  if (box.hidden) {
    sv = null;
    return;
  }
  const keys = Object.keys(v);
  if (!keys.includes(sv)) sv = keys[0];
  box.classList.remove("open");
  box.innerHTML =
    `<button class="sd-btn" type="button" aria-haspopup="listbox" aria-expanded="false"><span>${sv}</span><small>${v[sv].length}</small><b>▾</b></button>` +
    `<div class="sd-list" role="listbox">` +
    keys
      .map(
        (k) =>
          `<button type="button" role="option" class="${k === sv ? "on" : ""}${v[k].length ? "" : " empty"}" data-s="${k}">${k}<small>${v[k].length}</small></button>`,
      )
      .join("") +
    `</div>`;
}

function buildW() {
  const m = getM();
  if (!m.length) {
    $("#wg").innerHTML = "";
    return;
  }
  const st = 360 / m.length,
    // 1 anggota = busur hampir 360°, wajib large-arc-flag = 1
    big = st - 3 > 180 ? 1 : 0,
    pt = (r, a) => {
      a *= Math.PI / 180;
      return (r * Math.sin(a)).toFixed(1) + " " + (-r * Math.cos(a)).toFixed(1);
    };
  $("#wg").innerHTML = m
    .map((r, i) => {
      const a = i * st,
        a0 = a - st / 2 + 1.5,
        a1 = a + st / 2 - 1.5;
      return `<g class="w" data-i="${i}"><path d="M${pt(198, a0)}A198 198 0 ${big} 1 ${pt(198, a1)}L${pt(80, a1)}A80 80 0 ${big} 0 ${pt(80, a0)}Z"/><text transform="rotate(${a}) translate(0,-132) rotate(-90)" text-anchor="middle" dominant-baseline="middle" class="d">${pad(i + 1)}</text></g>`;
    })
    .join("");
}

function setM(k) {
  const m = getM(),
    n = m.length,
    lbl = sv || dv;
  if (!n) {
    mi = 0;
    $("#mp").innerHTML =
      `<div class="fig">${sil()}</div><div class="in"><p class="mono">${lbl} 00/00</p><h3>Belum ada</h3><p>Slot ini masih kosong</p></div>`;
    return;
  }
  mi = (k + n) % n;
  mc += ((((90 - (mi * 360) / n - mc) % 360) + 540) % 360) - 180;
  $("#wg").style.transform = `rotate(${mc}deg)`;
  $$(".w").forEach((w, i) => w.classList.toggle("act", i === mi));
  $("#mp").innerHTML =
    `<div class="fig">${PHOTO[m[mi].n] ? `<img src="${PHOTO[m[mi].n]}" alt="${m[mi].n}">` : sil()}</div><div class="in"><p class="mono">${lbl} ${pad(mi + 1)}/${pad(n)}</p><h3>${m[mi].n}</h3><p>${m[mi].r}</p></div>`;
  fitName();
}

register({
  id: "management",
  label: "Management",
  html: `<section class="v" id="v-management"><div class="wrap"><h2 class="rise">Management</h2><p class="mono rise" style="--i:1">Pilih divisi, lalu putar roda atau ketuk potongannya.</p><div class="tabs rise" id="dt" style="--i:2"></div><div class="sd rise" id="st" style="--i:3" hidden></div><div class="mg"><svg id="wheel" viewBox="-230 -230 460 460" aria-label="Roda pengurus"><g id="wg"></g><polygon points="206,0 224,-10 224,10" fill="#ffc918"/><circle r="66" fill="#0c0b0d" stroke="#ffc91855"/></svg><div id="mp"></div></div></div></section>`,
  init() {
    $("#dt").innerHTML =
      "<i></i>" +
      Object.keys(D)
        .map(
          (k, i) =>
            `<button class="${k === dv ? "on" : ""}" data-k="${k}">${k}<small>${i + 1}</small></button>`,
        )
        .join("");
    $("#dt").onclick = (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      dv = b.dataset.k;
      $$("#dt button").forEach((x) => x.classList.toggle("on", x === b));
      buildS();
      moveI();
      buildW();
      setM(0);
    };
    $("#st").onclick = (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.classList.contains("sd-btn")) {
        const o = $("#st").classList.toggle("open");
        b.setAttribute("aria-expanded", o);
        return;
      }
      sv = b.dataset.s;
      buildS(); // rebuild = label baru + dropdown menutup
      buildW();
      setM(0);
    };
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#st")) closeSd();
    });
    wh = $("#wheel");
    wh.onclick = (e) => {
      if (moved) {
        moved = 0;
        return;
      }
      const w = e.target.closest(".w");
      w && setM(+w.dataset.i);
    };
    wh.onpointerdown = (e) => (sx = e.clientY);
    wh.onpointerup = (e) => {
      if (sx != null && Math.abs(e.clientY - sx) > 35) {
        moved = 1;
        setM(mi + (e.clientY < sx ? 1 : -1));
      }
      sx = null;
    };
    wh.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        if (Date.now() - lt < 500) return;
        lt = Date.now();
        setM(mi + (e.deltaY > 0 ? 1 : -1));
      },
      { passive: false },
    );
    buildS();
    buildW();
    setM(0);
  },
  enter() {
    moveI();
    fitName();
  },
  resize() {
    moveI();
    fitName();
  },
  key(e) {
    if (e.key === "Escape") closeSd();
    if (e.key === "ArrowRight" || e.key === "ArrowLeft")
      setM(mi + (e.key === "ArrowRight" ? 1 : -1));
    const t = $$("#dt button")[+e.key - 1];
    if (t) t.click();
  },
});