# Sistem Desain BAKALKOPI

Situs satu halaman untuk kafe dan rumah makan Nusantara di Cimanggis, Depok.
Dokumen ini menjelaskan keputusan desain yang berlaku di kode, bukan cita-cita
yang belum dikerjakan.

Arah visualnya mengikuti rujukan kafe editorial: kanvas perkamen hangat,
pita gelap espreso, serif kapital berjarak lebar, satu aksen tulisan tangan,
ikon garis tipis, foto bertepi sobek, dan gelombang organik sebagai peralihan
antarbagian. Komposisi beranda mengikuti rujukan BREWHAUS (hero terbelah, pita
fitur gelap, Cerita terbelah, Pilihan Favorit), tetapi seluruh isinya milik
BAKALKOPI.

---

## 1. Palet

Semua nilai didefinisikan sekali di `@theme inline` pada
[globals.css](src/app/globals.css); jangan menulis heksadesimal langsung di
komponen. Pengecualian: prop `fillColor` pada `WaveDivider`, yang harus sama
dengan latar bagian yang dituju.

| Token | Nilai | Peran |
| --- | --- | --- |
| `charcoal` | `#231c18` | Pita gelap, kaki halaman, teks utama di kanvas terang |
| `charcoal-light` | `#2e2622` | Kartu di dalam pita gelap |
| `coffee` | `#4a3527` | Tombol utama, ikon |
| `gold` | `#a97f4f` | Ornamen, tombol di latar gelap |
| `gold-light` | `#c79a5e` | Eyebrow dan teks emas di latar gelap |
| `gold-deep` | `#7f5b2f` | Teks emas di latar terang (harga, eyebrow), 5.1:1 di krem |
| `cream` | `#f1eade` | Bagian terang bergantian |
| `cream-light` | `#faf6ee` | Latar halaman |
| `taupe` | `#ded3c4` | Garis rambut dan tepi kartu |
| `sage` | `#7c8068` | Aksen botani |
| `amber-soft` | `#ebd5b3` | Teks kecil di atas arang |

## 2. Tipografi

Tiga huruf, masing-masing satu tugas:

- **Playfair Display**: display dan judul. `.hero-display` dan
  `.text-headline-lg/sm` semuanya huruf kapital dengan tracking positif.
  `.text-serif-md` adalah satu-satunya serif tanpa paksaan kapital, dipakai
  untuk nama hidangan.
- **Plus Jakarta Sans**: badan teks (`.text-body-lg/md/sm`, minimal 15px),
  label (`.text-label-caps`, 12px, kapital, tracking `0.16em`), dan harga
  (`.text-price-tag`).
- **Parisienne**: hanya satu baris aksen per bagian (`.text-script`).

Angka harga memakai `.tabular`.

## 3. Bentuk dan komponen

- **Bentuk**: tombol aksi (CTA) persegi bersudut kecil (`rounded-md`), mengikuti
  rujukan. Kapsul (`rounded-full`) khusus chip pilihan: tab kategori Menu di
  beranda dan chip kategori di `/menu`. Lingkaran hanya untuk ikon (chevron
  Favorit, tombol putar, tombol tutup) dan logo.
- **Tombol dan tautan aksi**: sasaran sentuh minimal 44px. Aksi utama berisi
  warna (`bg-coffee`); aksi sekunder garis tepi atau garis bawah. Panah ada di
  tombol [`InteractiveHoverButton`](src/components/ui/interactive-hover-button.tsx)
  ("Lihat Menu" di hero, "Baca Cerita Kami"), dengan efek mekar dan geser label.
  Tombol tanpa panah memakai [`FillButton`](src/components/ui/fill-button.tsx)
  (sapuan `clip-path` dari bawah). Keduanya hanya aktif untuk mouse dan
  `:focus-visible`.
- **Label aksi**: satu niat, satu label. "Pesan Meja" untuk semua tautan
  reservasi WhatsApp (header, menu ponsel, Lokasi); "Lihat Menu" untuk semua
  tautan ke `#menu` (hero, Favorit).
- **Label di atas foto**: tidak ada pil di atas gambar. Label hidangan
  ("Favorit", "Warisan") ditaruh di bawah foto.
- **Kartu**: sudut `1rem` sampai `2rem`, latar putih di atas krem, garis rambut
  `taupe`, tanpa bayangan dan tanpa efek angkat saat ditunjuk (kartu menu tidak
  bisa diklik). Kartu Favorit di ponsel bisa diklik (seluruh baris = tautan ke
  `/menu#kategori`), ditandai lingkaran chevron. Satu-satunya bayangan ada di
  header saat digulir.
- **Kaca (blur)**: hanya header saat digulir. Tidak ada blur lain.
- **Ikon**: seluruhnya `lucide-react` dengan `strokeWidth` 1 sampai 1.5. Tidak
  ada ikon SVG buatan tangan. Lucide 1.x tidak memuat ikon merek, jadi tautan
  Instagram di footer ditulis sebagai teks ("Instagram @bakalkopi.id").
- **Foto bertepi sobek**: [`torn-mask.ts`](src/lib/torn-mask.ts) membuat dua
  SVG data-URI per tepi dari geometri dan noise yang sama: `mask` (CSS
  `mask-image` lewat utilitas `torn-left`, `torn-top`, `torn-left-top` di
  `globals.css`) dan `paint` (lapisan cat, dipasang dengan
  [`TornPaint`](src/components/torn-paint.tsx) sebagai saudara elemen
  bertopeng, bukan di dalamnya, supaya cat bisa jatuh di krem). Foto tidak
  didistorsi. Geometri berbenih (`seed`), jadi server dan klien identik. Lebar
  strip diatur `--torn-w` / `--torn-h`. Warna cat ditulis
  heksadesimal di file itu karena data-URI tidak bisa membaca variabel CSS.
  Rujukan di dalam SVG ditulis `url(#id)`; `wrap()` yang mengubah `#` jadi
  `%23` (menulis `%23` sendiri membuatnya ter-escape dua kali dan filter
  diam-diam tidak jalan). Filter serat `t` hanya untuk kontur dan pita tepi;
  bentuk tipis (bulu, olesan, serpih) tidak difilter karena akan tercabik.
  Dua teknik:
  - `ripEdge` (hero): gelombang + sobek. Siluet S besar dari titik kendali
    `shape` (diukur dari rujukan), lalu sobekan bergumpal di zona `rough`.
    Zona `ink`: sapuan kuas kering (bulu tipis sejajar yang putus-putus,
    berpangkal di tepi foto dan condong ke krem) plus serpih kecil. Sapuan ini
    ada di **topeng**, jadi warnanya piksel foto itu sendiri, seperti rujukan.
    Cat hero hanya putih: zona `paper` berupa olesan halus dan serat yang
    mengikuti siluet, bukan kontur bergerigi. `rim` (garis gelap tipis) hanya
    dipakai tepi atas: nyaris lurus. Opsi `top` memotong ujung atas strip
    kiri dengan topeng tanpa filter (displacement mengubah garis mendatar
    jadi gigi gergaji): tepi foto sedikit lebih rendah dekat sudut, lalu
    naik satu lompatan sejajar strip atas.
  - Ubin PNG (Cerita), teknik `border-image` / pseudo-elemen: dua `span`
    dekoratif menumpuk ubin
    [`torn-edge-left.png`](public/images/torn-edge-left.png) (200x1024) dan
    [`torn-edge-bottom.png`](public/images/torn-edge-bottom.png) (versi
    diputar) di atas tepi foto, diulang dengan `background-repeat`. Isi ubin:
    krem `cream-light`, kontur bergelombang dengan serat putih dan helai
    lepas, bayangan coklat tipis, lalu transparan. Ubin dibuat sendiri lewat
    skrip (bukan gambar pihak ketiga) dan mulus saat diulang. Desktop sobek di
    kiri (`w-25`), ponsel di bawah (`h-16`). Tepi atas foto selalu lurus.
    Warna krem ubin harus sama dengan latar bagian.
- **Gelombang**: [`WaveDivider`](src/components/wave-divider.tsx), path asimetris
  dengan `preserveAspectRatio="none"`, path dilebihkan melewati viewBox dan
  tepi menimpa 1px agar tidak ada garis rambut. Varian `hero` (punuk lebar
  kiri, lembah, naik ke kanan) dan `heroMobile` (lebih sedikit punuk untuk
  360px) memisahkan hero dari pita fitur; `a`, `b`, `c` untuk bagian lain,
  `flip` agar dua pemisah berdekatan tidak kembar.
- **Hero dan Cerita terbelah**: kelas `.split-bleed` menyejajarkan naskah dengan
  `max-w-7xl` lewat `--gutter`, sementara foto menempel tepi kanan layar.
- **Judul bagian**: [`SectionHeading`](src/components/section-heading.tsx).
  Rata tengah di bagian terang, rata kiri di bagian gelap (Suasana, Lokasi)
  agar irama halaman tidak seragam. Eyebrow (label kapital di atas judul)
  hanya di tiga tempat: Cerita, Menu, Lokasi. Hero tidak memakai eyebrow.
  Subhalaman tidak memakai eyebrow; penggantinya breadcrumb di `PageHeader`.
- **Header**: prop `tone`. Beranda `light`: krem dan teks gelap sejak awal.
  Subhalaman `dark`: transparan di atas pita gelap, krem saat digulir. Desktop:
  logo kiri, 5 tautan di tengah (Beranda, Cerita, Menu, Galeri, Reservasi),
  "Pesan Meja" di kanan, mulai `lg`. Di bawah `lg`: hamburger kiri, logo
  tengah, ikon kalender kanan (reservasi WhatsApp, bukan keranjang belanja).
- **Hero**: H1 tiga baris dari slogan, satu baris skrip, satu paragraf, satu
  aksi ("Lihat Menu"). Foto ruang semi-terbuka di kanan. Di ponsel foto tetap di samping
  naskah (sekitar 46% lebar), bukan ditumpuk. Tidak ada titik carousel karena
  hero hanya satu foto.
- **Pita fitur**: empat fakta yang sudah ada di menu dan Fasilitas, ikon garis.
  Ponsel 2x2 dengan garis silang, desktop satu baris dengan pemisah tegak.

## 4. Tata letak

Wadah `max-w-7xl` dengan padding `px-5 md:px-10`. Jarak bagian punya register
ponsel (`py-16`) dan register lebar (`md:py-24` / `md:py-28`). Header `h-16`
di ponsel, `h-20` mulai `md`. Grid berpindah tiga keadaan bila isinya perlu
(mis. Galeri: 1 kolom, 2 kolom di `sm`, 12 kolom di `lg`).

Subhalaman memakai [`PageShell` dan `PageHeader`](src/components/page/page-shell.tsx):
pita gelap dengan breadcrumb dan H1, lalu isi di kolom baca `max-w-3xl`
([`prose.tsx`](src/components/page/prose.tsx): `Article`, `Section`,
`PageCta`).

| Rute | Isi |
| --- | --- |
| `/menu` | Seluruh menu dan harga, JSON-LD `Menu` |
| `/tentang` | Cerita dan identitas usaha (`AboutPage`) |

```
Hero (terang, foto sobek) → Fitur (gelap) → Cerita → Favorit → Menu (terang)
  → Suasana (gelap) → Momen → Galeri → Fasilitas (terang)
  → Lokasi + Footer (gelap)
```

## 5. Gerak

Satu pustaka saja: **`motion`**. Komponen dari
[React Bits](https://reactbits.dev) ada di
[src/components/reactbits/](src/components/reactbits/):

| Komponen | Asal |
| --- | --- |
| `AnimatedContent` | Port dari GSAP ke motion, prop sama |
| `SplitText` | Port dari GSAP ke motion, prop sama |

Status gulir header dibaca lewat `useScroll` + `useMotionValueEvent`, bukan
`window.addEventListener("scroll")`. Garis bawah navigasi desktop memakai
`layoutId` di dalam `<motion.header layoutRoot>`, jadi meluncur mengikuti
tautan yang di-hover atau difokus lalu kembali ke bagian aktif.

Gerak hanya sekali jalan saat bagian masuk layar. Tidak ada animasi berulang
tanpa akhir: segel berputar di hero dan pita teks berjalan (`MarqueeBand`)
sudah dicabut, dan teks melingkar di tombol putar video diam.
Semuanya menghormati `prefers-reduced-motion`, dan `globals.css` memasang
guard menyeluruh.

## 6. Data bisnis dan klaim

Alamat, koordinat, jam buka, WhatsApp, dan Instagram hanya ada di
[src/lib/site.ts](src/lib/site.ts). Menu dan harga hanya ada di
[src/lib/menu.ts](src/lib/menu.ts) (tab beranda, `/menu`, dan
`priceRange` membaca dari sana). Ubah di satu tempat.

JSON-LD di [layout.tsx](src/app/layout.tsx) berupa `@graph`: `Organization`,
`WebSite`, dan `CafeOrCoffeeShop`, saling merujuk lewat `@id` dari
[seo.ts](src/lib/seo.ts). Node halaman (Menu, AboutPage) merujuk @id
yang sama. Metadata subhalaman dibuat lewat `pageMetadata()`, yang mengisi ulang
canonical, `openGraph`, dan gambar pratinjau karena Next menggabungkan metadata
secara dangkal. Tag verifikasi Google dibaca dari env
`GOOGLE_SITE_VERIFICATION`.

Aturan klaim (keputusan pemilik):

- Hanya tulis fakta yang bisa dibuktikan dari menu, foto, atau `site.ts`.
  Angka statistik, kecepatan Wi-Fi, jadwal musik, dan "gratis" tidak ditulis
  sampai pemilik memberi datanya.
- Halal bersertifikat. Di beranda disebut di dua tempat saja: Fasilitas dan
  Aturan Rumah di Lokasi. Tidak disebut di subhalaman.
- Tidak ada tautan `tel:`: nomor itu WhatsApp, panggilan suara belum
  dipastikan. Belum ada email, nama pengelola, atau tahun berdiri.

## 7. Bahasa

Seluruh teks antarmuka berbahasa Indonesia. Dua kecualian yang disengaja:
slogan `DELIGHT. SAVOR. CONNECT.` (tercetak di logo) dan headline
`GOOD FOOD. GOOD COFFEE. GOOD MOMENTS.`

Nama hidangan tetap seperti di menu cetak, termasuk yang berbahasa Inggris
seperti *Chicken Katsu*, karena begitulah tamu memesannya. Tanpa em dash atau
en dash; rentang ditulis dengan tanda hubung (`08.00-23.00`).
