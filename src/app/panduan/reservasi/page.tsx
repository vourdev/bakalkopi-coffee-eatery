import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout, guideMetadata } from "@/components/page/guide-layout";
import { BULLETS, Section, TEXT_LINK } from "@/components/page/prose";
import { HOURS_LINE, SITE, WA_RESERVASI } from "@/lib/site";

const SLUG = "reservasi";

export const metadata: Metadata = guideMetadata(SLUG);

export default function ReservasiGuide() {
  return (
    <GuideLayout
      slug={SLUG}
      lead="Reservasi meja di BAKALKOPI dilakukan lewat WhatsApp. Halaman ini merangkum nomor yang dihubungi, isi pesan yang perlu ditulis, pilihan area duduk, dan aturan yang berlaku saat datang."
    >
      <Section title="Hubungi lewat WhatsApp">
        <p>
          Nomor reservasi BAKALKOPI adalah{" "}
          <Link href={WA_RESERVASI} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
            {SITE.contact.whatsappDisplay}
          </Link>
          . Tombol Pesan Meja di situs ini membuka percakapan WhatsApp dengan pesan pembuka
          &ldquo;Halo BAKALKOPI, saya ingin reservasi meja.&rdquo; yang tinggal dilengkapi.
        </p>
      </Section>

      <Section title="Isi pesan reservasi">
        <p>Supaya tim bisa langsung mencarikan meja, sebutkan:</p>
        <ul className={BULLETS}>
          <li>Nama pemesan.</li>
          <li>Tanggal dan jam kedatangan.</li>
          <li>Jumlah orang, termasuk anak-anak.</li>
          <li>Area yang diinginkan: ruang dalam ber-AC atau teras terbuka.</li>
          <li>Kursi anak, bila membawa balita.</li>
        </ul>
      </Section>

      <Section title="Pilihan area duduk">
        <ul className={BULLETS}>
          <li>
            Ruang dalam ber-AC dengan kursi booth dan lampu gantung hangat. Ruangan ini bebas asap
            rokok.
          </li>
          <li>
            Ruang bermural kebun kopi dengan meja keluarga dan kursi anak.
          </li>
          <li>
            Teras terbuka dengan meja bundar di antara tanaman tropis. Pada malam hari teras
            diterangi lampu untaian, dan di sinilah musisi tampil akustik.
          </li>
        </ul>
      </Section>

      <Section title="Jam buka">
        <p>
          BAKALKOPI buka {SITE.hours.label}, pukul {HOURS_LINE}, dan dapur melayani sampai jam
          tutup. Pilih jam kedatangan di dalam rentang itu.
        </p>
      </Section>

      <Section title="Sebelum datang">
        <p>
          Makanan dan minuman dari luar tidak boleh dibawa masuk. Aturan rumah selengkapnya ada di{" "}
          <Link href="/panduan/fasilitas" className={TEXT_LINK}>
            panduan fasilitas dan aturan rumah
          </Link>
          , dan alamat beserta info parkir ada di{" "}
          <Link href="/panduan/rute-dan-parkir" className={TEXT_LINK}>
            panduan rute dan parkir
          </Link>
          . Untuk melihat pilihan hidangan sebelum memesan meja, buka{" "}
          <Link href="/menu" className={TEXT_LINK}>
            menu lengkap
          </Link>
          .
        </p>
      </Section>
    </GuideLayout>
  );
}
