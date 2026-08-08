import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/locations/powai")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup in Powai & Chandivali | ScrapBuddy" },
      {
        name: "description",
        content:
          "Doorstep scrap collection in Powai & Chandivali. Hiranandani Gardens, Raheja Vihar & IT parks. Instant digital payment & fair rates.",
      },
      {
        name: "keywords",
        content: "scrap pickup Powai, scrap dealer Hiranandani Powai, kabadiwala Chandivali, e-waste recycling Powai",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup in Powai & Chandivali | ScrapBuddy" },
      { property: "og:url", content: "https://scrapbuddy.org/locations/powai" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup in Powai & Chandivali | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/powai" }],
  }),
  component: PowaiLocationPage,
});

const powaiAreas = ["Hiranandani Gardens", "Raheja Vihar & Chandivali", "IIT Bombay Vicinity", "Kanjurmarg West Border"];

function PowaiLocationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Powai Service Coverage
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup in Powai &amp; Chandivali
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Residential high-rises in Hiranandani Gardens and tech companies in Chandivali get prompt doorstep scrap and e-waste recycling service.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Powai Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View Live Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Areas Covered in Powai</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {powaiAreas.map((area) => (
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
