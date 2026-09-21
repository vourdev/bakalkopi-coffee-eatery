"use client";

/**
 * AnimatedContent — port React Bits (reactbits.dev) dari GSAP ke `motion`.
 * Prop-nya sengaja dibuat sama dengan versi asli, kecuali `ease` yang di sini
 * berupa easing milik motion (array cubic-bezier), bukan string GSAP.
 * Alasan port: proyek ini sudah memakai motion untuk CountUp dan CircularText;
 * menarik gsap + ScrollTrigger hanya demi reveal saat scroll tidak sepadan.
 */

import { motion, useReducedMotion, type Easing } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: Easing;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  /** Bagian elemen yang harus terlihat sebelum animasi mulai (0–1). */
  threshold?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  distance = 48,
  direction = "vertical",
  reverse = false,
  duration = 0.7,
  ease = [0.22, 1, 0.36, 1],
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.15,
  delay = 0,
  className = "",
}: AnimatedContentProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  const axis = direction === "horizontal" ? "x" : "y";
  const offset = reverse ? -distance : distance;

  return (
    <motion.div
      className={className}
      initial={{
        [axis]: offset,
        opacity: animateOpacity ? initialOpacity : 1,
        scale,
      }}
      whileInView={{ [axis]: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
