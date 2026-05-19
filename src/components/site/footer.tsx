import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logog.png";

const socials = [
  {
    href: "https://www.instagram.com/solarcare.electric?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr",
    label: "Instagram",
    icon: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@solarcare.electric?_r=1&_t=ZP-96JMOc0J7M7",
    label: "TikTok",
    icon: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-slate-200 mt-20">
      <div className="container mx-auto max-w-7xl px-4 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <img src={logo} alt="SolarCare Electric" className="h-10 w-auto object-contain" />
          <p className="mt-4 text-sm text-slate-400">
            Power Your Future with Clean Energy. Trusted solar partner serving homes and businesses across the USA.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="size-9 grid place-items-center rounded-full bg-white/10 hover:bg-solar hover:text-navy transition-colors">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {([["/", "Home"], ["/services", "Services"], ["/about", "About Us"], ["/faq", "FAQ"], ["/contact", "Contact"]] as [string, string][]).map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-solar transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-display font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {[
              { label: "Solar Installation", slug: "solar-installation" },
              { label: "Solar Maintenance",  slug: "solar-maintenance"  },
              { label: "Solar Repairs",      slug: "solar-repairs"      },
              { label: "Panel Cleaning",     slug: "panel-cleaning"     },
              { label: "Battery Add-on",     slug: "battery-storage"    },
              { label: "EV Chargers",        slug: "ev-chargers"        },
            ].map((s) => (
              <li key={s.slug}>
                <Link to="/service/$slug" params={{ slug: s.slug }} className="hover:text-solar transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-display font-semibold mb-4">Get In Touch</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-2"><Phone className="size-4 text-solar flex-shrink-0" /> (510) 980-0723</li>
            <li className="flex gap-2"><Mail className="size-4 text-solar flex-shrink-0" /> info@solarcare-electric.com</li>
            <li className="flex gap-2 items-center">
              <span className="size-4 flex-shrink-0 text-solar font-bold text-xs grid place-items-center">✓</span>
              CSLB #115592
            </li>
            <li className="flex gap-2"><MapPin className="size-4 text-solar flex-shrink-0" /> Nationwide, USA</li>
          </ul>
          <form className="mt-4 flex gap-2">
            <input type="email" placeholder="Your email"
              className="flex-1 px-3 h-10 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-solar" />
            <button className="px-4 h-10 rounded-lg gradient-solar text-navy font-semibold text-sm">Subscribe</button>
          </form>
        </div>

      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © 2025 SolarCare Electric. All Rights Reserved. &nbsp;|&nbsp; CSLB #115592
      </div>
    </footer>
  );
}
