// Lapisan cat tepi sobek (paint dari ripEdge). Saudara elemen bertopeng, bukan anaknya, agar cat bisa jatuh di krem;
// ukurannya mengikuti strip topeng (--torn-w / --torn-h / --torn-b) supaya tepat di kontur.
import type { Side } from "@/lib/torn-mask";

const PLACE = {
  left: "inset-y-0 left-0 w-[var(--torn-w)]",
  top: "inset-x-0 top-0 h-[var(--torn-h)]",
  bottom: "inset-x-0 bottom-0 h-[var(--torn-b)]",
} as const;

export function TornPaint({ side, image, className = "" }: { side: Side; image: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "pointer-events-none absolute z-10 bg-no-repeat [background-size:100%_100%]",
        PLACE[side],
        className,
      ].join(" ")}
      style={{ backgroundImage: image }}
    />
  );
}
