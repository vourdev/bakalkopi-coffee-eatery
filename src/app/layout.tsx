import type { Metadata } from "next";
import { Parisienne, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ADDRESS_LINE, HOURS_LINE, SITE } from "@/lib/site";
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

const DESCRIPTION =
  "Kafe dan rumah makan Nusantara di Cimanggis, Depok. Kopi single origin, masakan rumahan Indonesia, teras terbuka, akustik akhir pekan, dan parkiran luas. Buka setiap hari 08.00–23.00 WIB.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Kafe & Rumah Makan Nusantara di Depok`,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.headline}`,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/BakalKopi-home.jpg",
        width: 1920,
        height: 1280,
        alt: `Fasad ${SITE.name} pada malam hari dengan papan nama menyala`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.headline}`,
    description: DESCRIPTION,
    images: ["/images/BakalKopi-home.jpg"],
  },
  robots: { index: true, follow: true },
};

/** Data terstruktur untuk hasil pencarian lokal dan Google Maps. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": `${SITE.url}#business`,
  name: SITE.name,
  legalName: SITE.legalName,
  description: DESCRIPTION,
  url: SITE.url,
  image: `${SITE.url}/images/BakalKopi-home.jpg`,
  logo: `${SITE.url}/images/logo.png`,
  slogan: SITE.tagline,
  telephone: `+${SITE.contact.whatsapp}`,
  priceRange: "Rp22.000 – Rp55.000",
  servesCuisine: ["Indonesia", "Nusantara", "Kopi", "Pasta"],
  currenciesAccepted: "IDR",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
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
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi gratis", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parkir luas", value: true },
    { "@type": "LocationFeatureSpecification", name: "Ruang ber-AC", value: true },
    { "@type": "LocationFeatureSpecification", name: "Teras terbuka", value: true },
    { "@type": "LocationFeatureSpecification", name: "Ramah keluarga", value: true },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${jakarta.variable} ${parisienne.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // Nilainya konstanta milik kita sendiri, bukan masukan pengguna.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
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
