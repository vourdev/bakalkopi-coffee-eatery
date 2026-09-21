"use client";

import { useState } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { SectionHeading } from "@/components/section-heading";
import AnimatedContent from "@/components/reactbits/animated-content";
import { TornEdge } from "@/components/torn-edge";

const MENU_DATA = {
  nusantara: {
    label: "Nusantara",
    items: [
      { name: "Nasi Bakar Ayam Jamur", price: "36", desc: "Ayam, jamur, dan telur suwir dalam nasi gurih, dibungkus daun pisang lalu dibakar, termasuk kerupuk", tag: "Andalan" },
      { name: "Nasi Bakar Cumi", price: "40", desc: "Cumi pedas dan telur suwir dalam nasi gurih, dibungkus daun pisang lalu dibakar", tag: null },
      { name: "Nasi Bakar Ikan Asap", price: "42", desc: "Ikan asap pedas dan telur suwir dengan nasi gurih yang dibakar", tag: null },
      { name: "Nasi Timbel", price: "42", desc: "Nasi putih, ayam rempah, tahu, tempe, sayur asam, sambal, dan lalapan", tag: "Warisan" },
      { name: "Nasi Bakal Mangga", price: "45", desc: "Nasi putih, ayam goreng sambal mangga, tahu, tempe, dan karedok", tag: null },
      { name: "Rawon", price: "55", desc: "Iga dan daging sapi berkuah rawon, nasi putih, sambal, dan kerupuk", tag: "Andalan" },
      { name: "Soto Ayam Surabaya", price: "40", desc: "Ayam suwir, soun, kol, telur, keripik kentang, dan koya dengan nasi putih", tag: null },
      { name: "Garang Asem", price: "55", desc: "Iga dan daging sapi berkuah garang asem, nasi putih, sambal, dan kerupuk", tag: null },
      { name: "Pecak Ikan Nila", price: "47", desc: "Ikan nila merah dengan sambal pecak khas BAKALKOPI, termasuk nasi putih", tag: null },
    ],
  },
  kopi: {
    label: "Kopi",
    items: [
      { name: "Es Bakalkopi", price: "29", desc: "Racikan espresso rumahan, susu segar dingin, dan gula aren organik", tag: "Favorit" },
      { name: "Latte", price: "29", desc: "Espresso klasik dengan susu segar yang di-steam", tag: null },
      { name: "Cappucino", price: "30", desc: "Espresso pekat dengan busa susu tebal", tag: null },
      { name: "Vanilla Latte", price: "32", desc: "Espresso, susu steam, dan vanila premium", tag: null },
      { name: "Caramel Macchiato", price: "35", desc: "Espresso berlapis, susu steam, siraman karamel", tag: null },
      { name: "Dirty Matcha", price: "35", desc: "Matcha premium dengan satu shot espresso", tag: "Favorit" },
      { name: "Kori-Kohi", price: "35", desc: "Espresso beku ala Jepang", tag: null },
      { name: "Affogato", price: "30", desc: "Espresso panas dituang di atas es krim", tag: null },
      { name: "Mochacino", price: "38", desc: "Espresso, cokelat, dan susu steam", tag: null },
      { name: "Americano", price: "22", desc: "Double shot espresso dengan air", tag: null },
      { name: "V60 Manual Brew", price: "33", desc: "Single origin, seduh tuang manual per cangkir", tag: "Spesial" },
    ],
  },
  pasta: {
    label: "Pasta & Nasi",
    items: [
      { name: "Spaghetti Alfredo", price: "41", desc: "Saus alfredo krim dengan pasta al dente", tag: null },
      { name: "Spaghetti Aglio Fish Bakal", price: "41", desc: "Pasta minyak bawang dengan ikan segar", tag: "Andalan" },
      { name: "Spaghetti Katsu Matah", price: "44", desc: "Ayam katsu, sambal matah, dan pasta", tag: null },
      { name: "Nasi Goreng Smokey", price: "40", desc: "Nasi goreng smokey dengan bumbu rempah", tag: null },
      { name: "Nasi Goreng Petei", price: "42", desc: "Nasi goreng dengan petai", tag: null },
      { name: "Nasi Banteng", price: "42", desc: "Nasi campur andalan yang mengenyangkan", tag: null },
    ],
  },
  ricebowl: {
    label: "Ricebowl & Katsu",
    items: [
      { name: "Chicken Katsu", price: "45", desc: "Fillet ayam berbalut panko, renyah di luar", tag: "Favorit" },
      { name: "Chicken Curry", price: "36", desc: "Ayam empuk dalam saus kari beraroma", tag: null },
      { name: "Fish Bakal", price: "42", desc: "Fillet ikan segar dengan saus andalan", tag: null },
      { name: "Chicken Matah", price: "45", desc: "Ayam panggang dengan sambal matah", tag: null },
      { name: "Chicken Mushroom", price: "36", desc: "Ayam dengan saus jamur gurih", tag: null },
      { name: "Blackpepper Chicken", price: "40", desc: "Ayam dengan saus lada hitam pekat", tag: null },
    ],
  },
  nonkopi: {
    label: "Non-Kopi",
    items: [
      { name: "Dark Chocolate", price: "30", desc: "Cokelat hitam pekat dan lembut", tag: null },
      { name: "Matcha Latte", price: "27", desc: "Matcha Jepang premium dengan susu segar", tag: "Favorit" },
      { name: "Taro Latte", price: "26", desc: "Talas lembut dengan susu steam", tag: null },
      { name: "Red Velvet", price: "24", desc: "Minuman susu red velvet", tag: null },
      { name: "Mango Yoghurt", price: "31", desc: "Mangga segar diblender dengan yoghurt", tag: null },
      { name: "Strawberry Yoghurt", price: "31", desc: "Perpaduan stroberi dan yoghurt", tag: null },
      { name: "Berry Banana Burst", price: "32", desc: "Frappe beri campur pisang", tag: null },
      { name: "Chochip Frappe", price: "38", desc: "Es blend cokelat chip", tag: null },
      { name: "Premium Jasmine Tea", price: "34", desc: "Teh melati wangi, panas atau dingin", tag: null },
      { name: "Lychee Tea", price: "31", desc: "Teh leci yang menyegarkan", tag: null },
    ],
  },
  camilan: {
    label: "Camilan",
    items: [
      { name: "Chicken Spring Roll", price: "31", desc: "Lumpia goreng isi ayam, renyah", tag: null },
      { name: "Gyoza Chicken", price: "31", desc: "Pangsit Jepang panggang wajan", tag: null },
      { name: "Katsu Bites", price: "31", desc: "Potongan katsu renyah seukuran gigitan", tag: "Favorit" },
      { name: "French Fries", price: "25", desc: "Kentang goreng renyah keemasan", tag: null },
      { name: "Snack Platter", price: "50", desc: "Aneka camilan untuk berbagi", tag: null },
      { name: "Sandwich Platter", price: "50", desc: "Aneka sandwich untuk berbagi", tag: null },
      { name: "Choco Brownie", price: "28", desc: "Brownies cokelat pekat", tag: null },
      { name: "Mini Burger", price: "28", desc: "Burger mini dengan saus spesial", tag: null },
    ],
  },
};

export function Menu() {
  const [activeTab, setActiveTab] = useState("nusantara");

  return (
    <section id="menu" className="bg-cream pt-20 text-charcoal md:pt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          eyebrow="Daftar Menu"
          title="Masakan yang membuat kembali"
          script="Dapur buka sampai malam"
          description="Harga dalam ribuan rupiah dan belum termasuk PB1. Semua bahan segar dan halal."
        />

        {/* Primitive Base UI dipakai langsung, bukan pembungkus shadcn:
            varian "line" pada pembungkus itu memaksa data-active:bg-transparent
            sehingga pil aktif tidak pernah terisi. */}
        <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as string)} className="mt-14 w-full">
          <Tabs.List className="custom-scroll mb-10 flex w-full justify-start gap-2.5 overflow-x-auto pb-2">
            {Object.entries(MENU_DATA).map(([key, category]) => (
              <Tabs.Tab
                key={key}
                value={key}
                className="text-label-caps shrink-0 cursor-pointer rounded-full border border-taupe bg-cream-light px-5 py-3 text-[9.5px] whitespace-nowrap text-charcoal/60 transition-colors duration-200 outline-none select-none hover:border-charcoal/40 hover:text-charcoal focus-visible:ring-2 focus-visible:ring-gold/60 data-active:border-charcoal data-active:bg-charcoal data-active:text-cream-light"
              >
                {category.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {Object.entries(MENU_DATA).map(([key, category]) => (
            <Tabs.Panel key={key} value={key}>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, i) => (
                  <li key={item.name} className="h-full">
                    <AnimatedContent
                      delay={Math.min(i, 6) * 0.05}
                      distance={22}
                      duration={0.5}
                      className="h-full"
                    >
                      <article className="group flex h-full flex-col justify-between rounded-2xl border border-taupe/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_12px_32px_-12px_rgba(35,28,24,0.18)]">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-serif-md text-charcoal transition-colors group-hover:text-coffee">
                              {item.name}
                            </h3>
                            <span className="text-price-tag tabular shrink-0 text-gold">
                              {item.price}k
                            </span>
                          </div>
                          <p className="text-body-sm mt-2 text-charcoal/45">{item.desc}</p>
                        </div>

                        {item.tag && (
                          <p className="mt-4 border-t border-taupe/40 pt-3">
                            <span className="text-label-caps rounded-md bg-gold/10 px-2.5 py-1 text-[8.5px] text-gold">
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

      <TornEdge color="#231c18" className="mt-20 md:mt-28" />
    </section>
  );
}
