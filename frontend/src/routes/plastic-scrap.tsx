import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/plastic-scrap")({
  head: () => ({
    meta: [
      { title: "Plastic Scrap Recycling Service in Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Recycle PET bottles, hard plastic, PVC, buckets & plastic containers in Mumbai. ScrapBuddy offers doorstep collection and instant digital payouts.",
      },
      {
        name: "keywords",
        content:
          "plastic scrap rate Mumbai, sell PET bottles, plastic recycling Mumbai, PVC scrap buyer, hard plastic scrap rate",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Plastic Scrap Recycling Service in Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content: "Doorstep plastic scrap collection and eco-friendly recycling across Mumbai.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/plastic-scrap" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Plastic Scrap Recycling Service in Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/plastic-scrap" }],
  }),
  component: PlasticScrapPage,
});

const plasticItems = [
  { name: "PET Water & Soda Bottles", rate: "₹18 / kg" },
  { name: "Hard Plastic (Buckets & Chairs)", rate: "₹22 / kg" },
  { name: "PVC Pipes & Plumbing Fittings", rate: "₹16 / kg" },
  { name: "Plastic Containers & Drums", rate: "₹20 / kg" },
];

function PlasticScrapPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Plastic Scrap Recycling Service",
    "provider": { "@type": "LocalBusiness", "name": "ScrapBuddy", "url": "https://scrapbuddy.org" },
    "areaServed": { "@type": "City", "name": "Mumbai" },
    "description": "Doorstep pickup and recycling of plastic bottles, hard plastics, and PVC waste in Mumbai."
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Plastic Recycling
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Plastic Scrap Recycling Service in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Help reduce plastic waste in Mumbai. ScrapBuddy collects PET bottles, hard plastic household items, and PVC industrial scrap at daily market rates.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Plastic Scrap Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View All Live Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Plastic Scrap Categories &amp; Rates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plasticItems.map((p) => (
            <Card key={p.name} className="p-5 flex justify-between items-center border-border/70">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">{p.name}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                {p.rate}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
