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

          {/* Pembagian 7/5 dengan tinggi kolom disamakan. Versi 6/6
              sebelumnya membuat kolom kiri (foto + dua kartu) lebih tinggi
              daripada kolom kanan, dan `items-center` menyisakan celah
              kosong yang tidak seimbang di kedua sisi. */}
          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
            {/* Kiri — panggung akustik, foto utama bagian ini */}
            <AnimatedContent className="lg:col-span-7" distance={34}>
              <figure className="group relative h-[320px] overflow-hidden rounded-[1.75rem] shadow-xl md:h-[420px] lg:h-full lg:min-h-[520px]">
                <Image
                  src="/images/room-musisi.jpg"
                  alt="Musisi tampil akustik di teras BAKALKOPI dengan lampu untaian dan dinding bambu"
                  fill
                  sizes="(min-width: 1024px) 44rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Tirai dipekatkan sampai tengah: di lebar ponsel keterangan foto
                      jatuh di bagian gambar yang terang dan nyaris tak terbaca. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
                <figcaption className="absolute inset-x-6 bottom-6">
                  <span className="text-label-caps rounded-full bg-charcoal/65 px-3 py-1.5 text-amber-soft backdrop-blur-sm">
                    Setiap Akhir Pekan
                  </span>
                  <p className="text-headline-sm mt-3 text-cream-light">
                    Sesi Akustik Langsung
                  </p>
                  <p className="text-body-sm mt-1.5 max-w-sm text-cream-light/70">
                    Jazz lembut dan indie akustik di bawah kanopi teras
                  </p>
                </figcaption>
              </figure>
            </AnimatedContent>

            {/* Kanan — ruang malam di atas, dua kartu suasana di bawah */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <AnimatedContent className="flex-1" delay={0.12} distance={34}>
                <figure className="relative h-[260px] overflow-hidden rounded-[1.75rem] border border-gold/20 shadow-2xl md:h-[300px] lg:h-full lg:min-h-[300px]">
                  <Image
                    src="/images/room-2.jpg"
                    alt="Ruang dalam BAKALKOPI pada malam hari dengan lampu gantung hangat dan tempat duduk booth"
                    fill
                    sizes="(min-width: 1024px) 31rem, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
                  <figcaption className="text-label-caps absolute inset-x-5 bottom-5 flex flex-col items-start gap-1.5 rounded-xl border border-cream-light/10 bg-charcoal/65 px-4 py-3.5 text-cream-light/65 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <span>Suasana Malam · 19.30</span>
                    <span className="text-amber-soft">Cahaya Hangat</span>
                  </figcaption>
                </figure>
              </AnimatedContent>

              <div className="grid shrink-0 grid-cols-2 gap-4">
                {AMBIENCE.map(({ Icon, title, desc }, i) => (
                  <AnimatedContent key={title} delay={0.2 + i * 0.08} distance={24}>
                    <div className="h-full rounded-2xl border border-cream-light/10 bg-charcoal-light p-5">
                      <Icon className="h-6 w-6 text-gold" strokeWidth={1} />
                      <p className="text-label-caps mt-4 text-cream-light">
                        {title}
                      </p>
                      <p className="text-body-sm mt-2 text-cream-light/70">{desc}</p>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </div>

        <TornEdge color="#f1eade" className="mt-20 md:mt-28" />
      </section>
    </>
  );
}
