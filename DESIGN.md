# Sistem Desain BAKALKOPI

Situs satu halaman untuk kafe dan rumah makan Nusantara di Cimanggis, Depok.
Dokumen ini menjelaskan keputusan desain yang berlaku di kode, bukan cita-cita
yang belum dikerjakan.

Arah visualnya mengikuti rujukan kafe editorial: kanvas perkamen hangat,
pita gelap espreso, serif kapital berjarak lebar, satu aksen tulisan tangan,
ikon garis tipis, dan tepi sobek organik sebagai peralihan antarbagian.

---

## 1. Palet

Semua nilai didefinisikan sekali di `@theme inline` pada
[globals.css](src/app/globals.css); jangan menulis heksadesimal langsung di
komponen. Pengecualian: prop `color` pada `TornEdge`, yang harus sama dengan
latar bagian berikutnya.

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

- **Tombol dan tautan aksi**: kapsul penuh (`rounded-full`), sasaran sentuh
  minimal 44px. Aksi utama berisi warna; aksi sekunder garis tepi atau garis
  bawah. Hanya tombol "Lihat Menu" di hero yang memakai panah, lewat
  [`InteractiveHoverButton`](src/components/ui/interactive-hover-button.tsx)
  (mekar melingkar + geser label). Tombol kapsul tanpa panah di desktop memakai
  [`FillButton`](src/components/ui/fill-button.tsx) (sapuan `clip-path` dari
  bawah). Keduanya hanya aktif untuk mouse dan `:focus-visible`.
- **Label aksi**: satu niat, satu label. "Pesan Meja" untuk semua tautan
  reservasi WhatsApp (header, menu ponsel, Lokasi); "Lihat Menu" untuk semua
  tautan ke `#menu` (hero, Favorit).
- **Label di atas foto**: tidak ada pil di atas gambar. Label hidangan
  ("Favorit", "Warisan") ditaruh di bawah foto.
- **Kartu**: sudut `1rem` sampai `2rem`, latar putih di atas krem, garis rambut
  `taupe`, tanpa bayangan dan tanpa efek angkat saat ditunjuk (kartu menu tidak
  bisa diklik). Bayangan hanya untuk elemen yang benar-benar bertumpuk: kartu
  mural di Cerita dan tombol putar video.
- **Kaca (blur)**: hanya header saat digulir. Tidak ada blur lain.
- **Ikon**: seluruhnya `lucide-react` dengan `strokeWidth` 1 sampai 1.5. Tidak
  ada ikon SVG buatan tangan. Lucide 1.x tidak memuat ikon merek, jadi tautan
  Instagram di footer ditulis sebagai teks ("Instagram @bakalkopi.id").
- **Peralihan bagian**: [`TornEdge`](src/components/torn-edge.tsx), tepi sobek
  yang kurvanya tidak berulang.
- **Judul bagian**: [`SectionHeading`](src/components/section-heading.tsx).
  Rata tengah di bagian terang, rata kiri di bagian gelap (Suasana, Lokasi)
  agar irama halaman tidak seragam. Eyebrow (label kapital di atas judul)
  hanya di tiga tempat: Hero, Menu, Lokasi. Bagian lain langsung dibuka judul.
  Subhalaman tidak memakai eyebrow; penggantinya breadcrumb di `PageHeader`.
- **Navigasi**: 7 tautan (Beranda, Cerita, Menu, Galeri, Reservasi, Panduan,
  Kontak). Baris tautan desktop baru tampil mulai `xl`; di bawahnya menu ponsel,
  karena di `lg` tujuh tautan menggencet tombol "Pesan Meja".
- **Hero**: eyebrow, H1 dua baris (kalimat terakhir slogan berdiri sendiri;
  di ponsel putus per kalimat), satu paragraf, dua aksi. Tidak ada strip fakta
  di bawah tombol. Tinggi `min-h-dvh`.

## 4. Tata letak

Wadah `max-w-7xl` dengan padding `px-5 md:px-10`. Jarak bagian punya register
ponsel (`py-16`) dan register lebar (`md:py-24` / `md:py-28`). Header `h-16`
di ponsel, `h-20` mulai `md`. Grid berpindah tiga keadaan bila isinya perlu
(mis. Galeri: 1 kolom, 2 kolom di `sm`, 12 kolom di `lg`).

Subhalaman memakai [`PageShell` dan `PageHeader`](src/components/page/page-shell.tsx):
pita gelap dengan breadcrumb dan H1, lalu isi di kolom baca `max-w-3xl`
([`prose.tsx`](src/components/page/prose.tsx): `Article`, `Section`,
`PageCta`). Panduan memakai [`GuideLayout`](src/components/page/guide-layout.tsx).

| Rute | Isi |
| --- | --- |
| `/menu` | Seluruh menu dan harga, JSON-LD `Menu` |
| `/panduan` | Daftar panduan dan FAQ (`FAQPage`) |
| `/panduan/[slug]` | Empat panduan, terdaftar di [guides.ts](src/lib/guides.ts) |
| `/tentang` | Cerita dan identitas usaha (`AboutPage`) |
| `/kontak` | WhatsApp, Instagram, alamat, peta (`ContactPage`) |

```
Hero (gelap) → Cerita → Favorit → Menu (terang)
  → Pita statis + Suasana (gelap) → Momen → Galeri → Fasilitas (terang)
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
tanpa akhir: segel berputar di hero dan pita teks berjalan sudah dicabut.
Semuanya menghormati `prefers-reduced-motion`, dan `globals.css` memasang
guard menyeluruh.

## 6. Data bisnis dan klaim

Alamat, koordinat, jam buka, WhatsApp, dan Instagram hanya ada di
[src/lib/site.ts](src/lib/site.ts). Menu dan harga hanya ada di
[src/lib/menu.ts](src/lib/menu.ts) (tab beranda, `/menu`, panduan, dan
`priceRange` membaca dari sana). Ubah di satu tempat.

JSON-LD di [layout.tsx](src/app/layout.tsx) berupa `@graph`: `Organization`,
`WebSite`, dan `CafeOrCoffeeShop`, saling merujuk lewat `@id` dari
[seo.ts](src/lib/seo.ts). Node halaman (Article, Menu, FAQPage) merujuk @id
yang sama. Metadata subhalaman dibuat lewat `pageMetadata()`, yang mengisi ulang
canonical, `openGraph`, dan gambar pratinjau karena Next menggabungkan metadata
secara dangkal. Tag verifikasi Google dibaca dari env
`GOOGLE_SITE_VERIFICATION`.

Aturan klaim (keputusan pemilik):

- Hanya tulis fakta yang bisa dibuktikan dari menu, foto, atau `site.ts`.
  Angka statistik, kecepatan Wi-Fi, jadwal musik, dan "gratis" tidak ditulis
  sampai pemilik memberi datanya.
- Halal bersertifikat. Di beranda disebut di dua tempat saja: Fasilitas dan
  Aturan Rumah di Lokasi. Di subhalaman hanya di `/panduan/fasilitas`.
- Tidak ada tautan `tel:`: nomor itu WhatsApp, panggilan suara belum
  dipastikan. Belum ada email, nama pengelola, atau tahun berdiri.

## 7. Bahasa

Seluruh teks antarmuka berbahasa Indonesia. Dua kecualian yang disengaja:
slogan `DELIGHT. SAVOR. CONNECT.` (tercetak di logo) dan headline
`GOOD FOOD. GOOD COFFEE. GOOD MOMENTS.`

Nama hidangan tetap seperti di menu cetak, termasuk yang berbahasa Inggris
seperti *Chicken Katsu*, karena begitulah tamu memesannya. Tanpa em dash atau
en dash; rentang ditulis dengan tanda hubung (`08.00-23.00`).
