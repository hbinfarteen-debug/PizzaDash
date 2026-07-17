"use client";

import { motion } from "framer-motion";
import { WHATSAPP_LINK, WHATSAPP_NUMBER, NAV_LINKS } from "@/lib/pizza-data";

export function Footer() {
  return (
    <footer className="bg-char bg-crumb">
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-16 lg:px-8 lg:pt-20">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3" style={{ fontFamily: "Anton, sans-serif" }}>
              <span className="text-2xl text-cream tracking-wide">PIZZA</span>
              <span className="text-2xl text-cheese tracking-wide">DASH</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-cream/65">
              Bulawayo&apos;s pizza-only kitchen. One product, done properly — hand-stretched dough,
              wood-fired every time.
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/6 text-cream/70 transition-colors hover:bg-tomato hover:text-cream"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.9.3-1.5 1.6-1.5H16.5V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10.5H7.5v3H10V21h3.5z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/6 text-cream/70 transition-colors hover:bg-tomato hover:text-cream"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={WHATSAPP_LINK}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/6 text-cream/70 transition-colors hover:bg-tomato hover:text-cream"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1-.7 1-.9 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.7-1-2.3-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4A2.5 2.5 0 0 0 6 8.5c0 1.4 1 2.8 1.2 3s2 3 4.8 4.2c2.9 1.2 2.9.8 3.4.8s1.7-.7 1.9-1.4.2-1.2.2-1.4-.2-.2-.5-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-[2px] text-cream">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/65 transition-colors hover:text-cheese"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-[2px] text-cream">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/65">
              <li>5 Pierse Rd, Parklands, Bulawayo</li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cheese"
                >
                  {WHATSAPP_NUMBER}
                </a>
              </li>
              <li>Open daily &middot; 10am – 9pm</li>
            </ul>
          </motion.div>

          {/* Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-[2px] text-cream">
              We Accept
            </h4>
            <div className="flex flex-wrap gap-2">
              {["EcoCash", "Visa", "Mastercard", "Cash"].map((method) => (
                <span
                  key={method}
                  className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-xs font-bold text-cream/70"
                >
                  {method}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/8 pt-5 text-xs text-cream/35">
          <span>&copy; 2026 Pizza Dash. All rights reserved.</span>
          <span>Bulawayo, Zimbabwe</span>
        </div>
      </div>
    </footer>
  );
}