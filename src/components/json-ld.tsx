interface JsonLdProps {
  /** Satu node atau beberapa node; dibungkus @graph bila lebih dari satu. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      // Nilainya konstanta milik kita sendiri; "<" di-escape agar tidak bisa menutup tag script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}
