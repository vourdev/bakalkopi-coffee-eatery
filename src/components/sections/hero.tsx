import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Coffee } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import SplitText from "@/components/reactbits/split-text";
import { LeafMark } from "@/components/ornament";
import { TornEdge, TornEdgeVertical } from "@/components/torn-edge";
import { HOURS_LINE, SITE } from "@/lib/site";

const PILLS = ["KOPI", "MASAKAN NUSANTARA", "PASTA", "AKUSTIK AKHIR PEKAN"];

export function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-cream-light">
      {/* Aksen botani tipis, sejajar rujukan desain */}
      <LeafMark className="pointer-events-none absolute -top-6 right-[42%] hidden h-36 w-36 rotate-12 text-gold/15 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-16 md:px-10 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Kolom kiri — teks */}
          <div className="flex flex-col lg:col-span-6">
            <AnimatedContent distance={24} duration={0.6}>
              <span className="text-label-caps inline-flex items-center gap-2.5 rounded-full border border-taupe bg-white/70 px-4 py-2 text-charcoal/60">
                <Coffee className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                Kafe · Rumah Makan · Kopi Artisan
              </span>
            </AnimatedContent>

            <SplitText
              tag="h1"
              text={SITE.headline}
              className="text-display-hero mt-7 text-charcoal"
              delay={18}
              duration={0.65}
            />

            <AnimatedContent delay={0.25} distance={18}>
              <p className="text-script mt-3 text-4xl text-gold md:text-5xl">
                Diseduh perlahan, disajikan hangat
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.35} distance={18}>
              <p className="text-body-lg mt-6 max-w-lg text-charcoal/60">
                Tempat berteduh untuk kopi single origin, masakan rumahan
                Nusantara, dan obrolan yang tak perlu buru-buru — di bawah
                lampu teras Cimanggis.
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.45} distance={18}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="#menu"
                  className="text-label-caps group inline-flex items-center gap-3 rounded-full bg-charcoal px-8 py-4 text-cream-light transition-colors duration-300 hover:bg-coffee active:scale-95"
                >
                  Lihat Menu Kami
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>

                <span className="text-label-caps inline-flex items-center gap-2 text-charcoal/45">
                  <Clock className="h-4 w-4" strokeWidth={1.5} />
                  Buka tiap hari {HOURS_LINE}
                </span>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.55} distance={18}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-taupe pt-6">
                {PILLS.map((pill) => (
                  <li
                    key={pill}
                    className="text-label-caps flex items-center gap-2 text-[9.5px] text-charcoal/45"
                  >
                    <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
                    {pill}
                  </li>
                ))}
              </ul>
            </AnimatedContent>
          </div>

          {/* Kolom kanan — foto fasad dengan tepi sobek di sisi kiri */}
          <AnimatedContent
            className="lg:col-span-6"
            delay={0.2}
            distance={40}
            direction="horizontal"
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/BakalKopi-home.jpg"
                  alt="Fasad BAKALKOPI pada malam hari: papan nama menyala, tanaman tropis, dan lampu gantung hangat"
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 46rem, 100vw"
                  className="h-[360px] w-full object-cover object-center md:h-[520px]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />

                {/* Tepi sobek menyatukan foto dengan latar krem */}
                <TornEdgeVertical color="#faf6ee" />

                {/* Kartu kaca di kaki foto */}
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 rounded-2xl border border-cream-light/15 bg-charcoal/75 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20">
                      <Coffee className="h-4 w-4 text-amber-soft" strokeWidth={1.5} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-serif-md text-cream-light">
                        Teras Terbuka &amp; Ruang Ber-AC
                      </span>
                      <span className="text-body-sm text-cream-light/50">
                        Parkiran luas untuk mobil dan motor
                      </span>
                    </span>
                  </div>
                  <span className="text-label-caps hidden shrink-0 rounded-full border border-gold/40 px-3 py-1.5 text-[9px] text-amber-soft sm:inline-block">
                    Dine-in
                  </span>
                </div>
              </div>

              {/* Segel bundar mengambang — motif logo */}
              <div className="animate-float absolute -top-4 -right-2 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-gold/50 bg-coffee p-3 text-center shadow-xl md:-right-4">
                <span aria-hidden="true" className="mb-1 h-1.5 w-1.5 rotate-45 bg-gold" />
                <span className="text-label-caps text-[7.5px] leading-[1.6] whitespace-pre-line text-cream-light">
                  {SITE.tagline.split(" ").join("\n")}
                </span>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Peralihan ke pita gelap */}
      <TornEdge color="#231c18" />
    </section>
  );
}
