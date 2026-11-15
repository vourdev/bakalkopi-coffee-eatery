// Sumber tunggal menu: tab di beranda, halaman /menu, panduan, dan JSON-LD membaca dari sini.

export interface Photo {
  src: string;
  alt: string;
}

export interface MenuItem {
  name: string;
  /** Dalam ribuan rupiah. */
  price: string;
  desc: string;
  tag: string | null;
  /** Hanya untuk hidangan yang fotonya sudah terkonfirmasi. */
  photo?: Photo;
}

export interface MenuCategory {
  label: string;
  note: string;
  cover: Photo | null;
  items: MenuItem[];
}

export const MENU_DATA: Record<string, MenuCategory> = {
  nusantara: {
    label: "Nusantara",
    note: "Nasi bakar daun pisang, rawon, dan lauk rumahan yang dimasak harian.",
    cover: {
      src: "/images/menu-3.jpg",
      alt: "Nasi timbel dengan ayam rempah, tahu, tempe, dan lalapan segar",
    },
    items: [
      { name: "Nasi Bakar Ayam Jamur", price: "36", desc: "Ayam, jamur, dan telur suwir dalam nasi gurih, dibungkus daun pisang lalu dibakar, termasuk kerupuk", tag: "Andalan" },
      { name: "Nasi Bakar Cumi", price: "40", desc: "Cumi pedas dan telur suwir dalam nasi gurih, dibungkus daun pisang lalu dibakar", tag: null },
      { name: "Nasi Bakar Ikan Asap", price: "42", desc: "Ikan asap pedas dan telur suwir dengan nasi gurih yang dibakar", tag: null },
      { name: "Nasi Timbel", price: "42", desc: "Nasi putih, ayam rempah, tahu, tempe, sayur asam, sambal, dan lalapan", tag: "Warisan" },
      { name: "Nasi Bakal Mangga", price: "45", desc: "Nasi putih, ayam goreng sambal mangga, tahu, tempe, dan karedok", tag: null },
      { name: "Rawon", price: "55", desc: "Iga dan daging sapi berkuah rawon, nasi putih, sambal, dan kerupuk", tag: "Andalan" },
      { name: "Soto Ayam Surabaya", price: "40", desc: "Ayam suwir, soun, kol, telur, keripik kentang, dan koya dengan nasi putih", tag: null },
      { name: "Garang Asem", price: "55", desc: "Iga dan daging sapi berkuah garang asem, nasi putih, sambal, dan kerupuk", tag: null },
      { name: "Pecak Ikan Nila", price: "47", desc: "Ikan nila merah dengan sambal pecak khas BAKALKOPI, termasuk nasi putih", tag: null },
    ],
  },
  kopi: {
    label: "Kopi",
    note: "Single origin Nusantara, diseduh manual maupun dengan mesin.",
    cover: {
      src: "/images/menu-21.jpg",
      alt: "Alpacino: kopi dan alpukat diblender, dengan satu skop Ice Cream Bakal",
    },
    items: [
      { name: "Es Bakalkopi", price: "29", desc: "Racikan espresso rumahan, susu segar dingin, dan gula aren", tag: "Favorit" },
      { name: "Latte", price: "29", desc: "Espresso klasik dengan susu segar yang di-steam", tag: null },
      { name: "Cappucino", price: "30", desc: "Espresso pekat dengan busa susu tebal", tag: null },
      { name: "Vanilla Latte", price: "32", desc: "Espresso, susu steam, dan vanila premium", tag: null },
      { name: "Caramel Macchiato", price: "35", desc: "Espresso berlapis, susu steam, siraman karamel", tag: null },
      { name: "Dirty Matcha", price: "35", desc: "Matcha premium dengan satu shot espresso", tag: "Favorit" },
      { name: "Kori-Kohi", price: "35", desc: "Espresso beku ala Jepang", tag: null },
      { name: "Affogato", price: "30", desc: "Espresso panas dituang di atas es krim", tag: null },
      { name: "Mochacino", price: "38", desc: "Espresso, cokelat, dan susu steam", tag: null, photo: { src: "/images/menu-22.jpg", alt: "Mochacino dingin berbusa dengan guratan cokelat di dinding gelas" } },
      { name: "Americano", price: "22", desc: "Double shot espresso dengan air", tag: null },
      { name: "V60 Manual Brew", price: "33", desc: "Single origin, seduh tuang manual per cangkir", tag: "Spesial" },
    ],
  },
  pasta: {
    label: "Pasta & Nasi",
    note: "Pasta dan nasi goreng, diantar panas langsung dari wajan.",
    cover: {
      src: "/images/menu-7.jpg",
      alt: "Nasi goreng merah dengan telur dadar renyah di atasnya",
    },
    items: [
      { name: "Spaghetti Alfredo", price: "41", desc: "Saus alfredo krim dengan pasta al dente", tag: null, photo: { src: "/images/menu-1.jpg", alt: "Spaghetti alfredo bersaus krim dalam mangkuk keramik" } },
      { name: "Spaghetti Aglio Fish Bakal", price: "41", desc: "Pasta minyak bawang dengan ikan asap dan cabai", tag: "Andalan", photo: { src: "/images/menu-18.jpg", alt: "Spaghetti aglio olio dengan suwiran ikan asap dan irisan cabai merah" } },
      { name: "Spaghetti Katsu Matah", price: "44", desc: "Ayam katsu, sambal matah, dan pasta", tag: null },
      { name: "Nasi Goreng Smokey", price: "40", desc: "Nasi goreng smokey dengan bumbu rempah", tag: null },
      { name: "Nasi Goreng Petei", price: "42", desc: "Nasi goreng dengan petai", tag: null },
      { name: "Nasi Banteng", price: "42", desc: "Nasi campur andalan yang mengenyangkan", tag: null },
    ],
  },
  ricebowl: {
    label: "Ricebowl & Katsu",
    note: "Semangkuk nasi dengan lauk bersaus, cepat dan mengenyangkan.",
    cover: {
      src: "/images/menu-13.jpg",
      alt: "Ricebowl dengan telur orak-arik, daging suwir berbumbu, dan slaw pedas",
    },
    items: [
      { name: "Chicken Katsu", price: "45", desc: "Fillet ayam berbalut panko, renyah di luar", tag: "Favorit", photo: { src: "/images/menu-15.jpg", alt: "Ricebowl chicken katsu bersaus, ditabur daun bawang dan wijen" } },
      { name: "Chicken Curry", price: "36", desc: "Ayam empuk dalam saus kari beraroma", tag: null },
      { name: "Fish Bakal", price: "42", desc: "Fillet ikan segar dengan saus andalan", tag: null },
      { name: "Chicken Matah", price: "45", desc: "Ayam panggang dengan sambal matah", tag: null },
      { name: "Chicken Mushroom", price: "36", desc: "Ayam dengan saus jamur gurih", tag: null },
      { name: "Blackpepper Chicken", price: "40", desc: "Ayam dengan saus lada hitam pekat", tag: null },
    ],
  },
  nonkopi: {
    label: "Non-Kopi",
    note: "Cokelat, matcha, yoghurt, dan teh untuk yang sedang tidak ingin kopi.",
    cover: {
      src: "/images/menu-19.jpg",
      alt: "Smoothie pisang dan yoghurt dalam gelas tinggi, dengan es krim vanila di atasnya",
    },
    items: [
      { name: "Dark Chocolate", price: "30", desc: "Cokelat hitam pekat dan lembut", tag: null, photo: { src: "/images/menu-10.jpg", alt: "Minuman cokelat dingin dalam gelas tinggi dengan serutan cokelat" } },
      { name: "Matcha Latte", price: "27", desc: "Matcha Jepang premium dengan susu segar", tag: "Favorit", photo: { src: "/images/menu-5.jpg", alt: "Es matcha latte hijau dalam gelas tinggi" } },
      { name: "Taro Latte", price: "26", desc: "Talas lembut dengan susu steam", tag: null },
      { name: "Red Velvet", price: "24", desc: "Minuman susu red velvet", tag: null },
      { name: "Mango Yoghurt", price: "31", desc: "Mangga segar diblender dengan yoghurt", tag: null },
      { name: "Strawberry Yoghurt", price: "31", desc: "Perpaduan stroberi dan yoghurt", tag: null },
      { name: "Berry Banana Burst", price: "32", desc: "Frappe beri campur pisang", tag: null },
      { name: "Chochip Frappe", price: "38", desc: "Es blend cokelat chip", tag: null },
      { name: "Premium Jasmine Tea", price: "34", desc: "Teh melati wangi, panas atau dingin", tag: null },
      { name: "Lychee Tea", price: "31", desc: "Teh leci yang menyegarkan", tag: null },
    ],
  },
  camilan: {
    label: "Camilan",
    note: "Teman ngobrol: gorengan, platter berbagi, dan yang manis-manis.",
    cover: {
      src: "/images/menu-17.jpg",
      alt: "Sepiring pisang goreng karamel bertabur wijen hitam",
    },
    items: [
      { name: "Chicken Spring Roll", price: "31", desc: "Lumpia goreng isi ayam, renyah", tag: null },
      { name: "Gyoza Chicken", price: "31", desc: "Pangsit Jepang panggang wajan", tag: null },
      { name: "Katsu Bites", price: "31", desc: "Potongan katsu renyah seukuran gigitan", tag: "Favorit", photo: { src: "/images/menu-2.jpg", alt: "Katsu bites renyah dalam keranjang rotan dengan saus tomat" } },
      { name: "French Fries", price: "25", desc: "Kentang goreng renyah keemasan", tag: null },
      { name: "Snack Platter", price: "50", desc: "Aneka camilan untuk berbagi", tag: null },
      { name: "Sandwich Platter", price: "50", desc: "Aneka sandwich untuk berbagi", tag: null },
      { name: "Choco Brownie", price: "28", desc: "Brownies cokelat pekat", tag: null, photo: { src: "/images/menu-16.jpg", alt: "Choco brownie dengan es krim vanila, saus stroberi, dan irisan pisang" } },
      { name: "Mini Burger", price: "28", desc: "Burger mini dengan saus spesial", tag: null, photo: { src: "/images/menu-11.jpg", alt: "Tiga mini burger berisi ayam suwir berbumbu" } },
    ],
  },
};

export const MENU_CATEGORIES = Object.entries(MENU_DATA).map(([id, category]) => ({
  id,
  ...category,
}));

const ALL_PRICES = MENU_CATEGORIES.flatMap((c) => c.items.map((i) => Number(i.price)));

/** Harga dalam rupiah penuh, mis. "36" menjadi 36000. */
export function priceIdr(price: string): number {
  return Number(price) * 1000;
}

/** Format tampil, mis. "Rp36.000". */
export function formatIdr(price: string): string {
  return `Rp${priceIdr(price).toLocaleString("id-ID")}`;
}

export const PRICE_MIN = String(Math.min(...ALL_PRICES));
export const PRICE_MAX = String(Math.max(...ALL_PRICES));
/** Kisaran harga satu menu, mis. "Rp22.000-Rp55.000". */
export const PRICE_RANGE = `${formatIdr(PRICE_MIN)}-${formatIdr(PRICE_MAX)}`;
