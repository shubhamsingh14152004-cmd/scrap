import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/blog/how-scrap-prices-are-determined")({
  head: () => ({
    meta: [
      { title: "How Scrap Prices Are Determined in Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Understand how daily scrap rates for iron, steel, copper, paper, and plastic are calculated in Mumbai based on Mandi market indexes and recycling demand.",
      },
      {
        name: "keywords",
        content: "how scrap prices work Mumbai, iron scrap rate calculation, copper market rate index, scrap price factors",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "How Scrap Prices Are Determined in Mumbai | ScrapBuddy" },
      { property: "og:url", content: "https://scrapbuddy.org/blog/how-scrap-prices-are-determined" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "How Scrap Prices Are Determined in Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/blog/how-scrap-prices-are-determined" }],
  }),
  component: ScrapPricingGuideBlogPage,
});

function ScrapPricingGuideBlogPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Daily Scrap Prices Are Determined in Mumbai",
    "author": { "@type": "Organization", "name": "ScrapBuddy" },
    "url": "https://scrapbuddy.org/blog/how-scrap-prices-are-determined"
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Pricing</span>
          <span>5 min read</span>
          <span>•</span>
          <span>Aug 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          How Daily Scrap Prices Are Determined in Mumbai
        </h1>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>
          Scrap prices are dynamic commodity rates that fluctuate daily based on industrial manufacturing demand, foundry consumption, and international metal exchange indices.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">Key Factors Influencing Metal &amp; Paper Rates</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Foundry &amp; Mill Demand:</strong> Steel mills in Maharashtra consume TMT and iron scrap daily. High construction activity increases iron scrap rates.</li>
          <li><strong>Material Purity:</strong> Copper wire scrap with clean insulation fetches up to ₹620/kg, whereas unsegregated mixed alloy scrap has a lower yield.</li>
          <li><strong>Paper Mill Pulp Prices:</strong> Newspaper (raddi) and cardboard recycling rates move in line with domestic paper mill raw material requirements.</li>
        </ul>

        <p className="pt-2">
          At <strong>ScrapBuddy</strong>, we monitor Mandi and foundry benchmarks every morning to publish live per-kilogram pricing on our <Link to="/pricing" className="text-emerald-600 font-semibold hover:underline">Scrap Price List</Link>.
        </p>
      </div>

      <Card className="bg-slate-950 p-6 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">Check today's live scrap rates</h3>
          <p className="text-xs text-slate-300">View rates per kg for iron, copper, paper, plastic, and e-waste.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0">
          <Link to="/pricing">View Live Rates <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </Card>
    </article>
  );
}
