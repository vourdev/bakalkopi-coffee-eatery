import { AirVent, Car, Music2, ShieldCheck, TreePalm, Wifi } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";
import { TornEdge } from "@/components/torn-edge";

export const AMENITIES = [
  {
    Icon: Wifi,
    title: "Wi-Fi",
    desc: "Tersedia untuk tamu yang datang bekerja atau belajar",
  },
  {
    Icon: Car,
    title: "Parkiran Luas",
    desc: "Lahan parkir untuk mobil dan motor",
  },
  {
    Icon: TreePalm,
    title: "Teras Terbuka",
    desc: "Meja di udara terbuka, dikelilingi tanaman tropis",
  },
  {
    Icon: AirVent,
    title: "Ruang Ber-AC",
    desc: "Ruang dalam berpendingin dengan kursi booth",
  },
  {
    Icon: ShieldCheck,
    title: "Bersertifikat Halal",
    desc: "Tanpa babi maupun lemak babi di seluruh dapur",
  },
  {
    Icon: Music2,
    title: "Panggung Akustik",
    desc: "Musisi tampil akustik di teras",
  },
];

export function Amenities() {
  return (
    <section id="fasilitas" className="bg-cream pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          title="Dirancang supaya betah"
          script="Kenyamanan yang sederhana"
        />

        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {AMENITIES.map(({ Icon, title, desc }, i) => (
            <li key={title}>
              <AnimatedContent delay={i * 0.06} distance={24}>
                <div className="flex items-start gap-4 border-t border-taupe pt-5">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-coffee" strokeWidth={1} />
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

      <TornEdge color="#231c18" className="mt-16 md:mt-24" />
    </section>
  );
}
