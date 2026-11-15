import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout, guideMetadata } from "@/components/page/guide-layout";
import { BULLETS, Section, TEXT_LINK } from "@/components/page/prose";
import { AMENITIES } from "@/components/sections/amenities";
import { SITE, WA_TANYA } from "@/lib/site";

const SLUG = "fasilitas";

export const metadata: Metadata = guideMetadata(SLUG);

export default function FasilitasGuide() {
  return (
    <GuideLayout
      slug={SLUG}
      lead="Daftar fasilitas yang tersedia di BAKALKOPI, untuk siapa saja fasilitas itu cocok, dan aturan rumah yang berlaku bagi semua tamu."
    >
      <Section title="Fasilitas">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
          {AMENITIES.map(({ title, desc }) => (
            <div key={title} className="border-t border-taupe/70 pt-4">
              <dt className="text-label-caps text-charcoal">{title}</dt>
              <dd className="text-body-md mt-1.5 text-charcoal/70">{desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Untuk kerja dan belajar">
        <p>
          Meja di ruang dalam ber-AC bisa dipakai bekerja atau belajar, dengan Wi-Fi untuk tamu.
          Kopi tersedia sejak jam buka pukul {SITE.hours.open}.
        </p>
      </Section>

      <Section title="Untuk keluarga">
        <p>
          Area BAKALKOPI ramah keluarga. Ruang bermural kebun kopi punya meja panjang dan kursi
          anak, dan ruang ber-AC bebas asap rokok.
        </p>
      </Section>

      <Section title="Musik akustik">
        <p>
          Musisi tampil akustik di teras berlampu untaian. Jadwal tampil belum diumumkan di situs
          ini, jadi tanyakan lewat{" "}
          <Link href={WA_TANYA} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
            WhatsApp
          </Link>{" "}
          sebelum datang.
        </p>
      </Section>

      <Section title="Aturan rumah" id="aturan-rumah">
        <ul className={BULLETS}>
          <li>Makanan dan minuman 100% halal, bersertifikat.</li>
          <li>Dilarang membawa makanan atau minuman dari luar.</li>
          <li>Area ramah keluarga.</li>
          <li>Ruang ber-AC bebas asap rokok.</li>
        </ul>
      </Section>
    </GuideLayout>
  );
}
