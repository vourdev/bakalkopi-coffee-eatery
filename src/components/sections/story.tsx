import Image from "next/image";
import AnimatedContent from "@/components/reactbits/animated-content";
import { StoryVideo } from "@/components/story-video";
import { LeafMark, Ornament } from "@/components/ornament";

export function Story() {
  return (
    <section id="cerita" className="relative bg-cream py-16 text-charcoal md:py-28">
      <LeafMark className="pointer-events-none absolute top-16 left-4 hidden h-28 w-28 -scale-x-100 text-gold/12 lg:block" />

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <AnimatedContent distance={26}>
              <span className="text-label-caps flex items-center gap-3 text-gold-deep">
                Cerita Kami
                <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
              </span>

              <h2 className="text-headline-lg mt-4 text-charcoal">
                Lebih dari
                <br />
                sekadar kopi
              </h2>

              <p className="text-script mt-2 text-4xl text-gold-deep md:text-5xl">
                Rasa yang mengingatkan rumah
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.15} distance={22}>
              <p className="text-body-lg mt-7 text-charcoal/70">
                BAKALKOPI mempertemukan kopi single origin, masakan rumahan
                Indonesia, dan minuman racikan di ruang tropis yang sengaja
                dibuat untuk memperlambat langkah.
              </p>

              <p className="text-serif-md mt-6 text-charcoal/75 italic">
                Aroma nasi bakar daun pisang dan espresso yang baru diekstraksi,
                dengan meja yang cukup lapang untuk berbincang.
              </p>
            </AnimatedContent>
          </div>

          {/* Video cerita, dengan kartu mural bertumpuk di sudutnya. */}
          <AnimatedContent className="lg:col-span-7" delay={0.2} distance={36}>
            <div className="relative pb-10 lg:pl-8">
              <StoryVideo
                src="/video/video-1.mp4"
                poster="/images/room-4.jpg"
                alt="Ruang dalam BAKALKOPI dengan mural proses kopi dan meja kayu"
                label="Putar video cerita BAKALKOPI"
              />

              {/* Disembunyikan di bawah sm: di lebar ponsel kartu menutupi tombol putar. */}
              <div className="absolute -bottom-2 left-0 hidden w-52 rounded-2xl border border-gold/25 bg-white p-3 shadow-2xl sm:left-6 sm:block sm:w-60">
                <div className="h-32 overflow-hidden rounded-xl">
                  <Image
                    src="/images/quotes-background.jpg"
                    alt="Mural bertuliskan Bakal Kopi Paling Mantap Rasa Kopinya"
                    width={600}
                    height={400}
                    sizes="15rem"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-1.5 pt-3 pb-1">
                  <p className="text-serif-md text-charcoal">Ruang Mural</p>
                  <p className="text-body-sm mt-0.5 text-charcoal/70">
                    Mural lukis tangan di dinding kafe
                  </p>
                </div>
              </div>

              <Ornament className="mt-8 flex justify-center text-gold lg:hidden" />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
