import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/scrap-collection")({
  head: () => ({
    meta: [
      { title: "Bulk Commercial & Housing Society Scrap Collection Mumbai | ScrapBuddy" },
      {
        name: "description",
        content:
          "End-to-end bulk scrap collection for corporate offices, MIDC factories, construction sites & housing societies in Mumbai. GST billing & Form-10 certificates.",
      },
      {
        name: "keywords",
        content:
          "commercial scrap collection Mumbai, corporate office scrap buyer, housing society scrap drive, industrial scrap dealer MIDC, construction demolition scrap",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Bulk Commercial & Housing Society Scrap Collection Mumbai | ScrapBuddy" },
      {
        property: "og:description",
        content: "Turnkey bulk scrap removal, office dismantling, and society recycling drives in Mumbai.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/scrap-collection" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bulk Commercial & Housing Society Scrap Collection Mumbai | ScrapBuddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/scrap-collection" }],
  }),
  component: ScrapCollectionPage,
});

const bulkServices = [
  "Corporate Office Dismantling & IT Retirement",
  "Housing Society Annual Cleanliness Drives",
  "MIDC Industrial Workshop & Factory Metal Scrap",
  "Construction Site Tiles, PVC & Rebar Clearance",
  "Warehouse Clearance & Pallet Scrap Removal",
];

function ScrapCollectionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Bulk Commercial & Housing Society Scrap Collection Service",
    "provider": { "@type": "LocalBusiness", "name": "ScrapBuddy", "url": "https://scrapbuddy.org" },
    "areaServed": { "@type": "City", "name": "Mumbai" },
    "description": "Bulk scrap management, office dismantling, and housing society recycling drives in Mumbai."
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="max-w-3xl space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Commercial &amp; Bulk Solutions
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Bulk Commercial &amp; Society Scrap Collection in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Specialized bulk scrap pickup solutions for corporate parks, manufacturing units, construction sites, and residential housing societies across Mumbai with full GST documentation.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Schedule Bulk Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Get Custom Quotation</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Commercial Scrap Solutions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bulkServices.map((b) => (
            <Card key={b} className="p-5 flex items-center gap-3.5 border-border/70">
              <Building2 className="h-6 w-6 text-emerald-500 shrink-0" />
              <span className="text-xs font-bold text-foreground">{b}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
