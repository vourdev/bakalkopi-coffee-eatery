import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import CircularText from "@/components/reactbits/circular-text";
import CountUp from "@/components/reactbits/count-up";
import { LeafMark, Ornament } from "@/components/ornament";
import { SITE } from "@/lib/site";

const STATS = [
  { value: 100, suffix: "%", label: "Biji kopi dari petani lokal" },
  { value: 30, suffix: "+", label: "Resep Nusantara di dapur" },
];

export function Story() {
  return (
    <section id="cerita" className="relative bg-cream py-20 text-charcoal md:py-28">
      <LeafMark className="pointer-events-none absolute top-16 left-4 hidden h-28 w-28 -scale-x-100 text-gold/12 lg:block" />

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Kiri — naskah */}
          <div className="lg:col-span-5">
            <AnimatedContent distance={26}>
              <span className="text-label-caps flex items-center gap-3 text-gold">
                Cerita Kami
                <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
              </span>

              <h2 className="text-headline-lg mt-4 text-charcoal">
                Lebih dari
                <br />
                sekadar kopi
              </h2>

              <p className="text-script mt-2 text-4xl text-gold md:text-5xl">
                Rasa yang mengingatkan rumah
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.15} distance={22}>
              <p className="text-body-lg mt-7 text-charcoal/60">
                BAKALKOPI mempertemukan kopi single origin, masakan rumahan
                Indonesia, dan minuman racikan di ruang tropis yang sengaja
                dibuat untuk memperlambat langkah.
              </p>

              <blockquote className="text-serif-md mt-7 rounded-r-xl border-l-2 border-gold bg-white/70 p-5 text-charcoal/75 italic">
                &ldquo;Tempat di mana aroma nasi bakar daun pisang dan espresso
                yang baru diekstraksi memberi ruang untuk berbincang.&rdquo;
              </blockquote>
            </AnimatedContent>

            <AnimatedContent delay={0.25} distance={22}>
              <dl className="mt-9 flex items-center gap-10">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-10">
                    {i > 0 && <span aria-hidden="true" className="h-12 w-px bg-taupe" />}
                    <div>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="text-headline-lg tabular text-gold">
                        <CountUp to={stat.value} duration={1.6} />
                        {stat.suffix}
                      </dd>
                      <p className="text-label-caps mt-1.5 max-w-[9rem] text-[9.5px] text-charcoal/45">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </dl>
            </AnimatedContent>
          </div>

          {/* Kanan — foto mural dengan lencana melingkar */}
          <AnimatedContent className="lg:col-span-7" delay={0.2} distance={36}>
            <div className="relative pb-10 lg:pl-8">
              <div className="overflow-hidden rounded-[2rem] border border-taupe shadow-xl">
                <Image
                  src="/images/room-4.jpg"
                  alt="Ruang dalam BAKALKOPI dengan mural proses kopi dan meja kayu"
                  width={1280}
                  height={900}
                  sizes="(min-width: 1024px) 40rem, 100vw"
                  className="h-[340px] w-full object-cover transition-transform duration-700 hover:scale-[1.03] md:h-[470px]"
                />
              </div>

              {/* Kartu kecil bertumpuk */}
              <div className="absolute -bottom-2 left-0 w-52 rounded-2xl border border-gold/25 bg-white p-3 shadow-2xl sm:left-6 sm:w-60">
                <div className="h-32 overflow-hidden rounded-xl">
                  <Image
                    src="/images/quotes-background.jpg"
                    alt="Mural bertuliskan Bakal Kopi Paling Mantap Rasa Kopinya"
                    width={600}
                    height={400}
                    sizes="15rem"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-1.5 pt-3 pb-1">
                  <p className="text-serif-md text-charcoal">Ruang Mural</p>
                  <p className="text-body-sm mt-0.5 text-charcoal/45">
                    Seni tangan &amp; sudut paling sering difoto
                  </p>
                </div>
              </div>

              {/* Lencana melingkar menuju Instagram */}
              <Link
                href={SITE.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Lihat keseharian BAKALKOPI di Instagram @${SITE.contact.instagram}`}
                className="group absolute -top-6 right-2 grid h-36 w-36 place-items-center rounded-full border border-gold/30 bg-coffee text-cream-light shadow-xl transition-colors duration-300 hover:bg-charcoal md:right-6"
              >
                {/* Tanpa kelas label: tracking 0.22em menggeser tiap glif keluar
                    dari pusat spannya dan membuat lingkaran terlihat berdesakan.
                    Pembungkus absolut memusatkan cincin teks terhadap lencana. */}
                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                  <CircularText
                    text="· INSTAGRAM · BAKALKOPI.ID "
                    size={132}
                    spinDuration={26}
                    onHover="speedUp"
                    className="font-sans text-[10px] font-semibold text-cream-light/70 uppercase"
                  />
                </span>
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gold/25 ring-1 ring-gold/30">
                  <ArrowUpRight
                    className="h-5 w-5 text-amber-soft transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>

              <Ornament className="mt-8 flex justify-center text-gold lg:hidden" />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
