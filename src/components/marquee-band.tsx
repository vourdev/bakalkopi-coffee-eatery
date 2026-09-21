import { Fragment } from "react";

/**
 * Pita teks berjalan. Dua salinan daftar digeser 50% oleh animasi CSS
 * `animate-marquee`, jadi perulangannya mulus tanpa JavaScript.
 * Berhenti sendiri saat prefers-reduced-motion aktif (lihat globals.css).
 */
export function MarqueeBand({ items }: { items: string[] }) {
  const run = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden border-y border-cream-light/10 bg-charcoal py-3.5 select-none"
    >
      <div className="animate-marquee flex w-max items-center gap-8 md:gap-12">
        {run.map((item, i) => (
          <Fragment key={i}>
            <span className="text-label-caps whitespace-nowrap text-cream-light/45">{item}</span>
            <span className="h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
