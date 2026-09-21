"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SITE, WA_RESERVASI } from "@/lib/site";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda", id: "beranda" },
  { label: "Cerita", href: "#cerita", id: "cerita" },
  { label: "Menu", href: "#menu", id: "menu" },
  { label: "Galeri", href: "#galeri", id: "galeri" },
  { label: "Reservasi", href: "#lokasi", id: "lokasi" },
  { label: "Kontak", href: "#kontak", id: "kontak" },
];

/**
 * Menandai tautan yang bagiannya sedang terlihat. Ambang atas -45% membuat
 * pergantian terjadi saat bagian melewati sepertiga atas layar, bukan saat
 * ujungnya baru menyentuh tepi bawah.
 */
function useActiveSection(ids: string[]) {
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

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Di puncak halaman bar melayang bening di atas foto hero yang gelap —
     seperti pada rujukan. Begitu digulir ia jadi pita krem pekat, karena
     sisa halaman berlatar terang. */
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
        {/* Merek */}
        <Link href="#beranda" className="group flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt=""
            width={44}
            height={44}
            className="rounded-full ring-1 ring-taupe/70 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <span
              className={[
                "text-headline-sm transition-colors duration-300",
                solid ? "text-charcoal" : "text-cream-light",
              ].join(" ")}
            >
              {SITE.name}
            </span>
            <span
              className={[
                "text-label-caps mt-1 text-[8.5px] transition-colors duration-300",
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

        {/* Aksi */}
        <div className="flex items-center gap-2">
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

          {/* Menu layar sempit */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={solid ? "text-charcoal lg:hidden" : "text-cream-light lg:hidden"}
                  aria-label="Buka menu navigasi"
                />
              }
            >
              <MenuIcon strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-taupe bg-cream-light">
              <SheetTitle className="sr-only">Menu navigasi</SheetTitle>

              <div className="mt-8 flex flex-col gap-1">
                <div className="mb-8 flex items-center gap-3 px-2">
                  <Image
                    src="/images/logo.png"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full ring-1 ring-taupe/70"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-headline-sm text-charcoal">{SITE.name}</span>
                    <span className="text-label-caps mt-1 text-[8.5px] text-gold">
                      {SITE.eyebrow}
                    </span>
                  </span>
                </div>

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-serif-md rounded-lg px-4 py-3 text-charcoal/80 transition-colors hover:bg-taupe/25 hover:text-charcoal"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href={WA_RESERVASI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-caps mx-4 mt-6 inline-flex items-center justify-center rounded-md bg-charcoal px-6 py-3.5 text-[10px] text-cream-light transition-colors duration-200 hover:bg-coffee"
                >
                  Pesan Meja
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
