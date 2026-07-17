"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { NAV_LINKS, WHATSAPP_LINK } from "@/lib/pizza-data";
import { useCartStore } from "@/store/cart";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const setOpen = useCartStore((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-char/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-char/80 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-1">
            <span
              className="font-[Anton] text-2xl tracking-wide text-cream"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              PIZZA
            </span>
            <span
              className="font-[Anton] text-2xl tracking-wide text-cheese"
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              DASH
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-semibold tracking-wide text-cream/75 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-lg bg-cheese px-4 py-2.5 text-sm font-extrabold text-char shadow-md shadow-cheese/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cheese/45"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-tomato text-xs font-bold text-cream"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* WhatsApp CTA - desktop */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-whatsapp/40 md:inline-flex"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1-.7 1-.9 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.7-1-2.3-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4A2.5 2.5 0 0 0 6 8.5c0 1.4 1 2.8 1.2 3s2 3 4.8 4.2c2.9 1.2 2.9.8 3.4.8s1.7-.7 1.9-1.4.2-1.2.2-1.4-.2-.2-.5-.3z"
                  fill="currentColor"
                />
                <path
                  d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"
                  fill="currentColor"
                />
              </svg>
              Order Now
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-cream md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[68px] z-40 bg-char/98 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 px-6 pt-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-bold tracking-wide text-cream transition-colors hover:text-cheese"
                  style={{ fontFamily: "Anton, sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 rounded-xl bg-whatsapp px-8 py-3.5 text-base font-extrabold text-white shadow-lg"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.1-.7 1-.9 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.7-1-2.3-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4A2.5 2.5 0 0 0 6 8.5c0 1.4 1 2.8 1.2 3s2 3 4.8 4.2c2.9 1.2 2.9.8 3.4.8s1.7-.7 1.9-1.4.2-1.2.2-1.4-.2-.2-.5-.3z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"
                    fill="currentColor"
                  />
                </svg>
                Order on WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}