"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import Image from "next/image";
import { PIZZAS, SIZE_LABELS, type PizzaSize, type PizzaItem } from "@/lib/pizza-data";
import { useCartStore } from "@/store/cart";
import { ToppingsModal } from "@/components/pizza-dash/toppings-modal";

const tagColors: Record<string, string> = {
  "Best seller": "bg-basil/10 text-basil",
  Classic: "bg-tomato-dark/10 text-tomato-dark",
  Smoky: "bg-crust/15 text-crust",
  "Garden fresh": "bg-basil/10 text-basil",
  "Sweet & savory": "bg-cheese/15 text-cheese-dark",
  "For carnivores": "bg-ink/10 text-ink",
};

function PizzaCard({ pizza, index }: { pizza: PizzaItem; index: number }) {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("medium");
  const [added, setAdded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleConfirm = (toppings: import("@/lib/pizza-data").Topping[]) => {
    addItem(pizza, selectedSize, toppings);
    setAdded(true);
    setModalOpen(false);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative overflow-hidden rounded-2xl border border-crust/12 bg-cream shadow-lg shadow-ink/5 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-ink/10"
      >
        {pizza.isBestSeller && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-tomato px-3 py-1 text-xs font-bold text-cream shadow-md">
            #1 Seller
          </div>
        )}

        {/* Pizza photo */}
        <div className="relative mx-auto mb-4 h-44 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={pizza.image}
            alt={`${pizza.name} pizza`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/30 to-transparent" />
        </div>

        <div className="px-6 pb-6">
          <h3
            className="mb-1 text-xl tracking-wide text-ink"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            {pizza.name}
          </h3>
          <p className="mb-3 text-sm font-semibold text-muted-text">{pizza.description}</p>

          {/* Size selector */}
          <div className="mb-4 flex items-center justify-center gap-2">
            {(["small", "medium", "large"] as PizzaSize[]).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedSize === size
                    ? "bg-ink text-cream shadow-md"
                    : "bg-semolina-2 text-muted-text hover:bg-semolina"
                }`}
              >
                {SIZE_LABELS[size]}
                <span className="ml-1 opacity-70">${pizza.prices[size]}</span>
              </button>
            ))}
          </div>

          {/* Add to cart */}
          <button
            onClick={() => setModalOpen(true)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
              added
                ? "bg-basil text-cream"
                : "bg-ink text-cream hover:bg-tomato-dark hover:shadow-lg hover:shadow-tomato-dark/30"
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

          {/* Tag */}
          <div className="mt-3 text-center">
            <span
              className={`inline-block rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                tagColors[pizza.tag] || "bg-semolina-2 text-muted-text"
              }`}
            >
              {pizza.tag}
            </span>
          </div>
        </div>
      </motion.div>

      <ToppingsModal
        pizza={pizza}
        size={selectedSize}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export function MenuSection() {
  return (
    <section id="menu" className="bg-semolina py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[3px] text-tomato-dark">
            Six flavors, one obsession
          </span>
          <h2
            className="text-ink"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
            }}
          >
            Fresh, Hot &amp; Made to Order
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base font-medium leading-relaxed text-muted-text">
            Every base is proofed for 24 hours and every pie goes into the oven the moment you order, never
            before. That&apos;s the whole menu strategy.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PIZZAS.map((pizza, i) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}