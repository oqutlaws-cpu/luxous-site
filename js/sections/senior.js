/* SECTION SENIOR: tampilan + logika */
/* warna tiap file diambil dari tema poster Generasi (gTheme / gShot di generasi.js).
   SC = palet cadangan kalau generasi.js belum termuat */
const SC = ["#c41212", "#ffc918", "#e9e4da"],
  TY = ["12%", "24%", "36%", "18%", "46%", "30%"];
/* warna teks yang terbaca di atas warna tema (terang -> teks gelap) */
const sTxt = (c) => {
  if (!/^#[0-9a-f]{6}$/i.test(c)) return "#fff";
  const n = parseInt(c.slice(1), 16),
    y = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return y > 150 ? "#111" : "#fff";
};
/* versi lebih pekat & gelap dari warna tema (untuk latar tab) */
const sDeep = (c) => {
  if (!/^#[0-9a-f]{6}$/i.test(c)) return c;
  const n = parseInt(c.slice(1), 16),
    r = (n >> 16) / 255,
    g = ((n >> 8) & 255) / 255,
    b = (n & 255) / 255,
    mx = Math.max(r, g, b),
    mn = Math.min(r, g, b),
    d = mx - mn;
  let h = 0,
    l = (mx + mn) / 2,
    st = d ? d / (1 - Math.abs(2 * l - 1) || 1) : 0;
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
  if (d > 0.12)
    st = Math.max(st, 0.8); /* warna pucat/abu-abu tidak dipaksa jadi warna */
  l = Math.min(Math.max(l * 0.8, 0.3), 0.4);
  const a = st * Math.min(l, 1 - l),
    f = (k) => {
      const q = (k + h / 30) % 12;
      return l - a * Math.max(-1, Math.min(q - 3, 9 - q, 1));
    },
    x = (v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, "0");
  return "#" + x(f(0)) + x(f(8)) + x(f(4));
};
/* nama tema generasi: ambil dari data generasi (G) field t / tema / theme; kalau belum diisi, tampil "Generasi 07" */
const sEsc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch],
  );
const sName = (g, i) => {
  const e = typeof gG === "function" ? gG(i) || {} : {};
  return (
    e.t ||
    e.tema ||
    e.theme ||
    g.t ||
    g.tema ||
    g.theme ||
    "Generasi " + pad(g.n)
  );
};
/* kecilkan judul besar kalau satu kata masih terlalu lebar (nama tema panjang tidak terpotong) */
function fitT() {
  $$("#files .tt h3").forEach((h) => {
    h.style.fontSize = "";
    let s = parseFloat(getComputedStyle(h).fontSize);
    while (h.scrollWidth > h.clientWidth + 1 && s > 18) {
      s -= 1;
      h.style.fontSize = s + "px";
    }
  });
}
const sBase = (i) => (typeof gTheme === "function" ? gTheme(i) : SC[i % 3]);
const sApply = (el, c) => {
  el.style.setProperty("--c", c);
  el.style.setProperty("--k", sTxt(c));
  el.style.setProperty("--d", sDeep(c));
};
register({
  id: "senior",
  label: "Survivor",
  html: `<section class="v" id="v-senior"><div class="wrap"><h2 class="rise">Survivor</h2><p class="mono rise" style="--i:1">Buka file untuk melihat survivor di tiap generasi.</p><div class="files rise" id="files" style="--i:2"></div></div></section>`,
  init() {
    $("#files").innerHTML = G.map((g, i) => {
      const n = pad(g.n),
        ms = SEN[g.n] || [],
        c0 = sBase(i),
        tn = sEsc(sName(g, i));
      return `<div class="sf${i ? "" : " act"}" style="--c:${c0};--k:${sTxt(c0)};--d:${sDeep(c0)};--ty:${TY[i % 6]};--z:${i + 1}"><b class="stb">${tn}</b><div class="sc"><span class="svt">${tn}</span><div class="spg"><div class="sh"><b>${n}</b><div>SURVIVOR<small>ARSIP GENERASI</small></div></div><div class="dash"></div><div class="mr"><span>ARSIP SURVIVOR</span><span>${pad(i + 1)} / ${pad(G.length)}</span></div><div class="tt"><span class="cd">CODE_${n} // SURVIVOR</span><h3>${tn}</h3><p>ARSIP SURVIVOR<br>GENERASI ${n}</p></div><div class="gr">${ms.map((m) => `<div class="mc"><div class="bk"><i>${m.i ? `<img src="${m.i}" alt="${m.a}">` : '<span class="ph">FOTO</span>'}</i></div><h4>${m.a}</h4><small>${m.r}</small></div>`).join("")}</div><div class="sb"><span>DAFTAR SURVIVOR</span><span>${pad(ms.length)} ORANG</span></div></div></div></div>`;
    }).join("");
    /* ambil warna dominan poster (sama seperti Generasi); kalau G[i].c diisi manual, itu yang dipakai */
    $$("#files .sf").forEach((el, i) => {
      const g = G[i],
        manual = typeof gG === "function" && gG(i).c;
      if (manual || !g.p || typeof gShot !== "function") return;
      gShot(g.p).then((c) => c && sApply(el, c));
    });
    fitT();
    $("#files").onclick = (e) => {
      const f = e.target.closest(".sf");
      if (!f || f.classList.contains("act")) return;
      $$(".sf").forEach((x) => x.classList.toggle("act", x === f));
      setTimeout(
        () =>
          f.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          }),
        950,
      );
    };
  },
  enter() {
    fitT();
  },
  resize() {
    fitT();
  },
});
