import type { ReactNode } from "react";
import Link from "next/link";
import { FillButton } from "@/components/ui/fill-button";
import { GUIDES } from "@/lib/guides";
import { SITE, WA_RESERVASI } from "@/lib/site";

export const TEXT_LINK =
  "text-gold-deep underline decoration-gold-deep/40 underline-offset-4 transition-colors hover:decoration-gold-deep";

export const BULLETS = "flex list-disc flex-col gap-2 pl-5 marker:text-gold-deep";

// Lebar baca ~65 karakter; bagian dipisah garis tipis, bukan kartu.
export function Article({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-5 pt-8 pb-16 md:gap-12 md:px-10 md:pt-12 md:pb-24">
      {children}
    </div>
  );
}

export function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-taupe pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-headline-sm text-charcoal">{title}</h2>
      <div className="text-body-lg mt-4 flex flex-col gap-4 text-charcoal/75">{children}</div>
    </section>
  );
}

/** Penutup halaman: ajakan reservasi lalu tautan ke panduan lain. */
export function PageCta({ currentSlug }: { currentSlug?: string }) {
  const others = GUIDES.filter((g) => g.slug !== currentSlug);
  const heading = currentSlug === undefined ? "Panduan berkunjung" : "Panduan lain";

  return (
    <section className="rounded-[1.75rem] bg-charcoal p-7 text-cream-light md:p-10">
      <h2 className="text-headline-sm text-cream-light">Pesan meja lewat WhatsApp</h2>
      <p className="text-body-md mt-3 max-w-lg text-cream-light/70">
        Reservasi dilayani di {SITE.contact.whatsappDisplay}. Buka{" "}
        {SITE.hours.label}, {SITE.hours.open}-{SITE.hours.close} {SITE.hours.timezone}.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <FillButton
          href={WA_RESERVASI}
          target="_blank"
          rel="noopener noreferrer"
          className="text-label-caps rounded-full bg-gold px-8 py-4 text-charcoal active:scale-95"
          fillClassName="bg-cream-light text-charcoal"
        >
          Pesan Meja
        </FillButton>
        <FillButton
          href={SITE.maps.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="text-label-caps rounded-full border border-cream-light/25 px-8 py-4 text-cream-light active:scale-95"
          fillClassName="bg-cream-light text-charcoal"
        >
          Petunjuk Arah
        </FillButton>
      </div>

      <nav aria-label={heading} className="mt-8 border-t border-cream-light/12 pt-6">
        <h3 className="text-label-caps text-gold-light">{heading}</h3>
        <ul className="mt-2 flex flex-col">
          {others.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/panduan/${g.slug}`}
                className="text-body-md inline-flex min-h-11 items-center text-cream-light/80 transition-colors hover:text-cream-light active:opacity-70"
              >
                {g.title}
              </Link>
            </li>
          ))}
          {currentSlug !== undefined && (
            <li>
              <Link
                href="/menu"
                className="text-body-md inline-flex min-h-11 items-center text-cream-light/80 transition-colors hover:text-cream-light active:opacity-70"
              >
                Menu lengkap dan harga
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
}
