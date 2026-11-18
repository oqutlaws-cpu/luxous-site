(() => {
  const stg = (n, img = []) => [
    { t: "Stage One", img: img[0] || "", note: "", link: "" },
    { t: "Stage Two", img: img[1] || "", note: "", link: "" },
    { t: "Stage Three", img: img[2] || "", note: "", link: "" },
    { t: "Teamwork", img: img[3] || "", note: "", link: "" },
  ];
  /* gambar generasi yang sudah ada: urutan [stage 1, stage 2, stage 3, teamwork] */
  const im = (n, ...f) => f.map((x) => (x ? `assets/generasi/${n}/${x}` : ""));
  const d = (n) => `Tulis deskripsi Generasi ${n} di sini.`;

  window.GENERASI_DATA = {
    7: { 
      t: "Alice in Borderland", 
      y: "Agustus 2025", 
      d: "Mengadaptasi konsep survival game dari dunia Alice in Borderland, generasi ini menghadirkan rangkaian permainan yang mengandalkan keberuntungan, kreativitas, dan kemampuan berpikir strategis. Peserta dihadapkan pada tantangan berbasis angka, interpretasi petunjuk visual, hingga mekanisme pertukaran informasi. Setiap permainan dirancang untuk menguji ketepatan dalam mengambil keputusan serta kemampuan membaca peluang di tengah ketidakpastian.", 
      stages: [
        {
          t: "Stage One",
          img: "assets/Stage/7, 1.webp",
          note: "Keberuntungan dan strategi menjadi kunci dalam permainan angka. Sistem pemilihan kartu, perhitungan angka, serta peluang risiko menentukan jalannya permainan.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/j40PQDn48p8PWvXB",
        },
        {
          t: "Stage Two",
          img: "assets/Stage/7, 2.webp",
          note: "Kreativitas dan imajinasi menjadi inti dari tantangan menyusun cerita. Rangkaian emoji menjadi petunjuk utama dalam membentuk narasi dengan beragam interpretasi.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/mDRxWBDpYP7bQjb1",
        },
        {
          t: "Stage Three",
          img: "assets/Stage/7, 3.webp",
          note: "Logika dan strategi menjadi kunci dalam mekanisme jual beli teka-teki. Sistem pertukaran clue dan transaksi informasi menghadirkan tantangan dalam menemukan jawaban yang tepat..",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/E1P8aX11JPRyQwA9",
        },
        {
          t: "Teamwork",
          img: "assets/Stage/7, 4.avif",
          note: "Kesan, apresiasi, serta saran peserta terhadap kinerja teamwork Luxous sebagai bahan evaluasi dan pengembangan untuk generasi selanjutnya.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/MbejW17X5db2QNkG",
        },
      ],
    },
    8: { 
      t: "Squid Game", 
      y: "September 2025", 
      d: "Terinspirasi dari serial Squid Game, generasi ini membawa konsep kompetisi bertahan hidup melalui berbagai permainan dengan aturan dan batasan tertentu. Peserta dihadapkan pada tantangan perebutan ruang, permainan estafet, perburuan simbol, hingga pengambilan keputusan berdasarkan kepercayaan dan strategi kelompok. Setiap tahap menuntut kecepatan, koordinasi, daya ingat, serta kemampuan membaca dinamika antarpeserta.", 
      stages: [
        {
          t: "Stage One",
          img: "assets/Stage/8, 1.avif",
          note: "Mekanisme perebutan ruang aman berlangsung melalui sistem eliminasi, perubahan posisi, dan keterbatasan slot. Kecepatan serta ketepatan menjadi faktor utama dalam menentukan hasil setiap ronde.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/PR3NWxgXyJy2Zb0O",
        },
        {
          t: "Stage Two",
          img: "assets/Stage/8, 2.avif",
          note: "Serangkaian permainan estafet berlangsung dengan sistem penyelesaian tantangan secara berkelompok. Kekompakan, koordinasi, dan kecepatan menjadi aspek utama dalam menentukan hasil permainan.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/lkROZP1P9KMXWjMg",
        },
        {
          t: "Stage Three",
          img: "assets/Stage/8, 3.avif",
          note: "Permainan kejar-mengejar berlangsung dengan mekanisme berburu, bersembunyi, dan mengumpulkan simbol. Sistem nyawa serta ancaman antarpemain menjadi bagian dari jalannya permainan.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/NvylWErgyOEqa0OX",
        },
        {
          t: "Stage Four",
          img: "assets/Stage/8, 4.avif",
          note: "Mekanisme permainan berpusat pada pola pilihan kanan dan kiri yang ditentukan oleh para perwakilan. Daya ingat dan ketepatan pilihan menjadi faktor penentu dalam sistem bertahan dan eliminasi.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/kxodWG1gvrq0QgP7",
        },
        {
          t: "Stage Five",
          img: "assets/Stage/8, 5.avif",
          note: "Permainan akhir berlangsung melalui diskusi, strategi, hasutan, dan sistem voting. Kepercayaan serta dinamika antaranggota menjadi bagian utama dalam menentukan hasil akhir permainan.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/NvylWErgy9nwa0OX",
        },
        {
          t: "Teamwork",
          img: "assets/Stage/8, 6.avif",
          note: "Kesan, apresiasi, serta saran peserta terhadap kinerja teamwork Luxous sebagai bahan evaluasi dan pengembangan untuk generasi selanjutnya.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/9kmlZVrOqwjVZpgV",
        },
      ],
    },
    9: { 
      t: "Buckshot Roulette", 
      y: "Desember 2025", 
      d: "Mengusung inspirasi dari permainan Buckshot Roulette, generasi ini berpusat pada konsep risiko, probabilitas, dan pengambilan keputusan. Suasana permainan dibangun melalui ketidakpastian serta konsekuensi dari setiap pilihan yang diambil. Peserta dituntut untuk mempertimbangkan peluang, membaca situasi, dan menentukan langkah secara cermat sebelum mengambil keputusan berikutnya.", 
      stages: [
        {
          t: "Stage One",
          img: "assets/Stage/9, 1.jpg",
          note: "",
          link: "",
        },
        {
          t: "Stage Two",
          img: "assets/Stage/9, 2.jpg",
          note: "",
          link: "",
        },
        {
          t: "Stage Three",
          img: "assets/Stage/9, 3.jpg",
          note: "",
          link: "",
        },
      ],
    },
    10: { 
      t: "Hunger Games", 
      y: "Februari 2026", 
      d: "Mengambil inspirasi dari dunia Hunger Games, generasi ini menggabungkan unsur kompetisi, eksplorasi, dan pemecahan masalah. Peserta dihadapkan pada permainan yang menguji keberuntungan melalui dadu, ketelitian dalam pencarian objek tersembunyi, serta kemampuan menganalisis rangkaian teka-teki. Setiap tantangan menghadirkan situasi yang berbeda dan membutuhkan kombinasi intuisi, observasi, serta penalaran untuk mencapai tujuan.", 
      stages: [
        {
          t: "Stage One",
          img: "assets/Stage/10, 1.avif",
          note: "Keberuntungan dan intuisi menjadi faktor utama dalam permainan dadu dan ular tangga. Strategi perwakilan, pemilihan langkah, serta kejutan di setiap ronde menghadirkan dinamika permainan yang penuh ketidakpastian.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/lkROZPAK99N3WjMg",
        },
        {
          t: "Stage Two",
          img: "assets/Stage/10, 2.avif",
          note: "Ketelitian dan kejelian menjadi kunci dalam misi pencarian cinnamon. Penyebaran petunjuk di berbagai tempat serta tingkat kesulitan dalam menemukan objek tersembunyi menghadirkan tantangan observasi dan investigasi.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/lkDVaK6wDDPxWPp9",
        },
        {
          t: "Stage Three",
          img: "assets/Stage/10, 3.avif",
          note: "Logika dan kemampuan analisis menjadi inti dalam memecahkan rangkaian teka-teki. Narasi penuh petunjuk, distraksi, dan teka-teki berlapis menghadirkan tantangan interpretasi yang membutuhkan ketelitian serta diskusi untuk menemukan jawaban.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/v3w8ZwGzx7woZN52",
        },
      ],
    },
    11: { 
      t: "The 8 Show", 
      y: "Mei 2026", 
      d: "Terinspirasi dari konsep The 8 Show, generasi ini mengangkat unsur hiburan, kreativitas, dan interaksi sosial sebagai inti permainan. Peserta diberikan ruang untuk menunjukkan kemampuan melalui tantangan unjuk bakat, produksi pertunjukan drama, hingga berbagai aktivitas interaktif. Tidak hanya mengandalkan keterampilan individu, generasi ini juga menekankan kreativitas kolektif, pembagian peran, dan kemampuan beradaptasi dalam menyelesaikan tantangan.",
      stages: [
        {
          t: "Stage One",
          img: "assets/Stage/11, 1.webp",
          note: "Kreativitas dan ekspresi diri menjadi inti dari tantangan unjuk bakat. Beragam bentuk penampilan, mulai dari menyanyi, mengedit, hingga demonstrasi keterampilan, menjadi bagian dari sistem penilaian melalui perolehan reaction.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/x5m7aoLP6ovwQkAV",
        },
        {
          t: "Stage Two",
          img: "assets/Stage/11, 2.avif",
          note: "Kekompakan dan kreativitas menjadi kunci dalam produksi pertunjukan drama antarkasta. Pemilihan tema, penyusunan alur cerita, pembagian peran, hingga persiapan penampilan menjadi rangkaian proses yang dibatasi oleh waktu dan koordinasi tim.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/PR3NWxoM2Y01Zb0O",
        },
        {
          t: "Stage Three",
          img: "assets/Stage/11, 3.avif",
          note: "Keberanian dan kreativitas menjadi inti dari rangkaian tantangan dalam setiap kotak. Variasi dare, mulai dari unjuk bakat, membuat deskripsi, hingga aktivitas interaktif dan kill time, menghadirkan mekanisme permainan yang fleksibel dengan tingkat tantangan berbeda.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/94PGWnoDgerVaLRV",
        },
      ],
    },
    12: { 
      t: "Tebusan Patih", 
      y: "Agustus 2026", 
      d: "Mengangkat nuansa budaya dan unsur mistis dalam latar tradisi Nusantara, generasi ini menghadirkan petualangan yang berpusat pada eksplorasi, investigasi, dan pelaksanaan ritual. Peserta harus memahami petunjuk berbahasa daerah, menyusun peta, menelusuri labirin, serta mengumpulkan artefak dan bahan yang diperlukan. Seluruh rangkaian permainan menggabungkan pengetahuan budaya, kemampuan observasi, negosiasi, dan strategi untuk menyelesaikan misi utama.", 
      stages: [
        {
          t: "Stage One",
          img: "assets/Stage/12, 1.avif",
          note: "Ketelitian dan pemahaman bahasa menjadi inti dalam proses pengisian wadah. Pembagian wilayah, pencarian kuncen, serta rangkaian pertanyaan menggunakan bahasa daerah menjadi mekanisme utama untuk memperoleh perlengkapan yang dibutuhkan pada tahap berikutnya.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/x5m7aovj9xJyWkAV",
        },
        {
          t: "Stage Two",
          img: "assets/Stage/12, 2.avif",
          note: "Observasi dan ketelitian menjadi kunci dalam menyusun peta serta menemukan jalur keluar. Pencarian potongan puzzle melalui katalog guardian, penyatuan peta, penelusuran labirin, hingga pencarian artefak menjadi rangkaian tantangan yang menguji kemampuan investigasi dan pemecahan masalah.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/mDRxWBDXwgKyQjb1",
        },
        {
          t: "Stage Three",
          img: "assets/Stage/12, 3.avif",
          note: "Strategi dan kemampuan negosiasi menjadi inti dalam mempersiapkan ritual. Pencarian bahan, aktivitas jual beli dan barter melalui merchant, pengelolaan Luxon, hingga peracikan mantra dan pelaksanaan ritual menjadi rangkaian mekanisme yang membutuhkan perencanaan serta pengambilan keputusan.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/E851Q0qp5g4dZVAb",
        },
        {
          t: "Teamwork",
          img: "assets/Stage/12, 4.avif",
          note: "Kesan, apresiasi, serta saran peserta terhadap kinerja teamwork Luxous sebagai bahan evaluasi dan pengembangan untuk generasi selanjutnya.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/0BA3ZpbJqyvbanPb",
        },
      ],
    },
    13: {
      t: "Colony",
      y: "Ocotober 2026",
      d: "Mengusung latar dunia pasca-apokaliptik dengan ancaman penyebaran wabah, generasi ini membawa peserta ke dalam situasi eksperimen dan investigasi. Rangkaian permainan dimulai dengan pengembangan formula pathogen, dilanjutkan dengan pemecahan teka-teki dan tantangan berbasis kecepatan, hingga investigasi untuk mengungkap pihak yang mengendalikan penyebaran wabah. Peserta dituntut untuk menggabungkan ketelitian, kemampuan analisis, deduksi, dan kerja sama dalam menghadapi ancaman yang terus berkembang.",
      stages: [
        {
          t: "Stage One",
          img: "assets/Stage/13, 1.avif",
          note: "Ketelitian dan kemampuan analisis menjadi inti dalam eksperimen pengembangan pathogen. Pencarian bahan penelitian, penyusunan formula, serta peracikan dengan takaran yang tepat menjadi rangkaian proses untuk menentukan hasil eksperimen dan kemungkinan transformasi.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/v3w8Zw9EOv2BaN52",
        },
        {
          t: "Stage Two",
          img: "assets/Stage/13, 2.avif",
          note: "Kecepatan dan ketelitian menjadi kunci dalam menyelesaikan rangkaian teka-teki. Perbaikan link rusak melalui dua fase, pemecahan riddle, permainan sambung kata, hingga bingo menjadi mekanisme yang menguji kemampuan analisis serta koordinasi dalam permainan.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/mDRxWBDpYP7bQjb1",
        },
        {
          t: "Stage Three",
          img: "assets/Stage/13, 3.avif",
          note: "Deduksi dan kerja sama menjadi inti dalam mengungkap sumber penyebaran wabah. Pengumpulan informasi, penyusunan pertanyaan, identifikasi pengendali zombie, serta penentuan pihak yang harus dieliminasi menjadi rangkaian proses yang menentukan kelangsungan hidup setiap kelompok.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/dMA1W8w2OMk2Z4OV",
        },
        {
          t: "Teamwork",
          img: "assets/Stage/13, 4.avif",
          note: "Kesan, apresiasi, serta saran peserta terhadap kinerja teamwork Luxous sebagai bahan evaluasi dan pengembangan untuk generasi selanjutnya.",
          link: "https://padlet.com/Rainer_ar/luxe-mysterious-m2wodrro7frfc985/wish/94PGWn5KJzM4ZLRV",
        },
      ],
    },
  };
})();