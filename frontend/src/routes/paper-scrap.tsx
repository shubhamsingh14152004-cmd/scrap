import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/paper-scrap")({
  head: () => ({
    meta: [
      { title: "Paper Scrap & Book Recycling in Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Sell old newspapers, cardboard boxes, magazines, textbooks & office files in Mumbai. Doorstep pickup with certified digital scales & instant payment.",
      },
      {
        name: "keywords",
        content:
          "paper scrap rate Mumbai, sell newspaper scrap, cardboard scrap buyer Mumbai, old books recycling, raddi buyer Mumbai",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Paper Scrap & Book Recycling in Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content:
          "Sell household paper scrap, cardboard cartons, and office records in Mumbai with instant digital weighing and spot payment.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/paper-scrap" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Paper Scrap & Book Recycling in Mumbai | ScrapBuddy" },
      {
        name: "twitter:description",
        content: "Doorstep paper and cardboard scrap collection in Mumbai.",
      },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/paper-scrap" }],
  }),
  component: PaperScrapPage,
});

const paperItems = [
  { name: "Old Newspaper (Raddi)", rate: "₹14 / kg" },
  { name: "Cardboard & Cartons", rate: "₹9 / kg" },
  { name: "Books & Notebooks", rate: "₹12 / kg" },
  { name: "Magazines & Catalogues", rate: "₹12 / kg" },
  { name: "Office Shredded Paper", rate: "₹15 / kg" },
];

function PaperScrapPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Paper Scrap & Book Recycling Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ScrapBuddy",
      "url": "https://scrapbuddy.org"
    },
    "areaServed": { "@type": "City", "name": "Mumbai" },
    "description": "Doorstep collection of newspapers, cardboard, books, and commercial paper waste in Mumbai."
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Paper Recycling
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Paper Scrap &amp; Book Recycling in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Clear out accumulated newspapers, shipping boxes, old textbooks, and corporate paper waste. ScrapBuddy provides transparent daily per-kg rates with doorstep collection across Mumbai.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Paper Scrap Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View All Live Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Paper Scrap Categories &amp; Daily Rates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paperItems.map((p) => (
            <Card key={p.name} className="p-5 flex justify-between items-center border-border/70">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-emerald-500" />
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
