"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { Play, X } from "lucide-react";

interface StoryVideoProps {
  src: string;
  poster: string;
  alt: string;
  /** Label tombol putar, dipakai pembaca layar. */
  label: string;
}

/**
 * Poster cerita dengan tombol putar; videonya dibuka di popup.
 *
 * Elemen <video> hanya dipasang selagi popup terbuka, jadi berkasnya (18 MB)
 * tidak diunduh sama sekali sampai pengguna menekan tombol. Pemutarannya
 * memakai kontrol bawaan peramban — tidak ada kontrol kustom yang perlu
 * dirawat, dan di ponsel pengguna langsung dapat layar penuh serta AirPlay.
 *
 * Dialog Base UI dipakai supaya fokus terkunci, Escape menutup, dan latar
 * belakangnya tidak bisa digulir — hal-hal yang harus ditulis sendiri kalau
 * memakai overlay buatan tangan.
 *
 * Pemutaran dimulai lewat panggilan imperatif, bukan atribut autoPlay, dengan
 * cadangan senyap: peramban menolak autoplay bersuara kalau aktivasi pengguna
 * dianggap sudah kedaluwarsa, dan tanpa cadangan itu videonya diam total.
 * Berkas saat ini memang tidak punya jalur audio, tapi jalur ini sudah siap
 * begitu berkasnya diganti dengan yang bersuara.
 */
export function StoryVideo({ src, poster, alt, label }: StoryVideoProps) {
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
      <div className="relative overflow-hidden rounded-[2rem] border border-taupe shadow-xl">
        <Image
          src={poster}
          alt={alt}
          width={1280}
          height={900}
          sizes="(min-width: 1024px) 40rem, 100vw"
          className="h-[240px] w-full object-cover sm:h-[340px] md:h-[470px]"
        />

        <Dialog.Trigger
          aria-label={label}
          className="group absolute inset-0 grid cursor-pointer place-items-center bg-charcoal/25 transition-colors duration-300 hover:bg-charcoal/40"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-cream-light/90 shadow-lg transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20">
            <Play
              className="h-6 w-6 translate-x-0.5 fill-charcoal text-charcoal md:h-7 md:w-7"
              strokeWidth={0}
            />
          </span>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-charcoal/85 backdrop-blur-sm" />
        <Dialog.Popup className="fixed inset-0 z-[60] grid place-items-center p-4">
          <div className="relative w-full max-w-4xl">
            <Dialog.Close
              aria-label="Tutup video"
              className="absolute -top-11 right-0 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-cream-light/30 text-cream-light transition-colors hover:border-gold hover:text-gold"
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
