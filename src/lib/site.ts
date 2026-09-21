/**
 * Sumber tunggal data bisnis BAKALKOPI.
 * Dipakai oleh section, footer, metadata, dan JSON-LD LocalBusiness.
 */

export const SITE = {
  name: "BAKALKOPI",
  legalName: "BAKALKOPI Indonesian Culinary Sanctuary",
  tagline: "DELIGHT. SAVOR. CONNECT.",
  headline: "GOOD FOOD. GOOD COFFEE. GOOD MOMENTS.",
  eyebrow: "KOPI & DAPUR NUSANTARA",
  url: "https://bakalkopi.id",

  address: {
    street: "Jl. RTM Gg. Sadar No. 4A, RT.008/RW.010",
    village: "Tugu",
    district: "Kec. Cimanggis",
    city: "Kota Depok",
    region: "Jawa Barat",
    postalCode: "16451",
    country: "ID",
  },

  geo: { lat: -6.361936, lng: 106.842503 },

  maps: {
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.2480344836727!2d106.84250327986379!3d-6.361936078353037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edc72864c501%3A0x59b9a8a79d62653e!2sbakalkopi!5e0!3m2!1sid!2sid!4v1789971695364!5m2!1sid!2sid",
    directions: "https://www.google.com/maps/dir/?api=1&destination=-6.361936,106.842503",
    place: "https://www.google.com/maps/search/?api=1&query=bakalkopi",
  },

  hours: {
    label: "Senin – Minggu",
    open: "08.00",
    close: "23.00",
    timezone: "WIB",
    /** Format schema.org: 24 jam, buka setiap hari. */
    opens: "08:00",
    closes: "23:00",
  },

  contact: {
    whatsapp: "6281998871888",
    whatsappDisplay: "0819-9887-1888",
    instagram: "bakalkopi.id",
    instagramUrl: "https://www.instagram.com/bakalkopi.id",
  },
} as const;

/** Alamat satu baris untuk footer dan metadata. */
export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.village}, ${SITE.address.district}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

/** Jam buka siap tampil, mis. "08.00 – 23.00 WIB". */
export const HOURS_LINE = `${SITE.hours.open} – ${SITE.hours.close} ${SITE.hours.timezone}`;

/** Tautan WhatsApp dengan pesan pembuka yang sudah terisi. */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WA_RESERVASI = waLink(
  "Halo BAKALKOPI, saya ingin reservasi meja."
);
export const WA_TANYA = waLink("Halo BAKALKOPI, saya ingin bertanya.");
