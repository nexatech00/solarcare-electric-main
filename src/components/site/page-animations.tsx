/**
 * Shared animation primitives used across all pages.
 * Import what you need — tree-shaking keeps the bundle lean.
 */
import { motion, useScroll, useSpring } from "framer-motion";
import { Sun } from "lucide-react";

/* ─── Scroll progress bar ─────────────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-solar origin-left z-[100] pointer-events-none"
      style={{ scaleX }}
    />
  );
}

/* ─── Floating glow orb ───────────────────────────────────────────────────── */
export function Orb({
  x, y, size, delay, duration,
}: {
  x: string; y: string; size: number; delay: number; duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-solar/20 blur-xl pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── Scroll indicator (bouncing arrow) ──────────────────────────────────── */
export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs z-10"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <span>Scroll</span>
      <div className="w-px h-8 bg-white/30" />
    </motion.div>
  );
}

/* ─── Marquee ticker ──────────────────────────────────────────────────────── */
const tickerItems = [
  "Solar Installation", "Battery Storage", "EV Chargers", "Panel Cleaning",
  "Solar Repairs", "Solar Maintenance", "Free Consultation", "25-Year Warranty",
  "NABCEP Certified", "Nationwide Service",
];

export function Marquee() {
  return (
    <div className="overflow-hidden bg-solar py-2.5 select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-navy font-semibold text-sm">
            <Sun className="size-3.5 flex-shrink-0" /> {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Word-by-word 3-D reveal ─────────────────────────────────────────────── */
export function WordReveal({
  text, className, delay = 0,
}: {
  text: string; className?: string; delay?: number;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Moving grid lines (used in dark counter sections) ──────────────────── */
export function MovingGrid() {
  return (
    <motion.div
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg,#ecc343 0px,#ecc343 1px,transparent 1px,transparent 80px)",
      }}
      animate={{ x: [0, 80] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─── Framer-motion variant presets ──────────────────────────────────────── */
import type { Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.55, ease: EASE } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.55, ease: EASE } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show:   { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 150, damping: 14 } },
};
