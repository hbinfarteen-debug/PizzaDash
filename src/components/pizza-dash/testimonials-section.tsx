"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/pizza-data";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-char bg-crumb py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[3px] text-cheese">
            What Bulawayo Says
          </span>
          <h2
            className="text-cream"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
            }}
          >
            Loved by Pizza People
          </h2>
        </motion.div>

        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 p-2 text-cream backdrop-blur-sm transition-colors hover:bg-cream/20 lg:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 p-2 text-cream backdrop-blur-sm transition-colors hover:bg-cream/20 lg:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Cards scroll container */}
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-5 overflow-x-auto pb-4"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-[320px] flex-shrink-0 rounded-2xl border border-white/8 bg-char-2 p-6 shadow-xl"
              >
                {/* Stars */}
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-cheese text-cheese"
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-cream/70">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-bold text-cream">{t.name}</div>
                  <div className="text-xs text-cream/40">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}