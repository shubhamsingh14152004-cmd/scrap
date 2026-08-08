import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/blog/doorstep-scrap-pickup-how-it-works")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup: How It Works | ScrapBuddy Mumbai" },
      {
        name: "description",
        content:
          "Detailed breakdown of how doorstep scrap collection works in Mumbai. Booking, digital weighing, instant payments, and environmental recycling.",
      },
      {
        name: "keywords",
        content: "how doorstep scrap pickup works, raddi pickup process Mumbai, digital scrap weighing, instant scrap payment",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup: How It Works | ScrapBuddy Mumbai" },
      { property: "og:url", content: "https://scrapbuddy.org/blog/doorstep-scrap-pickup-how-it-works" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup: How It Works | ScrapBuddy Mumbai" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/blog/doorstep-scrap-pickup-how-it-works" }],
  }),
  component: HowItWorksBlogPage,
});

function HowItWorksBlogPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Doorstep Scrap Pickup: How It Works",
    "author": { "@type": "Organization", "name": "ScrapBuddy" },
    "url": "https://scrapbuddy.org/blog/doorstep-scrap-pickup-how-it-works"
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Process</span>
          <span>3 min read</span>
          <span>•</span>
          <span>Aug 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          Doorstep Scrap Pickup: How It Works
        </h1>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>
          At <strong>ScrapBuddy</strong>, our goal is to eliminate the friction from scrap recycling in Mumbai. Here is how our seamless 3-step process functions from initial booking to instant payout.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">1. Instant Booking via App, Web, or WhatsApp</h2>
        <p>
          Customers select their category of scrap (such as <Link to="/paper-scrap" className="text-emerald-600 font-semibold hover:underline">Paper Scrap</Link>, <Link to="/metal-scrap" className="text-emerald-600 font-semibold hover:underline">Metals</Link>, or <Link to="/e-waste-recycling" className="text-emerald-600 font-semibold hover:underline">E-Waste</Link>) and pick a preferred 3-hour pickup window.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">2. Verified Buddy Arrival &amp; ISO Scale Weighing</h2>
        <p>
          A background-verified pickup buddy arrives at your doorstep in a mini-truck, equipped with calibrated ISO digital hanging scales.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">3. Immediate UPI &amp; Cash Settlement</h2>
        <p>
          Payment calculation is shown on the digital scale interface. Payout is processed instantly to your phone via UPI before your material is loaded.
        </p>
      </div>

      <Card className="bg-slate-950 p-6 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">Schedule a pickup today</h3>
          <p className="text-xs text-slate-300">Servicing Andheri, Bandra, Powai, Borivali, Malad &amp; all Mumbai areas.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0">
          <Link to="/request-pickup">Book Doorstep Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </Card>
    </article>
  );
}
