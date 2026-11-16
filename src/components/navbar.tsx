"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";
import { FillButton } from "@/components/ui/fill-button";
import { SITE, WA_RESERVASI } from "@/lib/site";

// Href diawali "/" agar tetap berfungsi dari subhalaman; id mengikat ke bagian di beranda.
const NAV_LINKS = [
  { label: "Beranda", href: "/#beranda", id: "beranda" },
  { label: "Cerita", href: "/#cerita", id: "cerita" },
  { label: "Menu", href: "/#menu", id: "menu" },
  { label: "Galeri", href: "/#galeri", id: "galeri" },
  { label: "Reservasi", href: "/#lokasi", id: "lokasi" },
] as const;

export type NavId = (typeof NAV_LINKS)[number]["id"];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

// rootMargin -45%: tautan berganti saat bagian melewati tengah layar, bukan saat baru masuk.
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

interface NavbarProps {
  /** Tautan aktif tetap untuk halaman di luar beranda, yang tidak punya bagian untuk diamati. */
  activeId?: NavId;
}

export function Navbar({ activeId }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const observed = useActiveSection(SECTION_IDS);
  const active = activeId ?? observed;
  const { scrollY } = useScroll();

  // React melewati render bila boolean sama, jadi tiap frame gulir tidak me-render ulang.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Garis bawah mengikuti tautan yang ditunjuk, lalu kembali ke bagian aktif.
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const indicatorId = hovered ?? active;

  // Bening di atas hero gelap; krem pekat begitu digulir karena sisa halaman terang.
  const solid = scrolled;

  return (
    // layoutRoot: header sticky, jadi animasi garis diukur relatif ke header, bukan halaman.
    <motion.header
      layoutRoot
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        solid
          ? "border-b border-taupe/50 bg-cream-light/92 shadow-[0_1px_20px_-8px_rgba(35,28,24,0.25)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl md:h-20 items-center justify-between px-5 md:px-10">
        <Link href="/#beranda" aria-label={SITE.name} className="group">
          <BrandMark tone={solid ? "light" : "dark"} />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-9"
          onMouseLeave={() => setHovered(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHovered(null);
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.id)}
                onFocus={() => setHovered(link.id)}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "text-label-caps relative py-1 transition-colors duration-200",
                  solid
                    ? isActive
                      ? "text-charcoal"
                      : "text-charcoal/70 hover:text-charcoal"
                    : isActive
                      ? "text-cream-light"
                      : "text-cream-light/65 hover:text-cream-light",
                ].join(" ")}
              >
                {link.label}
                {indicatorId === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    aria-hidden="true"
                    className={[
                      "absolute -bottom-0.5 left-0 h-px w-full",
                      solid ? "bg-gold" : "bg-gold-light",
                    ].join(" ")}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          {/* Pembungkus memegang hidden/sm:flex agar tidak bentrok dengan inline-flex tombol. */}
          <div className="hidden sm:flex">
            <FillButton
              href={WA_RESERVASI}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "text-label-caps min-h-11 whitespace-nowrap rounded-full px-6 py-3 transition-colors duration-200 active:scale-95",
                solid
                  ? "bg-charcoal text-cream-light"
                  : "border border-cream-light/45 text-cream-light",
              ].join(" ")}
              fillClassName={solid ? "bg-coffee text-cream-light" : "bg-gold text-charcoal"}
            >
              Pesan Meja
            </FillButton>
          </div>

          <MobileNav links={NAV_LINKS} activeId={active} onDark={!solid} />
        </div>
      </div>
    </motion.header>
  );
}
