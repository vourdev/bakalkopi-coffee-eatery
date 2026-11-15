import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// @id tetap agar node JSON-LD di tiap halaman merujuk entitas yang sama.
export const ORG_ID = `${SITE.url}/#organization`;
export const BUSINESS_ID = `${SITE.url}/#business`;
export const WEBSITE_ID = `${SITE.url}/#website`;

// Gambar file-based di app/ hilang begitu halaman anak mengisi openGraph, jadi dipasang ulang.
const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Fasad BAKALKOPI di Cimanggis, Depok pada malam hari dengan papan nama menyala",
};

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE.url : `${SITE.url}${path}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** Tanggal ISO, hanya untuk type "article". */
  modifiedTime?: string;
}

// openGraph anak menimpa milik layout seluruhnya, jadi semua field diisi ulang di sini.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  modifiedTime,
}: PageMetaInput): Metadata {
  // Judul yang sudah memuat nama merek tidak diberi akhiran " · BAKALKOPI" lagi.
  const hasBrand = title.includes(SITE.name);
  const fullTitle = hasBrand ? title : `${title} · ${SITE.name}`;
  return {
    title: hasBrand ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "id_ID",
      url: absoluteUrl(path),
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
      ...(type === "article" && modifiedTime
        ? { modifiedTime, authors: [SITE.legalName] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

interface ArticleInput {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
  image: string;
}

export function articleJsonLd({
  title,
  description,
  path,
  published,
  modified,
  image,
}: ArticleInput) {
  return {
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "id-ID",
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(image),
    datePublished: published,
    dateModified: modified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@id": BUSINESS_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
