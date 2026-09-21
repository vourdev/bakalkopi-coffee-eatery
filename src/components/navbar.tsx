"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { SITE, WA_RESERVASI } from "@/lib/site";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda", id: "beranda" },
  { label: "Cerita", href: "#cerita", id: "cerita" },
  { label: "Menu", href: "#menu", id: "menu" },
  { label: "Galeri", href: "#galeri", id: "galeri" },
  { label: "Reservasi", href: "#lokasi", id: "lokasi" },
  { label: "Kontak", href: "#kontak", id: "kontak" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

/**
 * Menandai tautan yang bagiannya sedang terlihat. Ambang atas -45% membuat
 * pergantian terjadi saat bagian melewati sepertiga atas layar, bukan saat
 * ujungnya baru menyentuh tepi bawah.
 */
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Di puncak halaman bar melayang bening di atas foto hero yang gelap.
     Begitu digulir ia jadi pita krem pekat, karena sisa halaman berlatar
     terang. */
  const solid = scrolled;

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        solid
          ? "border-b border-taupe/50 bg-cream-light/92 shadow-[0_1px_20px_-8px_rgba(35,28,24,0.25)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        {/* Merek. Ukurannya dikecilkan di ponsel: pada 390px versi lama
            memakan hampir separuh lebar bar. */}
        <Link href="#beranda" className="group flex items-center gap-2.5 md:gap-3">
          <Image
            src="/images/logo.png"
            alt=""
            width={44}
            height={44}
            className="h-9 w-9 rounded-full ring-1 ring-taupe/70 transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11"
          />
          <span className="flex flex-col leading-none">
            <span
              className={[
                "font-display text-[15px] font-medium tracking-[0.04em] uppercase transition-colors duration-300 md:text-xl",
                solid ? "text-charcoal" : "text-cream-light",
              ].join(" ")}
            >
              {SITE.name}
            </span>
            <span
              className={[
                "text-label-caps mt-1 text-[7px] transition-colors duration-300 md:text-[8.5px]",
                solid ? "text-gold" : "text-gold-light",
              ].join(" ")}
            >
              {SITE.eyebrow}
            </span>
          </span>
        </Link>

        {/* Navigasi layar lebar */}
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "text-label-caps relative py-1 text-[10px] transition-colors duration-200",
                  solid
                    ? isActive
                      ? "text-charcoal"
                      : "text-charcoal/55 hover:text-charcoal"
                    : isActive
                      ? "text-cream-light"
                      : "text-cream-light/65 hover:text-cream-light",
                ].join(" ")}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute -bottom-0.5 left-0 h-px transition-all duration-300",
                    solid ? "bg-gold" : "bg-gold-light",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href={WA_RESERVASI}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              "text-label-caps hidden items-center rounded-md px-6 py-3 text-[10px] transition-colors duration-200 active:scale-95 sm:inline-flex",
              solid
                ? "bg-charcoal text-cream-light hover:bg-coffee"
                : "border border-cream-light/45 text-cream-light hover:border-gold hover:bg-gold/15",
            ].join(" ")}
          >
            Pesan Meja
          </Link>

          <MobileNav links={NAV_LINKS} activeId={active} onDark={!solid} />
        </div>
      </div>
    </header>
  );
}
