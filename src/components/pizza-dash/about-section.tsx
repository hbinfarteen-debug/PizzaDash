"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Wheat } from "lucide-react";

const values = [
  {
    icon: Wheat,
    title: "24-Hour Proofed Dough",
    description:
      "Every dough ball is cold-fermented for a full 24 hours. This slow process develops complex flavours and creates that perfect chewy, airy texture with a crispy exterior that our customers keep coming back for.",
  },
  {
    icon: Flame,
    title: "Wood-Fired at 450°C",
    description:
      "Our custom-built wood-fired oven hits 450°C, giving each pizza that authentic leopard-spotted crust in just 90 seconds. The intense heat locks in moisture while creating caramelised, smoky notes you simply can't replicate.",
  },
  {
    icon: Clock,
    title: "Zero Pre-Made Stock",
    description:
      "We don't make pizza until you order it. No warming trays, no pre-baked bases sitting under heat lamps. Your pizza goes from stretched dough to out of the oven to in your hands — that's the Pizza Dash promise.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-semolina-2 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Story text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-2 block text-xs font-extrabold uppercase tracking-[3px] text-tomato-dark">
              Our Story
            </span>
            <h2
              className="mb-4 text-ink"
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                lineHeight: 1.1,
              }}
            >
              One Pizza. Done Properly.
            </h2>
            <p className="mb-4 text-base leading-relaxed text-muted-text">
              Pizza Dash started with a simple belief: if you focus on doing one thing — pizza — and do it
              better than anyone else, people will notice. No burgers, no chicken wings, no sides. Just
              pizza. Fresh dough, quality toppings, wood-fired every single time.
            </p>
            <p className="mb-6 text-base leading-relaxed text-muted-text">
              Based right here in Parklands, Bulawayo, we&apos;ve served thousands of pizzas since we fired up
              our first oven. Our 24-hour proofed dough is our signature — it&apos;s what gives our crust that
              unique chewy-then-crispy texture that people drive across the city for.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-tomato" style={{ fontFamily: "Anton, sans-serif" }}>
                  6
                </div>
                <div className="text-xs font-semibold text-muted-text uppercase tracking-wider">
                  Flavours
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tomato" style={{ fontFamily: "Anton, sans-serif" }}>
                  24hr
                </div>
                <div className="text-xs font-semibold text-muted-text uppercase tracking-wider">
                  Proofed
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tomato" style={{ fontFamily: "Anton, sans-serif" }}>
                  450°
                </div>
                <div className="text-xs font-semibold text-muted-text uppercase tracking-wider">
                  Oven
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Value cards */}
          <div className="flex flex-col gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5 rounded-2xl border border-crust/12 bg-cream p-6 shadow-md shadow-ink/5 transition-all hover:shadow-lg hover:shadow-ink/8"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-tomato/10">
                  <item.icon className="h-6 w-6 text-tomato" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-text">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}