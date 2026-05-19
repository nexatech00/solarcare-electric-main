import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { ScrollProgress, Orb, Marquee, WordReveal, ScrollIndicator } from "@/components/site/page-animations";

const HERO_IMG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80&auto=format&fit=crop";

// ← Your WhatsApp number (international format, no + or spaces)
const WHATSAPP_NUMBER = "15109800723";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const services = ["Solar Installation","Solar Maintenance","Solar Repairs","Panel Cleaning","Battery Add-on","EV Chargers"];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name      = fd.get("name") as string;
    const email     = fd.get("email") as string;
    const phone     = fd.get("phone") as string;
    const address   = fd.get("address") as string;
    const property  = fd.get("property") as string;
    const bill      = fd.get("bill") as string;
    const roof      = fd.get("roof") as string;
    const shade     = fd.get("shade") as string;
    const contact   = fd.get("contact") as string;
    const message   = fd.get("message") as string;
    const checked   = services.filter((s) => fd.getAll("services").includes(s));

    const text = [
      `🌞 *New Solar Quote Request*`,
      ``,
      `👤 *Name:* ${name}`,
      `📧 *Email:* ${email}`,
      `📞 *Phone:* ${phone}`,
      `📍 *Address:* ${address}`,
      `🏠 *Property:* ${property}`,
      `💡 *Monthly Bill:* ${bill}`,
      `🏗️ *Roof Type:* ${roof}`,
      `☀️ *Shade:* ${shade}`,
      `📬 *Preferred Contact:* ${contact}`,
      `🔧 *Services:* ${checked.length ? checked.join(", ") : "None selected"}`,
      `💬 *Message:* ${message || "—"}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  }

  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[55vh] md:min-h-[65vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img src={HERO_IMG} alt="" className="size-full object-cover object-center" />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <Orb x="10%" y="20%" size={160} delay={0}   duration={7} />
        <Orb x="75%" y="15%" size={120} delay={1.2} duration={8} />
        <Orb x="55%" y="60%" size={140} delay={0.6} duration={6} />

        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-36 text-white text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/20 border border-solar/40 text-solar text-xs font-semibold uppercase tracking-wider">
            Free Consultation
          </motion.span>
          <h1 className="mt-4 text-3xl md:text-6xl font-display font-extrabold" style={{ perspective: 800 }}>
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
            className="mt-4 text-base md:text-lg text-slate-200 max-w-2xl mx-auto px-2">
            Fill out the form and we'll send your details directly via WhatsApp. We respond within 24 hours.
          </motion.p>
        </div>
        <ScrollIndicator />
      </section>

      {/* MARQUEE */}
      <Marquee />

      <section className="py-10 md:py-20">
        <div className="container mx-auto max-w-7xl px-3 sm:px-4 grid lg:grid-cols-3 gap-6 md:gap-10">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 p-5 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-card border border-border shadow-xl">

            {submitted ? (
              <div className="text-center py-12 px-4">
                <div className="size-16 mx-auto rounded-full bg-green-500/20 grid place-items-center">
                  <MessageCircle className="size-8 text-green-500" />
                </div>
                <h2 className="mt-4 text-2xl font-display font-bold">Sent via WhatsApp!</h2>
                <p className="mt-2 text-muted-foreground">Your quote request was opened in WhatsApp. We'll respond within 24 hours.</p>
                <button onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 h-11 rounded-full gradient-solar text-navy font-semibold text-sm">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <h2 className="col-span-full text-xl font-display font-bold mb-1">Quote Request Form</h2>

                <Field label="Full Name"     name="name"    required placeholder="John Smith" />
                <Field label="Email Address" name="email"   type="email" required placeholder="john@example.com" />
                <Field label="Phone Number"  name="phone"   type="tel"   required placeholder="(555) 000-0000" />
                <Field label="Address"       name="address" required placeholder="123 Main St, City, State" />
                <Select label="Property Type" name="property" options={["Residential","Commercial"]} />
                <Select label="Monthly Electricity Bill" name="bill" options={["$50-100","$100-200","$200-300","$300+"]} />
                <Select label="Roof Type"    name="roof"  options={["Asphalt","Tile","Metal","Flat","Other"]} />
                <Select label="Shade Condition" name="shade" options={["Full Sun","Partial Shade","Full Shade"]} />

                {/* Services */}
                <div className="col-span-full">
                  <label className="text-sm font-semibold text-card-foreground">Services Interested In</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <label key={s} className="flex items-center gap-2 text-sm text-card-foreground p-2.5 rounded-lg border border-border hover:bg-muted cursor-pointer">
                        <input type="checkbox" name="services" value={s} className="accent-solar flex-shrink-0" /> {s}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred contact */}
                <div className="col-span-full">
                  <label className="text-sm font-semibold text-card-foreground">Preferred Contact Method</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Email","Phone","SMS"].map((c) => (
                      <label key={c} className="flex items-center gap-2 text-sm text-card-foreground px-4 py-2 rounded-full border border-border hover:bg-muted cursor-pointer">
                        <input type="radio" name="contact" value={c} className="accent-solar" /> {c}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="col-span-full">
                  <label className="text-sm font-semibold text-card-foreground">Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your property or any questions..."
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-solar text-sm resize-none" />
                </div>

                <button type="submit"
                  className="col-span-full h-12 rounded-full gradient-solar text-navy font-semibold shadow-solar hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                  <MessageCircle className="size-5" />
                  Send via WhatsApp
                </button>
              </form>
            )}
          </motion.div>

          {/* SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5">

            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-display font-bold">Contact Info</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { icon: Phone, text: "(510) 980-0723" },
                  { icon: Mail,  text: "info@solarcare-electric.com" },
                  { icon: MapPin,text: "Nationwide, USA" },
                  { icon: Clock, text: "Mon-Fri 8am-6pm · Sat 9am-2pm" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.li key={text} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex gap-3 items-start">
                    <Icon className="size-5 text-solar flex-shrink-0 mt-0.5" /> {text}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl gradient-solar text-navy">
              <h3 className="font-display font-bold">Why SolarCare?</h3>
              <ul className="mt-3 space-y-2 text-sm font-medium">
                {["Free estimates","No pressure sales","Licensed & insured","Financing available","CSLB #115592","NABCEP certified"].map((x, i) => (
                  <motion.li key={x} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex gap-2 items-start">
                    <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" /> {x}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* WhatsApp direct button */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full h-12 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors">
              <MessageCircle className="size-5" />
              Chat on WhatsApp
            </a>

          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-card-foreground">
        {label}{required && <span className="text-solar ml-0.5">*</span>}
      </label>
      <input
        name={name} type={type} required={required} placeholder={placeholder}
        className="mt-1.5 w-full h-11 px-4 rounded-xl border border-border focus:outline-none focus:border-solar text-sm bg-background"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-semibold text-card-foreground">{label}</label>
      <select name={name}
        className="mt-1.5 w-full h-11 px-4 rounded-xl border border-border focus:outline-none focus:border-solar text-sm bg-background">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
