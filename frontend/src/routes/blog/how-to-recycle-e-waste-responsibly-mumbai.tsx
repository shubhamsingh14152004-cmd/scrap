import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/blog/how-to-recycle-e-waste-responsibly-mumbai")({
  head: () => ({
    meta: [
      { title: "How to Recycle E-Waste Responsibly in Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Guide to safe e-waste disposal in Mumbai for old computers, phones, batteries, and appliances. Pollution Control Board compliance & zero landfill practices.",
      },
      {
        name: "keywords",
        content: "how to recycle e-waste Mumbai, dispose old laptops Mumbai, electronic waste pollution control, IT asset recycling",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "How to Recycle E-Waste Responsibly in Mumbai | ScrapBuddy" },
      { property: "og:url", content: "https://scrapbuddy.org/blog/how-to-recycle-e-waste-responsibly-mumbai" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "How to Recycle E-Waste Responsibly in Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/blog/how-to-recycle-e-waste-responsibly-mumbai" }],
  }),
  component: EWasteGuideBlogPage,
});

function EWasteGuideBlogPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Recycle E-Waste Responsibly in Mumbai",
    "author": { "@type": "Organization", "name": "ScrapBuddy" },
    "url": "https://scrapbuddy.org/blog/how-to-recycle-e-waste-responsibly-mumbai"
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">E-Waste</span>
          <span>6 min read</span>
          <span>•</span>
          <span>Aug 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          How to Recycle E-Waste Responsibly in Mumbai
        </h1>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>
          Electronic waste (E-waste) contains hazardous substances like mercury, lead, and cadmium, alongside precious recoverable metals such as gold, copper, and silver. Dumping electronics in general garbage pollutes Mumbai landfills and soil.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">Why E-Waste Requires Authorized Recycling</h2>
        <p>
          Improper burning or acid washing of circuit boards releases toxic fumes. Authorized recyclers like <Link to="/e-waste-recycling" className="text-emerald-600 font-semibold hover:underline">ScrapBuddy E-Waste Service</Link> dismantle hardware in controlled environments matching Pollution Control Board guidelines.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">Data Security &amp; Formatting Before Disposal</h2>
        <p>
          Always perform a factory reset and remove hard drives or flash storage from laptops, tablets, and smartphones before handing them over. For corporate office IT asset recycling, ScrapBuddy provides certified data wiping and Form-10 certificates.
        </p>
      </div>

      <Card className="bg-slate-950 p-6 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">Have old electronics to recycle?</h3>
          <p className="text-xs text-slate-300">Book doorstep e-waste pickup with instant payment.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0">
          <Link to="/e-waste-recycling">Recycle E-Waste Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </Card>
    </article>
  );
}
