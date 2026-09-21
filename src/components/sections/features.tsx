import { Armchair, Coffee, Heart, Leaf } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";

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

/**
 * Pita fasilitas. Latarnya terang, bukan arang seperti sebelumnya: hero kini
 * berupa foto gelap penuh, dan tepi sobek di kakinya perlu bidang terang di
 * bawah agar peralihannya terlihat.
 */
export function Features() {
  return (
    <section className="-mt-px bg-cream-light py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 gap-y-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <AnimatedContent
              key={title}
              delay={i * 0.08}
              distance={26}
              className={[
                "flex items-start gap-4 sm:px-5 lg:px-6",
                // Pemisah hanya di antara kolom, bukan di tepi baris
                i % 2 === 1 ? "sm:border-l sm:border-taupe" : "",
                "lg:border-l lg:border-taupe lg:first:border-l-0",
              ].join(" ")}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-taupe bg-cream">
                <Icon className="h-5 w-5 text-coffee" strokeWidth={1.25} />
              </span>
              <div>
                <h3 className="text-label-caps text-[10.5px] text-charcoal">{title}</h3>
                <p className="text-body-sm mt-2 max-w-[15rem] text-charcoal/50">{desc}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
