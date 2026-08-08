import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Scale, Wallet, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/scrap-pickup")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup Service in Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Book free doorstep scrap pickup in Mumbai with ScrapBuddy. Instant UPI payment, ISO digital scales, and market rates for household, office, e-waste & metal scrap.",
      },
      {
        name: "keywords",
        content:
          "scrap pickup, scrap pickup near me, doorstep scrap collection Mumbai, sell scrap online Mumbai, kabadiwala service Mumbai, doorstep scrap buyer",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup Service in Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content:
          "Convenient doorstep scrap collection service across Mumbai. Free pickup, digital weighing scales, and instant UPI payouts.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/scrap-pickup" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup Service in Mumbai | ScrapBuddy" },
      {
        name: "twitter:description",
        content: "Book doorstep scrap collection across Mumbai in under 2 minutes.",
      },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/scrap-pickup" }],
  }),
  component: ScrapPickupPage,
});

const acceptedItems = [
  "Newspapers & Magazines",
  "Cardboard Boxes & Packaging",
  "Old Books & Office Paper",
  "Plastic Bottles & Containers",
  "Iron Rods, TMT & Steel",
  "Copper Wires & Brass Fittings",
  "Aluminium Windows & Frames",
  "Laptops, Mobiles & Computer E-Waste",
  "ACs, Refrigerators & Washing Machines",
  "Wooden & Metal Office Furniture",
];

const faqs = [
  {
    q: "How does doorstep scrap pickup work in Mumbai?",
    a: "Booking is simple: 1) Fill out our online pickup form or WhatsApp us. 2) Our verified executive arrives at your doorstep on your selected slot with ISO-certified digital scales. 3) Receive instant payment via UPI or Cash right on the spot.",
  },
  {
    q: "Is there any delivery or pickup fee?",
    a: "No! Doorstep pickup is completely free across Mumbai for standard scrap quantities.",
  },
  {
    q: "How are scrap materials weighed?",
    a: "Our executives use calibrated ISO-certified digital hanging scales to weigh your material in front of you for 100% transparency.",
  },
  {
    q: "Which areas in Mumbai do you cover for scrap pickup?",
    a: "We service all major Mumbai localities including Andheri East, Andheri West, MIDC, Powai, Bandra, Kurla, Malad, Goregaon, Borivali, Kandivali, Vile Parle, and Santacruz.",
  },
];

function ScrapPickupPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Doorstep Scrap Pickup Service in Mumbai",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ScrapBuddy",
      "url": "https://scrapbuddy.org"
    },
    "areaServed": {
      "@type": "City",
      "name": "Mumbai"
    },
    "description": "Fast, free doorstep scrap pickup across Mumbai with digital weighing and instant UPI payout."
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Doorstep Collection Service
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup Service in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Say goodbye to haggling with local scrap dealers. ScrapBuddy offers reliable, free doorstep scrap collection for homes, offices, housing societies, and commercial facilities across Mumbai.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Free Pickup Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">Check Today's Price List</Link>
          </Button>
        </div>
      </div>

      {/* Process Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">How Our Doorstep Pickup Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 space-y-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">1</span>
            <h3 className="font-bold text-lg">Schedule Online</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Pick your scrap items and choose your preferred date and time slot in under 2 minutes.</p>
          </Card>
          <Card className="p-6 space-y-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">2</span>
            <h3 className="font-bold text-lg">Doorstep Weighing</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Our verified pickup executive arrives at your location with accurate digital weighing scales.</p>
          </Card>
          <Card className="p-6 space-y-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 font-bold">3</span>
            <h3 className="font-bold text-lg">Instant Payout</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Get paid immediately via Google Pay, PhonePe, UPI, or cash before we load your scrap.</p>
          </Card>
        </div>
      </div>

      {/* Accepted Materials */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Accepted Scrap Materials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {acceptedItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-border/70 bg-card text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Links & Locations */}
      <Card className="bg-slate-950 p-8 text-white rounded-3xl space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-400" /> Servicing All Mumbai Localities
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          From Andheri East MIDC to Bandra, Powai, Borivali, Malad &amp; Goregaon, our pickup fleet operates 7 days a week.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link to="/locations/andheri" className="text-xs bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-slate-700">Andheri Scrap Pickup</Link>
          <Link to="/locations/bandra" className="text-xs bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-slate-700">Bandra Scrap Pickup</Link>
          <Link to="/locations/powai" className="text-xs bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-slate-700">Powai Scrap Pickup</Link>
          <Link to="/locations/borivali" className="text-xs bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-slate-700">Borivali Scrap Pickup</Link>
          <Link to="/locations/malad" className="text-xs bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-slate-700">Malad Scrap Pickup</Link>
        </div>
      </Card>

      {/* FAQs */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-2xl px-6 py-1">
              <AccordionTrigger className="font-bold text-sm">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
