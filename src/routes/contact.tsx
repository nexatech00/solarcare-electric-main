import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { ScrollProgress, Orb, Marquee, WordReveal, ScrollIndicator } from "@/components/site/page-animations";

// Unsplash: solar panels on rooftop at golden hour — distinct from home hero
const HERO_IMG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80&auto=format&fit=crop";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const services = ["Solar Installation","Solar Maintenance","Solar Repairs","Panel Cleaning","Battery Add-on","EV Chargers"];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[65vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img src={HERO_IMG} alt="" className="size-full object-cover object-center" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <Orb x="10%" y="20%" size={160} delay={0}   duration={7} />
        <Orb x="75%" y="15%" size={120} delay={1.2} duration={8} />
        <Orb x="55%" y="60%" size={140} delay={0.6} duration={6} />

        <div className="container mx-auto max-w-7xl px-4 py-24 md:py-36 text-white text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/20 border border-solar/40 text-solar text-xs font-semibold uppercase tracking-wider">
            Free Consultation
          </motion.span>
          <h1 className="mt-6 text-4xl md:text-6xl font-display font-extrabold" style={{ perspective: 800 }}>
            <WordReveal text="Get Your Free" delay={0.2} />
            {" "}
            <motion.span
              className="text-gradient-solar inline-block"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 80 }}
            >
              Solar Quote
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-5 text-lg text-slate-200 max-w-2xl mx-auto">
            Fill out the form for a no-obligation consultation. We'll respond within 24 hours.
          </motion.p>
        </div>
        <ScrollIndicator />
      </section>

      {/* MARQUEE */}
      <Marquee />

      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 p-8 md:p-10 rounded-3xl bg-card border border-border shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="size-16 mx-auto rounded-full bg-eco/20 grid place-items-center"><CheckCircle2 className="size-8 text-eco" /></div>
                <h2 className="mt-4 text-2xl font-display font-bold">Thanks! We'll be in touch.</h2>
                <p className="mt-2 text-muted-foreground">A solar specialist will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name"      name="name"    required placeholder="John Smith" />
                <Field label="Email Address"  name="email"   type="email" required placeholder="john@example.com" />
                <Field label="Phone Number"   name="phone"   type="tel"   required placeholder="(555) 000-0000" />
                <Field label="Address"        name="address" required placeholder="123 Main St, City, State" />
                <Select label="Property Type" name="property" options={["Residential","Commercial"]} />
                <Select label="Monthly Electricity Bill" name="bill" options={["$50-100","$100-200","$200-300","$300+"]} />
                <Select label="Roof Type" name="roof" options={["Asphalt","Tile","Metal","Flat","Other"]} />
                <Select label="Shade Condition" name="shade" options={["Full Sun","Partial Shade","Full Shade"]} />
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-card-foreground">Services Interested In</label>
                  <div className="mt-2 grid sm:grid-cols-2 gap-2">
                    {services.map((s) => (
                      <label key={s} className="flex items-center gap-2 text-sm text-card-foreground p-2 rounded-lg border border-border hover:bg-white/10 cursor-pointer">
                        <input type="checkbox" name="services" value={s} className="accent-solar" /> {s}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-card-foreground">Preferred Contact Method</label>
                  <div className="mt-2 flex gap-3">
                    {["Email","Phone","SMS"].map((c) => (
                      <label key={c} className="flex items-center gap-2 text-sm text-card-foreground px-4 py-2 rounded-full border border-border hover:bg-white/10 cursor-pointer">
                        <input type="radio" name="contact" value={c} className="accent-solar" /> {c}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-card-foreground">Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your property or any questions you have..."
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-solar text-sm" />
                </div>
                <button type="submit" className="sm:col-span-2 h-12 rounded-full gradient-solar text-navy font-semibold shadow-solar hover:scale-[1.01] transition-transform">
                  Submit Quote Request
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-display font-bold">Contact Info</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { icon: Phone, text: "(510) 980-0723" },
                  { icon: Mail, text: "info.solarnelectric@gmail.com" },
                  { icon: MapPin, text: "Austin, TX (HQ) · Nationwide" },
                  { icon: Clock, text: "Mon-Fri 8am-6pm · Sat 9am-2pm" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.li key={text} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex gap-3"><Icon className="size-5 text-solar flex-shrink-0" /> {text}</motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl gradient-solar text-navy">
              <h3 className="font-display font-bold">Why SolarCare?</h3>
              <ul className="mt-3 space-y-2 text-sm font-medium">
                {["Free estimates","No pressure sales","Licensed & insured","Financing available","25-year warranty","NABCEP certified"].map((x, i) => (
                  <motion.li key={x} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex gap-2"><CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" /> {x}</motion.li>
                ))}
              </ul>
            </motion.div>
            <div className="rounded-2xl overflow-hidden border border-border aspect-square bg-muted grid place-items-center text-muted-foreground text-sm">
              <div className="text-center"><MapPin className="size-10 mx-auto text-solar" /><div className="mt-2">Service Area Map</div></div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold text-card-foreground">{label}{required && <span className="text-solar">*</span>}</label>
      <input
        name={name} type={type} required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full h-11 px-4 rounded-xl border border-border focus:outline-none focus:border-solar text-sm"
      />
    </div>
  );
}
function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-semibold text-card-foreground">{label}</label>
      <select name={name} className="mt-1.5 w-full h-11 px-4 rounded-xl border border-border focus:outline-none focus:border-solar text-sm">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
