import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Download,
  Mail,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
  Code2,
  Layers,
  BarChart2,
  Cpu,
  ChevronRight,
  Briefcase,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import ProjectDetail, {
  type ProjectData,
} from "./ProjectDetail";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import profilePhoto from "@/imports/DSC10229_26_-Photoroom_1.png";

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Keahlian", href: "#skills" },
  { label: "Proyek", href: "#projects" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Organisasi", href: "#organisasi" },
  { label: "Kontak", href: "#contact" },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    icon: Layers,
    title: "Pengembangan Produk",
    tags: [
      "Riset Pengguna",
      "Analisis Kebutuhan",
      "Alur Produk",
      "Analisis Umpan Balik",
    ],
    color: "from-sky-500/20 to-blue-600/10",
    border: "border-sky-500/20",
    iconColor: "text-sky-400",
  },
  {
    icon: Code2,
    title: "Pengembangan Web",
    tags: [
      "React",
      "Laravel",
      "Tailwind CSS",
      "JavaScript",
      "MySQL",
    ],
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: BarChart2,
    title: "Dukungan Produk Digital",
    tags: [
      "Landing Page",
      "Dokumentasi Produk",
      "Onboarding Pengguna",
      "Dukungan Implementasi",
    ],
    color: "from-blue-500/20 to-indigo-600/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Cpu,
    title: "AI & Alat Bantu",
    tags: [
      "Alur Kerja Berbasis AI",
      "Prompting",
      "GitHub",
      "Figma",
      "Vercel",
    ],
    color: "from-indigo-500/20 to-sky-600/10",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
];

// ─── Case study preview fields ────────────────────────────────────────────────

const CASE_STUDY_FIELDS = [
  { icon: BookOpen, label: "Latar Belakang Masalah" },
  { icon: Briefcase, label: "Peran Saya" },
  { icon: Layers, label: "Proses" },
  { icon: CheckCircle, label: "Hasil Utama" },
  { icon: BarChart2, label: "Tantangan" },
  { icon: ArrowRight, label: "Dampak" },
  { icon: Code2, label: "Pelajaran yang Dipetik" },
];

// ─── Experience ───────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    company: "PT Digital Desa Indonesia",
    location: "Makassar",
    role: "IT Product Development Intern",
    period: "Okt 2025 – Apr 2026",
    items: [
      "Memulai dari riset mendalam tentang BUMDes dan wawancara langsung dengan pengurus untuk memahami persoalan operasional mereka",
      "Merancang desain UI/UX dan prototipe produk, serta turut membangun sisi frontend dan menyusun alur salah satu fitur penting BUMDes",
      "Melakukan uji coba tahap awal langsung ke 6 desa, lalu menyempurnakan produk berdasarkan masukan pengguna di lapangan",
      "Mengembangkan landing page produk untuk menjelaskan fitur dan mengajak pengguna mencoba demo",
      "Melayani seluruh permintaan demo, menyusun tutorial pemakaian, serta mengumpulkan dan menindaklanjuti feedback dari setiap pengguna",
    ],
  },
  {
    company: "CV Ruby Karya",
    location: "Bone",
    role: "Digital Content & Web Administrator",
    period: "Mei 2025 – Okt 2025",
    items: [
      "Mengelola media sosial perusahaan untuk meningkatkan visibilitas dan interaksi audiens.",
      "Mengembangkan dan mengelola website perusahaan.",
      "Menyusun dan mengelola konten digital untuk branding perusahaan.",
      "Mengelola administrasi dokumen, persuratan, pengarsipan, dan penyusunan invoice.",
    ],
  },
  {
    company: "CV Sipulung",
    location: "Makassar",
    role: "Project & Product Development (Project-based)",
    period: "2022 – Sekarang",
    items: [
      "Menangani koordinasi dan administrasi pelaksanaan event sejak 2022 secara project-based.",
      "Sejak Agustus 2024 terlibat pengembangan produk digital dari perancangan konsep hingga implementasi.",
      "Mengelola pelaksanaan proyek dan pengadaan.",
      "Menyusun laporan proyek untuk monitoring dan evaluasi.",
    ],
  },
];

// ─── Organizations ────────────────────────────────────────────────────────────

const ORGANIZATIONS = [
  {
    name: "UKM Start-Up UNHAS",
    location: "Makassar",
    role: "Wakil Ketua",
    period: "Feb 2023 – Jan 2024",
    items: [
      "Membantu ketua mengarahkan dan mengoordinasikan seluruh divisi organisasi secara berkala.",
      "Mengelola strategi organisasi dan memastikan kelancaran komunikasi antar divisi.",
      "Menginisiasi program yang meningkatkan efisiensi kerja dan kolaborasi anggota.",
      "Berkontribusi menjadikan UKM Start-Up sebagai UKM terbaik ke-2 di Universitas Hasanuddin tahun 2023.",
    ],
  },
];

// ─── Projects (card-level data + full case study data) ────────────────────────

const PROJECTS: Array<{
  number: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  status: "Selesai" | "Dalam Proses";
  accent: "sky" | "cyan" | "blue" | "indigo" | "violet";
  detail: ProjectData;
}> = [
  {
    number: "01",
    title: "BUMDes Digital Product (Digides)",
    role: "IT Product Development Intern",
    description:
      "Produk digital untuk memodernisasi operasional BUMDes melalui pendekatan berbasis riset, mulai dari analisis kebutuhan pengguna, pengembangan fitur monitoring (dashboard & laporan), hingga validasi langsung di lapangan. Telah diuji coba oleh 70+ BUMDes.",
    tags: [
      "User Research",
      "Product Development",
      "Data Analysis",
    ],
    status: "Selesai",
    accent: "sky",
    detail: {
      number: "01",
      accent: "sky",
      header: {
        title: "BUMDes Digital Product (Digides)",
        description:
          "Produk digital untuk memodernisasi operasional BUMDes melalui pendekatan berbasis riset, mulai dari analisis kebutuhan pengguna, pengembangan fitur monitoring (dashboard & laporan), hingga validasi langsung di lapangan.",
        role: "IT Product Development Intern",
        timeline: "Jan 2024 – Mar 2024",
        tools: [
          "Figma",
          "Notion",
          "Google Forms",
          "Laravel",
          "MySQL",
        ],
        status: "Completed",
      },
      background:
        "BUMDes (Badan Usaha Milik Desa) merupakan entitas usaha tingkat desa yang berperan penting dalam pembangunan ekonomi lokal di Indonesia. Namun, sebagian besar BUMDes masih beroperasi secara manual tanpa sistem digital yang memadai, sehingga menyebabkan inefisiensi dalam pencatatan transaksi, pelaporan keuangan, dan pengelolaan data anggota. DIGIDES menginisiasi pengembangan produk digital untuk menjawab tantangan operasional ini.",
      myRole: [
        "Mengikuti sesi riset pengguna bersama pemangku kepentingan BUMDes untuk memahami tantangan operasional sehari-hari mereka.",
        "Berkontribusi dalam analisis kebutuhan dengan mendokumentasikan kebutuhan pengguna, pain points, dan ekspektasi fungsional.",
        "Membantu pemetaan alur produk dan mendefinisikan lingkup fitur utama untuk rilis pertama.",
        "Mendukung kegiatan pengembangan dengan mengoordinasikan tim teknis dan memvalidasi fitur terhadap kebutuhan pengguna.",
        "Melakukan kunjungan lapangan untuk mengumpulkan umpan balik pengguna langsung pasca-implementasi.",
      ],
      deliverables: [
        "Laporan riset pengguna yang mendokumentasikan kebutuhan dan pain points pemangku kepentingan",
        "Dokumen spesifikasi kebutuhan yang mencakup modul-modul utama",
        "Diagram alur produk yang menggambarkan perjalanan pengguna utama",
        "Ringkasan umpan balik lapangan dari evaluasi pasca-implementasi",
        "Checklist validasi fitur yang selaras dengan kebutuhan pengguna",
        "Dokumentasi dukungan implementasi untuk sesi onboarding",
      ],
      challenges:
        "Tantangan utama adalah menjembatani kesenjangan antara kemampuan tim teknis dan tingkat literasi digital pengguna BUMDes. Banyak pemangku kepentingan yang belum familiar dengan sistem digital, sehingga diperlukan penyederhanaan kebutuhan ke dalam bahasa dan alur yang mudah dipahami.",
      solution:
        "Semua alur produk dipetakan secara visual dan diverifikasi langsung bersama pemangku kepentingan melalui walkthrough prototipe. Sesi umpan balik dilakukan dalam format percakapan untuk menghasilkan wawasan yang lebih jujur dan dapat ditindaklanjuti. Koordinasi tugas dikelola melalui workspace Notion bersama.",
      impact: [
        "Produk digital BUMDes berhasil mencapai fase deployment pertama, telah diuji coba oleh 70+ BUMDes di lapangan.",
        "Umpan balik pengguna dari sesi lapangan menunjukkan peningkatan kepercayaan diri operator BUMDes dalam menggunakan platform digital.",
        "Dokumentasi riset yang dihasilkan menjadi referensi dasar untuk iterasi dan peningkatan produk ke depan.",
      ],
      learned: [
        "Riset pengguna dengan pemangku kepentingan non-teknis membutuhkan kesabaran dan adaptabilitas dalam gaya komunikasi.",
        "Analisis kebutuhan paling efektif ketika berakar pada konteks operasional nyata, bukan perilaku pengguna yang diasumsikan.",
        "Mendokumentasikan umpan balik secara sistematis menciptakan fondasi yang andal untuk peningkatan produk.",
        "Koordinasi lintas fungsi antara riset, perencanaan, dan pengembangan sangat penting untuk menjaga keselarasan sepanjang siklus produk.",
      ],
      screenshots: [
        {
          label: "Tampilan Dashboard Utama",
          aspect: "aspect-video",
        },
        {
          label: "Modul Laporan Keuangan",
          aspect: "aspect-video",
        },
        {
          label: "Manajemen Data Anggota",
          aspect: "aspect-video",
        },
        {
          label: "Sesi Riset Pengguna",
          aspect: "aspect-[4/3]",
        },
        {
          label: "Diagram Alur Produk",
          aspect: "aspect-[4/3]",
        },
        {
          label: "Implementasi Lapangan",
          aspect: "aspect-[4/3]",
        },
      ],
    },
  },
  {
    number: "02",
    title: "KOPDes Product Research & Landing Page",
    role: "Product Researcher / Landing Page Developer",
    description:
      "Melakukan riset produk dan membangun landing page untuk mendukung komunikasi produk dan akuisisi pengguna KOPDes selama magang di Digides.",
    tags: ["Product Research", "Landing Page", "Prototyping"],
    status: "Selesai",
    accent: "cyan",
    detail: {
      number: "02",
      accent: "cyan",
      header: {
        title: "KOPDes Product Research & Landing Page",
        description:
          "Inisiatif riset dan komunikasi produk untuk memvalidasi konsep KOPDes (Koperasi Digital Desa) dan mendukung akuisisi pengguna melalui landing page yang ditargetkan.",
        role: "Product Researcher / Landing Page Developer",
        timeline: "Apr 2024 – Mei 2024",
        tools: [
          "Google Forms",
          "Notion",
          "HTML",
          "Tailwind CSS",
          "Figma",
        ],
        status: "Completed",
      },
      background:
        "KOPDes adalah konsep produk koperasi digital yang bertujuan memungkinkan koperasi simpan pinjam tingkat desa untuk mengelola operasionalnya secara digital. Sebelum berkomitmen pada pengembangan penuh, tim membutuhkan validasi permintaan pasar dan komunikasi nilai produk yang jelas kepada calon pengguna dan pemangku kepentingan pemerintah daerah.",
      myRole: [
        "Merancang dan mendistribusikan kuesioner riset pengguna yang menargetkan administrator koperasi dan pejabat desa.",
        "Mensintesis temuan riset menjadi dokumen ringkasan yang menyoroti ekspektasi pengguna dan hambatan adopsi.",
        "Mengembangkan struktur konten dan copywriting untuk landing page promosi KOPDes.",
        "Membangun landing page menggunakan HTML dan Tailwind CSS dengan fokus pada responsivitas mobile.",
        "Berkolaborasi dengan tim produk untuk menyelaraskan pesan landing page dengan positioning produk keseluruhan.",
      ],
      deliverables: [
        "Kuesioner riset pengguna beserta dataset respons yang terkumpul",
        "Laporan sintesis riset dengan wawasan utama dan rekomendasi",
        "Wireframe landing page dan struktur konten final",
        "Landing page responsif yang sepenuhnya dikembangkan (HTML + Tailwind CSS)",
        "Kerangka pesan produk yang selaras dengan target audiens",
        "Presentasi pemangku kepentingan yang merangkum temuan riset",
      ],
      challenges:
        "Tantangan utama adalah membuat landing page yang mengkomunikasikan produk yang masih dalam fase konseptual. Tanpa produk live untuk didemonstrasikan, halaman harus membangun kredibilitas melalui pesan yang jelas dan pernyataan masalah yang relevan.",
      solution:
        "Landing page dibangun di sekitar struktur narasi problem-first — membuka dengan pain point yang resonan bagi administrator koperasi, lalu menyajikan KOPDes sebagai solusi yang praktis dan mudah diakses. Elemen visual dijaga minimal dan profesional untuk mempertahankan kredibilitas.",
      impact: [
        "Landing page berhasil mengumpulkan ekspresi minat awal dari beberapa administrator koperasi desa selama periode soft launch.",
        "Temuan riset secara langsung menginformasikan keputusan prioritas fitur tim produk untuk roadmap pengembangan KOPDes.",
        "Proyek ini membuktikan bahwa komunikasi produk yang terstruktur — bahkan pada tahap pra-pengembangan — dapat secara efektif membangun kepercayaan pemangku kepentingan.",
      ],
      learned: [
        "Landing page pra-peluncuran adalah alat validasi yang kuat ketika dibangun di sekitar pernyataan masalah yang tepat.",
        "Desain survei untuk audiens non-teknis membutuhkan kesederhanaan yang disengaja — pertanyaan ambigu menghasilkan data yang tidak dapat diandalkan.",
        "Strategi konten dan pengembangan saling terkait erat; membangun keduanya secara bersamaan menghasilkan produk akhir yang lebih koheren.",
        "Menerjemahkan wawasan riset menjadi rekomendasi produk yang dapat ditindaklanjuti membutuhkan pemikiran terstruktur.",
      ],
      screenshots: [
        {
          label: "Landing Page — Hero Section",
          aspect: "aspect-video",
        },
        {
          label: "Seksi Value Proposition",
          aspect: "aspect-video",
        },
        {
          label: "Seksi Call-to-Action",
          aspect: "aspect-video",
        },
        { label: "Kuesioner Riset", aspect: "aspect-[4/3]" },
        {
          label: "Ringkasan Temuan Riset",
          aspect: "aspect-[4/3]",
        },
        {
          label: "Tampilan Mobile Responsif",
          aspect: "aspect-[4/3]",
        },
      ],
    },
  },
  {
    number: "03",
    title: "GIS Sipulung Cultural Mapping Platform",
    role: "Project & Product Development",
    description:
      "Platform pemetaan data budaya berbasis GIS untuk pemetaan aset budaya, registrasi komunitas, dan akses informasi publik. Saat ini masih dalam tahap pengembangan.",
    tags: [
      "GIS",
      "Product Planning",
      "Public Service Innovation",
    ],
    status: "Dalam Proses",
    accent: "blue",
    detail: {
      number: "03",
      accent: "blue",
      header: {
        title: "GIS Sipulung Cultural Mapping Platform",
        description:
          "Platform web berbasis GIS yang dirancang untuk memetakan, mendaftarkan, dan mempublikasikan aset warisan budaya di komunitas lokal melalui antarmuka peta interaktif.",
        role: "Project & Product Development",
        timeline: "Jun 2024 – Sekarang",
        tools: [
          "Figma",
          "React",
          "Notion",
          "Google Maps API",
          "Leaflet.js",
        ],
        status: "In Progress",
      },
      background:
        "Kekayaan warisan budaya Indonesia — termasuk seni tradisional, acara komunitas, kerajinan lokal, dan situs bersejarah — sering kali tidak terdokumentasi dan sulit diakses secara terpusat. Platform Sipulung dikembangkan untuk menjawab kesenjangan ini dengan menciptakan registry berbasis GIS di mana komunitas dapat mendaftarkan aset budaya dan publik dapat menjelajahinya melalui antarmuka peta interaktif.",
      myRole: [
        "Memimpin fase perencanaan produk, termasuk analisis pemangku kepentingan, definisi lingkup platform, dan prioritas fitur.",
        "Merancang alur pengguna utama untuk tiga tipe pengguna: kontributor komunitas, administrator pemerintah daerah, dan pengguna publik.",
        "Mengembangkan konsep web melalui wireframe dan prototipe interaktif di Figma.",
        "Mendefinisikan konsep arsitektur teknis dengan merekomendasikan tools GIS yang sesuai.",
        "Menyiapkan dokumentasi yang menguraikan konsep platform, proposisi nilai, dan roadmap implementasi bertahap.",
      ],
      deliverables: [
        "Analisis pemangku kepentingan dan dokumentasi persona pengguna untuk tiga tipe pengguna",
        "Definisi lingkup platform dan matriks prioritas fitur",
        "Diagram alur pengguna untuk perjalanan kontributor, admin, dan pengunjung publik",
        "Wireframe Figma dan prototipe interaktif layar platform utama",
        "Dokumen konsep arsitektur teknis dengan rekomendasi tools GIS",
        "Roadmap implementasi bertahap dengan milestone dan estimasi sumber daya",
      ],
      challenges:
        "Merancang platform berbasis GIS yang melayani tiga tipe pengguna yang sangat berbeda membutuhkan keseimbangan cermat antara kompleksitas dan aksesibilitas. Selain itu, data budaya yang bersifat tidak terstruktur dan bervariasi menghadirkan tantangan dalam merancang sistem registrasi yang komprehensif sekaligus fleksibel.",
      solution:
        "Model antarmuka berbasis peran diadopsi: setiap tipe pengguna akan melihat versi platform yang disederhanakan sesuai konteksnya. Kontributor komunitas menggunakan registration wizard terpandu; administrator mengakses dashboard manajemen data terstruktur; pengguna publik berinteraksi dengan antarmuka map-first yang intuitif.",
      impact: [
        "Konsep platform mendapat umpan balik evaluatif positif dari pemangku kepentingan pemerintah daerah untuk potensinya dalam memusatkan upaya dokumentasi budaya.",
        "Prototipe menunjukkan bahwa pemetaan budaya berbasis GIS layak secara teknis dalam batasan infrastruktur pemerintah lokal.",
        "Roadmap bertahap memberikan jalur yang jelas untuk pengembangan nyata, membuat konsep dapat ditindaklanjuti.",
      ],
      learned: [
        "Merancang untuk berbagai tipe pengguna mengharuskan perlakuan setiap kelompok pengguna sebagai audiens produk yang berbeda.",
        "Platform GIS harus menyeimbangkan kekayaan data dengan kejelasan visual — terlalu banyak informasi di peta menciptakan cognitive overload.",
        "Keterlibatan pemangku kepentingan awal pada produk tahap konsep sangat penting untuk memvalidasi asumsi sebelum berinvestasi dalam pengembangan.",
        "Keputusan arsitektur teknis yang dibuat selama perencanaan memiliki konsekuensi jangka panjang.",
      ],
      screenshots: [
        {
          label: "Peta Interaktif — Tampilan Publik",
          aspect: "aspect-video",
        },
        {
          label: "Halaman Detail Aset Budaya",
          aspect: "aspect-video",
        },
        {
          label: "Form Registrasi Komunitas",
          aspect: "aspect-video",
        },
        { label: "Dashboard Admin", aspect: "aspect-[4/3]" },
        {
          label: "Diagram Alur Pengguna",
          aspect: "aspect-[4/3]",
        },
        { label: "Prototipe Figma", aspect: "aspect-[4/3]" },
      ],
    },
  },
  {
    number: "04",
    title: "Rumah Olah (PPK Ormawa)",
    role: "Team Coordinator",
    description:
      "Proyek pengelolaan sampah berbasis circular economy di Desa Benteng Gajah, Maros. Memimpin tim lintas fungsi dan mengelola desain sistem serta dokumentasi aplikasi Rumah Olah. Berhasil mengamankan pendanaan Rp37 juta dan meraih Top 4 Strategi Keberlanjutan Terbaik Nasional.",
    tags: ["Leadership", "Circular Economy", "System Design"],
    status: "Selesai",
    accent: "indigo",
    detail: {
      number: "04",
      accent: "indigo",
      header: {
        title: "Rumah Olah (PPK Ormawa)",
        description:
          "Proyek pengelolaan sampah berbasis circular economy di Desa Benteng Gajah, Maros — meraih pendanaan Rp37 juta dan Top 4 Strategi Keberlanjutan Terbaik Nasional.",
        role: "Team Coordinator",
        timeline: "2023 – 2024",
        tools: ["Notion", "Figma", "Google Workspace", "Canva"],
        status: "Completed",
      },
      background:
        "Desa Benteng Gajah, Maros, menghadapi tantangan pengelolaan sampah yang belum terstruktur. Melalui program PPK Ormawa, tim mengembangkan sistem Rumah Olah — sebuah pendekatan circular economy yang mengintegrasikan pengumpulan, pemilahan, dan pemanfaatan kembali sampah menjadi produk bernilai ekonomi bagi masyarakat desa.",
      myRole: [
        "Memimpin dan mengoordinasikan tim lintas fungsi yang terdiri dari anggota dengan latar belakang teknis dan non-teknis.",
        "Mengelola desain sistem pengelolaan sampah berbasis circular economy dari konsep hingga implementasi lapangan.",
        "Menyusun dokumentasi aplikasi Rumah Olah sebagai panduan operasional bagi komunitas desa.",
        "Mengkoordinasikan proses pengajuan proposal dan presentasi kepada dewan juri untuk mengamankan pendanaan.",
        "Memastikan keberlanjutan program melalui transfer pengetahuan dan pemberdayaan warga lokal.",
      ],
      deliverables: [
        "Desain sistem pengelolaan sampah circular economy yang telah diimplementasikan",
        "Dokumentasi aplikasi Rumah Olah sebagai panduan operasional komunitas",
        "Proposal pendanaan yang berhasil mengamankan Rp37 juta",
        "Laporan implementasi lapangan dan evaluasi dampak",
        "Materi pelatihan untuk pemberdayaan komunitas desa",
        "Presentasi strategi keberlanjutan untuk kompetisi nasional",
      ],
      challenges:
        "Tantangan terbesar adalah membangun kepercayaan dan partisipasi aktif warga desa terhadap sistem baru, serta memastikan keberlanjutan program setelah tim mahasiswa menyelesaikan tugasnya. Koordinasi tim lintas fungsi dengan jadwal dan kapasitas yang berbeda juga membutuhkan manajemen yang cermat.",
      solution:
        "Pendekatan community-first diterapkan dengan melibatkan warga desa sejak tahap perencanaan, bukan hanya sebagai penerima manfaat. Sistem dirancang sesederhana mungkin agar mudah dioperasikan secara mandiri. Transfer pengetahuan dilakukan secara bertahap melalui sesi pelatihan praktis langsung di lapangan.",
      impact: [
        "Berhasil mengamankan pendanaan sebesar Rp37 juta untuk mendukung implementasi program.",
        "Meraih penghargaan Top 4 Strategi Keberlanjutan Terbaik Nasional dalam kompetisi PPK Ormawa.",
        "Sistem pengelolaan sampah circular economy berhasil diimplementasikan dan dioperasikan oleh komunitas Desa Benteng Gajah.",
      ],
      learned: [
        "Kepemimpinan tim lintas fungsi membutuhkan kemampuan komunikasi yang adaptif dan empati terhadap perbedaan kapasitas anggota.",
        "Program berbasis komunitas paling efektif ketika warga dilibatkan sebagai co-creator, bukan sekadar penerima manfaat.",
        "Dokumentasi yang baik adalah kunci keberlanjutan program setelah tim inti tidak lagi terlibat langsung.",
        "Mengamankan pendanaan membutuhkan kemampuan menyampaikan dampak sosial secara terukur dan meyakinkan.",
      ],
      screenshots: [
        {
          label: "Sistem Pengelolaan Sampah",
          aspect: "aspect-video",
        },
        {
          label: "Dokumentasi Aplikasi Rumah Olah",
          aspect: "aspect-video",
        },
        {
          label: "Implementasi Lapangan",
          aspect: "aspect-video",
        },
        {
          label: "Sesi Pelatihan Komunitas",
          aspect: "aspect-[4/3]",
        },
        {
          label: "Presentasi Kompetisi Nasional",
          aspect: "aspect-[4/3]",
        },
        {
          label: "Dokumentasi Program",
          aspect: "aspect-[4/3]",
        },
      ],
    },
  },
  {
    number: "05",
    title: "Hero.bin (Innovillage — PT Telkom Indonesia)",
    role: "Project Leader",
    description:
      "Proyek sosial pemberdayaan ekonomi masyarakat melalui pertanian urban berbasis akuaponik. Memimpin pelaksanaan proyek dan melatih anggota komunitas di lapangan. Meraih Top 150 dari 1.439 mahasiswa dan Juara 2 Kategori Digital Earth/Green Conservation.",
    tags: ["Leadership", "Social Innovation", "Sustainability"],
    status: "Selesai",
    accent: "violet",
    detail: {
      number: "05",
      accent: "violet",
      header: {
        title: "Hero.bin (Innovillage — PT Telkom Indonesia)",
        description:
          "Proyek sosial pemberdayaan ekonomi masyarakat melalui pertanian urban berbasis akuaponik — meraih Top 150 dari 1.439 mahasiswa dan Juara 2 Kategori Digital Earth/Green Conservation.",
        role: "Project Leader",
        timeline: "2023",
        tools: ["Notion", "Figma", "Google Workspace", "Canva"],
        status: "Completed",
      },
      background:
        "Program Innovillage yang diinisiasi oleh PT Telkom Indonesia mendorong mahasiswa untuk mengembangkan solusi inovatif bagi permasalahan sosial di masyarakat. Hero.bin hadir sebagai respons terhadap permasalahan ketahanan pangan dan pemberdayaan ekonomi komunitas melalui sistem pertanian urban akuaponik yang terintegrasi dengan pengelolaan sampah organik.",
      myRole: [
        "Memimpin keseluruhan proyek Hero.bin sebagai ketua tim, dari tahap perencanaan hingga implementasi di lapangan.",
        "Mengoordinasikan tim dalam dua lini kerja utama: pengembangan aplikasi Hero.bin dan pembangunan instalasi akuaponik.",
        "Berkoordinasi langsung dengan pemerintah Desa Sugiale dan pengurus Bank Sampah Al Muqarrabin sebagai mitra program.",
        "Mengoordinasikan pelatihan penggunaan aplikasi dan budidaya akuaponik bagi pengurus Bank Sampah Al Muqarrabin.",
        "Memastikan kolaborasi lintas pihak berjalan untuk mendukung keberlanjutan program pasca-implementasi.",
      ],
      deliverables: [
        "Sistem pertanian urban akuaponik yang berhasil diimplementasikan",
        "Modul pelatihan pengoperasian akuaponik untuk komunitas",
        "Dokumentasi proyek lengkap untuk program Innovillage",
        "Laporan dampak sosial dan ekonomi program",
        "Presentasi kompetisi yang meraih Juara 2 kategori Digital Earth/Green Conservation",
        "Panduan keberlanjutan program bagi komunitas",
      ],
      challenges:
        "Pengelolaan Bank Sampah Al Muqarrabin masih konvensional dengan pencatatan manual di buku tabungan nasabah. Seiring bertambahnya jumlah nasabah, cara ini menimbulkan risiko dokumen rusak, hilang, dan kesalahan pencatatan. Selain itu, bank sampah hanya menerima sampah anorganik untuk dijual, sementara sampah organik warga belum memiliki mekanisme pengelolaan tersendiri sehingga cenderung terabaikan.",
      solution:
        "Tim merancang Hero.bin sebagai aplikasi yang mendigitalisasi pencatatan manajemen sampah Bank Sampah Al Muqarrabin, sehingga data nasabah lebih transparan dan minim risiko kesalahan. Untuk menjawab persoalan sampah organik, program ini diintegrasikan dengan budidaya akuaponik: sampah organik diolah menjadi media budidaya maggot sebagai pakan ikan, dan hasil panen akuaponik menjadi pemasukan tambahan sekaligus reward bagi nasabah melalui sistem poin di aplikasi.",
      impact: [
        "Meraih Top 150 dari total 1.439 peserta mahasiswa dalam program Innovillage PT Telkom Indonesia.",
        "Berhasil meraih Juara 2 Kategori Digital Earth/Green Conservation pada kompetisi Innovillage.",
        "Sistem akuaponik berhasil dioperasikan secara mandiri oleh komunitas sasaran pasca-implementasi.",
      ],
      learned: [
        "Kepemimpinan proyek sosial membutuhkan keseimbangan antara visi jangka panjang dan kebutuhan komunitas yang sangat praktis.",
        "Inovasi paling berdampak adalah yang paling mudah diadopsi, bukan yang paling canggih secara teknis.",
        "Kompetisi inovasi adalah peluang untuk memvalidasi ide sekaligus membangun jaringan dengan sesama inovator muda.",
        "Melatih orang lain adalah cara terbaik untuk menguji kedalaman pemahaman sendiri terhadap suatu sistem.",
      ],
      screenshots: [
        {
          label: "Sistem Akuaponik — Tampilan Instalasi",
          aspect: "aspect-video",
        },
        {
          label: "Sesi Pelatihan Komunitas",
          aspect: "aspect-video",
        },
        {
          label: "Dokumentasi Implementasi Lapangan",
          aspect: "aspect-video",
        },
        {
          label: "Presentasi Kompetisi Innovillage",
          aspect: "aspect-[4/3]",
        },
        {
          label: "Penghargaan Juara 2",
          aspect: "aspect-[4/3]",
        },
        {
          label: "Dokumentasi Program",
          aspect: "aspect-[4/3]",
        },
      ],
    },
  },
];

// ─── Accent helpers ───────────────────────────────────────────────────────────

const accentMap: Record<string, string> = {
  sky: "border-sky-500/30 hover:border-sky-400/60",
  cyan: "border-cyan-500/30 hover:border-cyan-400/60",
  blue: "border-blue-500/30 hover:border-blue-400/60",
  indigo: "border-indigo-500/30 hover:border-indigo-400/60",
  violet: "border-violet-500/30 hover:border-violet-400/60",
};
const tagColorMap: Record<string, string> = {
  sky: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
  cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
  blue: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  indigo:
    "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
  violet:
    "bg-violet-500/10 text-violet-300 border border-violet-500/20",
};
const numberColorMap: Record<string, string> = {
  sky: "text-sky-500/30",
  cyan: "text-cyan-500/30",
  blue: "text-blue-500/30",
  indigo: "text-indigo-500/30",
  violet: "text-violet-500/30",
};

// ─── Root component ───────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeProject, setActiveProject] =
    useState<ProjectData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) =>
        l.href.replace("#", ""),
      );
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const openProject = (detail: ProjectData) => {
    setActiveProject(detail);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProject = () => {
    setActiveProject(null);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // ── Case study page ─────────────────────────────────────────────────────────
  if (activeProject) {
    return (
      <ProjectDetail
        project={activeProject}
        onBack={closeProject}
      />
    );
  }

  // ── Main portfolio page ─────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Subtle background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0b1527]/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollTo("#home")}
              className="text-sm font-semibold tracking-widest text-sky-400 uppercase hover:text-sky-300 transition-colors"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              ILHAM FURQAN
            </button>
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-sky-400 bg-sky-400/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              className="md:hidden p-2 text-slate-400 hover:text-slate-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0b1527]/98 border-b border-border">
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-4 py-3 text-sm font-medium rounded transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-sky-400 bg-sky-400/10"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-stretch pt-0 pb-8"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-8 items-end">
          {/* Text column */}
          <div className="self-center py-24 lg:py-32">
            <p
              className="text-sky-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Portofolio
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Muhammad
              <br />
              <span className="text-sky-400">Ilham Nur</span>
              <br />
              Furqan
            </h1>
            <p
              className="text-xl md:text-2xl text-slate-400 font-light mb-4"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Product Development{" "}
              <span className="text-slate-600 mx-2">|</span> Web
              Developer
            </p>
            <p className="text-base text-slate-400 leading-relaxed mb-10 max-w-xl">
              Saya senang membuat inovasi digital yang
              menyelesaikan masalah nyata, terutama yang
              berdampak bagi masyarakat dan desa. Bagi saya,
              produk yang baik lahir dari memahami orang yang
              menggunakannya."
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-[#0b1527] font-semibold text-sm rounded transition-colors"
              >
                Lihat Proyek <ArrowRight size={16} />
              </button>
              <a
                href="/cv-ats-muhammad-ilham-nur-furqan.pdf"
                download="CV-ATS-Muhammad-Ilham-Nur-Furqan.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 border border-sky-500/40 hover:border-sky-400 text-sky-300 hover:text-sky-200 font-semibold text-sm rounded transition-colors"
              >
                <Download size={16} /> Unduh CV
              </a>
            </div>
          </div>

          {/* Photo column — hidden on mobile, fills full right half on desktop */}
          <div className="hidden lg:flex mt-28 items-start align-center justify-center self-start relative">
            {/* soft glow behind figure */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />
            <ImageWithFallback
              src={profilePhoto}
              alt="Muhammad Ilham Nur Furqan"
              className="relative w-full max-w-lg xl:max-w-xl just object-contain object-center drop-shadow-2xl"
              style={{ maxHeight: "85vh" }}
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-sky-500/40" />
          <span className="text-xs tracking-widest uppercase">
            Scroll
          </span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <p
                className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Tentang Saya
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Siapa Saya
              </h2>
              <div className="mt-6 w-12 h-0.5 bg-sky-400/60" />
            </div>
            <div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Saya Ilham, lulusan Teknik Informatika
                Universitas Hasanuddin. Saya tertarik pada
                pengembangan produk digital — khususnya
                bagaimana sebuah produk bisa lahir dari memahami
                masalah nyata yang dihadapi penggunanya.
              </p>
              <p className="text-slate-400 leading-relaxed mt-4">
                Ketertarikan ini membawa saya terlibat langsung
                di lapangan: mulai dari mengembangkan produk
                untuk BUMDes dan KOPDes selama magang di
                Digides, hingga memimpin proyek-proyek sosial
                berbasis teknologi seperti Rumah Olah dan
                Hero.bin. Saya menikmati proses dari riset,
                perancangan, sampai melihat produk benar-benar
                digunakan.
              </p>
              <p className="text-slate-400 leading-relaxed mt-4">
                Selain sisi teknis, pengalaman menangani
                administrasi, keuangan, dan operasional membuat
                saya terbiasa melihat sebuah proyek secara
                menyeluruh — tidak hanya produknya, tapi juga
                bagaimana ia berjalan.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {[
                  {
                    value: "70+",
                    label: "BUMDes Menggunakan Produk",
                  },
                  {
                    value: "2",
                    label: "Penghargaan Nasional",
                  },
                  { value: "3.71", label: "IPK" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="text-3xl font-bold text-sky-400"
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="py-24 lg:py-32 bg-[#0d1b36]"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p
              className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Kompetensi Utama
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Keahlian Utama
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.title}
                  className={`relative p-6 rounded-lg border ${skill.border} bg-gradient-to-br ${skill.color} backdrop-blur-sm group hover:border-sky-400/40 transition-all duration-200`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center mb-4 ${skill.iconColor}`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    className="text-sm font-bold text-white mb-4"
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    {skill.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/8"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p
              className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Karya
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Proyek Unggulan
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.number}
                className={`group relative flex flex-col p-7 rounded-lg border ${accentMap[project.accent]} bg-card transition-all duration-200 hover:bg-[#122040]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-6xl font-black leading-none ${numberColorMap[project.accent]}`}
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    {project.number}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border mt-1 shrink-0 ${
                      project.status === "Selesai"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold text-white mb-1"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-xs text-sky-400 font-medium mb-4">
                  {project.role}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded ${tagColorMap[project.accent]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openProject(project.detail)}
                  className="self-start inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 font-semibold transition-colors group/btn"
                >
                  Lihat Studi Kasus{" "}
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="py-24 lg:py-32 bg-[#0d1b36]"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p
              className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Latar Belakang
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Pengalaman Profesional
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/60 via-sky-400/20 to-transparent hidden md:block" />
            <div className="md:pl-10 space-y-12">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="relative">
                  <div className="hidden md:block absolute left-[-14px] w-2 h-2 rounded-full bg-sky-400 ring-4 ring-[#0d1b36]" />
                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3
                        className="text-xl font-bold text-white"
                        style={{
                          fontFamily: "'Raleway', sans-serif",
                        }}
                      >
                        {exp.company}
                      </h3>
                      <span className="text-xs text-slate-500 font-mono shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <p className="text-sky-400 text-sm font-medium">
                        {exp.role}
                      </p>
                      <span className="text-slate-600 text-xs">
                        ·
                      </span>
                      <span className="text-slate-500 text-xs">
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400/60 shrink-0" />
                        <span className="text-slate-400 leading-relaxed text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ORGANISASI */}
      <section
        id="organisasi"
        className="py-24 lg:py-32 bg-[#0d1b36]"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p
              className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Keterlibatan
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Organisasi
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/60 via-sky-400/20 to-transparent hidden md:block" />
            <div className="md:pl-10 space-y-12">
              {ORGANIZATIONS.map((org, idx) => (
                <div key={idx} className="relative">
                  <div className="hidden md:block absolute left-[-14px] w-2 h-2 rounded-full bg-sky-400 ring-4 ring-[#0d1b36]" />
                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3
                        className="text-xl font-bold text-white"
                        style={{
                          fontFamily: "'Raleway', sans-serif",
                        }}
                      >
                        {org.name}
                      </h3>
                      <span className="text-xs text-slate-500 font-mono shrink-0">
                        {org.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <p className="text-sky-400 text-sm font-medium">
                        {org.role}
                      </p>
                      <span className="text-slate-600 text-xs">
                        ·
                      </span>
                      <span className="text-slate-500 text-xs">
                        {org.location}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {org.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400/60 shrink-0" />
                        <span className="text-slate-400 leading-relaxed text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY PREVIEW */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div>
              <p
                className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Eksplorasi Mendalam
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Struktur Studi
                <br />
                Kasus Proyek
              </h2>
              <div className="mt-6 w-12 h-0.5 bg-sky-400/60" />
              <p className="text-slate-400 text-sm leading-relaxed mt-6">
                Setiap proyek dapat dijelajahi melalui studi
                kasus terstruktur yang mendokumentasikan proses
                lengkap dari penemuan masalah hingga dampak yang
                terukur.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {CASE_STUDY_FIELDS.map((field, i) => {
                const Icon = field.icon;
                return (
                  <div
                    key={field.label}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-sky-500/30 hover:bg-[#122040] transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-mono">
                        0{i + 1}
                      </span>
                      <p className="text-sm font-semibold text-slate-200">
                        {field.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 lg:py-32 bg-[#0d1b36]"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p
              className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Hubungi Saya
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Mari Terhubung
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Saya terbuka untuk peluang, kolaborasi, dan
              diskusi terkait pengembangan produk digital,
              pengembangan web, dan inovasi berbasis teknologi.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "ilhamfurqan58@gmail.com",
                href: "mailto:ilhamfurqan58@gmail.com",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value:
                  "linkedin.com/in/muhammad-ilham-nur-furqan/",
                href: "https://www.linkedin.com/in/muhammad-ilham-nur-furqan/",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "github.com/ilhamn072",
                href: "https://github.com/Ilham072",
              },
            ].map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="group flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card hover:border-sky-500/40 hover:bg-[#122040] transition-all duration-200 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">
                      {contact.label}
                    </p>
                    <p className="text-xs text-slate-300 font-medium break-all">
                      {contact.value}
                    </p>
                  </div>
                  <ExternalLink
                    size={12}
                    className="text-slate-600 group-hover:text-sky-400 transition-colors"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2025 Muhammad Ilham Nur Furqan. Hak cipta
            dilindungi.
          </p>
          <p className="text-xs text-slate-700">
            Product Development | Web Developer
          </p>
        </div>
      </footer>
    </div>
  );
}
