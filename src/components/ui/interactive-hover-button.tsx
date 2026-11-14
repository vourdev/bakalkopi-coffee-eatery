"use client";

// Adaptasi InteractiveHoverButton ke `motion`: mekar melingkar + geser panah, tanpa titik hiasan saat diam.

import {
  useState,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type FocusEvent,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "motion/react";

// Kurva lembut tanpa sentakan awal agar mekar dan geser teks terasa tenang.
const EASE_SMOOTH: Transition["ease"] = [0.4, 0, 0.2, 1];

type Managed =
  | "children"
  | "className"
  | "onPointerEnter"
  | "onPointerLeave"
  | "onFocus"
  | "onBlur";

interface InteractiveHoverOptions {
  text: string;
  className?: string;
  /** Latar dan warna teks lapisan aktif, mis. "bg-gold text-charcoal". */
  fillClassName: string;
  duration?: number;
}

type InteractiveLinkProps = InteractiveHoverOptions &
  Omit<ComponentProps<typeof Link>, Managed>;
type InteractiveNativeButtonProps = InteractiveHoverOptions &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, Managed> & { href?: never };

export type InteractiveHoverButtonProps =
  | InteractiveLinkProps
  | InteractiveNativeButtonProps;

export function InteractiveHoverButton({
  text,
  className,
  fillClassName,
  duration = 0.7,
  ...rest
}: InteractiveHoverButtonProps) {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const t: Transition = {
    duration: reduceMotion ? 0 : duration,
    ease: EASE_SMOOTH,
  };

  const handlers = {
    // Hanya tetikus: ketukan layar sentuh tidak meninggalkan tombol dalam keadaan terisi.
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") setActive(true);
    },
    onPointerLeave: () => setActive(false),
    onFocus: (e: FocusEvent<HTMLElement>) => {
      if (e.currentTarget.matches(":focus-visible")) setActive(true);
    },
    onBlur: () => setActive(false),
  };

  // Join biasa, bukan cn: cn menganggap .text-label-caps bentrok dengan warna text-* lalu membuangnya.
  const classes = `relative inline-flex items-center justify-center overflow-hidden ${className ?? ""}`;

  const content = (
    <>
      <motion.span
        className="inline-flex items-center gap-3"
        initial={false}
        animate={{
          x: active && !reduceMotion ? 16 : 0,
          opacity: active ? 0 : 1,
        }}
        transition={t}
      >
        <span>{text}</span>
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
      </motion.span>

      {/* Di CSS circle(), 100% = sqrt(W^2+H^2)/sqrt(2) (~0.73W), jadi dari 18% ke tepi kanan (0.82W) butuh ~120%. */}
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center ${fillClassName}`}
        initial={false}
        animate={{
          clipPath: active
            ? "circle(122% at 18% 50%)"
            : "circle(0% at 18% 50%)",
        }}
        transition={t}
      >
        <motion.span
          className="inline-flex items-center gap-3"
          initial={false}
          animate={{
            x: active || reduceMotion ? 0 : 16,
            opacity: active ? 1 : 0,
          }}
          transition={t}
        >
          <span>{text}</span>
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        </motion.span>
      </motion.span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link
        {...(rest as Omit<InteractiveLinkProps, keyof InteractiveHoverOptions>)}
        className={classes}
        {...handlers}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<
    InteractiveNativeButtonProps,
    keyof InteractiveHoverOptions
  >;
  return (
    <button {...buttonProps} type={type} className={classes} {...handlers}>
      {content}
    </button>
  );
}

export default InteractiveHoverButton;
