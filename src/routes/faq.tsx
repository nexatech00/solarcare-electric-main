import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowRight, Phone } from "lucide-react";
import {
  ScrollProgress, Orb, Marquee, WordReveal,
  ScrollIndicator, MovingGrid, staggerContainer, fadeUp, popIn,
} from "@/components/site/page-animations";

const HERO_IMG = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=80&auto=format&fit=crop";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
});

const groups = [
  {
    title: "General Solar Questions", items: [
      ["How do solar panels work?", "Photovoltaic cells convert sunlight into direct current (DC) electricity. An inverter converts DC into the alternating current (AC) your home uses. Excess power flows back to the grid (or your battery)."],
      ["How much do solar panels cost?", "An average residential system in the US costs $15,000–$25,000 before incentives. After the 30% federal tax credit and local rebates, most systems pay for themselves in 6–9 years."],
      ["Will solar panels work on my roof?", "Most asphalt, tile, metal, and flat roofs are excellent candidates. We assess pitch, shading, and structural condition during your free consultation."],
      ["What happens on cloudy days?", "Panels still produce 10–25% of normal output on cloudy days. Annual production is what matters — most US locations get plenty of sun."],
    ],
  },
  {
    title: "Installation Questions", items: [
      ["How long does installation take?", "Physical installation takes 1–3 days for most homes. The full process from contract to activation typically runs 4–8 weeks including permitting and utility approval."],
      ["Do I need a permit?", "Yes — we handle all permitting, HOA submissions, and utility interconnection paperwork on your behalf."],
      ["Will solar panels damage my roof?", "No. Our flashings and mounts are watertight and warrantied. Panels actually protect the roof underneath them."],
      ["What is the warranty?", "Panels: 25-year performance warranty. Inverters: 12–25 years. Workmanship: 10-year SolarCare guarantee."],
    ],
  },
  {
    title: "Financial Questions", items: [
      ["What is the federal tax credit?", "The 30% Residential Clean Energy Credit covers solar, battery storage, and related equipment installed through 2032."],
      ["Are there state incentives?", "Most states offer additional rebates, performance incentives, sales/property tax exemptions, or net metering credits. We'll show you everything you qualify for."],
      ["How much will I save?", "Most customers cut their electric bill 70–95%. Lifetime savings typically range from $30,000 to $100,000+ depending on system size and local rates."],
      ["What financing options are available?", "Cash, $0-down loans (10–25 year terms), PPA, and lease options. We work with multiple lenders to get you the best rate."],
    ],
  },
  {
    title: "Maintenance & Repairs", items: [
      ["How often do panels need cleaning?", "Twice a year for most homes; quarterly in dusty/agricultural areas. Cleaning can boost output 10–25%."],
      ["What maintenance is required?", "Very little — annual inspection, occasional cleaning, and inverter check. Our maintenance plans automate it."],
      ["What if something breaks?", "Most issues are covered by warranty. Our techs offer remote diagnostics and same-week on-site repair, with 24/7 emergency service available."],
    ],
  },
  {
    title: "Battery & EV", items: [
      ["Do I need a battery?", "Not required, but recommended if you experience outages, have time-of-use rates, or want full energy independence."],
      ["How long do batteries last?", "Modern lithium batteries (Powerwall, Enphase IQ) carry 10-year warranties and typically last 12–15 years."],
      ["Can I add a battery later?", "Yes — most modern solar systems are battery-ready. We can retrofit existing installations too."],
      ["What EV chargers do you install?", "ChargePoint, Tesla Wall Connector, JuiceBox, Grizzl-E, and any UL-listed Level 2 charger you choose."],
    ],
  },
  {
    title: "Net Metering & Grid", items: [
      ["What is net metering?", "Your utility credits you for excess solar power exported to the grid. At night you draw from those credits — effectively using the grid as a free battery."],
      ["Do I still need my utility company?", "Yes, unless you go fully off-grid with battery storage. Most customers stay grid-connected for reliability and net metering credits."],
    ],
  },
];

const stats = [
  { value: "30%",    label: "Federal Tax Credit" },
  { value: "6–9yr", label: "Avg. Payback Period" },
  { value: "25yr",  label: "Panel Warranty" },
  { value: "95%",   label: "Max Bill Reduction" },
];

function FaqPage() {
  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img src={HERO_IMG} alt="" className="size-full object-cover object-center" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <Orb x="8%"  y="15%" size={180} delay={0}   duration={7} />
        <Orb x="78%" y="10%" size={130} delay={1.2} duration={9} />
        <Orb x="60%" y="65%" size={160} delay={0.6} duration={6} />
        <Orb x="20%" y="70%" size={100} delay={2}   duration={8} />

        <div className="container mx-auto max-w-4xl px-4 py-24 md:py-36 text-white text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/20 border border-solar/40 text-solar text-xs font-semibold uppercase tracking-wider">
            Got Questions?
          </motion.span>

          <h1 className="mt-6 text-4xl md:text-6xl font-display font-extrabold" style={{ perspective: 800 }}>
            <WordReveal text="Frequently Asked" delay={0.2} />
            {" "}
            <motion.span
              className="text-gradient-solar inline-block"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 80 }}
            >
              Questions
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-5 text-lg text-slate-200 max-w-xl mx-auto">
            Everything you need to know about going solar — answered honestly.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            variants={staggerContainer} initial="hidden" animate="show"
            className="mt-10 flex flex-wrap justify-center gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp}
                transition={{ delay: 1.0 + i * 0.1 }}
                className="text-center">
                <motion.div
                  className="text-2xl font-bold text-solar"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: 2 + i * 0.3, repeat: Infinity, repeatDelay: 5 }}
                >{s.value}</motion.div>
                <div className="text-slate-300 text-xs mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* FAQ GROUPS */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-4xl px-4 space-y-14">
          {groups.map((g, gi) => (
            <motion.div key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.05, duration: 0.5, type: "spring", stiffness: 90 }}>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="size-2 rounded-full bg-solar flex-shrink-0"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, delay: gi * 0.3, repeat: Infinity, repeatDelay: 3 }}
                />
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-solar">{g.title}</h2>
              </div>
              <div className="space-y-3">
                {g.items.map(([q, a], qi) => (
                  <motion.div key={q}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: qi * 0.06, duration: 0.4 }}>
                    <FaqItem q={q} a={a} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STILL HAVE QUESTIONS BANNER */}
      <section className="py-20 bg-navy text-white overflow-hidden relative">
        <MovingGrid />
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Still have questions?</h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Our solar specialists are happy to answer anything — no sales pressure, just honest advice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full gradient-solar text-navy font-semibold shadow-solar">
                  Ask Us Anything <ArrowRight className="size-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="tel:5109800723"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                  <Phone className="size-4" /> Call (510) 980-0723
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK CERT BADGES */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3">
            {["NABCEP Certified", "BBB A+", "25-Year Warranty", "Licensed & Insured", "Free Estimates", "Nationwide Service"].map((c, i) => (
              <motion.span key={c} variants={popIn} transition={{ delay: i * 0.07 }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-semibold hover:border-solar hover:text-solar transition-colors cursor-default">
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="rounded-2xl bg-card border border-border overflow-hidden"
      whileHover={{ borderColor: "rgba(236,195,67,0.5)" }}
      animate={{ boxShadow: open ? "0 8px 30px -8px rgba(236,195,67,0.25)" : "none" }}
      transition={{ duration: 0.2 }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between gap-4 text-left">
        <span className="font-display font-semibold">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
          className="flex-shrink-0">
          {open
            ? <Minus className="size-5 text-solar" />
            : <Plus className="size-5 text-solar" />}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <motion.p
              initial={{ y: -10 }} animate={{ y: 0 }}
              className="px-5 pb-5 text-muted-foreground leading-relaxed">
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
