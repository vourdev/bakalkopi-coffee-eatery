import Image from "next/image";
import Link from "next/link";
import { Clock, Info, MapPin, Phone } from "lucide-react";
import AnimatedContent from "@/components/reactbits/animated-content";
import { SectionHeading } from "@/components/section-heading";
import { FillButton } from "@/components/ui/fill-button";
import { ADDRESS_LINE, HOURS_LINE, SITE, WA_RESERVASI } from "@/lib/site";

export function Lokasi() {
  return (
    <section
      id="lokasi"
      className="bg-charcoal py-16 text-cream-light md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          tone="dark"
          align="left"
          eyebrow="Kunjungi & Reservasi"
          title="Mampir. Duduk lama."
          script="Mejamu sudah menunggu"
        />

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:gap-14">
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
                    <p className="text-label-caps mt-3 text-gold-light">Buka setiap hari</p>
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
                      className="text-headline-sm tabular mt-1 inline-flex min-h-11 items-center text-gold underline-offset-4 hover:underline active:opacity-70"
                    >
                      {SITE.contact.whatsappDisplay}
                    </Link>
                    <Link
                      href={SITE.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-sm inline-flex min-h-11 items-center text-taupe/70 hover:text-cream-light active:opacity-70"
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
                <p className="text-body-sm mt-3 text-taupe/70">
                  Makanan dan minuman 100% halal. Dilarang membawa makanan atau
                  minuman dari luar. Area ramah keluarga, dan ruang ber-AC bebas
                  asap rokok.
                </p>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.26} distance={22}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <FillButton
                  href={WA_RESERVASI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-caps rounded-md bg-gold px-8 py-4 text-charcoal active:scale-95"
                  fillClassName="bg-cream-light text-charcoal"
                >
                  Pesan Meja
                </FillButton>
                <FillButton
                  href={SITE.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label-caps rounded-md border border-cream-light/25 px-8 py-4 text-cream-light active:scale-95"
                  fillClassName="bg-cream-light text-charcoal"
                >
                  Petunjuk Arah
                </FillButton>
              </div>
            </AnimatedContent>
          </div>

          <AnimatedContent className="lg:col-span-6" delay={0.15} distance={34}>
            <div className="overflow-hidden rounded-[1.75rem] border border-gold/25">
              <iframe
                src={SITE.maps.embed}
                title={`Peta lokasi ${SITE.name} di ${SITE.address.district}, ${SITE.address.city}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block h-[280px] w-full border-0 md:h-[320px]"
              />
            </div>

            <div className="relative mt-5 overflow-hidden rounded-[1.75rem] border border-gold/20">
              <Image
                src="/images/room-3.jpg"
                alt="Teras terbuka BAKALKOPI pada siang hari dengan meja bundar dan tanaman hijau"
                width={1280}
                height={860}
                sizes="(min-width: 1024px) 38rem, 100vw"
                className="h-[240px] w-full object-cover md:h-[280px]"
              />
              {/* Foto siang terang: tirai pekat sampai tengah agar keterangan terbaca. */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
              <div className="absolute inset-x-5 bottom-5">
                <p className="text-label-caps text-gold">Teras Terbuka</p>
                <p className="text-serif-md mt-1.5 text-cream-light">
                  Meja bundar di antara tanaman hijau.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
