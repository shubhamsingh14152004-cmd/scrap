import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/locations/malad")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup in Malad (East & West) | My Scrap Buddy" },
      {
        name: "description",
        content:
          "Doorstep scrap collection in Malad West, Malad East & Mindspace IT Park. Sell paper, plastic, metal, e-waste & appliances with instant payout.",
      },
      {
        name: "keywords",
        content: "scrap pickup Malad West, scrap dealer Mindspace Malad, kabadiwala Malad East, doorstep scrap buyer Malad",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup in Malad (East & West) | My Scrap Buddy" },
      { property: "og:url", content: "https://scrapbuddy.org/locations/malad" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup in Malad (East & West) | My Scrap Buddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/malad" }],
  }),
  component: MaladLocationPage,
});

const maladAreas = ["Malad West (Link Road & Evershine Nagar)", "Mindspace IT Park Malad", "Malad East (Dindoshi & Raheja Complex)", "Evershine Nagar & Orlem"];

const faqs = [
  {
    q: "Do you pick up office scrap from Mindspace IT Park in Malad West?",
    a: "Yes, My Scrap Buddy provides commercial scrap removal, e-waste recycling, and office furniture clearance in Mindspace Malad.",
  },
  {
    q: "Is doorstep scrap collection available in Evershine Nagar and Orlem?",
    a: "Yes, we offer daily 3-hour doorstep scrap pickup slots across Evershine Nagar, Orlem, and Dindoshi.",
  },
  {
    q: "Do you buy old air conditioners and refrigerators in Malad?",
    a: "Yes, we buy old defective split/window ACs, fridges, and washing machines with spot cash payouts.",
  },
];

function MaladLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://scrapbuddy.org/" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://scrapbuddy.org/locations/mumbai" },
      { "@type": "ListItem", "position": 3, "name": "Malad", "item": "https://scrapbuddy.org/locations/malad" }
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
          Malad Service Coverage
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup in Malad East &amp; West
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Full coverage across Malad West residential societies and Mindspace commercial towers. Instant UPI payment and digital weighing.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
            <Link to="/request-pickup">Book Malad Pickup <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View Today's Rates</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Areas Covered in Malad</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {maladAreas.map((area) => (
            <div key={area} className="flex items-center gap-2.5 p-3.5 rounded-xl border border-border/70 bg-card text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Locality FAQs */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Malad Scrap Pickup FAQs</h2>
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
