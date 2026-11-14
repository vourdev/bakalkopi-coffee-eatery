"use client";

// Port FillButton (GSAP) ke `motion`: proyek ini memakai satu pustaka gerak saja.

import {
  useState,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Transition } from "motion/react";

export type FillDirection = "up" | "down" | "left" | "right";

// inset(atas kanan bawah kiri): lapisan isi bersembunyi di tepi asal sapuan.
const HIDDEN: Record<FillDirection, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
};
const SHOWN = "inset(0% 0% 0% 0%)";

// Kurva setara "power3.out" milik GSAP.
const POWER3_OUT: Transition["ease"] = [0.215, 0.61, 0.355, 1];

type Managed =
  | "children"
  | "className"
  | "onPointerEnter"
  | "onPointerLeave"
  | "onFocus"
  | "onBlur";

interface FillOptions {
  children: ReactNode;
  className?: string;
  /** Latar dan warna teks lapisan isi, mis. "bg-gold text-charcoal". */
  fillClassName: string;
  /** Arah sapuan isi. Bawaan: "up". */
  direction?: FillDirection;
  /** Lama sapuan dalam detik. Bawaan: 0.45. */
  duration?: number;
  ease?: Transition["ease"];
}

type FillLinkProps = FillOptions & Omit<ComponentProps<typeof Link>, Managed>;
type FillNativeButtonProps = FillOptions &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, Managed> & { href?: never };

export type FillButtonProps = FillLinkProps | FillNativeButtonProps;

export function FillButton({
  children,
  className,
  fillClassName,
  direction = "up",
  duration = 0.45,
  ease = POWER3_OUT,
  ...rest
}: FillButtonProps) {
  const [filled, setFilled] = useState(false);
  const reduceMotion = useReducedMotion();

  const handlers = {
    // Hanya tetikus: ketukan layar sentuh tidak meninggalkan isi yang tertahan.
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") setFilled(true);
    },
    onPointerLeave: () => setFilled(false),
    // Hanya fokus papan ketik; fokus sisa klik tidak ikut mengisi.
    onFocus: (e: FocusEvent<HTMLElement>) => {
      if (e.currentTarget.matches(":focus-visible")) setFilled(true);
    },
    onBlur: () => setFilled(false),
  };

  // Join biasa, bukan cn: cn menganggap .text-label-caps bentrok dengan warna text-* lalu membuangnya.
  const classes = `relative inline-flex items-center justify-center overflow-hidden ${className ?? ""}`;

  const content = (
    <>
      <span className="inline-flex items-center gap-[inherit]">{children}</span>
      {/* Salinan terbalik yang dibuka clip-path; disembunyikan dari pembaca layar. */}
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center gap-[inherit] ${fillClassName}`}
        initial={false}
        animate={{ clipPath: filled ? SHOWN : HIDDEN[direction] }}
        transition={{ duration: reduceMotion ? 0 : duration, ease }}
      >
        {children}
      </motion.span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link {...(rest as Omit<FillLinkProps, keyof FillOptions>)} className={classes} {...handlers}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<FillNativeButtonProps, keyof FillOptions>;
  return (
    <button {...buttonProps} type={type} className={classes} {...handlers}>
      {content}
    </button>
  );
}

export default FillButton;
