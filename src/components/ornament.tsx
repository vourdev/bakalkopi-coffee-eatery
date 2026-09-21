/** Garis ornamen dengan belah ketupat di tengah: ──◆── */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="h-px w-8 bg-current opacity-40 sm:w-12" />
      <span className="h-1 w-1 rotate-45 bg-current opacity-70" />
      <span className="h-px w-8 bg-current opacity-40 sm:w-12" />
    </span>
  );
}

/** Daun garis tipis — aksen botani yang ditebar tipis seperti pada rujukan. */
export function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M6 42C6 24 18 8 42 6c2 22-12 36-30 36Z" />
      <path d="M42 6C30 18 18 28 10 38" />
      <path d="M26 12c-1 6-2 10-4 14M34 18c-4 4-8 7-12 10" />
    </svg>
  );
}
