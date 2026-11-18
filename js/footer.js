/* FOOTER + icon FASILITAS: dirender dari data/footer.js (FT). Icon dipasang dari about.js (ftIcons), footer di akhir halaman About dan Survivor. */
const ftEsc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const ftOk = (u) => /^https?:\/\//i.test(u || "");
const FT_IC = {
  chat: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12.5h5"/></svg>',
  store: '<svg viewBox="0 0 24 24"><path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9c0 2 3.5 2 4 0 .5 2 3.5 2 4 0 .5 2 3.5 2 4 0 .5 2 4 2 4 0M10 20v-6h4v6"/></svg>',
  note: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M8 9h8M8 13h8M8 17h4"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/></svg>',
};
/* atribut link: aktif kalau alamatnya sah, redup kalau masih kosong */
const ftHref = (l) =>
  ftOk(l.u)
    ? `href="${ftEsc(l.u)}" target="_blank" rel="noopener noreferrer"`
    : `aria-disabled="true" tabindex="-1" title="Link segera diisi"`;
const ftOff = (l) => (ftOk(l.u) ? "" : " off");
/* deretan icon di dalam kartu About: hanya icon, klik langsung membuka link (nama muncul sebagai tooltip) */
function ftIcons() {
  return `${FT.links
    .map(
      (l) =>
        `<a class="fac-i${ftOff(l)}" style="--ac:${ftEsc(l.c || "#ffc918")}" aria-label="${ftEsc(l.t)}" title="${ftEsc(ftOk(l.u) ? l.t : l.t + " (segera hadir)")}" ${ftHref(l)}>${FT_IC[l.ic] || ""}</a>`,
    )
    .join("")}`;
}
function ftBar() {
  return `<footer class="ft"><div class="ft-row"><div class="ft-lg">${LOGO}<div><b class="d">Luxous</b><small class="mono">${ftEsc(FT.tag)}</small></div></div></div></footer>`;
}
function mountFooter() {
  if (document.querySelector(".ft")) return; /* sudah terpasang */
  const ab = $("#v-about"),
    sn = $("#v-senior");
  ab && ab.insertAdjacentHTML("beforeend", ftBar());
  sn && sn.insertAdjacentHTML("beforeend", ftBar());
}
/* dipasang sendiri setelah boot.js selesai menyusun halaman (tidak bergantung pada boot.js) */
setTimeout(mountFooter, 0);