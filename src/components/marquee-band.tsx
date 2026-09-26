import { Fragment } from "react";

/**
 * Pita teks berjalan. Dua salinan daftar digeser 50% oleh animasi CSS
 * `animate-marquee`, jadi perulangannya mulus tanpa JavaScript.
 * Berhenti sendiri saat prefers-reduced-motion aktif (lihat globals.css).
 */
export function MarqueeBand({ items }: { items: string[] }) {
  const run = [...items, ...items];

  // Tanpa border. Pita ini duduk persis di bawah tepi sobek, dan garis rambut
  // terang di situ terbaca sebagai border yang tidak disengaja di dekat
  // gelombang. Pemisahnya sudah dikerjakan tepi sobek di atas dan pergantian
  // warna di bawah.
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-charcoal py-4 select-none"
    >
      <div className="animate-marquee flex w-max items-center gap-8 md:gap-12">
        {run.map((item, i) => (
          <Fragment key={i}>
            <span className="text-label-caps whitespace-nowrap text-cream-light/70">{item}</span>
            <span className="h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
