"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock, Menu as MenuIcon, Phone, X } from "lucide-react";
import { HOURS_LINE, SITE, WA_RESERVASI } from "@/lib/site";

interface MobileNavProps {
  links: ReadonlyArray<{ label: string; href: string; id: string }>;
  activeId: string;
  /** Bar sedang bening di atas hero; ikon pemicu harus ikut terang. */
  onDark: boolean;
}

/**
 * Menu layar penuh untuk ponsel.
 *
 * Menggantikan panel geser selebar 20rem: di layar sempit panel itu menyisakan
 * potongan halaman di sampingnya yang membuat menunya terasa sesak, dan
 * ukuran tautannya mengikuti teks isi, bukan ukuran sasaran sentuh.
 *
 * Tiap tautan muncul bertahap; seluruh animasi dimatikan saat
 * prefers-reduced-motion aktif.
 */
export function MobileNav({ links, activeId, onDark }: MobileNavProps) {
  const reduceMotion = useReducedMotion();

  const row = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.45,
            delay: 0.08 + i * 0.055,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Buka menu navigasi"
        className={[
          "grid h-10 w-10 cursor-pointer place-items-center rounded-md transition-colors lg:hidden",
          onDark
            ? "text-cream-light hover:bg-cream-light/10"
            : "text-charcoal hover:bg-taupe/30",
        ].join(" ")}
      >
        <MenuIcon className="h-5 w-5" strokeWidth={1.5} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[70] bg-charcoal/40 backdrop-blur-sm" />
        <Dialog.Popup className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-charcoal text-cream-light">
          <Dialog.Title className="sr-only">Menu navigasi</Dialog.Title>

          {/* Kepala panel meniru geometri bar navigasi (tinggi, padding, lebar
              maksimum) supaya logo dan tombol tutup berada tepat di posisi
              logo dan tombol pemicu — tidak melompat saat panel dibuka. */}
          <div className="pt-[env(safe-area-inset-top)]">
            <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-10">
              <BrandMark tone="dark" />

              <Dialog.Close
                aria-label="Tutup menu"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-md text-cream-light transition-colors hover:bg-cream-light/10"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </Dialog.Close>
            </div>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-5 py-2 md:px-10">
            {links.map((link, i) => {
              const isActive = activeId === link.id;
              return (
                <motion.div key={link.href} {...row(i)}>
                  <Dialog.Close
                    nativeButton={false}
                    render={
                      <Link
                        href={link.href}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex w-full items-center gap-4 border-b border-cream-light/10 py-3.5"
                      />
                    }
                  >
                    <span className="text-label-caps w-6 shrink-0 text-gold-light/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={[
                        "font-display flex-1 text-left text-2xl tracking-[0.02em] uppercase transition-colors",
                        isActive ? "text-gold-light" : "text-cream-light",
                      ].join(" ")}
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-cream-light/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </Dialog.Close>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 14 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.45, delay: 0.42 },
                })}
            className="px-5 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-10"
          >
            <Link
              href={WA_RESERVASI}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-caps flex items-center justify-center rounded-md bg-gold px-6 py-4 text-charcoal transition-colors duration-200 hover:bg-gold-light active:scale-95"
            >
              Pesan Meja
            </Link>

            <div className="mt-4 flex flex-col gap-2 border-t border-cream-light/10 pt-4">
              <p className="text-body-sm flex items-center gap-2.5 text-cream-light/70">
                <Clock className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
                {SITE.hours.label} · {HOURS_LINE}
              </p>
              <p className="text-body-sm flex items-center gap-2.5 text-cream-light/70">
                <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
                {SITE.contact.whatsappDisplay}
              </p>
            </div>
          </motion.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
