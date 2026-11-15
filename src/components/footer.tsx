import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Ornament } from "@/components/ornament";
import { GUIDES } from "@/lib/guides";
import { ADDRESS_LINE, HOURS_LINE, SITE, WA_TANYA } from "@/lib/site";

// Diawali "/" agar tetap mengarah ke beranda saat footer tampil di halaman panduan.
const EXPLORE_LINKS = [
  { label: "Cerita & Filosofi", href: "/#cerita" },
  { label: "Suasana & Akustik", href: "/#suasana" },
  { label: "Galeri", href: "/#galeri" },
  { label: "Fasilitas", href: "/#fasilitas" },
];

const INFO_LINKS = [
  { label: "Menu Lengkap & Harga", href: "/menu" },
  ...GUIDES.map((g) => ({ label: g.navLabel, href: `/panduan/${g.slug}` })),
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

const LINK_CLASS =
  "text-body-sm inline-flex min-h-11 min-w-11 items-center text-cream-light/70 transition-colors duration-200 hover:text-cream-light active:opacity-70";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontak" className="bg-charcoal text-cream-light">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt=""
                width={40}
                height={40}
                className="rounded-full ring-1 ring-cream-light/20"
              />
              <span className="text-headline-sm text-cream-light">{SITE.name}</span>
            </div>
            <p className="text-body-sm max-w-xs text-cream-light/70">
              Kafe dan rumah makan Nusantara di Cimanggis, Depok. Menikmati
              pelannya waktu lewat masakan rumahan dan kopi yang diseduh benar.
            </p>
            <p className="text-label-caps pt-1 text-gold">{SITE.tagline}</p>
          </div>

          <nav className="flex flex-col items-start" aria-label="Jelajahi halaman">
            <h2 className="text-label-caps mb-2 text-cream-light">
              Jelajahi
            </h2>
            {EXPLORE_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col items-start" aria-label="Panduan dan informasi">
            <h2 className="text-label-caps mb-2 text-cream-light">
              Panduan
            </h2>
            {INFO_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={LINK_CLASS}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* <address>: penanda semantik kontak pemilik situs, dibaca mesin pencari. */}
          <address className="flex flex-col gap-4 not-italic">
            <h2 className="text-label-caps text-cream-light">Kunjungi</h2>

            <p className="text-body-sm flex items-start gap-2.5 text-cream-light/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
              <span>{ADDRESS_LINE}</span>
            </p>

            <p className="text-body-sm flex items-start gap-2.5 text-cream-light/70">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
              <span>
                {SITE.hours.label}
                <br />
                {HOURS_LINE}
              </span>
            </p>

            <Link
              href={WA_TANYA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm flex min-h-11 items-center gap-2.5 text-cream-light/70 transition-colors hover:text-cream-light active:opacity-70"
            >
              <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
              {SITE.contact.whatsappDisplay}
            </Link>

            <Link
              href={SITE.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm flex min-h-11 items-center text-gold transition-colors hover:text-gold-light active:opacity-70"
            >
              {/* lucide-react 1.x tanpa ikon merek; nama platform ditulis, bukan glyph buatan tangan. */}
              Instagram @{SITE.contact.instagram}
            </Link>
          </address>
        </div>
      </div>

      <Separator className="bg-cream-light/10" />

      <div className="flex flex-col items-center gap-4 py-8">
        <Ornament className="text-gold/50" />
        <p className="text-body-sm px-5 text-center text-cream-light/60">
          © {year} {SITE.legalName}. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
