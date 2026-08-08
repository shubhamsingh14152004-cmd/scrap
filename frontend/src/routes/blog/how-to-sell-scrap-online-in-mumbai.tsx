import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/blog/how-to-sell-scrap-online-in-mumbai")({
  head: () => ({
    meta: [
      { title: "How to Sell Scrap Online in Mumbai: Complete Guide | ScrapBuddy" },
      {
        name: "description",
        content:
          "Step-by-step guide on how to sell household & office scrap online in Mumbai. Learn how doorstep pickup, digital weighing, and instant UPI payouts work.",
      },
      {
        name: "keywords",
        content:
          "sell scrap online Mumbai, doorstep raddi buyer, online scrap pickup Mumbai, sell old electronics online Mumbai",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "How to Sell Scrap Online in Mumbai: Complete Guide | ScrapBuddy" },
      { property: "og:url", content: "https://scrapbuddy.org/blog/how-to-sell-scrap-online-in-mumbai" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "How to Sell Scrap Online in Mumbai: Complete Guide | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/blog/how-to-sell-scrap-online-in-mumbai" }],
  }),
  component: SellScrapGuidePage,
});

function SellScrapGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Sell Scrap Online in Mumbai: Complete Step-by-Step Guide",
    "author": { "@type": "Organization", "name": "ScrapBuddy" },
    "publisher": { "@type": "Organization", "name": "ScrapBuddy", "logo": { "@type": "ImageObject", "url": "https://scrapbuddy.org/favicon.ico" } },
    "url": "https://scrapbuddy.org/blog/how-to-sell-scrap-online-in-mumbai"
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Guide</span>
          <span>4 min read</span>
          <span>•</span>
          <span>Aug 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          How to Sell Scrap Online in Mumbai: Complete Step-by-Step Guide
        </h1>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>
          Selling scrap in Mumbai used to mean waiting for a street vendor, carrying heavy bundles of paper or metal downstairs, and negotiating over inaccurate physical weights. Today, online doorstep scrap pickup platforms like <strong>ScrapBuddy</strong> have simplified the process.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">Step 1: Sort Your Scrap Materials</h2>
        <p>
          Gather recyclable items into basic categories: Paper (newspapers, magazines, cardboard), Metals (iron, copper, brass, aluminium), E-Waste (laptops, CPUs, smartphones), and Appliances (ACs, refrigerators). Sorting your materials ensures faster doorstep weighing.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">Step 2: Check Daily Live Rates</h2>
        <p>
          Before booking, review the daily updated price list on <Link to="/pricing" className="text-emerald-600 font-semibold hover:underline">ScrapBuddy Pricing</Link>. Rates are updated in real-time matching Mumbai Mandi market benchmarks.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">Step 3: Schedule a Doorstep Pickup</h2>
        <p>
          Fill out the quick pickup request form at <Link to="/request-pickup" className="text-emerald-600 font-semibold hover:underline">Book Scrap Pickup</Link> or send a WhatsApp message. Choose a convenient 3-hour window.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">Step 4: Digital Weighing &amp; Instant UPI Payout</h2>
        <p>
          The pickup executive weighs your items with calibrated digital scales in front of you. Once confirmed, payment is transferred immediately to your UPI, Google Pay, PhonePe, or cash account.
        </p>
      </div>

      <Card className="bg-slate-950 p-6 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">Ready to sell your scrap in Mumbai?</h3>
          <p className="text-xs text-slate-300">Book free doorstep pickup with instant payout in under 2 minutes.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0">
          <Link to="/request-pickup">Book Pickup Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </Card>
    </article>
  );
}
