"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from "@/lib/pizza-data";

const steps = [
  {
    num: "01",
    title: "Build Your Order",
    description:
      "Browse our six signature flavours, pick your size (10\", 12\", or 15\"), and add any custom toppings. Add as many pizzas as you like to your cart.",
  },
  {
    num: "02",
    title: "Checkout via WhatsApp",
    description:
      "Hit checkout and we'll open WhatsApp with your full order ready to send — no forms, no account creation. Just confirm your delivery address and hit send.",
  },
  {
    num: "03",
    title: "Pay & Track Your Dash",
    description:
      "Pay via EcoCash, Visa, Mastercard, or cash on delivery. We'll message you the moment your pizza leaves the oven so you know exactly when to expect it at the door.",
  },
];

export function HowToOrderSection() {
  return (
    <section id="how-to-order" className="bg-char bg-crumb py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[3px] text-cheese">
            Three steps, no app required
          </span>
          <h2
            className="text-cream"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
            }}
          >
            How to Order: Easy as One-Two-Pizza
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base font-medium leading-relaxed text-cream/60">
            No account, no app download. Message us, tell us what you&apos;re craving, and we&apos;ll dash it
            to your door.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl border border-white/6 bg-char-2 p-7 transition-all hover:border-white/12"
            >
              <div
                className="mb-3 text-5xl leading-none text-tomato/90"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                {step.num}
              </div>
              <h3
                className="mb-2 text-xl tracking-wide text-cream"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream/60">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/8 bg-gradient-to-br from-[#1f6b3e] to-[#184f2e] p-8 shadow-2xl sm:flex-row sm:items-center lg:p-12"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-whatsapp shadow-lg animate-pulse-glow">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3
                className="text-xl text-cream"
                style={{ fontFamily: "Anton, sans-serif" }}
              >
                Order directly on WhatsApp
              </h3>
              <div
                className="text-2xl text-cheese"
                style={{ fontFamily: "Anton, sans-serif", letterSpacing: "0.5px" }}
              >
                {WHATSAPP_NUMBER}
              </div>
              <div className="mt-0.5 text-sm font-semibold text-cream/60">
                Delivering across Bulawayo, daily 10am – 9pm
              </div>
            </div>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-shrink-0 items-center gap-2.5 rounded-xl bg-whatsapp px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-whatsapp/35 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-whatsapp/50"
          >
            <MessageCircle className="h-5 w-5" />
            Chat &amp; Order
          </a>
        </motion.div>
      </div>
    </section>
  );
}