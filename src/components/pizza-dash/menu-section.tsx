"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { PIZZAS, SIZE_LABELS, type PizzaSize, type PizzaItem } from "@/lib/pizza-data";
import { useCartStore } from "@/store/cart";

function MiniPizzaSVG({ type }: { type: PizzaItem["toppingType"] }) {
  const toppings: Record<string, React.ReactNode> = {
    pepperoni: (
      <g fill="#c6362b">
        {[[50, 48, 10], [90, 45, 9], [70, 72, 10], [48, 88, 9], [92, 90, 9]].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    ),
    margherita: (
      <>
        <g fill="#3f5a38">
          {[[55, 55, 8, 4, 30], [88, 70, 8, 4, -20], [60, 90, 7, 4, 50]].map(
            ([cx, cy, rx, ry, rot], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} />
            )
          )}
        </g>
        <g fill="#fff" opacity="0.5">
          <circle cx="70" cy="50" r="6" />
          <circle cx="95" cy="95" r="5" />
          <circle cx="45" cy="80" r="5" />
        </g>
      </>
    ),
    "bbq-chicken": (
      <>
        <circle cx="70" cy="70" r="50" fill="#8b4a1f" />
        <circle cx="70" cy="70" r="50" fill="url(#cheeseG)" opacity="0.9" />
        <g fill="#c9873f">
          {[[55, 50, 11, 7], [90, 55, 10, 7], [65, 85, 12, 7], [95, 90, 9, 6]].map(
            ([cx, cy, rx, ry], i) => (
              <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />
            )
          )}
        </g>
      </>
    ),
    veggie: (
      <>
        <g fill="#c6362b">
          <circle cx="55" cy="50" r="6" />
          <circle cx="90" cy="55" r="6" />
        </g>
        <g fill="#3f5a38">
          <ellipse cx="70" cy="45" rx="6" ry="9" />
          <ellipse cx="95" cy="85" rx="6" ry="9" />
        </g>
        <g fill="#e8b95f">
          <ellipse cx="50" cy="90" rx="9" ry="6" />
        </g>
        <g fill="#7a1a12">
          <circle cx="60" cy="70" r="4" />
          <circle cx="80" cy="95" r="4" />
        </g>
      </>
    ),
    hawaiian: (
      <>
        <g fill="#f3d34a">
          {[[55, 45, 8], [92, 70, 7], [60, 92, 7]].map(([cx, cy, r], i) => (
            <circle key={`p${i}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <g fill="#c98a3a">
          <rect x="70" y="50" width="16" height="10" rx="3" />
          <rect x="40" y="80" width="16" height="10" rx="3" />
        </g>
      </>
    ),
    "meat-feast": (
      <>
        <g fill="#c6362b">
          <circle cx="52" cy="55" r="8" />
          <circle cx="90" cy="50" r="8" />
        </g>
        <g fill="#8b4a1f">
          <ellipse cx="72" cy="75" rx="9" ry="6" />
        </g>
        <g fill="#c98a3a">
          <rect x="45" y="85" width="14" height="9" rx="3" />
        </g>
        <g fill="#7a1a12">
          <circle cx="95" cy="90" r="6" />
        </g>
      </>
    ),
  };

  return (
    <svg viewBox="0 0 140 140" className="h-full w-full">
      <defs>
        <radialGradient id="doughG" cx="42%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f7dfa0" />
          <stop offset="70%" stopColor="#e8b95f" />
          <stop offset="100%" stopColor="#c98a3a" />
        </radialGradient>
        <radialGradient id="cheeseG" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#f3b73f" />
        </radialGradient>
        <radialGradient id="sauceG" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e0523f" />
          <stop offset="100%" stopColor="#a8281e" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="70" r="66" fill="url(#doughG)" />
      <circle cx="70" cy="70" r="56" fill="url(#sauceG)" />
      <circle cx="70" cy="70" r="50" fill="url(#cheeseG)" />
      {toppings[type]}
    </svg>
  );
}

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
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(pizza, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-crust/12 bg-cream p-6 shadow-lg shadow-ink/5 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-ink/10"
    >
      {pizza.isBestSeller && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-tomato px-3 py-1 text-xs font-bold text-cream shadow-md">
          #1 Seller
        </div>
      )}

      <div className="mx-auto mb-4 h-32 w-32 transition-transform group-hover:scale-105">
        <MiniPizzaSVG type={pizza.toppingType} />
      </div>

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
        onClick={handleAdd}
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
    </motion.div>
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
            Every base is proofed for 24 hours and every pie goes into the oven the moment you order — never
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