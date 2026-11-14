import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import SplitText from "@/components/reactbits/split-text";
import { TornEdge } from "@/components/torn-edge";
import { HOURS_LINE, SITE } from "@/lib/site";

const FACTS = [`Buka tiap hari ${HOURS_LINE}`, "Parkiran luas"];

// Slogan dipenggal per kalimat. Regex, bukan lookbehind, agar jalan di Safari lama.
const HEADLINE_LINES = (SITE.headline.match(/[^.]+\./g) ?? [SITE.headline]).map(
  (line) => line.trim()
);

export function Hero() {
  return (
    // Ditarik ke bawah header bening; svh agar bilah alamat ponsel tidak memotong dasar hero.
    <section
      id="beranda"
      className="relative -mt-[calc(4rem+1px)] flex min-h-[100svh] flex-col overflow-hidden bg-charcoal md:-mt-[calc(5rem+1px)]"
    >
      <Image
        src="/images/BakalKopi-home.jpg"
        alt="Fasad BAKALKOPI pada malam hari: papan nama menyala, tanaman tropis, dan lampu gantung hangat"
        fill
        sizes="100vw"
        className="object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      {/* Tirai mendatar menjaga naskah terbaca; tirai menegak menyatu dengan header dan tepi sobek. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/70"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pt-[calc(4rem+2.5rem)] pb-10 md:px-10 md:pt-[calc(5rem+2.5rem)]">
        <div className="w-full max-w-2xl">
          <AnimatedContent distance={20} duration={0.6}>
            <p className="text-label-caps text-gold-light">Cimanggis, Depok</p>
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
            <p className="hero-lead mt-6 max-w-md text-cream-light/70">
              Kopi single origin, masakan rumahan Nusantara, dan meja yang tak
              memburu waktu.
            </p>
          </AnimatedContent>

          <AnimatedContent delay={0.4} distance={18}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              {/* Satu-satunya panah di halaman: penanda aksi utama. */}
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
                className="text-label-caps inline-flex min-h-11 items-center text-cream-light/80 underline decoration-cream-light/30 underline-offset-8 transition-colors duration-300 hover:text-cream-light hover:decoration-gold active:opacity-70"
              >
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
      </div>

      <TornEdge color="#f1eade" className="relative z-10" />
    </section>
  );
}
