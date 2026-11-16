import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, PageShell } from "@/components/page/page-shell";
import { Article, BULLETS, PageCta, Section, TEXT_LINK } from "@/components/page/prose";
import { MENU_CATEGORIES } from "@/lib/menu";
import { BUSINESS_ID, ORG_ID, WEBSITE_ID, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ADDRESS_LINE, HOURS_LINE, SITE } from "@/lib/site";

const PATH = "/tentang";
const ITEM_COUNT = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
const CATEGORY_LIST = MENU_CATEGORIES.map((c) => c.label.toLowerCase()).join(", ");

export const metadata: Metadata = pageMetadata({
  title: "Tentang Kami",
  description: `${SITE.legalName}: kafe dan rumah makan di ${SITE.address.district}, ${SITE.address.city} yang menyajikan kopi single origin, masakan rumahan Indonesia, dan minuman racikan.`,
  path: PATH,
});

const CRUMBS = [
  { name: "Beranda", path: "/" },
  { name: "Tentang Kami", path: PATH },
];

const ABOUT_JSON_LD = {
  "@type": "AboutPage",
  "@id": `${absoluteUrl(PATH)}#page`,
  url: absoluteUrl(PATH),
  name: `Tentang ${SITE.name}`,
  inLanguage: "id-ID",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": ORG_ID },
  about: { "@id": BUSINESS_ID },
  primaryImageOfPage: absoluteUrl("/images/room-4.jpg"),
};

const IDENTITY = [
  { label: "Nama usaha", value: SITE.legalName },
  { label: "Merek", value: SITE.name },
  { label: "Alamat", value: ADDRESS_LINE },
  { label: "Jam buka", value: `${SITE.hours.label}, ${HOURS_LINE}` },
  { label: "WhatsApp", value: SITE.contact.whatsappDisplay },
  { label: "Instagram", value: `@${SITE.contact.instagram}` },
  { label: "Situs resmi", value: SITE.url.replace(/^https?:\/\//, "") },
];

export default function TentangPage() {
  return (
    <PageShell activeId="cerita">
      <JsonLd data={[ABOUT_JSON_LD, breadcrumbJsonLd(CRUMBS)]} />
      <PageHeader
        crumbs={CRUMBS}
        title={`Tentang ${SITE.name}`}
        lead={`${SITE.legalName} mempertemukan kopi single origin, masakan rumahan Indonesia, dan minuman racikan di ruang tropis yang sengaja dibuat untuk memperlambat langkah.`}
      />
      <Article>
        <Image
          src="/images/room-4.jpg"
          alt="Ruang dalam BAKALKOPI dengan mural proses kopi dan meja kayu"
          width={1280}
          height={860}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="aspect-[3/2] w-full rounded-[1.75rem] object-cover"
        />

        <Section title="Lebih dari sekadar kopi">
          <p>
            Aroma nasi bakar daun pisang dan espresso yang baru diekstraksi, dengan meja yang cukup
            lapang untuk berbincang. Semboyan kami tertulis di logo: {SITE.tagline}
          </p>
        </Section>

        <Section title="Yang kami sajikan">
          <p>
            Menu kami berisi {ITEM_COUNT} hidangan dan minuman dalam enam golongan: {CATEGORY_LIST}.
            Daftar lengkap dan harganya ada di{" "}
            <Link href="/menu" className={TEXT_LINK}>
              halaman menu
            </Link>
            .
          </p>
        </Section>

        <Section title="Ruang kami">
          <ul className={BULLETS}>
            <li>Ruang dalam ber-AC dengan lampu gantung hangat dan kursi booth, bebas asap rokok.</li>
            <li>Ruang bermural kebun kopi dengan mural lukis tangan, meja keluarga, dan kursi anak.</li>
            <li>Teras terbuka dengan lampu untaian dan dinding bambu, tempat musisi tampil akustik.</li>
          </ul>
        </Section>

        <Section title="Identitas usaha">
          <dl className="flex flex-col divide-y divide-taupe/70">
            {IDENTITY.map(({ label, value }) => (
              <div key={label} className="grid grid-cols-1 gap-1 py-3 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-label-caps pt-1 text-charcoal/60">{label}</dt>
                <dd className="text-body-lg break-words text-charcoal">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <PageCta />
      </Article>
    </PageShell>
  );
}
