// Daftar halaman panduan: indeks /panduan, sitemap, dan footer membaca dari sini.

export interface Guide {
  slug: string;
  title: string;
  /** Label pendek untuk footer dan daftar tautan. */
  navLabel: string;
  /** Di bawah ~155 karakter agar tidak terpotong di hasil pencarian. */
  description: string;
  published: string;
  modified: string;
  image: string;
  imageAlt: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "reservasi",
    navLabel: "Cara Pesan Meja",
    title: "Cara Pesan Meja di BAKALKOPI",
    description:
      "Langkah reservasi meja lewat WhatsApp, data yang perlu disebutkan, jam buka, dan aturan rumah sebelum datang ke BAKALKOPI Cimanggis.",
    published: "2026-11-15",
    modified: "2026-11-15",
    image: "/images/room-2.jpg",
    imageAlt:
      "Ruang dalam BAKALKOPI pada malam hari dengan lampu gantung hangat dan tempat duduk booth",
  },
  {
    slug: "rute-dan-parkir",
    navLabel: "Rute & Parkir",
    title: "Rute ke BAKALKOPI dan Info Parkir",
    description:
      "Alamat lengkap BAKALKOPI di Tugu, Cimanggis, Depok, titik koordinat untuk Google Maps, dan lahan parkir untuk mobil dan motor.",
    published: "2026-11-15",
    modified: "2026-11-15",
    image: "/images/parkiran.jpg",
    imageAlt:
      "Area parkir BAKALKOPI pada malam hari dengan lampu untaian dan mobil terparkir",
  },
  {
    slug: "fasilitas",
    navLabel: "Fasilitas & Aturan Rumah",
    title: "Fasilitas dan Aturan Rumah BAKALKOPI",
    description:
      "Wi-Fi, parkiran luas, teras terbuka, ruang ber-AC, panggung akustik, dan aturan rumah yang berlaku di BAKALKOPI.",
    published: "2026-11-15",
    modified: "2026-11-15",
    image: "/images/room-3.jpg",
    imageAlt:
      "Teras terbuka BAKALKOPI pada siang hari dengan meja bundar dan tanaman hijau",
  },
  {
    slug: "menu-andalan",
    navLabel: "Menu Andalan",
    title: "Menu Andalan BAKALKOPI dari Pagi sampai Malam",
    description:
      "Hidangan bertanda Andalan, Favorit, Spesial, dan Warisan di menu BAKALKOPI, lengkap dengan harga dan waktu yang cocok untuk memesannya.",
    published: "2026-11-15",
    modified: "2026-11-15",
    image: "/images/menu-3.jpg",
    imageAlt: "Nasi timbel dengan ayam rempah, tahu, tempe, dan lalapan segar",
  },
];

export function getGuide(slug: string): Guide {
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Panduan "${slug}" tidak terdaftar di GUIDES.`);
  return guide;
}
