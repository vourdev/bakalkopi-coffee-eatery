import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, PageShell } from "@/components/page/page-shell";
import { PageCta } from "@/components/page/prose";
import { MENU_CATEGORIES, PRICE_RANGE, formatIdr, priceIdr } from "@/lib/menu";
import { BUSINESS_ID, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const PATH = "/menu";
const ITEM_COUNT = MENU_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
const TITLE = "Menu Lengkap dan Harga";
const DESCRIPTION = `${ITEM_COUNT} menu BAKALKOPI: masakan Nusantara, kopi, pasta, ricebowl, non-kopi, dan camilan. Harga ${PRICE_RANGE}, belum termasuk PB1.`;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const CRUMBS = [
  { name: "Beranda", path: "/" },
  { name: "Menu", path: PATH },
];

const MENU_JSON_LD = {
  "@type": "Menu",
  "@id": `${absoluteUrl(PATH)}#menu`,
  name: `Menu ${SITE.name}`,
  url: absoluteUrl(PATH),
  inLanguage: "id-ID",
  provider: { "@id": BUSINESS_ID },
  hasMenuSection: MENU_CATEGORIES.map((category) => ({
    "@type": "MenuSection",
    name: category.label,
    description: category.note,
    ...(category.cover ? { image: absoluteUrl(category.cover.src) } : {}),
    hasMenuItem: category.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.desc,
      ...(item.photo ? { image: absoluteUrl(item.photo.src) } : {}),
      offers: {
        "@type": "Offer",
        price: priceIdr(item.price),
        priceCurrency: "IDR",
      },
    })),
  })),
};

export default function MenuPage() {
  return (
    <PageShell activeId="menu">
      <JsonLd data={[MENU_JSON_LD, breadcrumbJsonLd(CRUMBS)]} />
      <PageHeader
        crumbs={CRUMBS}
        title={`Menu ${SITE.name}`}
        lead={`Masakan Nusantara, kopi, pasta, ricebowl, minuman non-kopi, dan camilan dalam satu daftar. Harga per menu ${PRICE_RANGE}, belum termasuk PB1.`}
      />

      <div className="mx-auto max-w-5xl px-5 pt-8 pb-16 md:px-10 md:pt-12 md:pb-24">
        <nav aria-label="Golongan menu">
          <ul className="flex flex-wrap gap-2.5">
            {MENU_CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  href={`#${category.id}`}
                  className="text-label-caps inline-flex min-h-11 items-center rounded-full border border-taupe bg-cream-light px-5 text-charcoal/75 transition-colors hover:border-charcoal/40 hover:text-charcoal active:scale-95"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col gap-14 md:mt-16 md:gap-20">
          {MENU_CATEGORIES.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
              <div className="flex items-center gap-5 border-b border-taupe pb-6 sm:gap-7">
                {category.cover && (
                  <Image
                    src={category.cover.src}
                    alt={category.cover.alt}
                    width={480}
                    height={480}
                    sizes="8rem"
                    className="aspect-square w-20 shrink-0 rounded-2xl object-cover sm:w-28"
                  />
                )}
                <div>
                  <h2 id={`${category.id}-title`} className="text-headline-sm text-charcoal">
                    {category.label}
                  </h2>
                  <p className="text-body-md mt-2 max-w-md text-charcoal/70">{category.note}</p>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                {category.items.map((item) => (
                  <li key={item.name} className="border-b border-taupe/60 py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-serif-md text-charcoal">{item.name}</h3>
                      <span className="text-price-tag tabular shrink-0 text-gold-deep">
                        {formatIdr(item.price)}
                      </span>
                    </div>
                    <p className="text-body-sm mt-1.5 text-charcoal/70">{item.desc}</p>
                    {item.tag && (
                      <p className="text-label-caps mt-2 text-gold-deep">{item.tag}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-body-sm mt-10 text-charcoal/60">
          Harga belum termasuk PB1. Hidangan bertanda Andalan,
          Favorit, Spesial, atau Warisan dibahas di{" "}
          <Link href="/panduan/menu-andalan" className="text-gold-deep underline underline-offset-4">
            panduan menu andalan
          </Link>
          .
        </p>

        <div className="mt-12">
          <PageCta />
        </div>
      </div>
    </PageShell>
  );
}
