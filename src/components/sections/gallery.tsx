import Image from "next/image";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";

// sm: 2 kolom dengan bingkai pertama selebar penuh; lg: baris 7/5 lalu 5/4/3.
const FRAMES = [
  {
    src: "/images/BakalKopi-home.jpg",
    alt: "Fasad BAKALKOPI pada malam hari dengan papan nama menyala dan tanaman tropis",
    label: "Fasad & Pintu Masuk",
    span: "sm:col-span-2 lg:col-span-7",
    height: "h-64 sm:h-72 lg:h-[420px]",
    sizes: "(min-width: 1024px) 44rem, 100vw",
  },
  {
    src: "/images/room-1.jpg",
    alt: "Ruang dalam dengan mural kebun kopi, meja keluarga, dan kursi anak",
    label: "Ruang Keluarga",
    span: "lg:col-span-5",
    height: "h-64 sm:h-72 lg:h-[420px]",
    sizes: "(min-width: 1024px) 31rem, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/images/menu-12.jpg",
    alt: "Gorengan pisang bersaus karamel dengan sekop es krim vanila dan es teh mangga",
    label: "Manis Penutup",
    span: "lg:col-span-5",
    height: "h-64 sm:h-72 lg:h-[360px]",
    sizes: "(min-width: 1024px) 31rem, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/images/room-3.jpg",
    alt: "Teras terbuka BAKALKOPI dengan meja bundar, tanaman, dan dinding mural",
    label: "Teras Terbuka",
    span: "lg:col-span-4",
    height: "h-64 sm:h-72 lg:h-[360px]",
    sizes: "(min-width: 1024px) 25rem, (min-width: 640px) 50vw, 100vw",
  },
  {
    src: "/images/parkiran.jpg",
    alt: "Area parkir BAKALKOPI pada malam hari dengan lampu untaian dan mobil terparkir",
    label: "Parkiran",
    span: "lg:col-span-3",
    height: "h-64 sm:h-72 lg:h-[360px]",
    sizes: "(min-width: 1024px) 19rem, (min-width: 640px) 50vw, 100vw",
  },
];

export function Gallery() {
  return (
    <section id="galeri" className="bg-cream-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Galeri"
          title="Sudut BAKALKOPI"
          script="Sudut demi sudut"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-12">
          {FRAMES.map((frame, i) => (
            <AnimatedContent
              key={frame.label}
              delay={i * 0.07}
              distance={30}
              className={frame.span}
            >
              <figure className="relative overflow-hidden rounded-2xl">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  width={1280}
                  height={900}
                  sizes={frame.sizes}
                  className={`w-full ${frame.height} object-cover`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/5 to-transparent" />
                <figcaption className="text-label-caps absolute inset-x-6 bottom-5 text-cream-light/85">
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
