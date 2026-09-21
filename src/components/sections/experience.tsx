import Image from "next/image";
import { Lightbulb, Music2 } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";
import { MarqueeBand } from "@/components/marquee-band";
import { TornEdge } from "@/components/torn-edge";
import { SITE } from "@/lib/site";

const AMBIENCE = [
  {
    Icon: Lightbulb,
    title: "Lampu Hangat",
    desc: "Untaian lampu filamen dan lampu gantung di sepanjang teras",
  },
  {
    Icon: Music2,
    title: "Sesi Akhir Pekan",
    desc: "Set akustik dan jazz lembut dari musisi lokal",
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
          "Akustik Akhir Pekan",
          "Parkiran Luas",
        ]}
      />

      <section
        id="suasana"
        className="relative overflow-hidden bg-charcoal pt-20 text-cream-light md:pt-28"
      >
        {/* Cahaya latar hangat, meniru lampu teras */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-8 h-72 w-72 rounded-full bg-gold/8 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            tone="dark"
            eyebrow="Suasana"
            title="Setiap malam terasa seperti rumah"
            script="Duduk lama pun tak apa"
            description="Dari denting gitar akustik sampai cahaya lampu untaian — setiap detail disiapkan supaya betah."
          />

          <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Kiri — panggung akustik dan dua kartu suasana */}
            <div className="flex flex-col gap-6 lg:col-span-6">
              <AnimatedContent distance={34}>
                <figure className="group relative overflow-hidden rounded-[1.75rem] shadow-xl">
                  <Image
                    src="/images/room-musisi.jpg"
                    alt="Musisi tampil akustik di teras BAKALKOPI dengan lampu untaian dan dinding bambu"
                    width={1280}
                    height={1080}
                    sizes="(min-width: 1024px) 38rem, 100vw"
                    className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[370px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/92 via-charcoal/25 to-transparent" />
                  <figcaption className="absolute inset-x-6 bottom-6">
                    <span className="text-label-caps rounded-full bg-charcoal/65 px-3 py-1.5 text-[8.5px] text-amber-soft backdrop-blur-sm">
                      Setiap Akhir Pekan
                    </span>
                    <p className="text-headline-sm mt-3 text-cream-light">
                      Sesi Akustik Langsung
                    </p>
                    <p className="text-body-sm mt-1.5 text-cream-light/55">
                      Jazz lembut dan indie akustik di bawah kanopi teras
                    </p>
                  </figcaption>
                </figure>
              </AnimatedContent>

              <div className="grid grid-cols-2 gap-4">
                {AMBIENCE.map(({ Icon, title, desc }, i) => (
                  <AnimatedContent key={title} delay={0.1 + i * 0.08} distance={24}>
                    <div className="h-full rounded-2xl border border-cream-light/10 bg-charcoal-light p-5">
                      <Icon className="h-6 w-6 text-gold" strokeWidth={1} />
                      <p className="text-label-caps mt-4 text-[9.5px] text-cream-light">
                        {title}
                      </p>
                      <p className="text-body-sm mt-2 text-cream-light/40">{desc}</p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>

            {/* Kanan — ruang dalam saat malam */}
            <AnimatedContent className="lg:col-span-6" delay={0.15} distance={34}>
              <figure className="relative overflow-hidden rounded-[1.75rem] border border-gold/20 shadow-2xl">
                <Image
                  src="/images/room-2.jpg"
                  alt="Ruang dalam BAKALKOPI pada malam hari dengan lampu gantung hangat dan tempat duduk booth"
                  width={1080}
                  height={1080}
                  sizes="(min-width: 1024px) 38rem, 100vw"
                  className="h-[370px] w-full object-cover md:h-[470px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
                <figcaption className="text-label-caps absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-xl border border-cream-light/10 bg-charcoal/65 px-4 py-3.5 text-[8.5px] text-cream-light/65 backdrop-blur-md">
                  <span>Suasana Malam · 19.30</span>
                  <span className="text-amber-soft">Cahaya Hangat</span>
                </figcaption>
              </figure>
            </AnimatedContent>
          </div>
        </div>

        <TornEdge color="#f1eade" className="mt-20 md:mt-28" />
      </section>
    </>
  );
}
