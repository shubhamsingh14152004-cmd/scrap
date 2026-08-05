import { Link } from "@tanstack/react-router";
import { Recycle, Mail, Phone, MapPin, Instagram } from "lucide-react";
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

  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Recycle className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">My Scrap Buddy</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Trusted doorstep scrap collection & recycling service in Mumbai. Fair prices, instant payments.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground">Price List</Link></li>
            <li><Link to="/request-pickup" className="hover:text-foreground">Request Pickup</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Materials</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>E-Waste & Electronics</li>
            <li>Metals & Appliances</li>
            <li>Paper & Cardboard</li>
            <li>Plastics</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a
                href={`tel:${displayPhone.startsWith("+") ? "+" + displayPhone.replace(/[^0-9]/g, "") : "+91" + displayPhone.replace(/[^0-9]/g, "")}`}
                className="hover:underline"
              >
                {displayPhone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href={`mailto:${displayEmail}`} className="hover:underline">
                {displayEmail}
              </a>
            </li>

            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
              <span>{displayAddress}</span>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-primary" />
              <a href="https://instagram.com/myscrapbuddy" target="_blank" rel="noopener noreferrer" className="hover:underline">@myscrapbuddy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © 2026 My Scrap Buddy. All Rights Reserved.
      </div>
    </footer>
  );
}
