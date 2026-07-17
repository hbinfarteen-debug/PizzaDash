"use client";

import { motion } from "framer-motion";
import { FAQS } from "@/lib/pizza-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section id="faq" className="bg-semolina py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center lg:mb-14"
        >
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[3px] text-tomato-dark">
            Got Questions?
          </span>
          <h2
            className="text-ink"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
            }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-crust/12 bg-cream px-5 shadow-sm data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left text-base font-bold text-ink hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-text">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}