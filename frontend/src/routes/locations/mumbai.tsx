import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const Route = createFileRoute("/locations/mumbai")({
  head: () => ({
    meta: [
      { title: "Doorstep Scrap Pickup Across All Mumbai Localities | My Scrap Buddy" },
      {
        name: "description",
        content:
          "Complete list of Mumbai localities served for doorstep scrap pickup. Andheri, Bandra, Powai, Borivali, Malad, Kurla, Goregaon & central Mumbai.",
      },
      {
        name: "keywords",
        content: "scrap pickup Mumbai locations, doorstep scrap buyer Mumbai areas, kabadiwala Mumbai coverage",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "Doorstep Scrap Pickup Across All Mumbai Localities | My Scrap Buddy" },
      { property: "og:url", content: "https://scrapbuddy.org/locations/mumbai" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Doorstep Scrap Pickup Across All Mumbai Localities | My Scrap Buddy" },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/locations/mumbai" }],
  }),
  component: MumbaiLocationsIndexPage,
});

const mumbaiLocalities = [
  { name: "Andheri (East & West)", link: "/locations/andheri", desc: "MIDC Industrial Area, Lokhandwala, Chakala, Marol, JB Nagar, Versova" },
  { name: "Bandra & BKC", link: "/locations/bandra", desc: "Bandra West, BKC Corporate Hub, Bandra East, Khar West, Hill Road" },
  { name: "Borivali (East & West)", link: "/locations/borivali", desc: "IC Colony, Shimpoli, Magathane, Carter Road, Gorai, Dahisar" },
  { name: "Powai & Chandivali", link: "/locations/powai", desc: "Hiranandani Gardens, Raheja Vihar, Chandivali Tech Parks, IIT Vicinity" },
  { name: "Malad (East & West)", link: "/locations/malad", desc: "Malad West, Mindspace IT Park, Dindoshi, Evershine Nagar, Orlem" },
];

const faqs = [
  {
    q: "Which areas of Mumbai are covered by My Scrap Buddy?",
    a: "My Scrap Buddy covers all Western and Central Mumbai localities including Andheri, Bandra, Powai, Borivali, Malad, Goregaon, Kurla, and Saki Naka.",
  },
  {
    q: "How do I book a doorstep scrap pickup in Mumbai?",
    a: "You can book a doorstep scrap pickup online or via WhatsApp in under 2 minutes by selecting your scrap items, address, and preferred time slot.",
  },
];

function MumbaiLocationsIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://scrapbuddy.org/" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://scrapbuddy.org/locations/mumbai" }
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
          Mumbai Locations Directory
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Doorstep Scrap Pickup Localities in Mumbai
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          My Scrap Buddy operates doorstep scrap collection across Western, Central, and Suburban Mumbai. Select your locality below for specific coverage details.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mumbaiLocalities.map((loc) => (
          <Card key={loc.link} className="p-6 flex flex-col justify-between border-border/70 hover:border-emerald-500/50 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{loc.name}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{loc.desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-border/50">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to={loc.link} className="flex items-center justify-between">
                  <span>View Locality Page</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Locality FAQs */}
      <div className="space-y-6 max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Mumbai Coverage FAQs</h2>
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
