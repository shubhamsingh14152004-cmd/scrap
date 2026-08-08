import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Scrap & Recycling Blog — Guides & Tips | ScrapBuddy Mumbai" },
      {
        name: "description",
        content:
          "Read expert recycling guides, scrap price analysis, e-waste disposal tips, and doorstep scrap collection insights for Mumbai residents and businesses.",
      },
      {
        name: "keywords",
        content:
          "scrap blog Mumbai, e-waste recycling guide, how to sell scrap online, kabadiwala vs online scrap, scrap rate guide Mumbai",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Scrap & Recycling Blog — Guides & Tips | ScrapBuddy Mumbai" },
      { property: "og:description", content: "Recycling guides, scrap price tips, and e-waste disposal advice in Mumbai." },
      { property: "og:url", content: "https://scrapbuddy.org/blog" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Scrap & Recycling Blog — Guides & Tips | ScrapBuddy Mumbai" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/blog" }],
  }),
  component: BlogIndexPage,
});

const blogPosts = [
  {
    title: "How to Sell Scrap Online in Mumbai: Complete Step-by-Step Guide",
    slug: "/blog/how-to-sell-scrap-online-in-mumbai",
    excerpt: "Learn how to schedule a doorstep scrap pickup, verify digital weights, and get instant UPI payment for household and office scrap.",
    readTime: "4 min read",
    date: "Aug 2026",
    category: "Guides",
  },
  {
    title: "Doorstep Scrap Pickup vs Traditional Kabadiwala: Which Is Better?",
    slug: "/blog/scrap-pickup-vs-traditional-kabadiwala",
    excerpt: "Compare digital hanging scale accuracy, daily transparent market rates, and instant UPI payments against offline local scrap buyers.",
    readTime: "5 min read",
    date: "Aug 2026",
    category: "Comparison",
  },
  {
    title: "How to Recycle E-Waste Responsibly in Mumbai",
    slug: "/blog/how-to-recycle-e-waste-responsibly-mumbai",
    excerpt: "Safe disposal procedures for laptops, old smartphones, motherboards, batteries, and office IT hardware under MPCB guidelines.",
    readTime: "6 min read",
    date: "Aug 2026",
    category: "E-Waste",
  },
  {
    title: "How Scrap Pickup Works: From Booking to Spot Payout",
    slug: "/blog/doorstep-scrap-pickup-how-it-works",
    excerpt: "Step-by-step walk-through of the entire 3-step doorstep scrap pickup process across Mumbai localities.",
    readTime: "3 min read",
    date: "Aug 2026",
    category: "Process",
  },
  {
    title: "How Daily Scrap Prices Are Determined in Mumbai",
    slug: "/blog/how-scrap-prices-are-determined",
    excerpt: "Understand how foundry demand, global metal Mandi indexes, and material purity dictate daily scrap rates per kg.",
    readTime: "5 min read",
    date: "Aug 2026",
    category: "Pricing",
  },
];

function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-12">
      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          ScrapBuddy Insights
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Scrap &amp; Recycling Blog
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Expert guides on selling scrap online, e-waste recycling compliance, understanding daily metal Mandi prices, and eco-friendly waste management in Mumbai.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="p-6 flex flex-col justify-between border-border/70 hover:border-emerald-500/40 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground leading-snug hover:text-emerald-600 transition-colors">
                <Link to={post.slug}>{post.title}</Link>
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-border/50 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{post.date}</span>
              <Link to={post.slug} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
                Read Article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
