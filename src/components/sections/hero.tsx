import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, Play } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import CircularText from "@/components/reactbits/circular-text";
import SplitText from "@/components/reactbits/split-text";
import { TornEdge } from "@/components/torn-edge";
import { HOURS_LINE, SITE } from "@/lib/site";

const FACTS = [`Buka tiap hari ${HOURS_LINE}`, "Parkiran luas", "100% halal"];

/**
 * Slogan dipenggal per kalimat, bukan dibiarkan mengalir mengikuti lebar
 * wadah — tiga barisnya adalah bagian dari bentuk sloganya.
 * Regex dipakai, bukan lookbehind, agar tetap jalan di Safari lama.
 */
const HEADLINE_LINES = (SITE.headline.match(/[^.]+\./g) ?? [SITE.headline]).map(
  (line) => line.trim()
);

/** "DELIGHT. SAVOR. CONNECT." jadi "DELIGHT · SAVOR · CONNECT · " untuk cincin. */
const SEAL_TEXT = SITE.tagline.replace(/\.\s*/g, " · ");

export function Hero() {
  return (
    /* Hero ditarik ke atas setinggi header supaya bar yang bening melayang di
       atas fotonya, lalu tingginya satu layar penuh. Satuan svh dipakai, bukan
       vh: di peramban ponsel vh memakai tinggi saat bilah alamat tersembunyi,
       sehingga dasar hero terpotong saat bilah itu tampil. */
    <section
      id="beranda"
      className="relative -mt-[calc(5rem+1px)] flex min-h-[100svh] flex-col overflow-hidden bg-charcoal"
    >
      {/* Foto memenuhi seluruh bidang hero, bukan separuh kanan. */}
      <Image
        src="/images/BakalKopi-home.jpg"
        alt="Fasad BAKALKOPI pada malam hari: papan nama menyala, tanaman tropis, dan lampu gantung hangat"
        fill
        sizes="100vw"
        className="object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      {/* Dua tirai: mendatar supaya sisi naskah cukup gelap, menegak supaya
          kaki foto menyatu dengan tepi sobek dan puncaknya tidak menabrak
          header. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/70"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pt-[calc(5rem+2.5rem)] pb-10 md:px-10">
        <div className="w-full max-w-2xl">
          <AnimatedContent distance={20} duration={0.6}>
            <p className="text-label-caps text-gold-light">
              Pengalaman Kopi Nusantara
            </p>
          </AnimatedContent>

          <SplitText
            tag="h1"
            text={SITE.headline}
            lines={HEADLINE_LINES}
            className="hero-display mt-5 text-cream-light"
            delay={18}
            duration={0.65}
          />

          <AnimatedContent delay={0.3} distance={18}>
            {/* Deskripsi singkat, sengaja pendek supaya selalu muat dan tidak
                ikut disembunyikan di layar pendek. */}
            <p className="hero-lead mt-6 max-w-md text-cream-light/65">
              Kopi single origin, masakan rumahan Nusantara, dan meja yang tak
              memburu waktu.
            </p>
          </AnimatedContent>

          <AnimatedContent delay={0.4} distance={18}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="#menu"
                className="text-label-caps group inline-flex items-center gap-3 rounded-full bg-coffee px-8 py-4 text-cream-light transition-colors duration-300 hover:bg-gold active:scale-95"
              >
                Lihat Menu Kami
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>

              <Link
                href="#cerita"
                className="text-label-caps group inline-flex items-center gap-3 text-cream-light/80 transition-colors duration-300 hover:text-cream-light"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-cream-light/30 transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/15">
                  <Play className="h-3.5 w-3.5 translate-x-px fill-current" strokeWidth={0} />
                </span>
                Lihat Cerita Kami
              </Link>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.5} distance={18}>
            <ul className="hero-collapsible mt-10 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-cream-light/15 pt-6">
              {FACTS.map((fact) => (
                <li
                  key={fact}
                  className="text-label-caps flex items-center gap-2 text-cream-light/70"
                >
                  <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
                  {fact}
                </li>
              ))}
            </ul>
          </AnimatedContent>
        </div>

        {/* Segel bundar pada foto, seperti pada rujukan. Cincin tipis tanpa
            bidang pekat supaya foto di belakangnya tetap terbaca. */}
        <div className="pointer-events-none absolute right-10 bottom-28 hidden lg:block xl:right-16">
          <Link
            href={SITE.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram BAKALKOPI @${SITE.contact.instagram}`}
            className="group pointer-events-auto relative grid h-32 w-32 place-items-center overflow-hidden rounded-full border border-cream-light/25 bg-charcoal/25 backdrop-blur-[2px] transition-colors duration-300 hover:border-gold/60"
          >
            <span className="pointer-events-none absolute inset-0 grid place-items-center">
              <CircularText
                text={SEAL_TEXT}
                size={112}
                spinDuration={32}
                onHover="slowDown"
                className="font-sans text-[8px] font-semibold text-cream-light/70"
              />
            </span>
            <Coffee className="relative h-5 w-5 text-gold" strokeWidth={1.25} />
          </Link>
        </div>
      </div>

      {/* Tepi sobek kertas ke pita fasilitas yang terang di bawahnya. */}
      <TornEdge color="#faf6ee" className="relative z-10" />
    </section>
  );
}
