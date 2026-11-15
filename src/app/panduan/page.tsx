import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, PageShell } from "@/components/page/page-shell";
import { PageCta, TEXT_LINK } from "@/components/page/prose";
import { Faq3 } from "@/components/ui/faq3";
import { GUIDES } from "@/lib/guides";
import { PRICE_RANGE } from "@/lib/menu";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ADDRESS_LINE, HOURS_LINE, SITE, WA_TANYA } from "@/lib/site";

const PATH = "/panduan";

export const metadata: Metadata = pageMetadata({
  title: "Panduan Berkunjung",
  description: `Cara pesan meja, rute dan parkir, fasilitas, aturan rumah, dan menu andalan BAKALKOPI di ${SITE.address.district}, ${SITE.address.city}, beserta jawaban pertanyaan yang sering diajukan.`,
  path: PATH,
});

const CRUMBS = [
  { name: "Beranda", path: "/" },
  { name: "Panduan", path: PATH },
];

// Jawaban hanya dari fakta yang sudah ada di situs; teks yang sama dipakai untuk FAQPage.
const FAQ = [
  {
    q: "Jam berapa BAKALKOPI buka?",
    a: `${SITE.hours.label}, pukul ${HOURS_LINE}. Dapur melayani sampai jam tutup.`,
  },
  {
    q: "Di mana alamat BAKALKOPI?",
    a: `${ADDRESS_LINE}. Di Google Maps tercatat dengan nama bakalkopi.`,
  },
  {
    q: "Bagaimana cara reservasi meja?",
    a: `Kirim pesan WhatsApp ke ${SITE.contact.whatsappDisplay} dengan nama, tanggal dan jam kedatangan, jumlah orang, serta area yang diinginkan.`,
  },
  {
    q: "Apakah ada tempat parkir?",
    a: "Ada. Lahan parkir tersedia untuk mobil dan motor, dan diterangi lampu untaian pada malam hari.",
  },
  {
    q: "Boleh membawa makanan atau minuman dari luar?",
    a: "Tidak. Makanan dan minuman dari luar tidak boleh dibawa masuk.",
  },
  {
    q: "Apakah ada Wi-Fi?",
    a: "Ada Wi-Fi untuk tamu. Meja di ruang dalam ber-AC bisa dipakai bekerja atau belajar.",
  },
  {
    q: "Berapa kisaran harga menunya?",
    a: `Harga per menu ${PRICE_RANGE}, belum termasuk PB1.`,
  },
  {
    q: "Apakah cocok untuk datang bersama keluarga?",
    a: "Cocok. Area BAKALKOPI ramah keluarga, tersedia meja panjang dan kursi anak, dan ruang ber-AC bebas asap rokok.",
  },
];

const FAQ_JSON_LD = {
  "@type": "FAQPage",
  "@id": `${absoluteUrl(PATH)}#faq`,
  inLanguage: "id-ID",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function PanduanPage() {
  return (
    <PageShell activeId="panduan">
      <JsonLd data={[FAQ_JSON_LD, breadcrumbJsonLd(CRUMBS)]} />
      <PageHeader
        crumbs={CRUMBS}
        title="Panduan berkunjung ke BAKALKOPI"
        lead="Semua yang perlu diketahui sebelum datang: cara pesan meja, rute dan parkir, fasilitas dan aturan rumah, serta hidangan yang paling sering dipesan."
      />

      <div className="mx-auto max-w-5xl px-5 pt-8 pb-16 md:px-10 md:pt-12 md:pb-24">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/panduan/${guide.slug}`} className="group block active:opacity-80">
                <div className="overflow-hidden rounded-[1.75rem]">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    width={1280}
                    height={860}
                    sizes="(min-width: 768px) 30rem, 100vw"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h2 className="text-headline-sm mt-5 text-charcoal transition-colors group-hover:text-gold-deep">
                  {guide.title}
                </h2>
                <p className="text-body-md mt-2 text-charcoal/70">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-body-lg mt-12 text-charcoal/75">
          Daftar semua hidangan dan harganya ada di halaman{" "}
          <Link href="/menu" className={TEXT_LINK}>
            menu lengkap
          </Link>
          .
        </p>

        <Faq3
          heading="Pertanyaan yang sering diajukan"
          description={
            <>
              Pertanyaan lain bisa dikirim lewat{" "}
              <Link href={WA_TANYA} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
                WhatsApp {SITE.contact.whatsappDisplay}
              </Link>
              .
            </>
          }
          items={FAQ.map(({ q, a }, i) => ({ id: `faq-${i + 1}`, question: q, answer: a }))}
          className="mt-16 border-t border-taupe pt-10 md:mt-20"
        />

        <div className="mt-16">
          <PageCta />
        </div>
      </div>
    </PageShell>
  );
}
