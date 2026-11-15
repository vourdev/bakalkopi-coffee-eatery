import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, PageShell, formatDate } from "@/components/page/page-shell";
import { Article, PageCta } from "@/components/page/prose";
import { getGuide } from "@/lib/guides";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function guideMetadata(slug: string): Metadata {
  const guide = getGuide(slug);
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/panduan/${slug}`,
    type: "article",
    modifiedTime: guide.modified,
  });
}

// Kerangka seragam tiap panduan: header, foto, isi, ajakan reservasi, dan JSON-LD Article.
export function GuideLayout({
  slug,
  lead,
  children,
}: {
  slug: string;
  lead: string;
  children: ReactNode;
}) {
  const guide = getGuide(slug);
  const path = `/panduan/${slug}`;
  const crumbs = [
    { name: "Beranda", path: "/" },
    { name: "Panduan", path: "/panduan" },
    { name: guide.navLabel, path },
  ];

  return (
    <PageShell activeId="panduan">
      <JsonLd
        data={[
          articleJsonLd({
            title: guide.title,
            description: guide.description,
            path,
            published: guide.published,
            modified: guide.modified,
            image: guide.image,
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <PageHeader
        crumbs={crumbs}
        title={guide.title}
        lead={lead}
        meta={`Diperbarui ${formatDate(guide.modified)}`}
      />
      <Article>
        <Image
          src={guide.image}
          alt={guide.imageAlt}
          width={1280}
          height={860}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="aspect-[3/2] w-full rounded-[1.75rem] object-cover"
        />
        {children}
        <PageCta currentSlug={slug} />
      </Article>
    </PageShell>
  );
}
