import Image from "next/image";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";

// Harga harus selaras dengan MENU_DATA di menu.tsx.
const FAVORITES = [
  {
    src: "/images/menu-3.jpg",
    alt: "Nasi timbel: nasi putih, ayam rempah, tahu, tempe, dan lalapan segar",
    name: "Nasi Timbel",
    desc: "Ayam rempah, tahu, tempe, sayur asam, sambal",
    price: "42",
    tag: "Warisan",
  },
  {
    src: "/images/menu-2.jpg",
    alt: "Katsu bites: potongan ayam crispy dalam keranjang rotan dengan saus tomat",
    name: "Katsu Bites",
    desc: "Ayam crispy panko, renyah, pas untuk berbagi",
    price: "31",
    tag: "Favorit",
  },
  {
    src: "/images/menu-1.jpg",
    alt: "Spaghetti alfredo dengan saus krim dalam mangkuk keramik, ditemani es kopi",
    name: "Spaghetti Alfredo",
    desc: "Saus krim gurih, pasta al dente",
    price: "41",
    tag: null,
  },
  {
    src: "/images/menu-5.jpg",
    alt: "Es matcha latte dan minuman strawberry dingin di atas meja kafe",
    name: "Matcha Latte",
    desc: "Matcha Jepang premium dengan susu segar",
    price: "27",
    tag: "Favorit",
  },
];

export function Favorites() {
  return (
    <section className="bg-cream-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Rekomendasi"
          title="Pilihan Favorit Kami"
          script="Untuk kunjungan pertama"
        />

        <div className="mt-12 grid grid-cols-2 md:mt-14 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {FAVORITES.map((item, i) => (
            <AnimatedContent
              key={item.name}
              delay={i * 0.09}
              distance={34}
              className="flex flex-col text-center"
            >
              <div className="relative overflow-hidden rounded-2xl bg-taupe/30">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={720}
                  height={720}
                  sizes="(min-width: 1024px) 17rem, 45vw"
                  className="aspect-4/5 w-full object-cover"
                />
                {item.tag && (
                  <span className="text-label-caps absolute top-3 left-3 rounded-full bg-cream-light px-3 py-1.5 text-coffee">
                    {item.tag}
                  </span>
                )}
              </div>

              <h3 className="text-label-caps mt-5 text-charcoal">
                {item.name}
              </h3>
              <p className="text-body-sm mt-2 text-charcoal/70">{item.desc}</p>
              <p className="text-price-tag tabular mt-3 text-gold-deep">
                {item.price}k
              </p>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent delay={0.15} className="mt-14 flex justify-center">
          <Link
            href="#menu"
            className="text-label-caps inline-flex items-center rounded-full border border-charcoal/25 px-8 py-4 text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-cream-light active:scale-95"
          >
            Lihat Semua Menu
          </Link>
        </AnimatedContent>
      </div>
    </section>
  );
}
