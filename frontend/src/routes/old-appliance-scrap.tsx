import { createFileRoute, Link } from "@tanstack/react-router";
import { Refrigerator, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/old-appliance-scrap")({
  head: () => ({
    meta: [
      { title: "Old Appliance Scrap Disposal & AC Recycling Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Doorstep pickup for old & broken refrigerators, washing machines, split/window ACs, geysers & microwaves in Mumbai. Spot cash / UPI payout.",
      },
      {
        name: "keywords",
        content:
          "sell old AC Mumbai, washing machine scrap price, old fridge buyer Mumbai, appliance recycling Mumbai, broken home appliances scrap",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Old Appliance Scrap Disposal & AC Recycling Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content: "Doorstep collection and instant cash payout for old household appliances across Mumbai.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/old-appliance-scrap" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Old Appliance Scrap Disposal & AC Recycling Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/old-appliance-scrap" }],
  }),
  component: ApplianceScrapPage,
});

const applianceItems = [
  { name: "Split / Window Air Conditioner", rate: "Up to ₹2,200 / pc" },
  { name: "Double / Single Door Refrigerator", rate: "Up to ₹1,600 / pc" },
  { name: "Washing Machine (Top/Front Load)", rate: "Up to ₹1,200 / pc" },
  { name: "Microwave Oven & Geysers", rate: "Up to ₹350 / pc" },
];

function ApplianceScrapPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Old Appliance Scrap Disposal Service",
    "provider": { "@type": "LocalBusiness", "name": "ScrapBuddy", "url": "https://scrapbuddy.org" },
    "areaServed": { "@type": "City", "name": "Mumbai" },
    "description": "Doorstep pickup for old defective air conditioners, refrigerators, and washing machines in Mumbai."
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Appliance Recycling
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Old Appliance Scrap Disposal in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Upgrade your home electronics without hassle. We pick up heavy defective ACs, fridges, washing machines, and water heaters directly from your doorstep with spot UPI payouts.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Schedule Appliance Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View Appliance Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Estimated Appliance Payout Rates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {applianceItems.map((a) => (
            <Card key={a.name} className="p-5 flex justify-between items-center border-border/70">
              <div className="flex items-center gap-3">
                <Refrigerator className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">{a.name}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                {a.rate}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
