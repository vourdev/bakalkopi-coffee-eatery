import Image from "next/image";
import { SITE } from "@/lib/site";

interface BrandMarkProps {
  /** "dark" untuk latar gelap (hero, panel menu), "light" untuk pita krem. */
  tone: "dark" | "light";
  className?: string;
}

/**
 * Logo + wordmark BAKALKOPI.
 *
 * Satu sumber untuk navbar dan panel menu ponsel: dulu keduanya menulis
 * markup sendiri dengan ukuran, jarak, dan ring berbeda, sehingga logo
 * tampak melompat saat panel dibuka — paling kentara di tablet, di mana
 * navbar sudah memakai ukuran md: sedangkan panel tidak.
 */
export function BrandMark({ tone, className = "" }: BrandMarkProps) {
  const onDark = tone === "dark";

  return (
    <span className={`flex items-center gap-2.5 md:gap-3 ${className}`}>
      <Image
        src="/images/logo.png"
        alt=""
        width={44}
        height={44}
        className={[
          "h-9 w-9 rounded-full ring-1 transition-[transform,box-shadow] duration-300 group-hover:scale-105 md:h-11 md:w-11",
          onDark ? "ring-cream-light/20" : "ring-taupe/70",
        ].join(" ")}
      />
      <span className="flex flex-col leading-none">
        <span
          className={[
            "font-display text-[15px] font-medium tracking-[0.04em] uppercase transition-colors duration-300 md:text-xl",
            onDark ? "text-cream-light" : "text-charcoal",
          ].join(" ")}
        >
          {SITE.name}
        </span>
        <span
          className={[
            "text-label-caps mt-1 transition-colors duration-300",
            onDark ? "text-gold-light" : "text-gold-deep",
          ].join(" ")}
        >
          {SITE.eyebrow}
        </span>
      </span>
    </span>
  );
}
