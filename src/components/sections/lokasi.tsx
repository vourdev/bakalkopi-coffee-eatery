import Image from "next/image";
import Link from "next/link";
import { Clock, Info, MapPin, Navigation, Phone } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";
import { ADDRESS_LINE, HOURS_LINE, SITE, WA_RESERVASI } from "@/lib/site";

export function Lokasi() {
  return (
    <section
      id="lokasi"
      className="relative overflow-hidden bg-charcoal py-20 text-cream-light md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-coffee/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          tone="dark"
          eyebrow="Kunjungi & Reservasi"
          title="Mampir. Duduk lama."
          script="Mejamu sudah menunggu"
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Kiri — keterangan praktis */}
          <div className="lg:col-span-6">
            <AnimatedContent distance={26}>
              <div className="flex items-start gap-3 border-b border-cream-light/12 pb-7">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                <div>
                  <h3 className="text-label-caps text-cream-light">Alamat</h3>
                  <address className="text-body-md mt-2 max-w-sm text-taupe/85 not-italic">
                    {ADDRESS_LINE}
                  </address>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid grid-cols-1 gap-7 border-b border-cream-light/12 py-7 sm:grid-cols-2">
              <AnimatedContent delay={0.08} distance={24}>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                  <div>
                    <h3 className="text-label-caps text-cream-light">
                      Jam Buka
                    </h3>
                    <p className="text-body-md mt-2 text-taupe/85">{SITE.hours.label}</p>
                    <p className="text-headline-sm tabular mt-1 text-gold">{HOURS_LINE}</p>
                    <span className="text-label-caps mt-3 inline-flex items-center gap-2 rounded-full border border-gold/35 px-3 py-1.5 text-gold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Buka setiap hari
                    </span>
                  </div>
                </div>
              </AnimatedContent>

              <AnimatedContent delay={0.16} distance={24}>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                  <div>
                    <h3 className="text-label-caps text-cream-light">
                      Reservasi &amp; Pesanan
                    </h3>
                    <p className="text-body-md mt-2 text-taupe/85">WhatsApp</p>
                    <Link
                      href={WA_RESERVASI}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-headline-sm tabular mt-1 block text-gold hover:underline"
                    >
                      {SITE.contact.whatsappDisplay}
                    </Link>
                    <Link
                      href={SITE.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-sm mt-2 inline-block text-taupe/65 hover:text-cream-light"
                    >
                      Instagram @{SITE.contact.instagram}
                    </Link>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            <AnimatedContent delay={0.2} distance={22}>
              <div className="mt-7 rounded-xl border border-cream-light/12 bg-charcoal-light p-5">
                <h3 className="text-label-caps flex items-center gap-2 text-gold">
                  <Info className="h-4 w-4" strokeWidth={1.25} />
                  Aturan Rumah
                </h3>
                <p className="text-body-sm mt-3 text-taupe/65">
                  Makanan dan minuman 100% halal. Dilarang membawa makanan atau
                  minuman dari luar. Area ramah keluarga, dan ruang ber-AC bebas
                  asap rokok.
                </p>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.26} distance={22}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={WA_RESERVASI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-caps inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-charcoal transition-colors duration-300 hover:bg-gold-light active:scale-95"
                >
                  Reservasi via WhatsApp
                </Link>
                <Link
                  href={SITE.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-caps group inline-flex items-center justify-center gap-2.5 rounded-full border border-cream-light/25 px-8 py-4 text-cream-light transition-colors duration-300 hover:bg-cream-light/10 active:scale-95"
                >
                  Petunjuk Arah
                  <Navigation
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </AnimatedContent>
          </div>

          {/* Kanan — peta dan foto ruang */}
          <AnimatedContent className="lg:col-span-6" delay={0.15} distance={34}>
            <div className="overflow-hidden rounded-[1.75rem] border border-gold/25 shadow-2xl">
              <iframe
                src={SITE.maps.embed}
                title={`Peta lokasi ${SITE.name} di ${SITE.address.district}, ${SITE.address.city}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block h-[280px] w-full border-0 md:h-[320px]"
              />
            </div>

            <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-gold/20 shadow-2xl">
              <Image
                src="/images/room-3.jpg"
                alt="Teras terbuka BAKALKOPI pada siang hari dengan meja bundar dan tanaman hijau"
                width={1280}
                height={860}
                sizes="(min-width: 1024px) 38rem, 100vw"
                className="h-[240px] w-full object-cover md:h-[280px]"
              />
              {/* Foto teras siang hari terang; tirai perlu pekat sampai
                  setengah tinggi agar keterangan tetap terbaca. */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-label-caps text-gold">Ruang Bersama</p>
                <p className="text-serif-md mt-1.5 text-cream-light">
                  Parkiran luas, Wi-Fi kencang, dan sambutan yang hangat.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
