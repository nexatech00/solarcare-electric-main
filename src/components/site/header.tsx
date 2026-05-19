import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Menu, X, ChevronDown, Zap, Wrench, Cog, Sparkles, BatteryCharging, Plug, Phone, Mail } from "lucide-react";
import { useTheme } from "./theme-provider";
import logo from "@/assets/logog.png";

const socials = [
  {
    href: "https://www.instagram.com/solarcare.electric?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr",
    label: "Instagram",
    icon: (
      <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@solarcare.electric?_r=1&_t=ZP-96JMOc0J7M7",
    label: "TikTok",
    icon: (
      <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
];

const serviceLinks = [
  { slug: "solar-installation",  label: "Solar Installation",    icon: Zap,            desc: "Custom systems for homes & businesses" },
  { slug: "solar-maintenance",   label: "Solar Maintenance",     icon: Cog,            desc: "Keep your system at peak efficiency" },
  { slug: "solar-repairs",       label: "Solar Repairs",         icon: Wrench,         desc: "Fast diagnosis & same-week repairs" },
  { slug: "panel-cleaning",      label: "Panel Cleaning",        icon: Sparkles,       desc: "Restore output with eco-friendly cleaning" },
  { slug: "battery-storage",     label: "Battery Storage",       icon: BatteryCharging,desc: "Store energy & power through outages" },
  { slug: "ev-chargers",         label: "EV Chargers",           icon: Plug,           desc: "Charge your EV with clean solar energy" },
];

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top stripe — social, phone & email */}
      <div className="bg-navy text-white text-xs">
        <div className="container mx-auto max-w-7xl px-4 py-1.5 sm:py-0 sm:h-9 flex items-center justify-between gap-2">
          {/* Social icons — left side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="size-6 grid place-items-center rounded-full bg-white/10 hover:bg-solar hover:text-navy transition-colors">
                {s.icon}
              </a>
            ))}
          </div>
          {/* Contact info — right side */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4">
            <a href="tel:5109800723" className="flex items-center gap-1.5 hover:text-solar transition-colors whitespace-nowrap">
              <Phone className="size-3.5 flex-shrink-0" />
              <span>(510) 980-0723</span>
            </a>
            <a href="mailto:info@solarcareelectric.com" className="flex items-center gap-1.5 hover:text-solar transition-colors">
              <Mail className="size-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">info@solarcareelectric.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
          </div>
        </div>
      </div>
      <div className="backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SolarCare Electric" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "!text-foreground" }} activeOptions={{ exact: true }}>
            Home
          </Link>

          {/* Services dropdown */}
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setDropOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              aria-expanded={dropOpen}>
              Services
              <ChevronDown className={`size-4 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
            </button>

            {dropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] rounded-2xl bg-background border border-border shadow-2xl p-4 grid grid-cols-2 gap-2">
                {/* All services link */}
                <Link to="/services" onClick={() => setDropOpen(false)}
                  className="col-span-2 flex items-center justify-between px-4 py-3 rounded-xl gradient-solar text-navy font-semibold text-sm mb-1 hover:scale-[1.01] transition-transform shadow-solar">
                  View All Services
                  <ChevronDown className="size-4 -rotate-90" />
                </Link>
                {serviceLinks.map((s) => (
                  <Link key={s.slug} to="/service/$slug" params={{ slug: s.slug }} onClick={() => setDropOpen(false)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                    <div className="size-9 rounded-lg gradient-solar grid place-items-center flex-shrink-0 shadow-solar group-hover:scale-110 transition-transform">
                      <s.icon className="size-4 text-navy" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-tight">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {nav.slice(1).map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "!text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme"
            className="size-10 grid place-items-center rounded-full hover:bg-muted transition-colors">
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 px-5 h-10 rounded-full gradient-solar text-navy font-semibold text-sm shadow-solar hover:scale-105 transition-transform">
            Free Quote
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden size-10 grid place-items-center rounded-full hover:bg-muted">
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-muted text-sm font-medium">
              Home
            </Link>

            {/* Mobile services accordion */}
            <div>
              <button onClick={() => setMobileServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-muted text-sm font-medium">
                Services
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-solar/30 pl-3">
                  <Link to="/services" onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                    className="px-3 py-2 rounded-lg hover:bg-muted text-sm font-semibold text-solar">
                    All Services
                  </Link>
                  {serviceLinks.map((s) => (
                    <Link key={s.slug} to="/service/$slug" params={{ slug: s.slug }}
                      onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
                      <s.icon className="size-4 text-solar flex-shrink-0" />
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {nav.slice(1).map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-muted text-sm font-medium">
                {n.label}
              </Link>
            ))}

            <Link to="/contact" onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 h-11 rounded-full gradient-solar text-navy font-semibold text-sm grid place-items-center">
              Get Free Quote
            </Link>
          </nav>
        </div>
      )}
      </div>{/* end backdrop-blur wrapper */}
    </header>
  );
}
