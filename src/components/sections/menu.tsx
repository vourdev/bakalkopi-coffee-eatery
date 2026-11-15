"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs } from "@base-ui/react/tabs";
import { SectionHeading } from "@/components/section-heading";
import AnimatedContent from "@/components/reactbits/animated-content";
import { TornEdge } from "@/components/torn-edge";
import { MENU_DATA } from "@/lib/menu";

export function Menu() {
  const [activeTab, setActiveTab] = useState("nusantara");

  return (
    <section id="menu" className="bg-cream pt-16 text-charcoal md:pt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Daftar Menu"
          title="Masakan yang membuat kembali"
          script="Dapur buka sampai malam"
          description="Harga dalam ribuan rupiah dan belum termasuk PB1."
        />

        {/* Base UI langsung: varian "line" shadcn memaksa bg-transparent pada tab aktif. */}
        <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as string)} className="mt-12 w-full md:mt-14">
          <Tabs.List className="custom-scroll mb-10 flex w-full justify-start gap-2.5 overflow-x-auto pb-2">
            {Object.entries(MENU_DATA).map(([key, category]) => (
              <Tabs.Tab
                key={key}
                value={key}
                /* Hover hanya untuk tab non-aktif, agar label tab aktif tidak hilang. */
                className="text-label-caps shrink-0 cursor-pointer rounded-full border border-taupe bg-cream-light px-5 py-3.5 whitespace-nowrap text-charcoal/70 transition-colors duration-200 outline-none select-none hover:not-data-active:border-charcoal/40 hover:not-data-active:text-charcoal focus-visible:ring-2 focus-visible:ring-gold/60 data-active:border-charcoal data-active:bg-charcoal data-active:text-cream-light data-active:hover:border-coffee data-active:hover:bg-coffee"
              >
                {category.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {Object.entries(MENU_DATA).map(([key, category]) => (
            // keepMounted: semua golongan ikut di HTML awal agar terbaca mesin pencari.
            <Tabs.Panel key={key} value={key} keepMounted>
              {/* Foto sampul mewakili golongan masakan, bukan satu hidangan tertentu. */}
              <AnimatedContent distance={24} duration={0.6}>
                <div className="mb-9 flex items-center gap-5 border-b border-taupe pb-8 sm:gap-7">
                  {category.cover && (
                    <Image
                      src={category.cover.src}
                      alt={category.cover.alt}
                      width={480}
                      height={480}
                      sizes="9rem"
                      className="aspect-square w-24 shrink-0 rounded-2xl object-cover sm:w-32 lg:w-36"
                    />
                  )}
                  <div>
                    <p className="text-label-caps text-gold-deep">
                      Dari dapur · {category.label}
                    </p>
                    <p className="text-body-md mt-2 max-w-md text-charcoal/70">
                      {category.note}
                    </p>
                  </div>
                </div>
              </AnimatedContent>

              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, i) => (
                  <li key={item.name} className="h-full">
                    <AnimatedContent
                      delay={Math.min(i, 6) * 0.05}
                      distance={22}
                      duration={0.5}
                      className="h-full"
                    >
                      <article className="flex h-full flex-col justify-between rounded-2xl border border-taupe/70 bg-white p-5">
                        <div className="flex items-start gap-4">
                          {item.photo && (
                            <Image
                              src={item.photo.src}
                              alt={item.photo.alt}
                              width={160}
                              height={160}
                              sizes="5rem"
                              className="aspect-square w-18 shrink-0 rounded-xl object-cover sm:w-20"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-serif-md text-charcoal">
                                {item.name}
                              </h3>
                              <span className="text-price-tag tabular shrink-0 text-gold-deep">
                                {item.price}k
                              </span>
                            </div>
                            <p className="text-body-sm mt-2 text-charcoal/70">{item.desc}</p>
                          </div>
                        </div>

                        {item.tag && (
                          <p className="mt-4 border-t border-taupe/40 pt-3">
                            <span className="text-label-caps rounded-md bg-gold/10 px-2.5 py-1 text-gold-deep">
                              {item.tag}
                            </span>
                          </p>
                        )}
                      </article>
                    </AnimatedContent>
                  </li>
                ))}
              </ul>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>

      <TornEdge color="#231c18" className="mt-16 md:mt-28" />
    </section>
  );
}
