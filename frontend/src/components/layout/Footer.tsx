import { Link } from "@tanstack/react-router";
import { Recycle, Mail, Phone, MapPin, Instagram, ShieldCheck, Leaf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "../../lib/api";

export function Footer() {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const displayPhone = settings?.phoneNumber || "+91 85917 70877";
  const displayAddress = settings?.address || "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid, Mumbai – 400093, Maharashtra, India";
  const displayEmail = settings?.email || "myscrapbuddy6272@gmail.com";

  const cleanPhone = displayPhone.startsWith("+")
    ? "+" + displayPhone.replace(/[^0-9]/g, "")
    : "+91" + displayPhone.replace(/[^0-9]/g, "");

  return (
    <footer className="mt-20 border-t border-border/60 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        
        {/* Brand info */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white shadow-md">
              <Recycle className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              My Scrap Buddy
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mumbai's trusted doorstep scrap collection & e-waste recycling platform. Government authorized, fair rates, instant digital payments.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 pt-1">
            <ShieldCheck className="h-4 w-4" /> MPCB Authorized Recycler
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Services & Links</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home Pickup</Link></li>
            <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Live Price List</Link></li>
            <li><Link to="/request-pickup" className="hover:text-emerald-400 transition-colors">Book Free Pickup</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link to="/admin/login" className="hover:text-emerald-400 transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Categories Accepted */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Categories Accepted</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Construction Scrap & Renovation Waste</li>
            <li>Iron Rods, TMT & Industrial Steel</li>
            <li>E-Waste & IT Corporate Disposal</li>
            <li>Home & Office Furniture</li>
            <li>Metals (Copper, Brass, Aluminium)</li>
            <li>Appliance Recycling (AC, Fridges)</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Contact & Location</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
              <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                {displayPhone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
              <a href={`mailto:${displayEmail}`} className="hover:text-white transition-colors">
                {displayEmail}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{displayAddress}</span>
            </li>
            <li className="flex items-center gap-2.5 pt-1">
              <Instagram className="h-4 w-4 text-emerald-400 shrink-0" />
              <a
                href="https://instagram.com/myscrapbuddy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @myscrapbuddy
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* SEO Footer Cities Strip */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-[11px] text-slate-500">
        <span className="font-semibold text-slate-400">Serving Mumbai: </span> 
        Andheri East • Andheri West • MIDC • Powai • Saki Naka • Kurla • Bandra • Juhu • Malad • Goregaon • Borivali • Kandivali • Vile Parle • Santacruz • Central Mumbai
      </div>

      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © 2026 My Scrap Buddy. All Rights Reserved. Eco-Friendly Recycling Platform.
      </div>
    </footer>
  );
}
