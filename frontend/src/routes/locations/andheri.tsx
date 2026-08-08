import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/locations/andheri")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup in Andheri (East, West & MIDC) | ScrapBuddy" },
      {
        name: "description",
        content:
          "Fast doorstep scrap pickup in Andheri East, Andheri West & MIDC. Sell household, office & factory scrap at daily market rates with instant UPI payout.",
      },
      {
        name: "keywords",
        content:
          "scrap pickup Andheri East, scrap dealer Andheri West, kabadiwala MIDC Andheri, doorstep scrap collection Andheri, e-waste buyer Andheri",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup in Andheri (East, West & MIDC) | ScrapBuddy" },
      { property: "og:description", content: "Doorstep scrap collection and e-waste disposal in Andheri East, West & MIDC." },
      { property: "og:url", content: "https://scrapbuddy.org/locations/andheri" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup in Andheri (East, West & MIDC) | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/andheri" }],
  }),
  component: AndheriLocationPage,
});

const subAreas = [
  "MIDC Industrial Area",
  "Saki Naka & Marol",
  "Lokhandwala Complex",
  "JB Nagar & Chakala",
  "Versova & Seven Bungalows",
  "Mahakali Caves Road",
];

function AndheriLocationPage() {
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ScrapBuddy Andheri Doorstep Scrap Pickup",
    "image": "https://scrapbuddy.org/favicon.ico",
    "url": "https://scrapbuddy.org/locations/andheri",
    "telephone": "+918591770877",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gupta Compound Road No. 11, MIDC, Andheri East",
      "addressLocality": "Andheri",
      "addressRegion": "Maharashtra",
      "postalCode": "400093",
      "addressCountry": "IN"
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Andheri Service Hub
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup in Andheri East, West &amp; MIDC
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Headquartered right in MIDC Andheri East, ScrapBuddy provides rapid 24-hour doorstep scrap pickup across residential societies in Lokhandwala and commercial IT parks in Chakala &amp; Marol.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Andheri Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">Check Live Price List</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Sub-Areas Serviced in Andheri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subAreas.map((area) => (
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
