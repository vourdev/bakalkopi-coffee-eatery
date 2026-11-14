import { Fragment } from "react";

// Pita statis tanpa border: tepi sobek di atasnya sudah menjadi pemisah.
export function MarqueeBand({ items }: { items: string[] }) {
  return (
    <div className="w-full bg-charcoal px-5 py-4 md:px-10">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
        {items.map((item, i) => (
          <Fragment key={item}>
            {i > 0 && (
              <li aria-hidden="true" className="h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
            )}
            <li className="text-label-caps whitespace-nowrap text-cream-light/70">{item}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
