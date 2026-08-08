import { createFileRoute, Link } from "@tanstack/react-router";
import { Recycle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/metal-scrap")({
  head: () => ({
    meta: [
      { title: "Metal Scrap & Steel Buying in Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "High-value metal scrap collection in Mumbai. Sell iron rods, TMT steel, copper wiring, brass, aluminium & alloy scrap at daily Mandi market rates with instant payout.",
      },
      {
        name: "keywords",
        content:
          "copper scrap rate Mumbai, iron scrap price today Mumbai, TMT steel scrap buyer, brass scrap rate, aluminium scrap dealer Mumbai",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Metal Scrap & Steel Buying in Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content: "Top rates per kg for iron, TMT steel, copper, brass, and aluminium scrap in Mumbai.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/metal-scrap" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Metal Scrap & Steel Buying in Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/metal-scrap" }],
  }),
  component: MetalScrapPage,
});

const metalItems = [
  { name: "Copper Wiring & Armored Cable", rate: "₹620 / kg" },
  { name: "Brass Utensils & Fittings", rate: "₹380 / kg" },
  { name: "Aluminium Scrap & Windows", rate: "₹115 / kg" },
  { name: "Iron & Mild Steel Scrap", rate: "₹30 / kg" },
  { name: "TMT Bars & Steel Rods", rate: "₹36 / kg" },
  { name: "Lead & Inverter Batteries", rate: "₹85 / kg" },
];

function MetalScrapPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Metal Scrap & Industrial Steel Buying Service",
    "provider": { "@type": "LocalBusiness", "name": "ScrapBuddy", "url": "https://scrapbuddy.org" },
    "areaServed": { "@type": "City", "name": "Mumbai" },
    "description": "High-value non-ferrous and ferrous metal recycling for residential and industrial sites in Mumbai."
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          High-Value Metals
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Metal Scrap &amp; Steel Buying in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Get top Mandi market rates for iron rods, TMT steel, copper wiring, brass utensils, and aluminium frames. Precision digital weighing with spot bank transfer or cash handover.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Schedule Metal Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">Check Today's Live Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Metal Scrap Live Rates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metalItems.map((m) => (
            <Card key={m.name} className="p-5 flex justify-between items-center border-border/70">
              <div className="flex items-center gap-3">
                <Recycle className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">{m.name}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                {m.rate}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
