import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Story } from "@/components/sections/story";
import { Favorites } from "@/components/sections/favorites";
import { Menu } from "@/components/sections/menu";
import { Experience } from "@/components/sections/experience";
import { Moments } from "@/components/sections/moments";
import { Gallery } from "@/components/sections/gallery";
import { Amenities } from "@/components/sections/amenities";
import { Lokasi } from "@/components/sections/lokasi";
import { Footer } from "@/components/footer";

// Canonical di sini, bukan di layout, agar tidak diwarisi halaman lain.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar tone="light" />
      <main className="flex-1">
        {/* Terang, ditutup gelombang gelap */}
        <Hero />
        {/* Gelap */}
        <Features />
        {/* Terang */}
        <Story />
        <Favorites />
        <Menu />
        {/* Gelap */}
        <Experience />
        {/* Terang */}
        <Moments />
        <Gallery />
        <Amenities />
        {/* Gelap sampai kaki halaman */}
        <Lokasi />
      </main>
      <Footer />
    </div>
  );
}
