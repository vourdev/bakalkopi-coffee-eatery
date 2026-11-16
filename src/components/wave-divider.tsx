// Jalur dilebihkan melewati viewBox dan tepi menimpa satu piksel, agar antialias tidak meninggalkan garis rambut.

const WAVES = {
  // Siluet hero → pita fitur, diukur dari referensi desktop: punuk 5%, lembah 24%, puncak 38%, lembah dangkal 52%, lalu naik landai.
  hero: {
    viewBox: "0 0 1440 90",
    d: "M0,22 C18.2,21.7 46.2,19.6 69,20 C91.8,20.4 114.2,21.8 137,24.5 C159.8,27.2 183.2,31.9 206,36 C228.8,40.1 251.2,45.7 274,49 C296.8,52.3 320,56 343,56 C366,56 389.2,53 412,49 C434.8,45 457.2,35.9 480,32 C502.8,28.1 526.2,25.9 549,25.6 C571.8,25.3 594.2,27.4 617,30 C639.8,32.6 663.2,38.3 686,41 C708.8,43.7 731.2,46 754,46 C776.8,46 800.2,41.4 823,41 C845.8,40.6 861.5,42 891,43.5 C920.5,45 956.8,51.4 1000,50 C1043.2,48.6 1100,39 1150,35 C1200,31 1251.7,28.2 1300,26 C1348.3,23.8 1410,22.7 1440,22 L1440,100 L0,100 Z",
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
