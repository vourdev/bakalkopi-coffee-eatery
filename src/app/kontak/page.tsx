import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, PageShell } from "@/components/page/page-shell";
import { Article, PageCta, Section, TEXT_LINK } from "@/components/page/prose";
import { BUSINESS_ID, WEBSITE_ID, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ADDRESS_LINE, HOURS_LINE, SITE, WA_RESERVASI, WA_TANYA } from "@/lib/site";

const PATH = "/kontak";

export const metadata: Metadata = pageMetadata({
  title: "Kontak",
  description: `Hubungi BAKALKOPI lewat WhatsApp ${SITE.contact.whatsappDisplay} atau Instagram @${SITE.contact.instagram}. Alamat: ${ADDRESS_LINE}. Buka ${SITE.hours.label}, ${HOURS_LINE}.`,
  path: PATH,
});

const CRUMBS = [
  { name: "Beranda", path: "/" },
  { name: "Kontak", path: PATH },
];

const CONTACT_JSON_LD = {
  "@type": "ContactPage",
  "@id": `${absoluteUrl(PATH)}#page`,
  url: absoluteUrl(PATH),
  name: `Kontak ${SITE.name}`,
  inLanguage: "id-ID",
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": BUSINESS_ID },
};

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function KontakPage() {
  return (
    <PageShell activeId="kontak">
      <JsonLd data={[CONTACT_JSON_LD, breadcrumbJsonLd(CRUMBS)]} />
      <PageHeader
        crumbs={CRUMBS}
        title={`Kontak ${SITE.name}`}
        lead="Reservasi meja dan pertanyaan dilayani lewat WhatsApp. Alamat, jam buka, dan peta ada di bawah."
      />
      <Article>
        <Section title="WhatsApp">
          <p>
            Nomor WhatsApp kami{" "}
            <span className="tabular font-semibold text-charcoal">{SITE.contact.whatsappDisplay}</span>.
          </p>
          <ul className="flex flex-col">
            <li>
              <Link href={WA_RESERVASI} {...EXTERNAL} className={`${TEXT_LINK} inline-flex min-h-11 items-center`}>
                Kirim pesan reservasi meja
              </Link>
            </li>
            <li>
              <Link href={WA_TANYA} {...EXTERNAL} className={`${TEXT_LINK} inline-flex min-h-11 items-center`}>
                Kirim pertanyaan
              </Link>
            </li>
          </ul>
        </Section>

        <Section title="Instagram">
          <p>
            Ikuti{" "}
            <Link href={SITE.contact.instagramUrl} {...EXTERNAL} className={TEXT_LINK}>
              @{SITE.contact.instagram}
            </Link>{" "}
            di Instagram.
          </p>
        </Section>

        <Section title="Alamat dan jam buka">
          <address className="flex flex-col gap-1 not-italic">
            <span className="font-semibold text-charcoal">{SITE.legalName}</span>
            <span>{ADDRESS_LINE}</span>
            <span>
              {SITE.hours.label}, {HOURS_LINE}
            </span>
          </address>
          <div className="overflow-hidden rounded-[1.75rem] border border-taupe">
            <iframe
              src={SITE.maps.embed}
              title={`Peta lokasi ${SITE.name} di ${SITE.address.district}, ${SITE.address.city}`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block h-[280px] w-full border-0 md:h-[340px]"
            />
          </div>
          <p>
            Buka{" "}
            <Link href={SITE.maps.directions} {...EXTERNAL} className={TEXT_LINK}>
              petunjuk arah di Google Maps
            </Link>
            , atau baca{" "}
            <Link href="/panduan/rute-dan-parkir" className={TEXT_LINK}>
              panduan rute dan parkir
            </Link>
            .
          </p>
        </Section>

        <PageCta />
      </Article>
    </PageShell>
  );
}
