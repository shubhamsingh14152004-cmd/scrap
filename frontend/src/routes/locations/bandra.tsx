import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/locations/bandra")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup in Bandra & BKC | My Scrap Buddy" },
      {
        name: "description",
        content:
          "Book doorstep scrap collection in Bandra West, Bandra East & Bandra-Kurla Complex (BKC). Instant payment, digital weighing & eco-friendly recycling.",
      },
      {
        name: "keywords",
        content:
          "scrap pickup Bandra West, scrap dealer BKC, kabadiwala Bandra East, doorstep scrap buyer Bandra, e-waste recycling Bandra",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup in Bandra & BKC | My Scrap Buddy" },
      { property: "og:description", content: "Doorstep scrap collection and e-waste disposal in Bandra West, East & BKC." },
      { property: "og:url", content: "https://scrapbuddy.org/locations/bandra" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup in Bandra & BKC | My Scrap Buddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/bandra" }],
  }),
  component: BandraLocationPage,
});

const bandraAreas = ["Bandra West (Hill Road & Pali Hill)", "BKC Corporate Complex", "Bandra East (Kalanagar)", "Khar West & Linking Road"];

const faqs = [
  {
    q: "Do you offer corporate e-waste pickup in Bandra-Kurla Complex (BKC)?",
    a: "Yes, My Scrap Buddy handles corporate e-waste and office IT asset clearance for financial institutions and firms in BKC with Form-10 certificates.",
  },
  {
    q: "Can I schedule doorstep scrap pickup for high-rise apartments in Pali Hill or Hill Road?",
    a: "Yes, doorstep scrap pickup is available for residential apartments across Pali Hill, Hill Road, and Khar West with full loading support.",
  },
  {
    q: "Is there any delivery or transport charge for scrap pickup in Bandra?",
    a: "Doorstep scrap pickup is completely free across Bandra East, Bandra West, and BKC for standard scrap quantities.",
  },
];

function BandraLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://scrapbuddy.org/" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://scrapbuddy.org/locations/mumbai" },
      { "@type": "ListItem", "position": 3, "name": "Bandra", "item": "https://scrapbuddy.org/locations/bandra" }
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
          Bandra Service Coverage
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup in Bandra &amp; BKC
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          From luxury apartments in Pali Hill to corporate offices in BKC, My Scrap Buddy provides reliable, professional doorstep scrap and e-waste collection in Bandra.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Bandra Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View Today's Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Areas Covered in Bandra</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bandraAreas.map((area) => (
            <div key={area} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-border/70 bg-card text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Locality FAQs */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Bandra Scrap Pickup FAQs</h2>
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
