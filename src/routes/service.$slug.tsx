import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ArrowLeft, ArrowRight, MessageCircle, User, Phone, Mail, MapPin, Home, Building2 } from "lucide-react";
import { ScrollProgress, Orb, WordReveal, ScrollIndicator } from "@/components/site/page-animations";
import { detailed } from "./services";

export const Route = createFileRoute("/service/$slug")({
  component: ServiceDetailPage,
});

const propertyTypes = ["Residential", "Commercial", "Industrial"];
const roofTypes = ["Asphalt Shingle", "Tile", "Metal", "Flat / TPO", "Other"];
const billRanges = ["Under $100", "$100 – $200", "$200 – $300", "$300 – $500", "Over $500"];
const timeframes = ["As soon as possible", "Within 1 month", "1–3 months", "Just exploring"];

// WhatsApp number — replace with real number (digits only, with country code)
const WHATSAPP_NUMBER = "15109800723";

function buildWhatsAppMessage(fields: Record<string, string>, serviceTitle: string) {
  return encodeURIComponent(
    `🌞 *SolarCare Electric — Service Request*\n\n` +
    `*Service:* ${serviceTitle}\n\n` +
    `👤 *Personal Details*\n` +
    `• Name: ${fields.name}\n` +
    `• Phone: ${fields.phone}\n` +
    `• Email: ${fields.email}\n` +
    `• Address: ${fields.address}\n\n` +
    `🏠 *Property Details*\n` +
    `• Property Type: ${fields.propertyType}\n` +
    `• Roof Type: ${fields.roofType}\n` +
    `• Monthly Bill: ${fields.bill}\n` +
    `• Timeframe: ${fields.timeframe}\n\n` +
    `💬 *Message*\n${fields.message || "No additional message."}\n\n` +
    `_Sent via SolarCare Electric website_`
  );
}

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = detailed.find((s) => s.slug === slug);

  if (!service) throw notFound();

  const Icon = service.icon;

  const [fields, setFields] = useState({
    name: "", phone: "", email: "", address: "",
    propertyType: propertyTypes[0], roofType: roofTypes[0],
    bill: billRanges[0], timeframe: timeframes[0], message: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildWhatsAppMessage(fields, service.title);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[65vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img src={service.heroImg} alt={service.title} className="size-full object-cover object-center" />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        {/* Floating orbs */}
        <Orb x="8%"  y="15%" size={160} delay={0}   duration={7} />
        <Orb x="78%" y="10%" size={120} delay={1.2} duration={9} />
        <Orb x="60%" y="60%" size={180} delay={0.5} duration={6} />

        <div className="container mx-auto max-w-7xl px-4 py-24 md:py-32 text-white relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/services" className="inline-flex items-center gap-2 text-slate-300 hover:text-solar transition-colors text-sm font-medium mb-6">
              <ArrowLeft className="size-4" /> Back to Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-solar/20 border border-solar/40 text-solar text-xs font-semibold uppercase tracking-wider mb-4">
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Icon className="size-3.5" />
            </motion.span>
            Solar Service
          </motion.div>

          <h1 className="mt-2 text-4xl md:text-6xl font-display font-extrabold max-w-3xl" style={{ perspective: 800 }}>
            <WordReveal text={service.title} delay={0.2} />
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-5 text-lg text-slate-200 max-w-2xl">
            {service.overview}
          </motion.p>
        </div>
        <ScrollIndicator />
      </section>

      {/* DETAIL + FORM */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 grid lg:grid-cols-5 gap-12">

          {/* LEFT — Service Detail */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-8">

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-display font-bold">About This Service</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>

            {/* Process / Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-sm font-bold uppercase tracking-wider text-solar mb-4">{service.listLabel}</h3>
              <ul className="space-y-3">
                {service.list.map((x, i) => (
                  <motion.li key={x}
                    initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                    className="flex gap-3 text-sm">
                    <CheckCircle2 className="size-4 text-eco flex-shrink-0 mt-0.5" /> {x}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 rounded-2xl gradient-solar text-navy">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {service.benefits.map((x, i) => (
                  <motion.li key={x}
                    initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                    className="flex gap-3 text-sm font-medium">
                    <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" /> {x}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Other services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Other Services</h3>
              <div className="flex flex-wrap gap-2">
                {detailed.filter((s) => s.slug !== slug).map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 150 }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/service/$slug" params={{ slug: s.slug }}
                      className="px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium hover:border-solar hover:text-solar transition-colors inline-block">
                      {s.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — WhatsApp Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3">
            <div className="sticky top-24 p-8 md:p-10 rounded-3xl bg-card border border-border shadow-xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="size-12 rounded-xl gradient-solar grid place-items-center shadow-solar">
                  <MessageCircle className="size-6 text-navy" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold">Request This Service</h2>
                  <p className="text-sm text-muted-foreground">We'll reply on WhatsApp within 1 hour</p>
                </div>
              </div>

              {/* Auto-selected service badge */}
              <motion.div
                className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-solar/10 border border-solar/30"
                animate={{ boxShadow: ["0 0 0 0 rgba(236,195,67,0)", "0 0 0 6px rgba(236,195,67,0.2)", "0 0 0 0 rgba(236,195,67,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <motion.div
                  animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Icon className="size-5 text-solar flex-shrink-0" />
                </motion.div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Selected Service</div>
                  <div className="font-display font-bold text-solar">{service.title}</div>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Details */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <User className="size-3.5" /> Personal Details
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "name",    icon: <User className="size-4" />,  label: "Full Name",        type: "text",  placeholder: "John Smith" },
                      { key: "phone",   icon: <Phone className="size-4" />, label: "Phone Number",     type: "tel",   placeholder: "+1 (555) 000-0000" },
                      { key: "email",   icon: <Mail className="size-4" />,  label: "Email Address",    type: "email", placeholder: "john@example.com" },
                      { key: "address", icon: <MapPin className="size-4" />,label: "Property Address", type: "text",  placeholder: "123 Main St, City, State" },
                    ].map(({ key, icon, label, type, placeholder }, i) => (
                      <motion.div key={key}
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}>
                        <FormField icon={icon} label={label} required>
                          <input
                            type={type} required placeholder={placeholder}
                            value={fields[key as keyof typeof fields]} onChange={set(key)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl bg-background border border-border focus:outline-none focus:border-solar text-sm transition-colors" />
                        </FormField>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <Building2 className="size-3.5" /> Property Details
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0, type: "spring", stiffness: 100 }}>
                      <label className="text-sm font-semibold block mb-1.5">Property Type</label>
                      <div className="flex gap-2 flex-wrap">
                        {propertyTypes.map((t) => (
                          <button key={t} type="button"
                            onClick={() => setFields((f) => ({ ...f, propertyType: t }))}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${fields.propertyType === t ? "gradient-solar text-navy border-solar shadow-solar" : "border-border hover:border-solar"}`}>
                            {t === "Residential" ? <Home className="size-3.5 inline mr-1" /> : <Building2 className="size-3.5 inline mr-1" />}
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                    {[
                      { label: "Roof Type",                value: fields.roofType,  onChange: set("roofType"),  options: roofTypes },
                      { label: "Monthly Electricity Bill", value: fields.bill,      onChange: set("bill"),      options: billRanges },
                      { label: "Preferred Timeframe",      value: fields.timeframe, onChange: set("timeframe"), options: timeframes },
                    ].map(({ label, value, onChange, options }, i) => (
                      <motion.div key={label}
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: (i + 1) * 0.08, type: "spring", stiffness: 100 }}>
                        <SelectField label={label} value={value} onChange={onChange} options={options} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-semibold block mb-1.5">Additional Message <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <textarea
                    rows={3} placeholder="Any specific questions or details about your property..."
                    value={fields.message} onChange={set("message")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-solar text-sm transition-colors resize-none" />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 30px -8px rgba(236,195,67,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-14 rounded-full gradient-solar text-navy font-bold text-base shadow-solar flex items-center justify-center gap-3">
                  <MessageCircle className="size-5" />
                  Send via WhatsApp
                  <ArrowRight className="size-4" />
                </motion.button>
                <p className="text-center text-xs text-muted-foreground">
                  Clicking will open WhatsApp with your details pre-filled. We respond within 1 hour.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function FormField({ icon, label, required, children }: { icon: React.ReactNode; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold block mb-1.5">
        {label}{required && <span className="text-solar ml-0.5">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-semibold block mb-1.5">{label}</label>
      <select value={value} onChange={onChange}
        className="w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:border-solar text-sm transition-colors">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
