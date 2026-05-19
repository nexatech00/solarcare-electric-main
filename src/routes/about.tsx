import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ScrollProgress, Orb, Marquee, WordReveal, MovingGrid, ScrollIndicator, staggerContainer, fadeUp, fadeLeft, fadeRight, popIn } from "@/components/site/page-animations";
import {
  Target, Eye, Heart, Lightbulb, CheckCircle2, ArrowRight, Phone,
  Award, BadgeCheck, Users, Zap, Leaf, TrendingUp, Globe, Star,
  ShieldCheck, Clock, Handshake,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import team from "@/assets/team.jpg";
import installation from "@/assets/installation.jpg";
import battery from "@/assets/battery.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const values = [
  { icon: Target,    title: "Quality",        desc: "Premium Tier-1 components and meticulous workmanship on every single project, no exceptions." },
  { icon: Heart,     title: "Integrity",      desc: "Transparent pricing, honest advice, and zero high-pressure sales tactics — ever." },
  { icon: Lightbulb, title: "Innovation",     desc: "We stay ahead of the curve with the latest solar technology and best practices in renewable energy." },
  { icon: Eye,       title: "Sustainability", desc: "Every install we complete moves America one step closer to a carbon-free future." },
  { icon: Handshake, title: "Partnership",    desc: "We treat every customer as a long-term partner, not a one-time transaction." },
  { icon: ShieldCheck,title: "Safety",        desc: "Rigorous safety protocols on every job site — protecting our crew, your home, and your family." },
];

const teamMembers = [
  {
    name: "Edgar Vega", role: "CEO",
    bio: "Visionary leader driving SolarCare Electric's mission to make clean, affordable solar energy accessible to every American home and business.",
    stats: "1,000+ solar installs",
  },
  {
    name: "Diana Vega", role: "Co-CEO",
    bio: "Co-leads SolarCare Electric with a focus on customer experience, operations, and building lasting relationships with every client we serve.",
    stats: "5 years experience",
  },
];

const timeline = [
  { year: "2008", title: "Founded in Austin, TX", desc: "Michael Carter starts SolarCare Electric with one truck, two installers, and a mission to make solar affordable for every American." },
  { year: "2011", title: "NABCEP Certification", desc: "Entire installation team achieves NABCEP certification — the gold standard in the solar industry." },
  { year: "2014", title: "Expanded Nationwide", desc: "Opened regional offices in Phoenix, San Diego, and Denver. Now serving 8 states." },
  { year: "2017", title: "1,000th Installation", desc: "Celebrated our 1,000th completed solar system — a 14 kW residential install in Austin." },
  { year: "2019", title: "Battery & EV Division", desc: "Launched dedicated battery storage and EV charger installation services to meet growing demand." },
  { year: "2022", title: "Tesla & Enphase Partner", desc: "Became a Tesla Certified Installer and Enphase Platinum Partner, unlocking premium products for our customers." },
  { year: "2024", title: "10,000 Installations", desc: "Reached the milestone of 10,000 completed solar systems across the USA, saving customers over $200M in energy costs." },
];

const awards = [
  { icon: Award,     title: "Solar Power World Top 500",  year: "2022, 2023, 2024" },
  { icon: BadgeCheck,title: "BBB Accredited A+",          year: "Since 2010" },
  { icon: Star,      title: "Houzz Best of Service",      year: "2021, 2022, 2023" },
  { icon: Globe,     title: "Inc. 5000 Fastest Growing",  year: "2020, 2021" },
];

const impact = [
  { icon: Leaf,       value: "50,000+", label: "Tons of CO₂ Avoided",    desc: "Equivalent to planting 800,000 trees" },
  { icon: Zap,        value: "120 GWh", label: "Clean Energy Generated",  desc: "Enough to power 11,000 homes for a year" },
  { icon: TrendingUp, value: "$200M+",  label: "Customer Savings",        desc: "Total electricity bill savings to date" },
  { icon: Users,      value: "10,000+", label: "Families Empowered",      desc: "Homes and businesses gone solar with us" },
];

const certs = [
  "NABCEP Certified", "BBB Accredited A+", "Tesla Certified Installer",
  "Enphase Platinum Partner", "SolarEdge Premier", "Licensed & Insured",
  "EPA Recognized", "SEIA Member",
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

function AboutPage() {
  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img src={team} alt="" className="size-full object-cover object-center" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <Orb x="5%"  y="15%" size={200} delay={0}   duration={7} />
        <Orb x="80%" y="10%" size={140} delay={1.2} duration={9} />
        <Orb x="65%" y="65%" size={180} delay={0.6} duration={6} />
        <Orb x="15%" y="70%" size={100} delay={2}   duration={8} />

        <div className="container mx-auto max-w-7xl px-4 py-24 md:py-40 text-white text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/20 border border-solar/40 text-solar text-xs font-semibold uppercase tracking-wider">
            Our Story
          </motion.span>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight" style={{ perspective: 800 }}>
            <WordReveal text="About SolarCare" delay={0.2} />
            {" "}
            <motion.span
              className="text-gradient-solar inline-block"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 1.0, type: "spring", stiffness: 80 }}
            >
              Electric
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-5 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
            Since 2008, we've been on a mission to make clean, affordable solar energy accessible to every American home and business.
          </motion.p>
          <motion.div
            variants={staggerContainer} initial="hidden" animate="show"
            className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
            {[["10,000+", "Installations"], ["25+", "Years Experience"], ["50", "States Served"], ["4.9★", "Avg. Rating"]].map(([val, label], idx) => (
              <motion.div key={label} variants={fadeUp} transition={{ delay: 1.2 + idx * 0.12 }} className="text-center">
                <motion.div
                  className="text-2xl font-bold text-solar"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: 2 + idx * 0.3, repeat: Infinity, repeatDelay: 4 }}
                >{val}</motion.div>
                <div className="text-slate-300 mt-0.5">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* OUR STORY */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative">
            <img src={installation} alt="Our crew installing solar" loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-card border border-border shadow-xl hidden md:block">
              <div className="text-3xl font-display font-bold text-gradient-solar">2008</div>
              <div className="text-sm text-muted-foreground mt-1">Year Founded</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold leading-tight">
              Built on a simple promise — clean energy for every American.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Founded in 2008 in Austin, Texas, SolarCare Electric started with a single truck and a big idea: solar should be affordable, reliable, and accessible to every homeowner and business in America. Our founder Michael Carter walked away from a corporate utility career because he believed the industry was failing everyday people.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today, we've grown to a nationwide team of NABCEP-certified installers, master electricians, and customer success specialists — but our values haven't changed. Every project gets the same care and attention whether it's a 4 kW home system or a 500 kW commercial array.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-5">
              {[
                { label: "Mission", text: "Make clean, affordable solar energy accessible to every home and business in America." },
                { label: "Vision",  text: "A future where every building generates its own clean energy." },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-card border border-border">
                  <div className="text-solar font-semibold text-xs uppercase tracking-wider">{item.label}</div>
                  <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT COUNTERS */}
      <section className="py-20 bg-navy text-white overflow-hidden relative">
        <MovingGrid />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Our Impact</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Numbers That Tell Our Story</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[[10000, "+", "Installations"], [50000, "+", "Tons CO₂ Saved"], [200, "M+", "$ Customer Savings"], [5000, "+", "5-Star Reviews"]].map(([n, s, l], i) => (
              <motion.div key={l as string}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}>
                <Counter to={n as number} suffix={s as string} />
                <div className="mt-2 text-slate-400 text-sm font-medium uppercase tracking-wider">{l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">16 Years of Solar Excellence</h2>
          </motion.div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-solar/60 via-solar/30 to-transparent -translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 size-4 rounded-full gradient-solar border-2 border-background shadow-solar z-10 top-5" />
                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                  {/* Card */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="p-6 rounded-2xl bg-card border border-border hover:border-solar/50 hover:shadow-solar transition-all duration-300">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar/10 text-solar text-xs font-bold mb-3">
                        {item.year}
                      </div>
                      <h3 className="font-display font-bold text-lg">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">What We Stand For</h2>
            <p className="mt-4 text-muted-foreground">These aren't just words on a wall — they're the principles that guide every decision we make.</p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 90 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(236,195,67,0.3)" }}
                className="p-7 rounded-2xl bg-card border border-border hover:border-solar/50 transition-all duration-300 cursor-default">
                <motion.div
                  className="size-13 rounded-xl gradient-solar grid place-items-center shadow-solar w-13 h-13"
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
                >
                  <v.icon className="size-6 text-navy" strokeWidth={2} />
                </motion.div>
                <h3 className="mt-5 font-display font-bold text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-solar font-semibold text-sm uppercase tracking-wider">Community Impact</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Powering Communities, Not Just Homes</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                We believe solar is more than a product — it's a movement. That's why we partner with local nonprofits, schools, and community centers to bring clean energy to those who need it most.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                {impact.map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-card border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-9 rounded-lg bg-solar/10 grid place-items-center text-solar flex-shrink-0">
                        <item.icon className="size-5" />
                      </div>
                      <div className="text-2xl font-display font-bold text-gradient-solar">{item.value}</div>
                    </div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative">
              <img src={battery} alt="Battery storage installation" loading="lazy"
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-navy/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <div className="font-display font-bold text-lg">Solar for Schools Program</div>
                <div className="text-sm opacity-80 mt-1">We've donated and discounted solar systems to 40+ schools and nonprofits across the USA.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Meet the Experts Behind Every Install</h2>
            <p className="mt-4 text-muted-foreground">A team of certified professionals who are as passionate about clean energy as you are about saving money.</p>
          </motion.div>
          <motion.img initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            src={team} alt="The SolarCare team" loading="lazy"
            className="mt-14 w-full aspect-[16/7] object-cover rounded-3xl shadow-2xl" />
          <div className="mt-14 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {teamMembers.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 90 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(236,195,67,0.3)" }}
                className="p-7 rounded-2xl bg-card border border-border hover:border-solar/50 transition-all duration-300 cursor-default">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="size-16 rounded-full gradient-solar grid place-items-center text-xl font-display font-bold text-navy flex-shrink-0"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {m.name.split(" ").map(s => s[0]).join("")}
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight">{m.name}</h3>
                    <div className="text-solar text-sm font-semibold">{m.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-eco flex-shrink-0" />
                  <span className="text-xs font-semibold text-eco">{m.stats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Recognition</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Awards & Industry Recognition</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((a, i) => (
              <motion.div key={a.title}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 150 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(236,195,67,0.3)" }}
                className="p-6 rounded-2xl bg-card border border-border text-center hover:border-solar/50 transition-all duration-300 cursor-default">
                <motion.div
                  className="size-14 mx-auto rounded-full bg-solar/10 grid place-items-center text-solar"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 4 }}
                >
                  <a.icon className="size-7" />
                </motion.div>
                <h3 className="mt-4 font-display font-bold">{a.title}</h3>
                <div className="mt-1 text-xs text-muted-foreground">{a.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-16 bg-muted/40 border-y border-border">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-solar font-semibold text-sm uppercase tracking-wider">Certifications & Memberships</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold">Certified, Accredited & Trusted</h2>
          </motion.div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {certs.map((c, i) => (
              <motion.span key={c} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border font-semibold text-sm hover:border-solar hover:text-solar transition-colors cursor-default">
                <BadgeCheck className="size-4 text-solar flex-shrink-0" />
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="rounded-3xl gradient-solar p-10 md:p-16 text-center text-navy shadow-glow">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Clock className="size-10 mx-auto mb-4 opacity-70" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold">Ready to Join 10,000+ Happy Customers?</h2>
            <p className="mt-4 text-lg max-w-xl mx-auto opacity-90">Get a free, no-obligation quote from the team that's been doing this since 2008.</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-navy text-white font-semibold">
                  Get Free Quote <ArrowRight className="size-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="tel:5109800723" className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white/90 hover:bg-white text-navy font-semibold transition-colors">
                  <Phone className="size-4" /> Call (510) 980-0723
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
