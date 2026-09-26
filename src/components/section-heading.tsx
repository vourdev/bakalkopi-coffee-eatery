import type { ReactNode } from "react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { Ornament } from "@/components/ornament";

interface SectionHeadingProps {
  /** Label kecil huruf kapital di atas judul. */
  eyebrow: string;
  title: ReactNode;
  /** Baris aksen tulisan tangan di bawah judul. */
  script?: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  script,
  description,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const onDark = tone === "dark";

  return (
    <AnimatedContent
      className={[
        "flex flex-col",
        centered ? "mx-auto max-w-2xl items-center text-center" : "items-start text-left",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "flex items-center gap-3 text-label-caps",
          onDark ? "text-gold-light" : "text-gold-deep",
        ].join(" ")}
      >
        {centered && <Ornament />}
        {eyebrow}
        {centered && <Ornament />}
        {!centered && <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />}
      </span>

      <h2
        className={[
          "text-headline-lg mt-4",
          onDark ? "text-cream-light" : "text-charcoal",
        ].join(" ")}
      >
        {title}
      </h2>

      {script && (
        <p
          className={[
            "text-script mt-2 text-3xl md:text-4xl",
            onDark ? "text-gold-light" : "text-gold-deep",
          ].join(" ")}
        >
          {script}
        </p>
      )}

      {description && (
        <p
          className={[
            "text-body-md mt-4 max-w-xl",
            onDark ? "text-cream-light/70" : "text-charcoal/70",
          ].join(" ")}
        >
          {description}
        </p>
      )}
    </AnimatedContent>
  );
}
