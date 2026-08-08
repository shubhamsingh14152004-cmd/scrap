import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Truck,
  Scale,
  Wallet,
  ShieldCheck,
  Recycle,
  Cpu,
  Refrigerator,
  ArrowRight,
  Leaf,
  Star,
  Home,
  Building2,
  Armchair,
  Building,
  Layers,
  HelpCircle,
  ChevronDown,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import heroImg from "@/assets/hero.jpg";
import { CategoryDetailModal, type CategoryDetailData } from "@/components/home/CategoryDetailModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Scrap Buddy | Doorstep Scrap & E-Waste Pickup in Mumbai" },
      {
        name: "description",
        content:
          "Sell household scrap, office scrap, construction waste, iron rods, steel, e-waste & appliances in Mumbai. Free doorstep pickup, digital weighing & instant UPI payment.",
      },
      {
        name: "keywords",
        content:
          "scrap buyer Mumbai, doorstep scrap pickup, scrap collection Mumbai, e-waste recycling Mumbai, plastic recycling, paper recycling, metal scrap buyer, office scrap pickup, construction scrap buyer, My Scrap Buddy",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "My Scrap Buddy | Doorstep Scrap & E-Waste Pickup in Mumbai" },
      {
        property: "og:description",
        content:
          "Government authorized scrap buyer in Mumbai. Fast doorstep pickup, transparent digital weighing & instant payouts.",
      },
      { property: "og:url", content: "https://scrapbuddy.org" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "My Scrap Buddy — Mumbai's Trusted Doorstep Scrap & E-Waste Pickup" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "My Scrap Buddy | Doorstep Scrap & E-Waste Pickup in Mumbai" },
      {
        name: "twitter:description",
        content:
          "Government authorized scrap buyer in Mumbai. Fast doorstep pickup, transparent digital weighing & instant payouts.",
      },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://scrapbuddy.org" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Truck, title: "1. Book a Free Pickup", desc: "Select your scrap items & schedule a convenient doorstep pickup online or via WhatsApp." },
  { icon: Scale, title: "2. ISO Digital Weighing", desc: "Our verified executive weighs your material using certified digital scales at your location." },
  { icon: Wallet, title: "3. Instant Payout", desc: "Receive immediate full payment through UPI, Net Banking or Cash before we load your scrap." },
];

const categoryList: CategoryDetailData[] = [
  {
    id: "construction_scrap",
    title: "Construction Scrap",
    icon: Building,
    badge: "Bulk Disposal Support",
    description: "Comprehensive demolition & renovation waste pickup for construction sites, contractors, and building renovations across Mumbai.",
    acceptedMaterials: [
      "Tiles & Ceramic Waste",
      "PVC Pipes & Fittings",
      "Doors & Window Frames",
      "Wood & Plywood Scraps",
      "Aluminium Window Frames",
      "Demolition Waste & Bricks",
      "Metal Structural Frames",
      "Renovation Debris",
    ],
    rejectedMaterials: [
      "Hazardous Asbestos",
      "Toxic Chemical Drums",
      "Wet Wet Concrete Slurry",
      "Bio-hazardous Waste",
    ],
    pickupProcess: [
      "Site assessment & volume estimate",
      "Dedicated mini-truck deployment",
      "On-site weighing & instant digital settlement",
    ],
    estimatedPricingNote: "Pricing varies by material segregation, quantity (per ton / brass), and loading labor requirements.",
    safetyNotes: "Safety gear and site compliance documentation provided for high-rise or commercial site clearances.",
  },
  {
    id: "iron_rods_steel",
    title: "Iron Rods & Steel",
    icon: Layers,
    badge: "Highest Market Rates",
    description: "Heavy metal scrap collection for construction sites, fabrication yards, factories, and residential renovation sites.",
    acceptedMaterials: [
      "TMT Bars & Rebar",
      "Steel Rods & Beams",
      "Iron Pipes & Tubes",
      "Iron Angles & Channels",
      "Heavy Industrial Steel",
      "MS (Mild Steel) Scrap",
      "Iron Sheets & Plates",
      "Scaffoldings & Trusses",
    ],
    rejectedMaterials: [
      "Radioactive Metals",
      "Pressurized Sealed Gas Cylinders",
      "Corroded Heavy Slag",
    ],
    pickupProcess: [
      "Heavy load logistics arrangement",
      "Digital crane/hanging scale weighing",
      "Instant bank transfer / cash handover",
    ],
    estimatedPricingNote: "Iron and steel rates are updated daily matching Mandi & Mumbai foundry market rates (₹30 – ₹45+/kg).",
    safetyNotes: "Industrial loading cranes & experienced crew supplied for heavy tonnage loads above 500 kg.",
  },
  {
    id: "home_scrap",
    title: "Home Scrap",
    icon: Home,
    badge: "₹500 Min. Pickup Charge",
    description: "Convenient household scrap clearing for apartments, housing societies, and bungalows.",
    acceptedMaterials: [
      "Old Newspapers & Magazines",
      "Cardboard & Cartons",
      "Used Books & Notebooks",
      "Plastic Bottles & Buckets",
      "Old Utensils & Cookware",
      "Glass Bottles & Jars",
      "Unused Household Metals",
    ],
    rejectedMaterials: [
      "Wet Kitchen Waste",
      "Garbage & Organic Compost",
      "Medical / Pharmacy Waste",
    ],
    pickupProcess: [
      "Select date & 3-hour slot",
      "Verified buddy collects from doorstep",
      "Instant UPI payment to your phone",
    ],
    estimatedPricingNote: "Standard per kg rates apply for paper, cardboard, and domestic plastic recyclables.",
  },
  {
    id: "office_scrap",
    title: "Office & Corporate Scrap",
    icon: Building2,
    badge: "GST Invoice Available",
    description: "End-to-end corporate office dismantling, IT asset retirement, paper shredding, and bulk furniture scrap collection.",
    acceptedMaterials: [
      "Bulk Confidential Papers & Files",
      "Desktop Computers & Monitors",
      "Servers, Switches & Routers",
      "Printers & Toner Cartridges",
      "Networking Cables & Wires",
      "Office Workstations & Chairs",
    ],
    rejectedMaterials: [
      "Hazardous Fluorescent Light Tubes without casing",
      "Batteries with leakage",
    ],
    pickupProcess: [
      "Official NDA & Quotation approval",
      "Scheduled weekend/after-hours pickup",
      "Form-10 Recycling Certificate provided",
    ],
    estimatedPricingNote: "Custom bulk contract rates with optional certified secure data destruction documentation.",
    safetyNotes: "Compliant with CPCB & MPCB environmental e-waste disposal guidelines.",
  },
  {
    id: "furniture_scrap",
    title: "Old & Garbage Furniture",
    icon: Armchair,
    badge: "Bulky Item Clearance",
    description: "Easy disposal of old, broken, or unwanted wooden, metal, and plastic furniture from homes & commercial spaces.",
    acceptedMaterials: [
      "Sofa Sets & Couches",
      "Office Chairs & Executive Desks",
      "Dining Tables & Chairs",
      "Wooden Cabinets & Wardrobes",
      "Plastic Tables & Stools",
      "Metal Bed Frames & Racks",
    ],
    rejectedMaterials: [
      "Infested Termite Debris",
      "Waterlogged Rotten Wood Powder",
    ],
    pickupProcess: [
      "Dismantling by trained personnel",
      "Vehicle loading & transportation",
      "Lump-sum per piece valuation",
    ],
    estimatedPricingNote: "Valued per piece depending on material condition, wood type, and reusability.",
  },
  {
    id: "e_waste",
    title: "E-Waste & Electronics",
    icon: Cpu,
    badge: "Government Certified",
    description: "Responsible electronic waste recycling for obsolete gadgets, circuit boards, and electrical appliances.",
    acceptedMaterials: [
      "Laptops & MacBooks",
      "Smartphones & Tablets",
      "Motherboards & RAM Cards",
      "Power Banks & Chargers",
      "UPS Systems & Batteries",
      "Keyboards, Mice & Speakers",
    ],
    rejectedMaterials: [
      "Leaking Lead Batteries",
      "Broken CRT Glass Tubes",
    ],
    pickupProcess: [
      "Serial number log verification",
      "Safe anti-static handling",
      "Immediate digital payment",
    ],
    estimatedPricingNote: "Laptops (up to ₹450+/pc), Mobile phones (up to ₹120+/pc), Motherboards (per kg).",
    safetyNotes: "Guaranteed zero-landfill e-waste processing at government authorized facilities.",
  },
  {
    id: "appliances",
    title: "Home Appliances",
    icon: Refrigerator,
    badge: "Instant Cash Payout",
    description: "Doorstep pickup for large defective or old household and commercial electrical appliances.",
    acceptedMaterials: [
      "Refrigerators & Freezers",
      "Washing Machines (Front & Top Load)",
      "Split & Window Air Conditioners",
      "Microwave Ovens & Geysers",
      "Water Coolers & Purifiers",
    ],
    rejectedMaterials: [
      "Stripped Compressors without copper coils",
      "Plastic-only shell casings",
    ],
    pickupProcess: [
      "Uninstallation support (upon request)",
      "Direct vehicle loading",
      "Spot cash or UPI payout",
    ],
    estimatedPricingNote: "ACs (up to ₹2,200/pc), Refrigerators (up to ₹1,600/pc), Washing machines (up to ₹1,200/pc).",
  },
  {
    id: "metals_alloys",
    title: "Metals & Alloys",
    icon: Recycle,
    badge: "Daily Live Rates",
    description: "High-value non-ferrous and ferrous metal recycling for domestic scrap and industrial workshops.",
    acceptedMaterials: [
      "Copper Wires & Armored Cables",
      "Brass Utensils & Fittings",
      "Aluminium Utensils & Sheets",
      "Lead & Inverter Batteries",
      "Stainless Steel Utensils",
      "Cast Iron & Alloy Scraps",
    ],
    rejectedMaterials: [
      "Explosive Shells & Ordnance",
      "Radioactive Contaminated Metals",
    ],
    pickupProcess: [
      "Precision digital scale weighing",
      "Purity inspection on spot",
      "Instant high-value payment",
    ],
    estimatedPricingNote: "Copper (up to ₹620/kg), Brass (up to ₹380/kg), Aluminium (up to ₹115/kg), Iron (up to ₹30/kg).",
  },
];

const stats = [
  { value: "50,000+", label: "Successful Pickups" },
  { value: "12,500+", label: "Tonnes Recycled" },
  { value: "99.2%", label: "Customer Satisfaction" },
  { value: "Under 24h", label: "Doorstep Service Time" },
];

const features = [
  { icon: ShieldCheck, title: "Government Authorized", desc: "Fully licensed by Pollution Control Board for eco-friendly recycling & e-waste handling." },
  { icon: Wallet, title: "Daily Live Market Rates", desc: "Fair daily pricing with zero hidden deductions or transport fees." },
  { icon: Truck, title: "Free Doorstep Pickup", desc: "We collect directly from your home, office, society or construction site." },
  { icon: Leaf, title: "Zero Landfill Mission", desc: "100% responsible recycling reducing carbon footprint across Mumbai." },
];

const mumbaiAreas = [
  "Andheri East", "Andheri West", "MIDC", "Powai", "Saki Naka", 
  "Kurla", "Bandra", "Juhu", "Malad", "Goregaon", 
  "Borivali", "Kandivali", "Vile Parle", "Santacruz"
];

const faqs = [
  {
    q: "What is My Scrap Buddy?",
    a: "My Scrap Buddy is Mumbai's leading digital scrap buying and doorstep recycling service. We buy household scrap, office scrap, construction waste, iron rods, steel, e-waste, metals, appliances, and furniture at transparent live market rates.",
  },
  {
    q: "How do I schedule a scrap pickup in Mumbai?",
    a: "Click on 'Book a Pickup' on our website, fill out your address and material details, select your preferred date/time slot, and our executive will arrive at your doorstep within 24 hours.",
  },
  {
    q: "What scrap materials do you accept?",
    a: "We accept Paper, Cardboard, Plastics, Construction Scrap, Iron Rods & Steel, E-Waste (Laptops, Mobiles, CPUs), Appliances (ACs, Fridges, Washing Machines), Furniture, and High-Value Metals (Copper, Brass, Aluminium, Batteries).",
  },
  {
    q: "How does payment work?",
    a: "Payment is instant! As soon as our pickup executive weighs your scrap with ISO-certified digital scales, payment is sent directly via UPI, Google Pay, PhonePe, Bank Transfer, or Cash on the spot.",
  },
  {
    q: "Is there any delivery or pickup charge?",
    a: "No! Doorstep pickup is completely free across Mumbai for standard scrap quantities. For small home scrap orders under minimum weight threshold, a minor ₹500 min order value note applies.",
  },
  {
    q: "Do you service commercial buildings and construction sites in Mumbai?",
    a: "Yes! We specialize in bulk commercial, office dismantling, and construction site scrap clearance in MIDC, Andheri, Powai, Kurla, Bandra, and across Mumbai with full GST billing and recycling certificates.",
  },
];

function Index() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetailData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCategory = (cat: CategoryDetailData) => {
    setSelectedCategory(cat);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Category Detail Modal */}
      <CategoryDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src={heroImg}
          alt="Organized scrap and e-waste recycling facility in Mumbai"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-emerald-950/80" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
              <Leaf className="h-4 w-4 text-emerald-400" /> Government Authorized E-Waste & Scrap Recycler
            </span>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-6xl leading-[1.15]">
              Mumbai's Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">Doorstep Scrap</span> & E-Waste Buyer
            </h1>
            
            <p className="max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Get maximum value for household, office, industrial, construction scrap, iron rods & e-waste. Free doorstep pickup, digital weighing & instant UPI payouts across Mumbai.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" variant="hero" className="shadow-xl shadow-emerald-600/20 text-sm font-semibold">
                <Link to="/request-pickup" className="flex items-center gap-2">
                  Book Free Pickup <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:text-white backdrop-blur-md text-sm font-semibold"
              >
                <Link to="/pricing">View Live Price List</Link>
              </Button>
            </div>

            {/* Quick trust badges */}
            <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 100% Free Doorstep Collection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Spot UPI & Cash Payout
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> ISO Certified Digital Scales
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="relative z-10 mx-auto -mt-10 sm:-mt-12 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-2xl backdrop-blur-xl md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{s.value}</div>
              <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            Effortless Recycling
          </Badge>
          <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground">How Doorstep Pickup Works</h2>
          <p className="text-sm text-muted-foreground">
            Selling your scrap in Mumbai takes less than 2 minutes. Transparent, fair, and fast.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Card key={step.title} className="relative p-8 border-border/60 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group">
              <span className="absolute right-6 top-6 font-display text-4xl font-black text-emerald-500/15 group-hover:text-emerald-500/30 transition-colors">
                0{i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md">
                <step.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Categories Section */}
      <section className="bg-secondary/40 py-20 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              Interactive Catalog
            </Badge>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground">What Scrap We Accept</h2>
            <p className="text-sm text-muted-foreground">
              Click any category card below to view accepted items, rejected materials, pickup process & estimated rates.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryList.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Card
                  key={cat.id}
                  onClick={() => handleOpenCategory(cat)}
                  className="group relative cursor-pointer overflow-hidden p-6 border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-500/40 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                        <IconComp className="h-6 w-6" />
                      </span>
                      {cat.badge && (
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        {cat.title}
                        <Sparkles className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity" />
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>View Accepted Items</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local SEO Mumbai Coverage Banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-8 sm:p-10 text-white rounded-3xl border-slate-800 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <MapPin className="h-4 w-4" /> Mumbai Service Coverage
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Doorstep Scrap Pickup Across All Mumbai Localities
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you need residential scrap collection in Powai, corporate IT e-waste clearing in MIDC Andheri East, or construction scrap disposal in Bandra and Goregaon — our fleet is at your service 7 days a week.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {mumbaiAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-lg bg-slate-800/80 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-300 border border-slate-700/60 transition-colors"
                  >
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              Why My Scrap Buddy
            </Badge>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground">
              Transparent, Professional & Certified Scrap Recycling
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We combine daily updated market pricing, licensed eco-friendly logistics, and digital weighing scales to ensure you receive 100% fair valuation for every kilogram.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 pt-2">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{f.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-hero p-8 sm:p-10 text-primary-foreground shadow-elegant rounded-3xl">
            <div className="flex items-center gap-1 text-amber-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 text-lg sm:text-xl font-medium leading-relaxed">
              “My Scrap Buddy made clearing our office e-waste & construction renovation scrap effortless. Fair rates, on-time pickup in MIDC Andheri, and instant UPI payment.”
            </blockquote>
            <div className="mt-6 text-xs text-primary-foreground/80 font-semibold">
              — Priya Nair, Facilities Manager, Andheri East, Mumbai
            </div>
          </Card>
        </div>
      </section>

      {/* AEO / GEO Conversational FAQ Section */}
      <section className="bg-secondary/30 py-20 border-t border-border/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <HelpCircle className="h-3.5 w-3.5 mr-1" /> Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-foreground">
              Everything You Need To Know
            </h2>
            <p className="text-sm text-muted-foreground">
              Learn about our Mumbai doorstep pickup process, accepted recyclables, and instant payout policies.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="rounded-2xl border border-border/70 bg-card px-6 py-2 shadow-sm"
              >
                <AccordionTrigger className="text-left font-bold text-sm hover:no-underline text-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Card className="overflow-hidden bg-gradient-primary p-10 text-center text-primary-foreground shadow-2xl rounded-3xl md:p-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready To Turn Your Scrap Into Instant Cash?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90 text-sm sm:text-base">
            Book a free doorstep pickup today across Mumbai. Transparent rates, digital weighing, and zero transport charges.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/15 text-primary-foreground hover:bg-white/25 hover:text-primary-foreground font-semibold"
            >
              <Link to="/request-pickup" className="flex items-center gap-2">
                Book Doorstep Pickup Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
