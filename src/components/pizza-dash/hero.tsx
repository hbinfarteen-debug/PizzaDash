"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/pizza-data";

import Image from "next/image";

function FloatingIngredient({
  children,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.6 }}
    >
      <div className="animate-drift drop-shadow-lg" style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

function SteamLines() {
  return (
    <g className="origin-bottom">
      {[[-20, 0], [0, 0.4], [20, 0.8]].map(([x, delay], i) => (
        <motion.ellipse
          key={i}
          cx={150 + x}
          cy={20}
          rx="3"
          ry="10"
          fill="rgba(255,255,255,0.3)"
          initial={{ opacity: 0, y: 0, scaleY: 1 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [-10, -40],
            scaleY: [1, 2],
          }}
          transition={{
            duration: 2.5,
            delay: delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </g>
  );
}

function BadgeStamp() {
  return (
    <motion.div
      className="absolute -right-2 top-2 z-10 h-28 w-28 sm:h-32 sm:w-32"
      initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 10, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.7, type: "spring", stiffness: 200 }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#f3a712" strokeWidth="2.5" strokeDasharray="4 3" />
        <path id="stampCircle" d="M 60 14 A 46 46 0 1 1 59.9 14" fill="none" />
        <text
          fontFamily="Plus Jakarta Sans"
          fontWeight="800"
          fontSize="9.5"
          fill="#f6efe1"
          letterSpacing="2"
        >
          <textPath href="#stampCircle" startOffset="2%">
            HOT FROM THE OVEN • FRESH DAILY •
          </textPath>
        </text>
        <text
          x="60"
          y="56"
          textAnchor="middle"
          fontFamily="Caveat"
          fontWeight="700"
          fontSize="22"
          fill="#f3a712"
          transform="rotate(-6 60 56)"
        >
          100%
        </text>
        <text
          x="60"
          y="76"
          textAnchor="middle"
          fontFamily="Caveat"
          fontWeight="700"
          fontSize="20"
          fill="#f6efe1"
          transform="rotate(-6 60 76)"
        >
          wood-fired
        </text>
      </svg>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="bg-char-texture bg-crumb relative min-h-screen overflow-hidden pt-24 pb-12 lg:pt-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 lg:flex-row lg:gap-12 lg:px-8">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="h-0.5 w-6 rounded bg-tomato" />
            <span className="text-xs font-bold uppercase tracking-[3px] text-cheese">
              Bulawayo &middot; Est. Fresh Daily
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-5 leading-[1.02] text-cream"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "0.5px",
            }}
          >
            PIZZA DASH:
            <br />
            BULAWAYO&apos;S{" "}
            <span className="text-tomato" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
              FINEST
            </span>{" "}
            PIZZA.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-8 max-w-md text-lg font-medium leading-relaxed text-cream/65 lg:mx-0"
          >
            Fresh, hand-crafted, and delivered. Nothing else on the menu — because pizza is the only thing
            we&apos;ve ever needed to get right.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-tomato px-8 py-4 text-base font-extrabold text-cream shadow-lg shadow-tomato/35 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-tomato/50"
            >
              <MessageCircle className="h-5 w-5" />
              Order Now
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 border-b-2 border-cream/25 pb-1 text-base font-bold text-cream transition-colors hover:border-cream/60"
            >
              See the menu
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Right: Pizza visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="relative flex flex-1 items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Wood board */}
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: "min(400px, 80vw)",
                height: "min(400px, 80vw)",
                background:
                  "radial-gradient(ellipse at 35% 30%, #6b4324, #4a2e17 60%, #3a2311 100%)",
                boxShadow:
                  "0 30px 60px rgba(0,0,0,0.55), inset 0 0 0 8px rgba(0,0,0,0.15)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.06) 0px, transparent 2px, transparent 8px)",
                }}
              />

              {/* Hero Pizza Photo */}
              <div className="relative h-[82%] w-[82%] overflow-hidden rounded-full">
                <Image
                  src="/images/hero-pizza.png"
                  alt="Wood-fired pepperoni pizza on a rustic board"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 70vw, 400px"
                />
              </div>

              {/* Steam */}
              <svg
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
                width="100"
                height="60"
                viewBox="0 0 300 60"
              >
                <SteamLines />
              </svg>
            </div>

            {/* Badge */}
            <BadgeStamp />

            {/* Floating ingredients */}
            <FloatingIngredient style={{ top: "4%", left: "-2%", "--r": "-8deg" } as React.CSSProperties} delay={0}>
              <svg width="46" height="46" viewBox="0 0 46 46">
                <ellipse cx="23" cy="23" rx="12" ry="19" fill="#3f5a38" transform="rotate(-20 23 23)" />
                <path d="M23 6 L23 40" stroke="#2d4227" strokeWidth="1.5" transform="rotate(-20 23 23)" />
              </svg>
            </FloatingIngredient>

            <FloatingIngredient style={{ top: "0%", right: "8%", "--r": "12deg" } as React.CSSProperties} delay={0.8}>
              <svg width="34" height="34" viewBox="0 0 34 34">
                <circle cx="17" cy="17" r="15" fill="#a8281e" />
                <circle cx="17" cy="17" r="15" fill="#c6362b" opacity="0.85" />
                <circle cx="12" cy="13" r="1.6" fill="#7a1a12" opacity="0.6" />
                <circle cx="21" cy="20" r="1.6" fill="#7a1a12" opacity="0.6" />
              </svg>
            </FloatingIngredient>

            <FloatingIngredient style={{ bottom: "12%", left: "-4%", "--r": "6deg" } as React.CSSProperties} delay={1.4}>
              <svg width="38" height="38" viewBox="0 0 38 38">
                <path
                  d="M19 4c8 4 12 12 8 22-2 5-8 8-13 5-6-3-8-11-3-17 2 4 1 8-1 10 4-1 7-5 6-10-1-4-3-7 3-10z"
                  fill="#c6362b"
                />
                <rect x="17" y="1" width="4" height="6" rx="2" fill="#3f5a38" />
              </svg>
            </FloatingIngredient>

            <FloatingIngredient style={{ bottom: "2%", right: "2%", "--r": "-10deg" } as React.CSSProperties} delay={0.4}>
              <svg width="42" height="30" viewBox="0 0 42 30">
                <path
                  d="M2 22c6 4 12-6 18-2s10 8 16 2c2-4-2-8-6-6-4 2-8-4-14-2-6 2-8 6-14 8z"
                  fill="#ffe08a"
                />
              </svg>
            </FloatingIngredient>
          </div>
        </motion.div>
      </div>

      {/* Crust divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 -mb-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0,40 Q40,10 90,42 T190,38 Q220,60 260,36 T350,44 Q380,20 420,46 T520,40 Q555,64 600,38 T700,42 Q735,18 780,44 T880,38 Q915,60 960,40 T1060,44 Q1100,20 1140,42 T1200,38 L1200,0 L0,0 Z"
            fill="#1b1410"
          />
          <path
            d="M0,40 Q40,10 90,42 T190,38 Q220,60 260,36 T350,44 Q380,20 420,46 T520,40 Q555,64 600,38 T700,42 Q735,18 780,44 T880,38 Q915,60 960,40 T1060,44 Q1100,20 1140,42 T1200,38 L1200,120 L0,120 Z"
            fill="#f6efe1"
          />
          <g fill="#f6efe1">
            <circle cx="150" cy="34" r="9" />
            <circle cx="470" cy="38" r="7" />
            <circle cx="820" cy="36" r="10" />
            <circle cx="1090" cy="32" r="6" />
          </g>
          <g fill="#3a2416" opacity="0.5">
            <circle cx="90" cy="42" r="2.5" />
            <circle cx="260" cy="36" r="2" />
            <circle cx="420" cy="46" r="2.5" />
            <circle cx="600" cy="38" r="2" />
            <circle cx="780" cy="44" r="2.5" />
            <circle cx="960" cy="40" r="2" />
            <circle cx="1140" cy="42" r="2.5" />
          </g>
        </svg>
      </div>
    </section>
  );
}