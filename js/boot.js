/* BOOT: pasang semua section, lalu jalankan. Biasanya tidak perlu diubah. */
$("#app").insertAdjacentHTML("beforeend", SECTIONS.map((s) => s.html).join(""));
$("#nv").innerHTML = SECTIONS.map(
  (s) => `<a href="#${s.id}" data-p="${s.id}">${s.label}</a>`,
).join("");
$$("[data-logo]").forEach((e) => (e.innerHTML = LOGO));
SECTIONS.forEach((s) => s.init && s.init());
/* footer + strip Fasilitas: dipasang setelah semua section (supaya jatuh paling bawah) */
typeof mountFooter === "function" && mountFooter();
$$("nav a,.lg,.mi").forEach(
  (a) =>
    (a.onclick = (e) => {
      e.preventDefault();
      location.hash = a.getAttribute("href").slice(1);
    }),
);
$$("[data-go]").forEach(
  (b) => (b.onclick = () => (location.hash = b.dataset.go)),
);
addEventListener("hashchange", () => go(location.hash.slice(1)));
const rs = () => {
  hh();
  SECTIONS.forEach((s) => s.resize && s.resize());
};
addEventListener("resize", rs);
addEventListener("keydown", (e) => {
  const s = sec(cur);
  s && s.key && s.key(e);
});
hh();
document.fonts && document.fonts.ready.then(rs);
go(location.hash.slice(1), 1);
