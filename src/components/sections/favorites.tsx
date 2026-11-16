import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { LeafMark, Ornament } from "@/components/ornament";
import { MENU_DATA, formatIdr } from "@/lib/menu";

// Nama, deskripsi, dan harga dibaca dari MENU_DATA; di sini hanya pilihan hidangan dan fotonya.
const PICKS = [
  {
    category: "nusantara",
    name: "Nasi Timbel",
    src: "/images/menu-3.jpg",
    alt: "Nasi timbel: nasi putih, ayam rempah, tahu, tempe, dan lalapan segar",
  },
  {
    category: "camilan",
    name: "Katsu Bites",
    src: "/images/menu-2.jpg",
    alt: "Katsu bites: potongan ayam crispy dalam keranjang rotan dengan saus tomat",
  },
  {
    category: "pasta",
    name: "Spaghetti Alfredo",
    src: "/images/menu-1.jpg",
    alt: "Spaghetti alfredo dengan saus krim dalam mangkuk keramik, ditemani es kopi",
  },
  {
    category: "nonkopi",
    name: "Matcha Latte",
    src: "/images/menu-5.jpg",
    alt: "Es matcha latte dan minuman strawberry dingin di atas meja kafe",
  },
] as const;

const ITEMS = PICKS.map((pick) => {
  const item = MENU_DATA[pick.category].items.find((i) => i.name === pick.name);
  if (!item) throw new Error(`Favorit "${pick.name}" tidak ada di MENU_DATA.${pick.category}`);
  return { ...pick, desc: item.desc, price: formatIdr(item.price), href: `/menu#${pick.category}` };
});

export function Favorites() {
  return (
    <section aria-labelledby="favorit-title" className="relative overflow-hidden bg-cream-light pt-4 pb-16 md:pb-24 lg:pt-10">
      <LeafMark className="pointer-events-none absolute top-0 left-6 hidden h-28 w-28 -scale-x-100 -rotate-12 text-gold/30 xl:block" />
      <LeafMark className="pointer-events-none absolute top-2 right-6 hidden h-28 w-28 rotate-6 text-gold/30 xl:block" />

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col items-center text-center">
          <h2 id="favorit-title" className="text-headline-lg text-charcoal">
            Pilihan Favorit
          </h2>
          <Ornament className="mt-3 text-gold-deep" />
        </div>

        <ul className="mt-8 flex flex-col gap-3.5 md:mt-12 lg:grid lg:grid-cols-4 lg:gap-6">
          {ITEMS.map((item, i) => (
            <li key={item.name}>
              <AnimatedContent delay={i * 0.08} distance={26} className="h-full">
                <Link
                  href={item.href}
                  aria-label={`${item.name}, ${item.price}. Lihat di menu lengkap`}
                  className="group grid h-full grid-cols-[minmax(0,32%)_minmax(0,1fr)] gap-2.5 rounded-2xl active:scale-[0.99] lg:flex lg:flex-col lg:gap-0 lg:text-center"
                >
                  <div className="relative min-h-28 overflow-hidden rounded-2xl bg-taupe/30 lg:aspect-square lg:min-h-0">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 18rem, 32vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Ponsel: kartu putih dengan chevron. Desktop: teks polos di bawah foto. */}
                  <div className="flex items-center gap-2 rounded-2xl border border-taupe/70 bg-white py-3 pr-3 pl-4 lg:mt-5 lg:block lg:border-0 lg:bg-transparent lg:p-0">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-body text-[0.9375rem] leading-snug font-semibold tracking-[0.04em] text-charcoal uppercase lg:text-base lg:tracking-[0.06em]">
                        {item.name}
                      </h3>
                      <p className="text-body-sm mt-0.5 line-clamp-1 text-charcoal/65 lg:mt-1.5 lg:line-clamp-2">{item.desc}</p>
                      <p className="text-price-tag tabular mt-1.5 text-gold-deep lg:mt-3 lg:text-lg">{item.price}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-charcoal/25 text-charcoal transition-colors duration-300 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-cream-light lg:hidden"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </AnimatedContent>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
