import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout, guideMetadata } from "@/components/page/guide-layout";
import { BULLETS, Section, TEXT_LINK } from "@/components/page/prose";
import { MENU_CATEGORIES, formatIdr } from "@/lib/menu";
import { SITE } from "@/lib/site";

const SLUG = "menu-andalan";

export const metadata: Metadata = guideMetadata(SLUG);

// Hanya hidangan bertanda di menu; tanpa tanda berarti tidak masuk panduan ini.
const TAGGED = MENU_CATEGORIES.map((category) => ({
  ...category,
  items: category.items.filter((item) => item.tag !== null),
})).filter((category) => category.items.length > 0);

export default function MenuAndalanGuide() {
  return (
    <GuideLayout
      slug={SLUG}
      lead="Beberapa hidangan di menu BAKALKOPI diberi tanda Andalan, Favorit, Spesial, atau Warisan. Berikut daftarnya per golongan menu, dengan harga dan waktu yang pas untuk memesannya."
    >
      <Section title="Kapan memesan apa">
        <ul className={BULLETS}>
          <li>Pagi: V60 manual brew atau espresso, tersedia sejak jam buka pukul {SITE.hours.open}.</li>
          <li>Siang: nasi bakar daun pisang, rawon, dan lauk rumahan untuk berbagi.</li>
          <li>Malam: dapur buka sampai pukul {SITE.hours.close}, ditemani musik akustik di teras.</li>
        </ul>
      </Section>

      {TAGGED.map((category) => (
        <Section key={category.id} title={category.label}>
          <p>{category.note}</p>
          <ul className="flex flex-col">
            {category.items.map((item) => (
              <li key={item.name} className="border-b border-taupe/60 py-4 first:pt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-serif-md text-charcoal">{item.name}</h3>
                  <span className="text-price-tag tabular shrink-0 text-gold-deep">
                    {formatIdr(item.price)}
                  </span>
                </div>
                <p className="text-body-sm mt-1.5 text-charcoal/70">{item.desc}</p>
                <p className="text-label-caps mt-2 text-gold-deep">{item.tag}</p>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title="Menu lainnya">
        <p>
          Harga belum termasuk PB1. Daftar lengkap semua golongan menu ada di halaman{" "}
          <Link href="/menu" className={TEXT_LINK}>
            menu dan harga
          </Link>
          .
        </p>
      </Section>
    </GuideLayout>
  );
}
