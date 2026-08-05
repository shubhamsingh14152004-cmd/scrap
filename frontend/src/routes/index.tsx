import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Scale,
  Wallet,
  ShieldCheck,
  Recycle,
  Cpu,
  Newspaper,
  Refrigerator,
  ArrowRight,
  Leaf,
  Star,
  Home,
  Building2,
  Armchair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const steps = [
  { icon: Truck, title: "Book a Pickup", desc: "Schedule a free doorstep pickup online in a few clicks." },
  { icon: Scale, title: "Transparent Weighing", desc: "Digital weighing at your doorstep — no hidden deductions." },
  { icon: Wallet, title: "Instant Payment", desc: "Get paid instantly at the best market rates, UPI or cash." },
];

const materials = [
  {
    icon: Home,
    title: "Home Scrap",
    desc: "Paper, plastics, cardboard, books, newspapers, glass bottles, and other household scrap materials.",
    badge: "₹500 Min. Pickup Charge",
  },
  {
    icon: Building2,
    title: "Office Scrap",
    desc: "Bulk paperwork, office files, IT components, computer systems, printers, cables, and institutional scrap.",
  },
  {
    icon: Armchair,
    title: "Old & Garbage Furniture",
    desc: "Sofa sets, office chairs, dining tables, wooden cabinets, plastic chairs, metal tables, and bulky furniture items.",
  },
  {
    icon: Cpu,
    title: "E-Waste",
    desc: "Laptops, mobile phones, servers, UPS, printers, power banks, chargers, and electronic components.",
  },
  {
    icon: Refrigerator,
    title: "Appliances",
    desc: "Refrigerators, washing machines, air conditioners, microwaves, and large home/office appliances.",
  },
  {
    icon: Recycle,
    title: "Metals & Alloys",
    desc: "Iron, steel, copper wiring, brass, aluminium, battery scraps, and alloy metal items.",
  },
];

const stats = [
  { value: "50K+", label: "Pickups Completed" },
  { value: "12K+", label: "Tonnes Recycled" },
  { value: "98%", label: "Happy Customers" },
  { value: "24h", label: "Avg. Pickup Time" },
];

const features = [
  { icon: ShieldCheck, title: "Government Authorized", desc: "Fully compliant, licensed e-waste recycler with proper documentation." },
  { icon: Wallet, title: "Best Market Prices", desc: "Competitive, transparent rates updated daily for every material." },
  { icon: Truck, title: "Free Doorstep Pickup", desc: "We collect directly from your home, office or society — no transport hassle." },
  { icon: Leaf, title: "Eco-Friendly Process", desc: "Responsible recycling that reduces landfill and carbon footprint." },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Organized scrap and e-waste at a recycling facility"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur">
              <Leaf className="h-3.5 w-3.5" /> Government Authorized E-Waste Recycler
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl md:text-6xl">
              Mumbai's Trusted Scrap Buyer
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
              Get the best price for household, office, industrial and construction scrap with fast doorstep pickup across Mumbai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="hero">
                <Link to="/request-pickup">
                  Book a Pickup <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
              >
                <Link to="/pricing">View Price List</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-14 sm:-mt-16 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-elegant md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            Selling scrap has never been this simple. Three easy steps, zero hassle.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Card key={step.title} className="relative p-8 shadow-card transition-transform hover:-translate-y-1">
              <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-secondary">
                0{i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">What we accept</h2>
            <p className="mt-3 text-muted-foreground">
              From a single item to bulk scrap — we recycle it all responsibly.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((m) => (
              <Card key={m.title} className="relative overflow-hidden p-6 shadow-card transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <m.icon className="h-5 w-5" />
                  </span>
                  {m.badge && (
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400 dark:bg-amber-500/20 border border-amber-500/20 shadow-sm animate-pulse">
                      {m.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold">{m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Why choose My Scrap Buddy?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We combine fair pricing, reliable logistics and full compliance to give
              you a smooth, eco-friendly recycling experience every single time.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="bg-gradient-hero p-10 text-primary-foreground shadow-elegant">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 text-xl font-medium leading-relaxed">
              “My Scrap Buddy made clearing our office e-waste effortless. Fair rates,
              on-time pickup and instant payment. Highly recommended.”
            </blockquote>
            <div className="mt-6 text-sm text-primary-foreground/80">
              — Priya Nair, Facilities Manager, Mumbai
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <Card className="overflow-hidden bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant md:p-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to turn your scrap into cash?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Book a free pickup today and get the best price for your recyclables.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-8 border-white/40 bg-white/15 text-primary-foreground hover:bg-white/25 hover:text-primary-foreground"
          >
            <Link to="/request-pickup">
              Book a Pickup <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
