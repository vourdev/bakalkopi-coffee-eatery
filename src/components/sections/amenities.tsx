import { AirVent, Car, Music2, ShieldCheck, TreePalm, Wifi } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";
import { TornEdge } from "@/components/torn-edge";

const AMENITIES = [
  {
    Icon: Wifi,
    title: "Wi-Fi Kencang",
    desc: "Fiber 100+ Mbps untuk kerja jarak jauh dan belajar",
  },
  {
    Icon: Car,
    title: "Parkiran Luas",
    desc: "Lahan khusus untuk mobil dan motor, gratis",
  },
  {
    Icon: TreePalm,
    title: "Teras Terbuka",
    desc: "Taman terbuka dengan angin sore dan tanaman hijau",
  },
  {
    Icon: AirVent,
    title: "Ruang Ber-AC",
    desc: "Suhu nyaman dengan tempat duduk yang melegakan",
  },
  {
    Icon: ShieldCheck,
    title: "100% Halal",
    desc: "Bahan halal sepenuhnya, tanpa babi maupun lemak babi",
  },
  {
    Icon: Music2,
    title: "Panggung Akustik",
    desc: "Pertunjukan musik pada malam akhir pekan",
  },
];

export function Amenities() {
  return (
    <section id="fasilitas" className="bg-cream pt-20 md:pt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Fasilitas"
          title="Dirancang supaya betah"
          script="Kenyamanan yang sederhana"
          description="Setiap sudut BAKALKOPI disiapkan untuk bekerja, bersantai, dan berkumpul."
        />

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map(({ Icon, title, desc }, i) => (
            <li key={title}>
              <AnimatedContent delay={i * 0.06} distance={24}>
                {/* Garis rambut di atas tiap butir, bukan kotak kartu —
                    lebih dekat ke bilah fasilitas pada rujukan desain. */}
                <div className="group flex items-start gap-4 border-t border-taupe pt-5">
                  <Icon
                    className="mt-0.5 h-6 w-6 shrink-0 text-coffee transition-colors duration-300 group-hover:text-gold"
                    strokeWidth={1}
                  />
                  <div>
                    <h3 className="text-label-caps text-charcoal">{title}</h3>
                    <p className="text-body-sm mt-2 text-charcoal/70">{desc}</p>
                  </div>
                </div>
              </AnimatedContent>
            </li>
          ))}
        </ul>
      </div>

      <TornEdge color="#231c18" className="mt-20 md:mt-24" />
    </section>
  );
}
