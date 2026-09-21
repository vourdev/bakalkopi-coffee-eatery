import { Guitar, Laptop, Sunrise, UtensilsCrossed, Users } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";

const MOMENTS = [
  {
    Icon: Sunrise,
    time: "08.00 — 11.00",
    title: "Kopi Pagi",
    desc: "Seduhan manual, roti hangat, dan cahaya pagi yang tenang.",
    tag: "Bangun Perlahan",
  },
  {
    Icon: UtensilsCrossed,
    time: "11.30 — 14.00",
    title: "Makan Siang",
    desc: "Nasi bakar, rawon mengepul, dan lauk rumahan untuk berbagi.",
    tag: "Isi Tenaga",
  },
  {
    Icon: Laptop,
    time: "14.00 — 17.00",
    title: "Kerja & Fokus",
    desc: "Banyak colokan, Wi-Fi kencang, dan kopi dingin tanpa habis.",
    tag: "Kerja Dalam",
  },
  {
    Icon: Users,
    time: "17.30 — 20.00",
    title: "Makan Malam",
    desc: "Meja panjang keluarga, kursi anak, dan porsi yang mengenyangkan.",
    tag: "Berkumpul",
  },
  {
    Icon: Guitar,
    time: "20.00 — Tutup",
    title: "Akustik Malam",
    desc: "Mocktail dingin, lampu taman, dan petikan gitar yang pelan.",
    tag: "Santai Malam",
  },
];

export function Moments() {
  return (
    <section className="bg-cream py-20 text-charcoal md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Momen BAKALKOPI"
          title="Cocok untuk segala waktu"
          script="Dari pagi sampai lampu padam"
        />

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MOMENTS.map(({ Icon, time, title, desc, tag }, i) => (
            <li key={title} className="h-full">
              <AnimatedContent delay={i * 0.07} distance={28} className="h-full">
                <article className="flex h-full flex-col justify-between rounded-2xl border border-taupe/70 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_-14px_rgba(35,28,24,0.2)]">
                  <div>
                    <Icon className="h-6 w-6 text-coffee" strokeWidth={1} />
                    <p className="text-label-caps tabular mt-4 text-[9px] text-gold">
                      {time}
                    </p>
                    <h3 className="text-serif-md mt-1.5 text-charcoal">{title}</h3>
                    <p className="text-body-sm mt-2.5 text-charcoal/45">{desc}</p>
                  </div>
                  <p className="text-label-caps mt-6 border-t border-taupe/40 pt-3.5 text-[8.5px] text-charcoal/35">
                    {tag}
                  </p>
                </article>
              </AnimatedContent>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
