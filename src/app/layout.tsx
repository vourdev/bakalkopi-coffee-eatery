import type { Metadata, Viewport } from "next";
import { Parisienne, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { PRICE_RANGE } from "@/lib/menu";
import { BUSINESS_ID, ORG_ID, WEBSITE_ID, absoluteUrl } from "@/lib/seo";
import { ADDRESS_LINE, HOURS_LINE, SITE, WA_RESERVASI } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: ["400"],
});

// Di bawah ~155 karakter agar tidak terpotong di hasil Google.
const DESCRIPTION =
  "Kafe & rumah makan Nusantara di Cimanggis, Depok. Kopi single origin, masakan rumahan, teras terbuka, live akustik, parkir luas. Buka 08.00-23.00 WIB.";

// Kartu pratinjau WhatsApp/Facebook/X hanya menampilkan satu-dua baris.
const SHARE_DESCRIPTION =
  "Kopi single origin & masakan rumahan Nusantara di Cimanggis, Depok. Buka setiap hari 08.00-23.00 WIB.";

const TITLE = `${SITE.name} · Kafe & Rumah Makan Nusantara di Depok`;

export const viewport: Viewport = {
  themeColor: "#231c18",
};

// Gambar pratinjau dari opengraph-image.jpg di folder ini; jaga di bawah 300 KB agar WhatsApp memuatnya.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "bakalkopi",
    "kafe depok",
    "kopi cimanggis",
    "tempat nongkrong depok",
    "rumah makan nusantara",
    "kopi susu aren",
    "kafe parkir luas depok",
    "live akustik depok",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  appleWebApp: { title: SITE.name },
  referrer: "strict-origin-when-cross-origin",
  // Token dari Search Console; tanpa env tag verifikasi tidak dirender.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: SHARE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHARE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
  category: "food",
};

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

// Tiga entitas saling merujuk lewat @id: pemilik usaha, situs, dan tempatnya.
const JSON_LD = [
  {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl("/images/logo.png"),
    slogan: SITE.tagline,
    address: ADDRESS,
    sameAs: [SITE.contact.instagramUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: `+${SITE.contact.whatsapp}`,
      url: WA_RESERVASI,
      areaServed: "ID",
      availableLanguage: ["id"],
    },
  },
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "id-ID",
    publisher: { "@id": ORG_ID },
  },
  {
    "@type": "CafeOrCoffeeShop",
    "@id": BUSINESS_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    description: DESCRIPTION,
    url: SITE.url,
    image: absoluteUrl("/images/BakalKopi-home.jpg"),
    logo: absoluteUrl("/images/logo.png"),
    slogan: SITE.tagline,
    telephone: `+${SITE.contact.whatsapp}`,
    priceRange: PRICE_RANGE,
    servesCuisine: ["Indonesia", "Nusantara", "Kopi", "Pasta"],
    currenciesAccepted: "IDR",
    hasMenu: absoluteUrl("/menu"),
    acceptsReservations: true,
    parentOrganization: { "@id": ORG_ID },
    address: ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.maps.place,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: SITE.hours.opens,
        closes: SITE.hours.closes,
      },
    ],
    sameAs: [SITE.contact.instagramUrl],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parkir luas", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ruang ber-AC", value: true },
      { "@type": "LocationFeatureSpecification", name: "Teras terbuka", value: true },
      { "@type": "LocationFeatureSpecification", name: "Ramah keluarga", value: true },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: WA_RESERVASI,
      result: { "@type": "FoodEstablishmentReservation" },
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${jakarta.variable} ${parisienne.variable} antialiased`}
    >
      <head>
        <JsonLd data={JSON_LD} />
        <meta name="geo.position" content={`${SITE.geo.lat};${SITE.geo.lng}`} />
        <meta name="geo.placename" content={`${SITE.name}, ${SITE.address.city}`} />
        <meta name="geo.region" content="ID-JB" />
        <meta name="business:hours" content={`${SITE.hours.label} ${HOURS_LINE}`} />
        <meta name="business:contact_data:street_address" content={ADDRESS_LINE} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
