import Image from "next/image";
import { Armchair, Lightbulb } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";
import { MarqueeBand } from "@/components/marquee-band";
import { TornEdge } from "@/components/torn-edge";
import { SITE } from "@/lib/site";

const AMBIENCE = [
  {
    Icon: Lightbulb,
    title: "Teras Berlampu",
    desc: "Untaian lampu dan dinding bambu di teras terbuka",
  },
  {
    Icon: Armchair,
    title: "Ruang Dalam",
    desc: "Lampu gantung hangat dan kursi booth berpendingin",
  },
];

export function Experience() {
  return (
    <>
      <MarqueeBand
        items={[
          SITE.tagline,
          "Kopi Single Origin",
          "Masakan Nusantara",
          "Live Akustik",
          "Parkiran Luas",
        ]}
      />

      <section id="suasana" className="relative bg-charcoal pt-16 text-cream-light md:pt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            tone="dark"
            align="left"
            title="Setiap malam terasa seperti rumah"
            script="Duduk lama pun tak apa"
            description="Teras dengan lampu untaian dan musik akustik, ruang dalam dengan lampu gantung dan kursi booth."
          />

          {/* 7/5 dengan tinggi kolom disamakan, agar tak ada celah kosong di salah satu sisi. */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-12 lg:gap-7">
            <AnimatedContent className="lg:col-span-7" distance={34}>
              <figure className="relative h-[320px] overflow-hidden rounded-[1.75rem] md:h-[420px] lg:h-full lg:min-h-[520px]">
                <Image
                  src="/images/room-musisi.jpg"
                  alt="Musisi tampil akustik di teras BAKALKOPI dengan lampu untaian dan dinding bambu"
                  fill
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className="object-cover"
                />
                {/* Tirai pekat sampai tengah: di ponsel keterangan jatuh di bagian foto yang terang. */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
                <figcaption className="absolute inset-x-6 bottom-6">
                  <p className="text-headline-sm text-cream-light">Live Akustik</p>
                  <p className="text-body-sm mt-1.5 max-w-sm text-cream-light/70">
                    Musisi tampil di bawah kanopi teras
                  </p>
                </figcaption>
              </figure>
            </AnimatedContent>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <AnimatedContent className="flex-1" delay={0.12} distance={34}>
                <figure className="relative h-[260px] overflow-hidden rounded-[1.75rem] border border-gold/20 md:h-[300px] lg:h-full lg:min-h-[300px]">
                  <Image
                    src="/images/room-2.jpg"
                    alt="Ruang dalam BAKALKOPI pada malam hari dengan lampu gantung hangat dan tempat duduk booth"
                    fill
                    sizes="(min-width: 1024px) 31rem, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <figcaption className="text-label-caps absolute inset-x-5 bottom-5 text-cream-light/80">
                    Ruang dalam pada malam hari
                  </figcaption>
                </figure>
              </AnimatedContent>

              <div className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2">
                {AMBIENCE.map(({ Icon, title, desc }, i) => (
                  <AnimatedContent key={title} delay={0.2 + i * 0.08} distance={24}>
                    <div className="h-full rounded-2xl border border-cream-light/10 bg-charcoal-light p-5">
                      <Icon className="h-6 w-6 text-gold" strokeWidth={1} />
                      <p className="text-label-caps mt-4 text-cream-light">{title}</p>
                      <p className="text-body-sm mt-2 text-cream-light/70">{desc}</p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </div>

        <TornEdge color="#f1eade" className="mt-16 md:mt-28" />
      </section>
    </>
  );
}
