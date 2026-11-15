import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description?: ReactNode;
  items: FaqItem[];
  /** id untuk aria-labelledby dan tautan langsung ke bagian ini. */
  id?: string;
  className?: string;
}

const Faq3 = ({ heading, description, items, id = "faq", className = "" }: Faq3Props) => {
  return (
    <section aria-labelledby={id} className={className}>
      <div className="flex max-w-3xl flex-col">
        <h2 id={id} className="text-headline-sm text-charcoal">
          {heading}
        </h2>
        {description && <p className="text-body-lg mt-3 text-charcoal/70">{description}</p>}
      </div>
      {/* hiddenUntilFound: jawaban tetap ada di HTML dan bisa ditemukan lewat Ctrl+F. */}
      <Accordion hiddenUntilFound className="mt-8 w-full border-t border-taupe">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-b border-taupe">
            <AccordionTrigger className="min-h-11 items-center gap-4 rounded-none py-4 transition-opacity duration-200 hover:no-underline hover:opacity-70 focus-visible:ring-gold/60 **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-gold-deep">
              <span className="text-serif-md text-charcoal">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-5">
              <p className="text-body-lg max-w-2xl text-charcoal/75">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export { Faq3 };
