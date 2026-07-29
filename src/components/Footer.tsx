import { Link } from "@tanstack/react-router";
import { Recycle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Recycle className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">ScrapWise</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Government authorized scrap & e-waste recycling. Doorstep pickup,
            transparent weighing, instant payment.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-foreground">Price List</Link></li>
            <li><Link to="/request-pickup" className="hover:text-foreground">Request Pickup</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
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
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 97696 70346</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@scrapwise.in</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Mumbai, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ScrapWise Recycling Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}
