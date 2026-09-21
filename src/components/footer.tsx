import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Ornament } from "@/components/ornament";
import { ADDRESS_LINE, HOURS_LINE, SITE, WA_TANYA } from "@/lib/site";

const EXPLORE_LINKS = [
  { label: "Cerita & Filosofi", href: "#cerita" },
  { label: "Daftar Menu", href: "#menu" },
  { label: "Suasana & Akustik", href: "#suasana" },
  { label: "Galeri", href: "#galeri" },
  { label: "Fasilitas", href: "#fasilitas" },
];

const COMMITMENT_LINKS = [
  { label: "Komitmen Halal", href: "#fasilitas" },
  { label: "Dukungan Petani Lokal", href: "#cerita" },
  { label: "Reservasi & Acara", href: "#lokasi" },
];

/** lucide-react 1.x tidak lagi menyertakan ikon merek, jadi ditulis sendiri. */
function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontak" className="bg-charcoal text-cream-light">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Merek */}
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
            <p className="text-body-sm max-w-xs text-cream-light/50">
              Kafe dan rumah makan Nusantara di Cimanggis, Depok. Menikmati
              pelannya waktu lewat masakan rumahan dan kopi yang diseduh benar.
            </p>
            <p className="text-label-caps pt-1 text-[9px] text-gold">{SITE.tagline}</p>
          </div>

          {/* Jelajahi */}
          <nav className="flex flex-col gap-3" aria-label="Jelajahi halaman">
            <h2 className="text-label-caps mb-1 text-[9.5px] text-cream-light">
              Jelajahi
            </h2>
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-body-sm text-cream-light/50 transition-colors duration-200 hover:text-cream-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Komitmen */}
          <nav className="flex flex-col gap-3" aria-label="Komitmen kami">
            <h2 className="text-label-caps mb-1 text-[9.5px] text-cream-light">
              Komitmen
            </h2>
            {COMMITMENT_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-body-sm text-cream-light/50 transition-colors duration-200 hover:text-cream-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Kontak */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-caps text-[9.5px] text-cream-light">Kunjungi</h2>

            <p className="text-body-sm flex items-start gap-2.5 text-cream-light/50">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
              <span>{ADDRESS_LINE}</span>
            </p>

            <p className="text-body-sm flex items-start gap-2.5 text-cream-light/50">
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
              className="text-body-sm flex items-center gap-2.5 text-cream-light/50 transition-colors hover:text-cream-light"
            >
              <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
              {SITE.contact.whatsappDisplay}
            </Link>

            <Link
              href={SITE.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm flex items-center gap-2.5 text-gold transition-colors hover:text-gold-light"
            >
              <InstagramGlyph className="h-4 w-4 shrink-0" />@{SITE.contact.instagram}
            </Link>
          </div>
        </div>
      </div>

      <Separator className="bg-cream-light/10" />

      <div className="flex flex-col items-center gap-4 py-8">
        <Ornament className="text-gold/50" />
        <p className="text-body-sm px-5 text-center text-xs text-cream-light/35">
          © {year} {SITE.legalName}. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
