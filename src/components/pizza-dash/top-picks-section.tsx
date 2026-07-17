"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { PIZZAS, SIZE_LABELS, type PizzaSize } from "@/lib/pizza-data";
import { useCartStore } from "@/store/cart";

const topPicks = PIZZAS.filter((p) =>
  ["pepperoni-passion", "margherita-supreme", "hawaiian-crown", "meat-feast"].includes(p.id)
);

const toppingMap: Record<string, React.ReactNode> = {
  "pepperoni-passion": (
    <g fill="#c6362b">
      {[[50, 48, 10], [90, 45, 9], [70, 72, 10], [48, 88, 9], [92, 90, 9]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} />
      ))}
    </g>
  ),
  "margherita-supreme": (
    <g fill="#3f5a38">
      {[[55, 55, 8, 4, 30], [88, 70, 8, 4, -20], [60, 90, 7, 4, 50]].map(([cx, cy, rx, ry, rot], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} />
      ))}
    </g>
  ),
  "hawaiian-crown": (
    <>
      <g fill="#f3d34a">
        {[[55, 45, 8], [92, 70, 7]].map(([cx, cy, r], i) => (
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
      <g fill="#7a1a12">
        <circle cx="95" cy="90" r="6" />
      </g>
    </>
  ),
};

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
      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-[#fdf6e6] to-[#f3e6c8] p-4 transition-transform group-hover:scale-[1.03]">
        <svg viewBox="0 0 140 140" className="h-full w-full">
          <defs>
            <radialGradient id="tpDough" cx="42%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f7dfa0" />
              <stop offset="70%" stopColor="#e8b95f" />
              <stop offset="100%" stopColor="#c98a3a" />
            </radialGradient>
            <radialGradient id="tpCheese" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffe08a" />
              <stop offset="100%" stopColor="#f3b73f" />
            </radialGradient>
            <radialGradient id="tpSauce" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#e0523f" />
              <stop offset="100%" stopColor="#a8281e" />
            </radialGradient>
          </defs>
          <circle cx="70" cy="70" r="66" fill="url(#tpDough)" />
          <circle cx="70" cy="70" r="56" fill="url(#tpSauce)" />
          <circle cx="70" cy="70" r="50" fill="url(#tpCheese)" />
          {toppingMap[pizza.id]}
        </svg>
      </div>
      <div className="p-4">
        <h4 className="mb-1 font-bold text-ink" style={{ fontFamily: "Anton, sans-serif", fontSize: "1.05rem" }}>
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