"use client";

/**
 * SplitText — port React Bits (reactbits.dev) dari GSAP SplitText ke `motion`.
 * Versi asli bergantung pada gsap, ScrollTrigger, plugin SplitText, dan
 * @gsap/react; di sini pemecahan teks dilakukan sendiri agar satu-satunya
 * pustaka gerak di proyek ini tetap motion.
 *
 * Pemecahan selalu per kata dulu, baru per huruf di dalam kata, supaya
 * pergantian baris tetap jatuh di antar-kata.
 */

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Jeda antar potongan dalam milidetik. */
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  from?: { opacity?: number; y?: number };
  to?: { opacity?: number; y?: number };
  threshold?: number;
  tag?: ElementType;
}

export default function SplitText({
  text,
  className = "",
  delay = 30,
  duration = 0.7,
  splitType = "chars",
  from = { opacity: 0, y: 28 },
  to = { opacity: 1, y: 0 },
  threshold = 0.2,
  tag: Tag = "div",
}: SplitTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) return <Tag className={className}>{text}</Tag>;

  let index = -1;

  return (
    <Tag className={className}>
      {/* Teks utuh untuk pembaca layar; potongannya disembunyikan darinya. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => {
          const pieces = splitType === "words" ? [word] : Array.from(word);

          return (
            <span key={w} className="inline-block whitespace-nowrap">
              {pieces.map((piece, p) => {
                index += 1;
                return (
                  <motion.span
                    key={p}
                    className="inline-block will-change-transform"
                    initial={from}
                    whileInView={to}
                    viewport={{ once: true, amount: threshold }}
                    transition={{
                      duration,
                      delay: (index * delay) / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {piece}
                  </motion.span>
                );
              })}
              {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
