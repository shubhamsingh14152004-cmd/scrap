import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/e-waste-recycling")({
  head: () => ({
    meta: [
      { title: "E-Waste Recycling & Electronics Disposal Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Responsible e-waste recycling in Mumbai. Sell old laptops, mobiles, CPUs, motherboards, servers & electronics. Government authorized recycler with instant UPI payout.",
      },
      {
        name: "keywords",
        content:
          "e-waste recycling Mumbai, sell old laptops Mumbai, electronic waste disposal, IT asset recycling Mumbai, CPU scrap buyer, motherboard scrap",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "E-Waste Recycling & Electronics Disposal Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content:
          "Government authorized e-waste collection and electronics recycling across Mumbai. Zero landfill guarantee and instant digital payment.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/e-waste-recycling" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "E-Waste Recycling & Electronics Disposal Mumbai | ScrapBuddy" },
      {
        name: "twitter:description",
        content: "Responsible electronic waste disposal in Mumbai with instant payout.",
      },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/e-waste-recycling" }],
  }),
  component: EWastePage,
});

const acceptedEWaste = [
  "Old Laptops & MacBooks",
  "Desktop CPUs & Monitors",
  "Smartphones, Tablets & Chargers",
  "Motherboards & RAM Sticks",
  "Servers, Routers & Network Switches",
  "Printers, Scanners & Toners",
  "UPS Systems & Lead-Acid Batteries",
  "Power Banks & Wires/Cables",
];

const faqs = [
  {
    q: "How is e-waste priced?",
    a: "E-waste is priced per unit or per kilogram depending on the asset type. Laptops fetch up to ₹450+/piece, Desktop CPUs up to ₹350+/piece, and smartphones up to ₹120+/piece.",
  },
  {
    q: "Is data destruction guaranteed for IT assets?",
    a: "Yes. For corporate office dismantling and bulk IT asset clearance, we provide data destruction documentation and Form-10 recycling certificates.",
  },
  {
    q: "Are you licensed for e-waste handling?",
    a: "ScrapBuddy operates in compliance with Pollution Control Board regulations, ensuring zero landfill electronic waste processing.",
  },
];

function EWastePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-Waste Recycling Service in Mumbai",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ScrapBuddy",
      "url": "https://scrapbuddy.org"
    },
    "areaServed": {
      "@type": "City",
      "name": "Mumbai"
    },
    "description": "Government authorized e-waste recycling and corporate IT asset disposal service in Mumbai."
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
          Certified E-Waste Recycler
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          E-Waste Recycling &amp; Electronics Disposal in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Dispose of obsolete electronics, laptops, mobiles, CPUs, and IT hardware responsibly. ScrapBuddy offers doorstep e-waste collection with instant UPI payout and zero landfill guarantee.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Schedule E-Waste Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View E-Waste Price List</Link>
          </Button>
        </div>
      </div>

      {/* Accepted E-Waste Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Accepted Electronic Waste Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {acceptedEWaste.map((item) => (
            <Card key={item} className="p-4 flex items-center gap-3 border-border/70">
              <Cpu className="h-5 w-5 text-emerald-500 shrink-0" />
              <span className="text-xs font-semibold text-foreground">{item}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Corporate IT Section */}
      <Card className="bg-slate-950 p-8 text-white rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
          <ShieldCheck className="h-4 w-4" /> Corporate E-Waste &amp; IT Asset Recycling
        </div>
        <h3 className="text-2xl font-bold">Bulk Office Computer &amp; Server Disposal</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Upgrading office IT infrastructure in MIDC Andheri, Powai, or BKC? We offer bulk pickup, data security protocol compliance, and official recycling documentation for enterprises.
        </p>
        <div className="pt-2">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white">
            <Link to="/contact">Get Corporate Quotation</Link>
          </Button>
        </div>
      </Card>

      {/* FAQs */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">E-Waste FAQs</h2>
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
