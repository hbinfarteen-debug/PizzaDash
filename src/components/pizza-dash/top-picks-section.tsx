"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import Image from "next/image";
import { PIZZAS, type PizzaSize } from "@/lib/pizza-data";
import { useCartStore } from "@/store/cart";

const topPicks = PIZZAS.filter((p) =>
  ["pepperoni-passion", "margherita-supreme", "hawaiian-crown", "meat-feast"].includes(p.id)
);

function PickCard({ pizza, index }: { pizza: (typeof topPicks)[0]; index: number }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (size: PizzaSize) => {
    addItem(pizza, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-crust/12 bg-cream shadow-lg shadow-ink/5 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/10"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={pizza.image}
          alt={`${pizza.name} pizza`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/20 to-transparent" />
      </div>
      <div className="p-4">
        <h4
          className="mb-1 font-bold text-ink"
          style={{ fontFamily: "Anton, sans-serif", fontSize: "1.05rem" }}
        >
          {pizza.name}
        </h4>
        <div className="mb-3 text-sm font-extrabold text-tomato-dark">
          ${pizza.prices.small} / ${pizza.prices.medium} / ${pizza.prices.large}
        </div>
        <button
          onClick={() => handleAdd("medium")}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
            added
              ? "bg-basil text-cream"
              : "bg-ink text-cream hover:bg-tomato-dark"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added!
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Order
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function TopPicksSection() {
  return (
    <section className="bg-semolina-2 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center lg:mb-14"
        >
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[3px] text-tomato-dark">
            Quick Add
          </span>
          <h2
            className="text-ink"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
            }}
          >
            Tonight&apos;s Top Picks
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base font-medium leading-relaxed text-muted-text">
            The four Bulawayo can&apos;t stop ordering — tap to add and we&apos;ll take it from there.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topPicks.map((pizza, i) => (
            <PickCard key={pizza.id} pizza={pizza} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}