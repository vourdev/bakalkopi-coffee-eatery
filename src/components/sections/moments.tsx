import { Coffee, Guitar, Laptop, UtensilsCrossed, Users } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";

const MOMENTS = [
  {
    Icon: Coffee,
    title: "Kopi Pagi",
    desc: "V60 manual brew atau espresso, mulai jam buka pukul 08.00.",
  },
  {
    Icon: UtensilsCrossed,
    title: "Makan Siang",
    desc: "Nasi bakar daun pisang, rawon, dan lauk rumahan untuk berbagi.",
  },
  {
    Icon: Laptop,
    title: "Kerja & Belajar",
    desc: "Meja di ruang ber-AC dengan Wi-Fi untuk tamu.",
  },
  {
    Icon: Users,
    title: "Makan Keluarga",
    desc: "Ruang keluarga dengan meja panjang dan kursi anak.",
  },
  {
    Icon: Guitar,
    title: "Akustik Malam",
    desc: "Musisi tampil di teras berlampu untaian, dapur buka sampai 23.00.",
  },
];

export function Moments() {
  return (
    <section className="bg-cream py-16 text-charcoal md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Momen BAKALKOPI"
          title="Cocok untuk segala waktu"
          script="Dari pagi sampai lampu padam"
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-5">
          {MOMENTS.map(({ Icon, title, desc }, i) => (
            <li key={title} className="h-full">
              <AnimatedContent delay={i * 0.07} distance={28} className="h-full">
                <article className="h-full rounded-2xl border border-taupe/70 bg-white p-5">
                  <Icon className="h-6 w-6 text-coffee" strokeWidth={1} />
                  <h3 className="text-serif-md mt-4 text-charcoal">{title}</h3>
                  <p className="text-body-sm mt-2.5 text-charcoal/70">{desc}</p>
                </article>
              </AnimatedContent>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
