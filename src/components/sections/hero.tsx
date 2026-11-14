import Image from "next/image";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/animated-content";
import SplitText from "@/components/reactbits/split-text";
import { TornEdge } from "@/components/torn-edge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { SITE } from "@/lib/site";

// Regex, bukan lookbehind, agar jalan di Safari lama. NBSP: baris sempit hanya putus antar-kalimat.
const SENTENCES = (SITE.headline.match(/[^.]+\./g) ?? [SITE.headline]).map((s) =>
  s.trim().replaceAll(" ", "\u00a0")
);

// Dua baris: kalimat terakhir berdiri sendiri.
const HEADLINE_LINES =
  SENTENCES.length > 1
    ? [SENTENCES.slice(0, -1).join(" "), SENTENCES[SENTENCES.length - 1]]
    : SENTENCES;

export function Hero() {
  return (
    // Ditarik ke bawah header bening; dvh mengikuti bilah alamat ponsel yang muncul-hilang.
    <section
      id="beranda"
      className="relative -mt-[calc(4rem+1px)] flex min-h-dvh flex-col overflow-hidden bg-charcoal md:-mt-[calc(5rem+1px)]"
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
        <div className="w-full max-w-4xl">
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
              {/* Satu-satunya tombol berpanah di halaman; isi emas memakai teks gelap agar kontras >= 4.5:1. */}
              <InteractiveHoverButton
                href="#menu"
                text="Lihat Menu"
                className="text-label-caps rounded-full bg-coffee px-8 py-4 text-cream-light active:scale-95"
                fillClassName="bg-gold text-charcoal"
              />

              <Link
                href="#cerita"
                className="text-label-caps inline-flex min-h-11 items-center text-cream-light/80 underline decoration-cream-light/30 underline-offset-8 transition-colors duration-300 hover:text-cream-light hover:decoration-gold active:opacity-70"
              >
                Lihat Cerita Kami
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </div>

      <TornEdge color="#f1eade" className="relative z-10" />
    </section>
  );
}
