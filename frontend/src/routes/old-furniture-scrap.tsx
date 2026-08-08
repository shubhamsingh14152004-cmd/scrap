import { createFileRoute, Link } from "@tanstack/react-router";
import { Armchair, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/old-furniture-scrap")({
  head: () => ({
    meta: [
      { title: "Old Furniture Scrap Disposal & Removal Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Dispose of old wooden sofas, office chairs, dining tables, wardrobes & metal beds in Mumbai. Dismantling & doorstep loading included.",
      },
      {
        name: "keywords",
        content:
          "old furniture buyer Mumbai, sofa scrap disposal, wooden furniture buyer, office chair scrap Mumbai, furniture removal service",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Old Furniture Scrap Disposal & Removal Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content: "Easy removal and disposal of old wooden, metal, and plastic furniture across Mumbai.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/old-furniture-scrap" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Old Furniture Scrap Disposal & Removal Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/old-furniture-scrap" }],
  }),
  component: FurnitureScrapPage,
});

const furnitureItems = [
  { name: "Sofa Set / Couches", rate: "Up to ₹800 / pc" },
  { name: "Office Chairs & Desks", rate: "Up to ₹150 / pc" },
  { name: "Wooden Dining Tables & Wardrobes", rate: "Up to ₹300 / pc" },
  { name: "Plastic Chairs & Stools", rate: "Up to ₹70 / pc" },
];

function FurnitureScrapPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Old Furniture Scrap Disposal Service",
    "provider": { "@type": "LocalBusiness", "name": "ScrapBuddy", "url": "https://scrapbuddy.org" },
    "areaServed": { "@type": "City", "name": "Mumbai" },
    "description": "Removal, dismantling, and disposal of unwanted wooden, metal, and plastic furniture in Mumbai."
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Furniture Removal
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Old Furniture Scrap Disposal in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Clear out bulky unwanted furniture effortlessly. ScrapBuddy handles dismantling, heavy lifting, vehicle loading, and recycling for homes and commercial offices in Mumbai.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Schedule Furniture Removal <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View Furniture Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Furniture Disposal Rates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {furnitureItems.map((f) => (
            <Card key={f.name} className="p-5 flex justify-between items-center border-border/70">
              <div className="flex items-center gap-3">
                <Armchair className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">{f.name}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                {f.rate}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
