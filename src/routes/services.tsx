import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sun, Cog, Wrench, Sparkles, BatteryCharging, Plug, CheckCircle2, ArrowRight } from "lucide-react";
import installation from "@/assets/installation.jpg";
import battery from "@/assets/battery.jpg";
import evCharger from "@/assets/ev-charger.jpg";
import heroHouse from "@/assets/hero-house.jpg";
import { ScrollProgress, Orb, Marquee, WordReveal, ScrollIndicator } from "@/components/site/page-animations";

// Unique Unsplash hero images per service (used in service detail page heroes)
const heroImages = {
  "solar-installation": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=80&auto=format&fit=crop",  // workers installing panels on roof
  "solar-maintenance":  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1400&q=80&auto=format&fit=crop",  // technician inspecting solar array
  "solar-repairs":      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=80&auto=format&fit=crop",  // electrician working on wiring
  "panel-cleaning":     "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1400&q=80&auto=format&fit=crop",  // close-up clean solar panels
  "battery-storage":    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&q=80&auto=format&fit=crop",  // home battery wall unit
  "ev-chargers":        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80&auto=format&fit=crop",  // EV plugged into charger
};

// Services page hero — workers on a rooftop solar install
const SERVICES_HERO = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&q=80&auto=format&fit=crop";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

export const detailed = [
  {
    slug: "solar-installation",
    icon: Sun, title: "Solar Installation", img: installation,
    heroImg: heroImages["solar-installation"],
    overview: "Professional solar panel installation for homes and businesses. We handle everything from design to permitting to installation.",
    description: "Our certified installers design a custom solar system tailored to your energy needs and roof layout. From the first site assessment to final grid connection, we manage every step — permits, HOA submissions, utility approvals, and a full system walkthrough on activation day.",
    list: ["Free Consultation & Site Assessment", "Custom System Design", "Permitting & Approvals", "Professional Installation", "Inspection & Grid Connection", "System Activation"],
    listLabel: "Our 6-Step Process",
    benefits: ["Reduce electricity bills 50-90%", "Increase property value", "25-year panel warranty", "Federal tax credits available"],
    cta: "Get Installation Quote",
  },
  {
    slug: "solar-maintenance",
    icon: Cog, title: "Solar Maintenance", img: heroHouse,
    heroImg: heroImages["solar-maintenance"],
    overview: "Regular maintenance keeps your system at peak efficiency. Annual inspections, performance monitoring and preventive care.",
    description: "A well-maintained solar system produces more energy and lasts longer. Our maintenance plans include thorough inspections, inverter testing, connection checks, and performance data analysis to catch issues before they cost you money.",
    list: ["Basic — Annual inspection + performance check", "Premium — Bi-annual inspection + cleaning + monitoring", "Enterprise — Quarterly maintenance for commercial systems"],
    listLabel: "Maintenance Plans",
    benefits: ["Inverter testing", "Connection tightening", "Performance data analysis", "System cleaning & software updates"],
    cta: "Schedule Maintenance",
  },
  {
    slug: "solar-repairs",
    icon: Wrench, title: "Solar Repairs", img: installation,
    heroImg: heroImages["solar-repairs"],
    overview: "Fast, reliable repair services for all solar systems. Our technicians diagnose and fix issues quickly to minimize downtime.",
    description: "When your system underperforms or stops working, every day costs you money. Our technicians use remote diagnostics to identify issues fast, then dispatch on-site for same-week repairs with transparent pricing — no surprises.",
    list: ["Inverter replacement", "Panel replacement", "Wiring issues", "Monitoring system fixes", "Roof penetration sealing"],
    listLabel: "Common Repairs",
    benefits: ["Remote diagnostics", "On-site assessment", "Transparent repair estimate", "Fast repair & post-repair testing", "24/7 emergency service available"],
    cta: "Request Repair",
  },
  {
    slug: "panel-cleaning",
    icon: Sparkles, title: "Solar Panel Cleaning", img: heroHouse,
    heroImg: heroImages["panel-cleaning"],
    overview: "Professional cleaning restores your panels' efficiency. Dust, bird droppings and debris can reduce output by up to 25%.",
    description: "Dirty panels are silent energy thieves. Our eco-friendly cleaning process uses soft brushes and deionized water — no harsh chemicals — to safely restore your panels to peak output. We include before/after production photos with every visit.",
    list: ["Soft brush + deionized water", "No harsh chemicals", "Safe for all panel types", "Includes before/after photos"],
    listLabel: "Our Cleaning Process",
    benefits: ["Increase production 10-25%", "Extend panel lifespan", "Maintain warranty compliance", "Improve ROI"],
    cta: "Schedule Cleaning",
  },
  {
    slug: "battery-storage",
    icon: BatteryCharging, title: "Solar & Battery Add-on", img: battery,
    heroImg: heroImages["battery-storage"],
    overview: "Add battery storage to your solar system. Store excess energy for night time use, power outages and peak rate avoidance.",
    description: "Battery storage transforms your solar system into a true energy independence solution. Store surplus daytime energy, power your home through outages, and avoid expensive peak utility rates — all with a system that pays for itself.",
    list: ["Tesla Powerwall", "Enphase IQ Battery", "Generac PWRcell", "LG Chem RESU"],
    listLabel: "Battery Options",
    benefits: ["Energy independence", "Backup power during outages", "Time-of-use rate optimization", "Reduce grid dependence"],
    cta: "Add Battery Storage",
  },
  {
    slug: "ev-chargers",
    icon: Plug, title: "EV Chargers", img: evCharger,
    heroImg: heroImages["ev-chargers"],
    overview: "Charge your electric vehicle with clean solar energy. Professional installation of Level 2 EV chargers for homes and businesses.",
    description: "Pair your EV with solar and charge for virtually nothing. We handle the full installation — panel assessment, permitting, mounting, wiring, and testing — so you can plug in and drive on sunshine from day one.",
    list: ["ChargePoint Home Flex", "Tesla Wall Connector", "JuiceBox 40", "Grizzl-E Classic"],
    listLabel: "Popular Chargers",
    benefits: ["Electrical panel assessment", "Permitting handled", "Charger mounting", "Wiring & testing", "Live demonstration"],
    cta: "Install EV Charger",
  },
];

function ServicesPage() {
  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img src={SERVICES_HERO} alt="" className="size-full object-cover object-center" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <Orb x="8%"  y="20%" size={160} delay={0}   duration={7} />
        <Orb x="78%" y="15%" size={120} delay={1.0} duration={9} />
        <Orb x="60%" y="60%" size={180} delay={0.5} duration={6} />

        <div className="container mx-auto max-w-7xl px-4 py-24 md:py-36 text-white text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/20 border border-solar/40 text-solar text-xs font-semibold uppercase tracking-wider">
            What We Offer
          </motion.span>
          <h1 className="mt-6 text-4xl md:text-6xl font-display font-extrabold" style={{ perspective: 800 }}>
            <WordReveal text="Our Solar" delay={0.2} />
            {" "}
            <motion.span
              className="text-gradient-solar inline-block"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 80 }}
            >
              Services
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-5 text-lg text-slate-200 max-w-2xl mx-auto">
            Comprehensive solar solutions for residential and commercial properties — from initial design to long-term care.
          </motion.p>
        </div>
        <ScrollIndicator />
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* SERVICES LIST */}
      <div className="divide-y divide-border">
        {detailed.map((s, i) => (
          <section key={s.title} className={i % 2 === 1 ? "bg-muted/40" : "bg-background"}>
            <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>

                {/* Image — swap side on odd rows */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 80 }}
                  whileHover={{ scale: 1.02 }}
                  className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl" />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/10 border border-solar/30">
                    <s.icon className="size-4 text-solar" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-solar">Service {i + 1}</span>
                  </div>
                  <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold">{s.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{s.overview}</p>

                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-solar">{s.listLabel}</h3>
                    <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                      {s.list.map((x, li) => (
                        <motion.li key={x} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: li * 0.06 }}
                          className="flex gap-2 text-sm"><CheckCircle2 className="size-4 text-eco flex-shrink-0 mt-0.5" /> {x}</motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-solar">Benefits</h3>
                    <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                      {s.benefits.map((x, bi) => (
                        <motion.li key={x} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: bi * 0.06 }}
                          className="flex gap-2 text-sm"><CheckCircle2 className="size-4 text-eco flex-shrink-0 mt-0.5" /> {x}</motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <Link to="/service/$slug" params={{ slug: s.slug }}
                      className="inline-flex items-center gap-2 px-6 h-12 rounded-full gradient-solar text-navy font-semibold shadow-solar hover:scale-105 transition-transform">
                      {s.cta} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
