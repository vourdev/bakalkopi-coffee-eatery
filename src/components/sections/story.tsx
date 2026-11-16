import AnimatedContent from "@/components/reactbits/animated-content";
import { StoryVideo } from "@/components/story-video";
import { LeafMark } from "@/components/ornament";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Tepi sobek ala border-image: ubin PNG (krem, serat putih sobek, bayangan tipis, transparan) ditumpuk
// di atas tepi foto dan diulang. Tepi atas foto selalu lurus. Desktop sobek di kiri, ponsel di bawah.

export function Story() {
  return (
    <section id="cerita" className="split-bleed relative overflow-hidden bg-cream-light">
      <div className="relative py-12 pr-5 pl-[var(--gutter)] md:pr-10 lg:py-24 lg:pr-12">
        <AnimatedContent distance={22}>
          <p className="text-label-caps flex items-center gap-3 text-charcoal/70">
            Cerita Kami
            <span aria-hidden="true" className="h-px w-10 bg-current" />
          </p>
          <h2 className="text-headline-lg mt-4 text-charcoal">
            Lebih dari
            <br />
            sekadar kopi
          </h2>
        </AnimatedContent>

        <AnimatedContent delay={0.12} distance={18}>
          <p className="text-body-lg mt-5 max-w-md text-charcoal/70">
            BAKALKOPI mempertemukan kopi single origin, masakan rumahan Indonesia,
            dan minuman racikan di ruang tropis yang sengaja dibuat untuk
            memperlambat langkah.
          </p>

          <InteractiveHoverButton
            href="/tentang"
            text="Baca Cerita Kami"
            className="text-label-caps mt-8 rounded-md bg-coffee px-6 py-4 text-cream-light active:scale-95"
            fillClassName="bg-gold text-charcoal"
          />
        </AnimatedContent>

        {/* Daun garis di sudut naskah, aksen botani seperti referensi. */}
        <LeafMark className="pointer-events-none absolute right-6 bottom-8 hidden h-24 w-24 rotate-12 text-gold/45 sm:block lg:right-10 lg:bottom-16 lg:h-28 lg:w-28" />
      </div>

      {/* Desktop: foto rapat ke pita fitur di atas, menyisakan krem di bawah seperti referensi. */}
      <div className="relative h-[19rem] sm:h-[24rem] lg:mb-10 lg:h-auto lg:min-h-[32rem]">
        <div className="absolute inset-0">
          <StoryVideo
            src="/video/video-1.mp4"
            poster="/images/room-4.jpg"
            alt="Ruang dalam BAKALKOPI dengan mural proses kopi dan meja kayu"
            label="Putar video cerita BAKALKOPI"
            variant="bleed"
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-25 bg-[url(/images/torn-edge-left.png)] bg-repeat-y [background-size:100%_auto] lg:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-[url(/images/torn-edge-bottom.png)] bg-repeat-x [background-size:auto_100%] lg:hidden"
        />
      </div>
    </section>
  );
}
