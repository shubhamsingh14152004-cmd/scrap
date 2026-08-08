import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/locations/powai")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup in Powai & Chandivali | My Scrap Buddy" },
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
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup in Powai & Chandivali | My Scrap Buddy" },
      { property: "og:url", content: "https://scrapbuddy.org/locations/powai" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup in Powai & Chandivali | My Scrap Buddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/powai" }],
  }),
  component: PowaiLocationPage,
});

const powaiAreas = ["Hiranandani Gardens", "Raheja Vihar & Chandivali", "IIT Bombay Vicinity", "Kanjurmarg West Border"];

const faqs = [
  {
    q: "Do you provide scrap collection for high-rise societies in Hiranandani Gardens Powai?",
    a: "Yes, My Scrap Buddy services residential high-rises in Hiranandani Gardens and Raheja Vihar with clean, quiet doorstep collection.",
  },
  {
    q: "Can tech startups in Chandivali book e-waste recycling?",
    a: "Yes, we collect obsolete servers, laptops, CPUs, and networking hardware from offices in Chandivali and Powai.",
  },
  {
    q: "What is the minimum weight requirement for free pickup in Powai?",
    a: "Doorstep pickup is completely free across Powai for standard household scrap bundles above 20 kg.",
  },
];

function PowaiLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://scrapbuddy.org/" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://scrapbuddy.org/locations/mumbai" },
      { "@type": "ListItem", "position": 3, "name": "Powai", "item": "https://scrapbuddy.org/locations/powai" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

      {/* Locality FAQs */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Powai Scrap Pickup FAQs</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-2xl px-6 py-1">
              <AccordionTrigger className="font-bold text-sm">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
