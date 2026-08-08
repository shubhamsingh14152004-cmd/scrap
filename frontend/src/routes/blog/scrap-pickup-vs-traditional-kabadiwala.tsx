import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/blog/scrap-pickup-vs-traditional-kabadiwala")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup vs Traditional Kabadiwala | ScrapBuddy" },
      {
        name: "description",
        content:
          "Comparison between digital doorstep scrap pickup platforms and traditional local scrap dealers in Mumbai. Digital scale accuracy, live market pricing & instant UPI payment.",
      },
      {
        name: "keywords",
        content: "kabadiwala vs online scrap pickup, online raddi buyer, digital scale scrap weighing, doorstep scrap advantages",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup vs Traditional Kabadiwala | ScrapBuddy" },
      { property: "og:url", content: "https://scrapbuddy.org/blog/scrap-pickup-vs-traditional-kabadiwala" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup vs Traditional Kabadiwala | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/blog/scrap-pickup-vs-traditional-kabadiwala" }],
  }),
  component: ComparisonBlogPage,
});

function ComparisonBlogPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Doorstep Scrap Pickup vs Traditional Kabadiwala",
    "author": { "@type": "Organization", "name": "ScrapBuddy" },
    "url": "https://scrapbuddy.org/blog/scrap-pickup-vs-traditional-kabadiwala"
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Comparison</span>
          <span>5 min read</span>
          <span>•</span>
          <span>Aug 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          Doorstep Scrap Pickup vs Traditional Kabadiwala: Which Is Better?
        </h1>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>
          For decades, selling scrap in Mumbai meant waiting for a local neighborhood kabadiwala or hauling heavy stacks of paper to an unorganized shop. Today, modern platforms like <strong>ScrapBuddy</strong> provide a digital alternative.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">1. Weighing Accuracy</h2>
        <p>
          Traditional vendors often rely on manual spring balances or counter-weights that can be inaccurate by 10-20%. ScrapBuddy uses ISO-certified digital hanging scales displaying exact weights down to the gram.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">2. Price Transparency</h2>
        <p>
          Instead of arbitrary local pricing, ScrapBuddy publishes transparent daily rates for all materials on our <Link to="/pricing" className="text-emerald-600 font-semibold hover:underline">Price List</Link>.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">3. Payment &amp; Convenience</h2>
        <p>
          Get instant digital UPI transfers directly to your PhonePe or Google Pay on your doorstep without carrying heavy items downstairs.
        </p>
      </div>

      <Card className="bg-slate-950 p-6 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">Try digital scrap pickup today</h3>
          <p className="text-xs text-slate-300">Book free doorstep collection across Mumbai.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0">
          <Link to="/request-pickup">Book Pickup Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </Card>
    </article>
  );
}
