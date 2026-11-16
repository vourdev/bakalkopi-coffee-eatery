import Image from "next/image";
import AnimatedContent from "@/components/reactbits/animated-content";
import SplitText from "@/components/reactbits/split-text";
import { WaveDivider } from "@/components/wave-divider";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { SITE } from "@/lib/site";
import { TornPaint } from "@/components/torn-paint";
import { ripEdge, tornVars } from "@/lib/torn-mask";

// Siluet S diukur dari referensi: kiri di atas, mundur ke kanan sampai 30%, menjorok jauh di 55-60%, lalu masuk ke gelombang.
// Zona ink: foto terbuka lewat sapuan kuas kering ke krem (atas dan bawah). Zona paper: cat putih kering di tepi foto.
const LEFT = ripEdge("left", {
  depth: 160,
  seed: 7,
  shape: [0.28, 0.45, 0.72, 0.84, 0.78, 0.42, 0.16, 0.18, 0.38, 0.5, 0.62],
  rough: [[0.06, 0.08, 1], [0.27, 0.08, 0.8], [0.55, 0.1, 0.9], [0.85, 0.1, 0.7]],
  ink: [[0.07, 0.07, 1], [0.24, 0.05, 0.5], [0.62, 0.08, 0.8], [0.85, 0.08, 0.7]],
  paper: [[0.27, 0.07, 1], [0.55, 0.05, 0.6]],
  // Tepi atas foto turun sedikit dekat sudut, lalu naik sejajar strip atas (rujukan gambar 2).
  top: [15, 9, 108],
});
// Tepi atas: lurus dengan garis gelap tipis; lompatannya ada di ujung atas strip kiri.
const TOP = ripEdge("top", {
  depth: 24,
  seed: 16,
  shape: [0.4, 0.41, 0.4, 0.39, 0.4, 0.41, 0.4, 0.4, 0.39, 0.4, 0.41],
  rim: [[0.5, 5, 1]],
  rimWidth: 0.09,
});
const PHOTO_MASK = tornVars({ left: LEFT, top: TOP });

// Regex, bukan lookbehind, agar jalan di Safari lama. NBSP: tiap kalimat utuh di satu baris.
const HEADLINE_LINES = (SITE.headline.match(/[^.]+\./g) ?? [SITE.headline]).map((s) =>
  s.trim().replaceAll(" ", "\u00a0")
);

export function Hero() {
  return (
    <section
      id="beranda"
      className="split-bleed relative overflow-hidden bg-cream-light lg:min-h-[clamp(32rem,calc(100svh-5rem),40rem)]"
    >
      {/* Di bawah lg foto mengisi separuh kanan di belakang naskah, seperti komposisi ponsel referensi. */}
      <div className="absolute inset-y-0 right-0 w-[46%] [--torn-h:0.875rem] [--torn-w:clamp(2.75rem,12vw,13rem)] sm:w-[45%] lg:relative lg:inset-auto lg:order-2 lg:w-auto">
        <div style={PHOTO_MASK} className="torn-left-top absolute inset-0 overflow-hidden">
          <Image
            src="/images/room-musisi.jpg"
            alt="Ruang semi-terbuka BAKALKOPI dengan lampu gantung hangat, dinding bambu, dan panggung akustik"
            fill
            sizes="(min-width: 1024px) 60vw, 50vw"
            className="object-cover object-[50%_75%]"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        {/* Cat di luar topeng agar gumpalan kuas bisa jatuh di krem. */}
        <TornPaint side="left" image={LEFT.paint} />
        <TornPaint side="top" image={TOP.paint} className="left-[var(--torn-w)]" />
      </div>

      <div className="relative z-20 w-[58%] py-10 pr-2 pb-24 pl-[var(--gutter)] sm:w-[52%] md:py-16 md:pb-32 lg:order-1 lg:flex lg:w-auto lg:flex-col lg:justify-center lg:pr-10 lg:pb-36">
        <SplitText
          tag="h1"
          text={SITE.headline}
          lines={HEADLINE_LINES}
          className="hero-display text-charcoal"
          delay={18}
          duration={0.65}
        />

        <AnimatedContent delay={0.25} distance={16}>
          <p className="text-script mt-3 text-[1.5rem] text-gold-deep sm:text-3xl lg:mt-4 lg:text-[2.125rem]">
            Rasa yang mengingatkan rumah
          </p>
        </AnimatedContent>

        <AnimatedContent delay={0.32} distance={16}>
          <p className="hero-lead mt-4 max-w-sm text-charcoal/75 lg:mt-5">
            Kopi single origin, masakan rumahan Nusantara, dan meja yang tak
            memburu waktu.
          </p>
        </AnimatedContent>

        <AnimatedContent delay={0.4} distance={16}>
          {/* Satu-satunya tombol berpanah di halaman; isi emas memakai teks gelap agar kontras >= 4.5:1. */}
          <InteractiveHoverButton
            href="#menu"
            text="Lihat Menu"
            className="text-label-caps mt-7 rounded-md bg-coffee px-6 py-4 text-cream-light active:scale-95 lg:mt-9 lg:px-8"
            fillClassName="bg-gold text-charcoal"
          />
        </AnimatedContent>
      </div>

      {/* Gelombang gelap memotong bawah foto dan naskah sekaligus, membuka pita fitur. */}
      <WaveDivider
        fillColor="#231c18"
        variant="hero"
        mobileVariant="heroMobile"
        className="absolute inset-x-0 -bottom-px z-30"
        height="h-[clamp(3rem,5.5vw,5.25rem)]"
        mobileHeight="h-10 sm:h-12"
      />
    </section>
  );
}
