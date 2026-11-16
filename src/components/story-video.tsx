"use client";

import { useCallback, useId, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { Play, X } from "lucide-react";

interface StoryVideoProps {
  src: string;
  poster: string;
  alt: string;
  /** Label tombol putar, dipakai pembaca layar. */
  label: string;
  /** "framed": kartu bersudut. "bleed": tanpa bingkai, mengisi tinggi induk. */
  variant?: "framed" | "bleed";
}

const RING_TEXT = "PUTAR VIDEO CERITA · PUTAR VIDEO CERITA · ";

// <video> hanya dipasang saat popup terbuka, jadi berkas 18 MB tidak diunduh sebelum ditekan.
// Putar imperatif dengan cadangan senyap: peramban bisa menolak autoplay bersuara.
export function StoryVideo({ src, poster, alt, label, variant = "framed" }: StoryVideoProps) {
  const bleed = variant === "bleed";
  const ringId = `story-ring-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (!node) return;
    node.muted = false;
    node.play().catch(() => {
      node.muted = true;
      void node.play();
    });
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) videoRef.current?.pause();
      }}
    >
      <div
        className={
          bleed
            ? "relative h-full overflow-hidden"
            : "relative overflow-hidden rounded-[2rem] border border-taupe"
        }
      >
        <Image
          src={poster}
          alt={alt}
          width={1280}
          height={900}
          sizes={bleed ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 40rem, 100vw"}
          className={
            bleed
              ? "h-full w-full object-cover"
              : "h-[240px] w-full object-cover sm:h-[340px] md:h-[470px]"
          }
        />

        <Dialog.Trigger
          aria-label={label}
          className={[
            "group absolute inset-0 grid cursor-pointer place-items-center bg-charcoal/25 transition-colors duration-300 hover:bg-charcoal/40",
            // Bleed desktop: tombol di sepertiga kiri seperti referensi, agar tidak menutup pusat foto.
            bleed ? "lg:justify-items-start lg:pl-[14%]" : "",
          ].join(" ")}
        >
          {/* Teks melingkar statis: tidak berputar terus, sesuai aturan gerak sekali jalan. */}
          <span className="relative grid h-28 w-28 place-items-center text-cream-light transition-transform duration-300 group-hover:scale-105 md:h-36 md:w-36">
            <svg aria-hidden="true" viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
              <defs>
                <path id={ringId} d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
              </defs>
              {/* textLength = keliling lingkaran (2π·48), agar teks menutup cincin tanpa celah. */}
              <text className="fill-current text-[8px] font-semibold">
                <textPath href={`#${ringId}`} textLength={301} lengthAdjust="spacing">
                  {RING_TEXT}
                </textPath>
              </text>
            </svg>
            <span className="grid h-14 w-14 place-items-center rounded-full border border-cream-light/80 bg-charcoal/20 md:h-16 md:w-16">
              <Play className="h-5 w-5 translate-x-0.5 fill-cream-light text-cream-light md:h-6 md:w-6" strokeWidth={0} />
            </span>
          </span>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-charcoal/90" />
        <Dialog.Popup className="fixed inset-0 z-[60] grid place-items-center p-4">
          <div className="relative w-full max-w-4xl">
            <Dialog.Close
              aria-label="Tutup video"
              className="absolute -top-13 right-0 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-cream-light/30 text-cream-light transition-colors hover:border-gold hover:text-gold active:scale-95"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </Dialog.Close>

            <video
              ref={attachVideo}
              src={src}
              poster={poster}
              controls
              playsInline
              className="aspect-video w-full rounded-xl bg-black"
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
