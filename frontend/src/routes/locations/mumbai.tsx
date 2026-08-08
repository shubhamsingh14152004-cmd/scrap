import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/locations/mumbai")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup Locations in Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "Find doorstep scrap pickup service coverage across Mumbai: Andheri, Bandra, Powai, Borivali, Malad, Goregaon, Kurla & Saki Naka. Instant UPI payouts.",
      },
      {
        name: "keywords",
        content:
          "scrap pickup Mumbai locations, kabadiwala near me Mumbai, doorstep scrap collection areas Mumbai, sell scrap Andheri Bandra Powai Borivali",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup Locations in Mumbai | ScrapBuddy" },
      { property: "og:description", content: "Complete doorstep scrap pickup coverage across all Mumbai areas." },
      { property: "og:url", content: "https://scrapbuddy.org/locations/mumbai" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup Locations in Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/mumbai" }],
  }),
  component: MumbaiLocationPage,
});

const localities = [
  { name: "Andheri (East, West & MIDC)", path: "/locations/andheri" },
  { name: "Bandra (East, West & BKC)", path: "/locations/bandra" },
  { name: "Borivali (East & West)", path: "/locations/borivali" },
  { name: "Powai & Chandivali", path: "/locations/powai" },
  { name: "Malad (East & West)", path: "/locations/malad" },
  { name: "Goregaon & Oshiwara", path: "/locations/mumbai" },
  { name: "Saki Naka & Marol", path: "/locations/mumbai" },
  { name: "Kurla & Ghatkopar", path: "/locations/mumbai" },
];

function MumbaiLocationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Mumbai Service Area
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup Across All Mumbai Localities
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          ScrapBuddy operates a dedicated fleet of doorstep collection mini-trucks across Western, Central, and Commercial hubs in Mumbai 7 days a week.
        </p>
        <div className="pt-2">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Pickup in Mumbai <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Select Your Locality</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {localities.map((loc) => (
            <Card key={loc.name} className="p-5 flex justify-between items-center border-border/70 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">{loc.name}</span>
              </div>
              <Button asChild size="sm" variant="ghost" className="text-emerald-600 dark:text-emerald-400">
                <Link to={loc.path}>View <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
