import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout, guideMetadata } from "@/components/page/guide-layout";
import { Section, TEXT_LINK } from "@/components/page/prose";
import { ADDRESS_LINE, SITE, WA_TANYA } from "@/lib/site";

const SLUG = "rute-dan-parkir";

export const metadata: Metadata = guideMetadata(SLUG);

const COORDS = `${SITE.geo.lat}, ${SITE.geo.lng}`;

export default function RuteGuide() {
  return (
    <GuideLayout
      slug={SLUG}
      lead={`BAKALKOPI berada di Kelurahan ${SITE.address.village}, ${SITE.address.district}, ${SITE.address.city}. Berikut alamat lengkap, titik koordinat untuk aplikasi peta, dan info parkir.`}
    >
      <Section title="Alamat lengkap">
        <address className="not-italic">{ADDRESS_LINE}</address>
        <p>
          Di Google Maps, tempat ini tercatat dengan nama <strong className="font-semibold text-charcoal">bakalkopi</strong>.
        </p>
      </Section>

      <Section title="Titik koordinat">
        <p>
          Koordinat BAKALKOPI adalah{" "}
          <span className="tabular font-semibold text-charcoal">{COORDS}</span>. Tempel angka ini
          ke kolom pencarian aplikasi peta bila alamat tidak langsung ditemukan, atau buka{" "}
          <Link href={SITE.maps.directions} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
            petunjuk arah di Google Maps
          </Link>{" "}
          yang sudah terisi tujuan ini.
        </p>
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
      </Section>

      <Section title="Parkir">
        <p>
          Lahan parkir tersedia untuk mobil dan motor di area BAKALKOPI. Pada malam hari area parkir
          diterangi lampu untaian.
        </p>
      </Section>

      <Section title="Masih kesulitan menemukan lokasi">
        <p>
          Kirim pesan ke WhatsApp{" "}
          <Link href={WA_TANYA} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
            {SITE.contact.whatsappDisplay}
          </Link>{" "}
          dan sebutkan posisi Anda saat ini.
        </p>
      </Section>
    </GuideLayout>
  );
}
