# Sistem Desain — BAKALKOPI

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
komponen.

| Token | Nilai | Peran |
| --- | --- | --- |
| `charcoal` | `#231c18` | Pita gelap, kaki halaman, teks utama di kanvas terang |
| `charcoal-light` | `#2e2622` | Kartu di dalam pita gelap |
| `coffee` | `#4a3527` | Tombol, ikon, lencana bundar |
| `gold` | `#a97f4f` | Eyebrow, harga, ornamen, aksen tulisan tangan |
| `gold-light` | `#c79a5e` | Keadaan tunjuk pada tombol emas |
| `cream` | `#f1eade` | Bagian terang bergantian |
| `cream-light` | `#faf6ee` | Latar halaman |
| `taupe` | `#ded3c4` | Garis rambut dan tepi kartu |
| `sage` | `#7c8068` | Aksen botani |
| `amber-soft` | `#ebd5b3` | Teks kecil di atas arang |

Dibanding versi sebelumnya, arang dihangatkan (biru dibuang) dan emas
diturunkan saturasinya menjadi kuningan tua, supaya lebih dekat ke rujukan dan
tidak berteriak di layar.

## 2. Tipografi

Tiga huruf, masing-masing satu tugas:

- **Playfair Display** — display dan judul. Kelas `.text-display-hero`,
  `.text-headline-lg/md/sm` semuanya **huruf kapital dengan tracking positif**;
  kapital butuh ruang, jadi tracking negatif pada versi lama dibuang.
  `.text-serif-md` adalah satu-satunya serif tanpa paksaan kapital, dipakai
  untuk nama hidangan dan kutipan.
- **Plus Jakarta Sans** — badan teks (`.text-body-lg/md/sm`), label
  (`.text-label-caps`, kapital, tracking `0.22em`), dan harga
  (`.text-price-tag`).
- **Parisienne** — hanya untuk satu baris aksen per bagian (`.text-script`).
  Jangan dipakai lebih dari itu; daya tariknya habis kalau diulang.

Angka yang berubah atau berjajar memakai `.tabular`.

## 3. Bentuk dan komponen

- **Tombol** — kapsul penuh (`rounded-full`). Aksi utama arang pekat dengan
  teks krem; aksi sekunder hanya garis tepi.
- **Kartu** — sudut `1rem`–`2rem`, latar putih di atas krem, garis rambut
  `taupe`, bayangan umber yang lembut.
- **Ikon** — seluruhnya `lucide-react` dengan `strokeWidth` 1–1.25. Tidak ada
  ikon terisi; ini pembeda paling terasa dari versi lama.
  Catatan: lucide 1.x tidak lagi memuat ikon merek, jadi glif Instagram
  ditulis tangan di [footer.tsx](src/components/footer.tsx).
- **Peralihan bagian** — [`TornEdge`](src/components/torn-edge.tsx), tepi sobek
  yang kurvanya tidak berulang. Menggantikan pemisah gelombang mulus.
  `TornEdgeVertical` menutup sisi kiri foto hero.
- **Judul bagian** — [`SectionHeading`](src/components/section-heading.tsx)
  menyatukan eyebrow berornamen, judul, baris tulisan tangan, dan deskripsi.

## 4. Tata letak

Wadah `max-w-7xl` dengan padding `px-5 md:px-10`. Bagian bernapas lebar
(`py-20 md:py-28`). Halaman berdenyut terang–gelap:

```
Hero (terang) → Fitur (gelap) → Cerita → Favorit → Menu (terang)
  → Pita berjalan + Suasana (gelap) → Momen → Galeri → Fasilitas (terang)
  → Lokasi + Footer (gelap)
```

## 5. Gerak

Satu pustaka saja: **`motion`**. Komponen dari
[React Bits](https://reactbits.dev) ada di
[src/components/reactbits/](src/components/reactbits/):

| Komponen | Asal |
| --- | --- |
| `CountUp` | React Bits, apa adanya |
| `CircularText` | React Bits, ukuran dibuat bisa diatur |
| `AnimatedContent` | Port dari GSAP ke motion, prop sama |
| `SplitText` | Port dari GSAP ke motion, prop sama |

Dua yang terakhir diport karena versi aslinya menarik `gsap`,
`gsap/ScrollTrigger`, plugin `SplitText`, dan `@gsap/react` — tiga paket
tambahan untuk efek yang sudah bisa dilakukan motion.

Semuanya menghormati `prefers-reduced-motion`, dan `globals.css` memasang
guard menyeluruh sebagai jaring pengaman.

## 6. Data bisnis

Alamat, koordinat, jam buka, WhatsApp, dan Instagram hanya ada di
[src/lib/site.ts](src/lib/site.ts). Berkas itu juga menyuplai JSON-LD
`CafeOrCoffeeShop` di [layout.tsx](src/app/layout.tsx). Ubah di satu tempat.

## 7. Bahasa

Seluruh teks antarmuka berbahasa Indonesia. Dua kecualian yang disengaja:
slogan `DELIGHT. SAVOR. CONNECT.` (tercetak di logo) dan headline
`GOOD FOOD. GOOD COFFEE. GOOD MOMENTS.`

Nama hidangan tetap seperti di menu cetak, termasuk yang berbahasa Inggris
seperti *Chicken Katsu*, karena begitulah tamu memesannya.
