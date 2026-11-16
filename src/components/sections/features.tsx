import { Armchair, Coffee, Heart, Leaf } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { WaveDivider } from "@/components/wave-divider";

// Isi dari menu dan Fasilitas yang sudah ada; tidak ada klaim baru.
const FEATURES = [
  { Icon: Coffee, title: "Kopi Single Origin", desc: "Diseduh manual maupun dengan mesin" },
  { Icon: Leaf, title: "Masakan Rumahan", desc: "Nasi bakar, rawon, dan lauk Nusantara" },
  { Icon: Armchair, title: "Ruang Nyaman", desc: "Ruang ber-AC dan teras terbuka" },
  { Icon: Heart, title: "Ramah Keluarga", desc: "Meja panjang dan kursi anak" },
];

export function Features() {
  return (
    <section aria-label="Keunggulan BAKALKOPI" className="bg-charcoal text-cream-light">
      {/* Ponsel 2x2 dengan garis silang; desktop satu baris dengan pemisah tegak. */}
      <ul className="mx-auto grid max-w-7xl grid-cols-2 px-5 pt-6 pb-4 md:px-10 md:pt-8 lg:grid-cols-4 lg:pb-10">
        {FEATURES.map(({ Icon, title, desc }, i) => (
          <li
            key={title}
            className={[
              "flex",
              i % 2 === 0 ? "border-r border-cream-light/15" : "",
              i < 2 ? "border-b border-cream-light/15 lg:border-b-0" : "",
              i === 3 ? "" : "lg:border-r lg:border-cream-light/15",
            ].join(" ")}
          >
            <AnimatedContent
              delay={i * 0.08}
              distance={18}
              className="flex w-full flex-col items-center px-3 py-7 text-center sm:px-6 lg:py-4"
            >
              <Icon className="h-10 w-10 text-cream-light md:h-11 md:w-11" strokeWidth={1} />
              <h3 className="text-label-caps mt-4 text-cream-light">{title}</h3>
              <p className="text-body-sm mt-2 max-w-[13rem] text-cream-light/70">{desc}</p>
            </AnimatedContent>
          </li>
        ))}
      </ul>

      {/* Desktop: pita lurus menempel foto Cerita seperti referensi; ponsel ditutup gelombang. */}
      <WaveDivider fillColor="#faf6ee" variant="c" flip height="h-8 sm:h-12 md:h-16" className="lg:hidden" />
    </section>
  );
}
