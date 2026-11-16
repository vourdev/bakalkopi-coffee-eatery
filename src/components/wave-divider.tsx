// Jalur dilebihkan melewati viewBox dan tepi menimpa satu piksel, agar antialias tidak meninggalkan garis rambut.

const WAVES = {
  // Siluet hero → pita fitur, diukur dari referensi desktop: punuk lebar kiri, lembah dalam, lalu naik bertahap.
  hero: {
    viewBox: "0 0 1440 110",
    d: "M0,33 C40,30 120,18 180,19 C240,20 330,32 388,47 C420,55 440,61 470,60 C520,58 600,38 651,35 C690,32 700,28 735,29 C780,31 800,42 840,48 C890,55 930,58 970,57 C1030,55 1120,40 1177,37 C1250,34 1360,33 1440,26 L1440,120 L0,120 Z",
  },
  // Versi ponsel: lebih sedikit punuk agar tidak terlipat rapat saat diperas ke 360px.
  heroMobile: {
    viewBox: "0 0 1440 110",
    d: "M0,43 C60,40 180,28 270,28 C350,28 400,34 440,38 C500,45 540,53 592,54 C650,56 690,60 727,58 C790,55 830,47 879,43 C930,38 970,33 1014,32 C1080,30 1130,29 1183,28 C1250,27 1290,26 1318,25 C1370,23 1410,21 1440,20 L1440,120 L0,120 Z",
  },
  a: {
    viewBox: "0 0 1200 160",
    d: "M0,70 C35,67 138,54 210,53 C282,52 355,59 430,65 C505,72 585,94 660,92 C735,90 810,56 880,55 C950,55 1027,88 1080,89 C1133,89 1180,64 1200,59 L1200,170 L0,170 Z",
  },
  b: {
    viewBox: "0 0 1200 160",
    d: "M0,96 C90,92 160,58 270,50 C380,42 470,82 590,84 C710,86 760,64 860,60 C960,56 1050,92 1130,88 C1170,86 1190,80 1200,78 L1200,170 L0,170 Z",
  },
  c: {
    viewBox: "0 0 1200 160",
    d: "M0,58 C120,62 200,90 330,92 C460,94 520,66 640,62 C760,58 850,96 960,96 C1060,96 1130,70 1200,64 L1200,170 L0,170 Z",
  },
} as const;

type WaveVariant = keyof typeof WAVES;

interface WaveDividerProps {
  /** Warna bidang di SISI YANG DITUJU, bukan warna latar di belakangnya. */
  fillColor: string;
  variant?: WaveVariant;
  /** Geometri lain di bawah md; tanpa ini variant dipakai di semua lebar. */
  mobileVariant?: WaveVariant;
  /** "top": gelombang membuka bidang di bawahnya. "bottom": menutup bidang di atasnya. */
  position?: "top" | "bottom";
  /** Cermin mendatar, agar dua pemisah berdekatan tidak terlihat kembar. */
  flip?: boolean;
  /** Kelas tinggi Tailwind. */
  height?: string;
  /** Kelas tinggi untuk mobileVariant. */
  mobileHeight?: string;
  className?: string;
}

function WaveSvg({ variant, height, transform, className = "" }: { variant: WaveVariant; height: string; transform: string; className?: string }) {
  const wave = WAVES[variant];
  return (
    <svg
      className={`w-full ${height} ${className}`}
      style={{ transform }}
      preserveAspectRatio="none"
      viewBox={wave.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={wave.d} fill="currentColor" />
    </svg>
  );
}

export function WaveDivider({
  fillColor,
  variant = "a",
  mobileVariant,
  position = "top",
  flip = false,
  height = "h-12 md:h-20",
  mobileHeight = "h-12",
  className = "",
}: WaveDividerProps) {
  const transform = `scale(${flip ? -1 : 1}, ${position === "bottom" ? -1 : 1})`;

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none w-full leading-none",
        position === "top" ? "-mb-px" : "-mt-px",
        className,
      ].join(" ")}
      style={{ color: fillColor }}
    >
      {mobileVariant ? (
        <>
          <WaveSvg variant={mobileVariant} height={mobileHeight} transform={transform} className="block md:hidden" />
          <WaveSvg variant={variant} height={height} transform={transform} className="hidden md:block" />
        </>
      ) : (
        <WaveSvg variant={variant} height={height} transform={transform} className="block" />
      )}
    </div>
  );
}
