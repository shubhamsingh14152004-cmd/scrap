import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/locations/borivali")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup in Borivali (East & West) | ScrapBuddy" },
      {
        name: "description",
        content:
          "Doorstep scrap collection in Borivali East & Borivali West. Sell paper, plastic, metals, e-waste & appliances with instant UPI payout.",
      },
      {
        name: "keywords",
        content: "scrap pickup Borivali West, scrap dealer Borivali East, kabadiwala Borivali, doorstep scrap collection Borivali",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup in Borivali (East & West) | ScrapBuddy" },
      { property: "og:url", content: "https://scrapbuddy.org/locations/borivali" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup in Borivali (East & West) | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/borivali" }],
  }),
  component: BorivaliLocationPage,
});

const borivaliAreas = ["Borivali West (IC Colony & Shimpoli)", "Borivali East (Magathane & Carter Road)", "Gorai & Dahisar Border"];

function BorivaliLocationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Borivali Service Coverage
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup in Borivali East &amp; West
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Residential housing societies and commercial hubs in Borivali get fast, transparent scrap collection with digital hanging scales and instant payouts.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Borivali Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View Live Price List</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Areas Covered in Borivali</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {borivaliAreas.map((area) => (
            <div key={area} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-border/70 bg-card text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
