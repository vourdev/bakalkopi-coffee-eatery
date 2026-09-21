"use client";

/**
 * CircularText — React Bits (reactbits.dev), varian ts-tailwind.
 * Dua penyimpangan dari sumber aslinya:
 *  1. ukuran dan warna tidak dipatok di dalam komponen (aslinya
 *     `w-[200px] h-[200px] text-white font-black`) — kelas arbitrer yang
 *     dipatok tidak bisa ditimpa lewat prop className secara andal;
 *  2. berhenti berputar saat prefers-reduced-motion aktif.
 */

import React, { useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
  type Transition,
} from "motion/react";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  /** Sisi kotak pembungkus dalam piksel; huruf diletakkan di dalamnya. */
  size?: number;
  className?: string;
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: "spring" as const, damping: 20, stiffness: 300 },
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  size = 200,
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, reduceMotion, rotation]);

  const handleHoverStart = () => {
    if (!onHover || reduceMotion) return;
    const start = rotation.get();

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    if (reduceMotion) return;
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`relative m-0 mx-auto origin-center rounded-full text-center ${className}`}
      style={{ rotate: rotation, width: size, height: size }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${factor * i}px, ${factor * i}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inset-0 inline-block transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
