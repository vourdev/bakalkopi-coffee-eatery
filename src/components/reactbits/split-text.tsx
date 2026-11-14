"use client";

// Port SplitText dari React Bits ke `motion`. Dipecah per kata dulu agar baris putus di antar-kata.

import { motion, useReducedMotion } from "motion/react";
import { Fragment, type ElementType } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Jeda antar potongan dalam milidetik. */
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  /** Pemenggalan baris yang dipaksa, agar slogan tidak pecah di tempat salah. */
  lines?: string[];
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
  lines,
  from = { opacity: 0, y: 28 },
  to = { opacity: 1, y: 0 },
  threshold = 0.2,
  tag: Tag = "div",
}: SplitTextProps) {
  const reduceMotion = useReducedMotion();
  const rows = lines ?? [text];

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {rows.map((row, i) => (
          <span key={i} className="block">
            {row}
          </span>
        ))}
      </Tag>
    );
  }

  let index = -1;

  return (
    <Tag className={className}>
      {/* Teks utuh untuk pembaca layar; potongannya disembunyikan darinya. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {rows.map((row, r) => (
          <span key={r} className="block">
            {renderRow(row)}
          </span>
        ))}
      </span>
    </Tag>
  );

  function renderRow(row: string) {
    const words = row.split(" ");
    return (
      <>
        {words.map((word, w) => {
          const pieces = splitType === "words" ? [word] : Array.from(word);

          return (
            <Fragment key={w}>
              <span className="inline-block whitespace-nowrap">
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
              </span>
              {/* Spasi di luar span kata: di ujung inline-block ia diciutkan jadi nol lebar. */}
              {w < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </>
    );
  }
}
