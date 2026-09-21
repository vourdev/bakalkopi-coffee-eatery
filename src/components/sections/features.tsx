import { Armchair, Coffee, Heart, Leaf } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { TornEdge } from "@/components/torn-edge";

const FEATURES = [
  {
    Icon: Coffee,
    title: "Kopi Pilihan",
    desc: "Biji single origin Nusantara, disangrai untuk seduhan manual",
  },
  {
    Icon: Leaf,
    title: "Bahan Segar",
    desc: "Rempah utuh dari pasar lokal, tanpa pengawet buatan",
  },
  {
    Icon: Armchair,
    title: "Suasana Nyaman",
    desc: "Mural indoor, teras terbuka, dan akustik di akhir pekan",
  },
  {
    Icon: Heart,
    title: "Dibuat Sepenuh Hati",
    desc: "Komitmen halal dan perhatian pada tiap detail sajian",
  },
];

export function Features() {
  return (
    <section className="-mt-px bg-charcoal pt-14 pb-0 md:pt-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Garis rambut vertikal antar kolom, seperti pada rujukan desain */}
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <AnimatedContent
              key={title}
              delay={i * 0.08}
              distance={28}
              className={[
                "flex flex-col items-center px-4 text-center",
                // Pemisah hanya di antara kolom, bukan di tepi baris
                i % 2 === 1 ? "border-l border-cream-light/12" : "",
                "lg:border-l lg:first:border-l-0",
              ].join(" ")}
            >
              <Icon className="h-8 w-8 text-gold" strokeWidth={1} />
              <h3 className="text-label-caps mt-5 text-[10.5px] text-cream-light">
                {title}
              </h3>
              <p className="text-body-sm mt-2.5 max-w-[15rem] text-cream-light/45">
                {desc}
              </p>
            </AnimatedContent>
          ))}
        </div>
      </div>

      {/* Peralihan kembali ke pita krem */}
      <TornEdge color="#f1eade" className="mt-14 md:mt-16" />
    </section>
  );
}
