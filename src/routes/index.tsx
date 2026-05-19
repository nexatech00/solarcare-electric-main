import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Sun, Wrench, Cog, Sparkles, BatteryCharging, Plug, ArrowRight, Star,
  ShieldCheck, Award, BadgeCheck, Phone, Calculator, Leaf, CheckCircle2,
  ClipboardList, HardHat, BarChart3, Headphones, DollarSign, Percent,
  MapPin, Clock, ThumbsUp,
} from "lucide-react";
import heroHouse from "@/assets/hero-house.jpg";
import batteryImg from "@/assets/battery.jpg";
import installationImg from "@/assets/installation.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  { icon: Sun,            slug: "solar-installation", title: "Solar Installation", desc: "Custom solar panel systems for homes and businesses, expertly designed and installed." },
  { icon: Cog,            slug: "solar-maintenance",  title: "Solar Maintenance",  desc: "Keep your system running at peak efficiency with our maintenance plans." },
  { icon: Wrench,         slug: "solar-repairs",      title: "Solar Repairs",      desc: "Fast, reliable repair services for inverters, panels and wiring." },
  { icon: Sparkles,       slug: "panel-cleaning",     title: "Panel Cleaning",     desc: "Maximize energy production with professional, eco-friendly cleaning." },
  { icon: BatteryCharging,slug: "battery-storage",    title: "Battery Add-on",     desc: "Store excess energy for night time use and power outages." },
  { icon: Plug,           slug: "ev-chargers",        title: "EV Chargers",        desc: "Charge your electric vehicle with clean solar energy at home or work." },
];

const reasons = [
  { icon: BadgeCheck, title: "Licensed & Certified", desc: "NABCEP certified installers and fully licensed electricians." },
  { icon: Award, title: "Quality Products", desc: "Top-tier solar panels, inverters and batteries from leading brands." },
  { icon: ShieldCheck, title: "25-Year Warranty", desc: "Industry-leading panel warranty plus workmanship guarantee." },
  { icon: Leaf, title: "Free Consultation", desc: "No obligation quotes and transparent pricing — always." },
];

const testimonials = [
  { name: "Sarah Mitchell", loc: "Austin, TX", size: "8.4 kW System", text: "SolarCare's team was professional from the first call. Our electric bill dropped 92% in the first month!", rating: 5 },
  { name: "James Reynolds", loc: "Phoenix, AZ", size: "12 kW + Battery", text: "The battery backup paid for itself during the last outage. Couldn't be happier with the install quality.", rating: 5 },
  { name: "Priya Patel", loc: "San Diego, CA", size: "6.2 kW System", text: "Clean install, no roof leaks, and the monitoring app is incredible. Highly recommend SolarCare.", rating: 5 },
  { name: "Marcus Johnson", loc: "Denver, CO", size: "10 kW + EV Charger", text: "They handled permits, install, and inspection seamlessly. We power our Tesla with sunlight now!", rating: 5 },
];

const steps = [
  { icon: ClipboardList, step: "01", title: "Free Consultation", desc: "We assess your energy needs, roof condition, and sun exposure — at no cost to you." },
  { icon: BarChart3,     step: "02", title: "Custom Design",     desc: "Our engineers design a system sized perfectly for your home or business." },
  { icon: HardHat,       step: "03", title: "Expert Install",    desc: "NABCEP-certified crews complete most installs in a single day with zero mess." },
  { icon: Headphones,    step: "04", title: "Ongoing Support",   desc: "24/7 monitoring, annual check-ups, and a dedicated support line — always." },
];

const incentives = [
  { icon: Percent,     title: "30% Federal Tax Credit",  desc: "The IRA solar tax credit lets you deduct 30% of your system cost from federal taxes." },
  { icon: DollarSign,  title: "State & Local Rebates",   desc: "Many states offer additional rebates on top of the federal credit — we handle the paperwork." },
  { icon: BarChart3,   title: "Net Metering",            desc: "Sell excess power back to the grid and watch your meter run backwards." },
  { icon: ShieldCheck, title: "$0 Down Financing",       desc: "Flexible loan and lease options so you can go solar with no upfront cost." },
];

const serviceAreas = [
  "Los Angeles, CA", "San Diego, CA", "Phoenix, AZ", "Austin, TX",
  "Denver, CO", "Las Vegas, NV", "Portland, OR", "Seattle, WA",
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / 1500, 1);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        tick();
        o.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [to]);
  return <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gradient-solar">{n.toLocaleString()}{suffix}</div>;
}

/* Floating orb particle */
function Orb({ x, y, size, delay, duration }: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-solar/20 blur-xl pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* Scroll progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-solar origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

/* Marquee ticker */
const tickerItems = ["Solar Installation","Battery Storage","EV Chargers","Panel Cleaning","Solar Repairs","Solar Maintenance","Free Consultation","25-Year Warranty","NABCEP Certified","Nationwide Service"];
function Marquee() {
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

/* Animated word reveal */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* Flip card for services */
function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-56 cursor-pointer overflow-hidden rounded-2xl"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        style={{ transformStyle: "preserve-3d" }}
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
      >
        {/* Front */}
        <Link
          to="/service/$slug"
          params={{ slug: s.slug }}
          className="absolute inset-0 flex flex-col p-7 rounded-2xl bg-card border border-border shadow-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            className="size-14 rounded-xl gradient-solar grid place-items-center shadow-solar"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <s.icon className="size-7 text-navy" strokeWidth={2} />
          </motion.div>
          <h3 className="mt-4 text-lg font-display font-bold text-card-foreground">{s.title}</h3>
          <p className="mt-1 text-card-foreground/70 text-sm flex-1 line-clamp-2">{s.desc}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-solar font-semibold text-sm">
            Hover to flip <ArrowRight className="size-4" />
          </span>
        </Link>
        {/* Back — same navy blue, solar yellow accents */}
        <Link
          to="/service/$slug"
          params={{ slug: s.slug }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-7 rounded-2xl bg-card border border-solar/40 shadow-solar"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="size-16 rounded-full gradient-solar grid place-items-center shadow-solar">
            <s.icon className="size-8 text-navy" strokeWidth={1.5} />
          </div>
          <div className="text-xl font-display font-bold text-center text-card-foreground">{s.title}</div>
          <div className="text-sm text-card-foreground/70 text-center">{s.desc}</div>
          <span className="mt-1 inline-flex items-center gap-2 px-5 h-10 rounded-full gradient-solar text-navy font-semibold text-sm">
            View Details <ArrowRight className="size-4" />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function Home() {
  const [bill, setBill] = useState(200);
  const annualSavings = Math.round(bill * 12 * 0.85);
  const lifetimeSavings = annualSavings * 25;

  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img src={heroHouse} alt="" width={1280} height={896} className="size-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
          {/* Floating orbs — inside overflow-hidden container */}
          <Orb x="10%" y="20%" size={180} delay={0}   duration={6} />
          <Orb x="75%" y="10%" size={120} delay={1.5} duration={8} />
          <Orb x="60%" y="60%" size={200} delay={0.8} duration={7} />
          <Orb x="20%" y="70%" size={100} delay={2}   duration={5} />
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-24 md:py-36 text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/20 border border-solar/40 text-solar text-xs font-semibold uppercase tracking-wider">
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                <Sun className="size-3.5" />
              </motion.span>
              USA's Trusted Solar Partner
            </span>
          </motion.div>

          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] max-w-4xl" style={{ perspective: 800 }}>
            <WordReveal text="Power Your Home &" />
            <br />
            <WordReveal text="Business with" />
            {" "}
            <motion.span
              className="text-gradient-solar inline-block"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 80 }}
            >
              Solar Energy
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl"
          >
            Professional solar installation, maintenance, repairs, cleaning, battery add-ons, and EV charger solutions. Save money while saving the planet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 h-12 rounded-full gradient-solar text-navy font-semibold shadow-solar">
                Get Free Quote <ArrowRight className="size-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/services" className="inline-flex items-center gap-2 px-6 h-12 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-12 flex flex-wrap gap-6 text-sm"
          >
            {[["10,000+","Installations"],["25+","Years Experience"],["5,000+","★ Reviews"]].map(([n, l], idx) => (
              <motion.div
                key={l}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + idx * 0.15 }}
              >
                <motion.div
                  className="text-2xl font-bold text-solar"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: 2 + idx * 0.3, repeat: Infinity, repeatDelay: 4 }}
                >
                  {n}
                </motion.div>
                <div className="text-slate-300">{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </motion.div>
      </section>

      {/* MARQUEE TICKER */}
      <Marquee />

      {/* SERVICES */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.span
              className="inline-block text-solar font-semibold text-sm uppercase tracking-wider"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Complete Solar Solutions</h2>
            <p className="mt-4 text-muted-foreground">Hover each card to explore — we cover every step of your solar journey.</p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Why SolarCare</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Trusted by 10,000+ Homeowners</h2>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 90 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(236,195,67,0.3)" }}
                className="p-6 rounded-2xl bg-card border border-border text-center transition-colors hover:border-solar/50 cursor-default"
              >
                <motion.div
                  className="size-14 mx-auto rounded-full bg-solar/10 grid place-items-center text-solar"
                  whileInView={{ rotate: [0, 15, -15, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.6 }}
                >
                  <r.icon className="size-7" />
                </motion.div>
                <h3 className="mt-4 font-display font-semibold text-lg">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-card to-muted/40 border border-border p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl gradient-solar grid place-items-center"><Calculator className="size-6 text-navy" /></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">Estimate Your Savings</h2>
                <p className="text-sm text-muted-foreground">See how much you could save by going solar.</p>
              </div>
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <label className="text-sm font-semibold">Monthly electricity bill</label>
                <div className="mt-2 text-3xl font-display font-bold text-gradient-solar">${bill}</div>
                <input type="range" min={50} max={500} step={10} value={bill} onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full mt-4 accent-solar" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>$50</span><span>$500</span></div>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-solar/10 border border-solar/30">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Estimated annual savings</div>
                  <div className="mt-1 text-3xl font-display font-bold text-gradient-solar">${annualSavings.toLocaleString()}</div>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">25-year lifetime savings</div>
                  <div className="mt-1 text-3xl font-display font-bold">${lifetimeSavings.toLocaleString()}</div>
                </div>
                <Link to="/contact" className="block text-center px-6 h-12 leading-[3rem] rounded-full gradient-solar text-navy font-semibold shadow-solar hover:scale-[1.02] transition-transform">
                  Get a Personalized Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT COUNTERS */}
      <section className="py-20 bg-navy text-white overflow-hidden relative">
        {/* Animated background lines */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #ecc343 0px, #ecc343 1px, transparent 1px, transparent 80px)",
          }}
          animate={{ x: [0, 80] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          {[[10000,"+","Installations"],[50000,"+","Tons CO₂ Saved"],[25,"+","Years Experience"],[5000,"+","5-Star Reviews"]].map(([n,s,l], i) => (
            <motion.div
              key={l as string}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
            >
              <Counter to={n as number} suffix={s as string} />
              <div className="mt-2 text-slate-400 text-sm font-medium uppercase tracking-wider">{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">What Our Customers Say</h2>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-solar/60 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-1 text-solar">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="size-5 fill-current" />)}
                </div>
                <p className="mt-4 text-lg leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.loc} · {t.size}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-eco font-semibold">
                    <CheckCircle2 className="size-4" /> Verified
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">The Process</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Going Solar in 4 Simple Steps</h2>
            <p className="mt-4 text-muted-foreground">We handle everything from design to permits to final inspection — you just enjoy the savings.</p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line on desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-solar/40 to-transparent" />
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-solar/50 hover:shadow-solar transition-all duration-300">
                <div className="size-20 rounded-full gradient-solar grid place-items-center shadow-solar z-10">
                  <s.icon className="size-8 text-navy" strokeWidth={2} />
                </div>
                <div className="absolute -top-3 -right-3 size-8 rounded-full bg-navy text-solar text-xs font-bold grid place-items-center border-2 border-solar/40">
                  {s.step}
                </div>
                <h3 className="mt-5 text-lg font-display font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 h-12 rounded-full gradient-solar text-navy font-semibold shadow-solar hover:scale-105 transition-transform">
              Start Your Journey <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* INCENTIVES & FINANCING */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-solar font-semibold text-sm uppercase tracking-wider">Save Even More</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Tax Credits, Rebates & Financing</h2>
              <p className="mt-4 text-muted-foreground">The government wants you to go solar. Between federal tax credits, state rebates, and flexible financing, the real cost is often far less than you think.</p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {incentives.map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-card border border-border hover:border-solar/50 transition-all">
                    <div className="size-10 rounded-lg bg-solar/10 grid place-items-center text-solar mb-3">
                      <item.icon className="size-5" />
                    </div>
                    <div className="font-display font-semibold text-sm">{item.title}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={installationImg} alt="Solar installation" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <div className="text-2xl font-display font-bold">Up to 30% off</div>
                <div className="text-sm opacity-80 mt-1">with the federal solar tax credit — we'll help you claim every dollar.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Featured Project</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Real Homes, Real Results</h2>
          </motion.div>
          <div className="mt-14 grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <img src={batteryImg} alt="Battery storage installation" className="size-full object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco/10 text-eco text-xs font-semibold mb-4">
                <CheckCircle2 className="size-3.5" /> Completed Project
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold">12 kW Solar + Battery System — Phoenix, AZ</h3>
              <p className="mt-4 text-muted-foreground">A family of four wanted energy independence. We designed a 12 kW rooftop array paired with a 20 kWh battery bank. The result: zero utility bills and full backup power during outages.</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[["12 kW","System Size"],["$0","Monthly Bill"],["20 kWh","Battery Bank"]].map(([val, label]) => (
                  <div key={label} className="p-4 rounded-xl bg-card border border-border text-center">
                    <div className="text-xl font-display font-bold text-gradient-solar">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-6 h-12 rounded-full gradient-solar text-navy font-semibold shadow-solar hover:scale-105 transition-transform">
                Get a Similar System <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Where We Work</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Serving Communities Across the USA</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, i) => (
              <motion.div key={area} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-solar/50 hover:text-solar transition-all cursor-default">
                <MapPin className="size-3.5 text-solar flex-shrink-0" />
                {area}
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">Don't see your city? <Link to="/contact" className="text-solar font-semibold hover:underline">Contact us</Link> — we may still serve your area.</p>
        </div>
      </section>

      {/* QUICK TRUST BAR */}
      <section className="py-10 border-y border-border bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Clock,      label: "Same-Week Installs",    sub: "Most jobs done in 1 day" },
              { icon: ThumbsUp,   label: "4.9 / 5 Rating",        sub: "Based on 5,000+ reviews" },
              { icon: BadgeCheck, label: "NABCEP Certified",       sub: "Industry gold standard" },
              { icon: Leaf,       label: "Eco-Friendly Process",   sub: "Zero-waste installation" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2">
                <div className="size-12 rounded-full bg-solar/10 grid place-items-center text-solar">
                  <item.icon className="size-6" />
                </div>
                <div className="font-display font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-3xl gradient-solar p-10 md:p-16 text-center text-navy shadow-glow">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold">Ready to Switch to Solar?</h2>
            <p className="mt-4 text-lg max-w-xl mx-auto opacity-90">Get a free quote today. No obligation, no pressure — just honest answers.</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-navy text-white font-semibold hover:scale-105 transition-transform">
                Get Free Quote <ArrowRight className="size-4" />
              </Link>
              <a href="tel:5109800723" className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white/90 hover:bg-white text-navy font-semibold transition-colors">
                <Phone className="size-4" /> Call (510) 980-0723
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
