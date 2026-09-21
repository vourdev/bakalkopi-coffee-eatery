import Image from "next/image";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";

const FRAMES = [
  {
    src: "/images/BakalKopi-home.jpg",
    alt: "Fasad BAKALKOPI pada malam hari dengan papan nama menyala dan tanaman tropis",
    label: "01 / Fasad & Pintu Masuk",
    span: "md:col-span-7",
    height: "h-64 md:h-[420px]",
  },
  {
    src: "/images/room-1.jpg",
    alt: "Ruang dalam dengan mural kebun kopi, meja keluarga, dan kursi anak",
    label: "02 / Ruang Keluarga",
    span: "md:col-span-5",
    height: "h-64 md:h-[420px]",
  },
  {
    src: "/images/menu-12.jpg",
    alt: "Gorengan pisang bersaus karamel dengan sekop es krim vanila dan es teh mangga",
    label: "03 / Manis Penutup",
    span: "md:col-span-5",
    height: "h-64 md:h-[360px]",
  },
  {
    src: "/images/room-3.jpg",
    alt: "Teras terbuka BAKALKOPI dengan meja bundar, tanaman, dan dinding mural",
    label: "04 / Teras Terbuka",
    span: "md:col-span-4",
    height: "h-64 md:h-[360px]",
  },
  {
    src: "/images/parkiran.jpg",
    alt: "Area parkir BAKALKOPI pada malam hari dengan lampu untaian dan mobil terparkir",
    label: "05 / Parkiran Luas",
    span: "md:col-span-3",
    height: "h-64 md:h-[360px]",
  },
];

export function Gallery() {
  return (
    <section id="galeri" className="bg-cream-light py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Esai Visual"
          title="Kronik BAKALKOPI"
          script="Sudut demi sudut"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
          {FRAMES.map((frame, i) => (
            <AnimatedContent
              key={frame.label}
              delay={i * 0.07}
              distance={30}
              className={frame.span}
            >
              <figure className="group relative overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  width={1280}
                  height={900}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`w-full ${frame.height} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/5 to-transparent" />
                <figcaption className="text-label-caps absolute inset-x-6 bottom-5 text-[9px] text-cream-light/85">
                  {frame.label}
                </figcaption>
              </figure>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
