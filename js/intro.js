/* OPENING: logo + "UXOUS" (muncul huruf demi huruf). Dipanggil dari <head> index.html, jalan sendiri.
   - muncul sekali per kunjungan (tab/jendela baru), tidak muncul lagi saat pindah menu atau refresh
   - bisa dilewati dengan klik / sentuh / tombol keyboard apa saja
   - dilewati otomatis kalau pengunjung memakai setelan "kurangi animasi"
   Mau lihat lagi untuk uji coba: tambahkan ?intro di alamat (mis. 127.0.0.1:5500/index.html?intro), atau buka tab Incognito baru. */
(function () {
  var KEY = "luxous-intro",
    root = document.documentElement,
    seen = false;
  try {
    seen = sessionStorage.getItem(KEY) === "1";
  } catch (e) {}
  var force = /[?&]intro\b/.test(location.search); /* index.html?intro = paksa tampil (untuk uji coba) */
  if (!force && (seen || matchMedia("(prefers-reduced-motion:reduce)").matches)) return;
  root.classList.add("intro-on");
  new Image().src = "assets/Logo_Luxous.png"; /* muat logo lebih awal */
  var ov,
    timers = [],
    ended = false;
  var T = function (f, ms) {
    timers.push(setTimeout(f, ms));
  };
  function end() {
    if (ended) return;
    ended = true;
    timers.forEach(clearTimeout);
    removeEventListener("keydown", end);
    ov && ov.remove();
    root.classList.remove("intro-on");
  }
  function start() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch (e) {}
    ov = document.createElement("div");
    ov.id = "intro";
    ov.setAttribute("aria-hidden", "true");
    ov.innerHTML =
      '<div class="in-lk"><img class="in-lg" src="assets/Logo_Luxous.png" alt=""><div class="in-tx" data-t="UXOUS">' +
      "UXOUS".split("").map(function (c) {
        return "<span>" + c + "</span>";
      }).join("") +
      "</div></div>";
    document.body.appendChild(ov);
    root.classList.remove("intro-on"); /* lapisan sudah menutup layar, isi web boleh "hidup" di baliknya */
    ov.onclick = end;
    addEventListener("keydown", end);
    var tx = ov.querySelector(".in-tx");
    tx.querySelectorAll("span").forEach(function (s, i) {
      T(function () {
        s.classList.add("in");
      }, 1250 + i * 150);
    });
    T(function () {
      tx.classList.add("in-g");
    }, 2550);
    T(function () {
      ov.classList.add("out");
    }, 3500);
    T(end, 4500);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();