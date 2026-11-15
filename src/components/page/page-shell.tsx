import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar, type NavId } from "@/components/navbar";
import { TornEdge } from "@/components/torn-edge";
import type { Crumb } from "@/lib/seo";

export function PageShell({
  activeId,
  children,
}: {
  activeId: NavId;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar activeId={activeId} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

interface PageHeaderProps {
  crumbs: Crumb[];
  title: string;
  lead: string;
  /** Baris kecil di bawah lead, mis. tanggal pembaruan. */
  meta?: string;
}

// Pita gelap ditarik ke bawah header bening, sama seperti hero beranda.
export function PageHeader({ crumbs, title, lead, meta }: PageHeaderProps) {
  return (
    <section className="relative -mt-[calc(4rem+1px)] bg-charcoal text-cream-light md:-mt-[calc(5rem+1px)]">
      <div className="mx-auto max-w-7xl px-5 pt-[calc(4rem+2rem)] pb-6 md:px-10 md:pt-[calc(5rem+3rem)] md:pb-8">
        <nav aria-label="Breadcrumb">
          <ol className="text-label-caps flex flex-wrap items-center gap-x-2 text-cream-light/60">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {last ? (
                    <span aria-current="page" className="text-gold-light">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="inline-flex min-h-11 items-center transition-colors hover:text-cream-light active:opacity-70"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="text-headline-lg mt-3 max-w-3xl text-cream-light">{title}</h1>
        <p className="text-body-lg mt-5 max-w-2xl text-cream-light/70">{lead}</p>
        {meta && <p className="text-body-sm mt-5 text-cream-light/60">{meta}</p>}
      </div>
      <TornEdge color="#faf6ee" className="mt-6 md:mt-10" />
    </section>
  );
}

/** Tanggal ISO menjadi "15 November 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}
