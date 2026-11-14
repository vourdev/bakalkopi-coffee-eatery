// Jalur dilebihkan melewati viewBox dan -mb-px menimpa satu piksel, agar antialias tidak meninggalkan garis rambut.

interface TornEdgeProps {
  /** Warna bidang di SISI YANG DITUJU, bukan warna latar di belakangnya. */
  color?: string;
  className?: string;
}

const EDGE_PATH =
  "M0,70 C35,67 138,54 210,53 C282,52 355,59 430,65 C505,72 585,94 660,92 C735,90 810,56 880,55 C950,55 1027,88 1080,89 C1133,89 1180,64 1200,59 C1220,53 1200,59 1200,59 L1200,170 L0,170 Z";

export function TornEdge({ color = "#f1eade", className = "" }: TornEdgeProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none -mb-px w-full leading-none ${className}`}
      style={{ color }}
    >
      <svg
        className="block h-12 w-full md:h-20"
        preserveAspectRatio="none"
        viewBox="0 0 1200 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={EDGE_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}
