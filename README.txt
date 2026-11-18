LUXOUS - struktur file (dipisah per bagian)
===========================================
index.html              kerangka halaman (header, background, memuat semua file)

css/base.css            dasar: warna, font, header, perpindahan halaman, tombol
css/about.css           tampilan About
css/management.css      tampilan Management (roda)
css/senior.css          tampilan Senior (file tab)
css/generasi.css        tampilan Generasi (rak kaset + poster)
css/sistem.css          tampilan Sistem (zigzag)
css/fasilitas.css       tampilan Fasilitas

js/data/*.js            ISI DATA - edit di sini
  about.js              teks About, bar status, menu utama
  management.js         jabatan per divisi
  generasi.js           nomor generasi + poster
  senior.js             nama, jabatan, foto senior tiap generasi
  sistem.js             langkah-langkah sistem
  fasilitas.js          daftar tempat + link

js/sections/*.js        kode tiap bagian (tampilan HTML + animasi), satu file per bagian
js/core.js              inti: perpindahan halaman + background 3D (jarang diubah)
js/boot.js              penyambung yang menjalankan semuanya (jarang diubah)

assets/posters/         taruh poster tiap generasi
assets/seniors/         taruh foto senior

Cara pasang poster / foto:
  poster generasi : js/data/generasi.js  ->  p:'assets/posters/gen07.jpg'
  foto senior     : js/data/senior.js    ->  i:'assets/seniors/gen07-1.jpg'

Font: Cinzel + Poppins (Google Fonts, butuh internet saat dibuka).
Buka index.html langsung di browser, atau upload semua isi folder ke hosting.
Catatan: file lama css/style.css, js/script.js, js/data.js tidak dipakai lagi, boleh dihapus.
