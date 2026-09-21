/**
 * Tepi sobek organik — pengganti pemisah gelombang mulus.
 * Kurvanya sengaja tidak berulang supaya terbaca seperti kertas disobek,
 * bukan ombak. Dipakai untuk menyambung pita krem dan pita arang.
 */

interface TornEdgeProps {
  /** Warna bidang di SISI YANG DITUJU, bukan warna latar di belakangnya. */
  color?: string;
  /** Balik vertikal: pakai saat tepi berada di atas sebuah bagian. */
  flip?: boolean;
  className?: string;
}

const EDGE_PATH =
  "M0,32 C24,18 48,40 74,30 C100,20 118,42 148,36 C178,30 196,12 228,22 C260,32 282,46 312,38 C342,30 358,10 392,18 C426,26 446,44 478,36 C510,28 528,14 562,20 C596,26 618,44 652,38 C686,32 704,12 738,20 C772,28 792,46 826,38 C860,30 878,14 910,22 C942,30 964,44 998,36 C1032,28 1050,10 1084,18 C1118,26 1140,42 1170,32 C1184,27 1194,25 1200,27 L1200,60 L0,60 Z";

export function TornEdge({ color = "#f1eade", flip = false, className = "" }: TornEdgeProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}
      style={{ color }}
    >
      <svg
        className="relative block h-5 w-full md:h-8"
        preserveAspectRatio="none"
        viewBox="0 0 1200 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={EDGE_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * Tepi sobek vertikal untuk sisi kiri sebuah foto — sisi bergerigi yang
 * menutup gambar di hero, meniru potongan kertas pada rujukan desain.
 */
export function TornEdgeVertical({ color = "#faf6ee", className = "" }: Omit<TornEdgeProps, "flip">) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 w-5 md:w-8 ${className}`}
      style={{ color }}
    >
      <svg
        className="block h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 60 1200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32,0 C18,24 40,48 30,74 C20,100 42,118 36,148 C30,178 12,196 22,228 C32,260 46,282 38,312 C30,342 10,358 18,392 C26,426 44,446 36,478 C28,510 14,528 20,562 C26,596 44,618 38,652 C32,686 12,704 20,738 C28,772 46,792 38,826 C30,860 14,878 22,910 C30,942 44,964 36,998 C28,1032 10,1050 18,1084 C26,1118 42,1140 32,1170 C27,1184 25,1194 27,1200 L0,1200 L0,0 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
