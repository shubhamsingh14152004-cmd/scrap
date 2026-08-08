import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "../lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ScrapBuddy | Doorstep Scrap Pickup Mumbai Support" },
      {
        name: "description",
        content:
          "Get in touch with ScrapBuddy for doorstep scrap pickup in Mumbai. Call +91 85917 70877 or WhatsApp us. Fast customer service for household, office & commercial scrap.",
      },
      {
        name: "keywords",
        content:
          "contact ScrapBuddy, scrap pickup phone number Mumbai, kabadiwala contact Mumbai, scrap dealer number Andheri MIDC, doorstep scrap support",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ScrapBuddy" },
      { property: "og:title", content: "Contact ScrapBuddy | Doorstep Scrap Pickup Mumbai Support" },
      {
        property: "og:description",
        content:
          "Contact ScrapBuddy for doorstep scrap pickup across Mumbai. Live customer support, instant WhatsApp estimation & instant UPI payout.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/contact" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact ScrapBuddy | Doorstep Scrap Pickup Mumbai Support" },
      {
        name: "twitter:description",
        content:
          "Get in touch with ScrapBuddy for doorstep scrap pickup in Mumbai. Call +91 85917 70877 or WhatsApp us.",
      },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://scrapbuddy.org/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const displayPhone = settings?.phoneNumber || "+91 85917 70877";
  const displayAddress =
    settings?.address ||
    "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid, Mumbai – 400093, Maharashtra, India";
  const displayEmail = settings?.email || "myscrapbuddy6272@gmail.com";

  const cleanPhone = displayPhone.startsWith("+")
    ? "+" + displayPhone.replace(/[^0-9]/g, "")
    : "+91" + displayPhone.replace(/[^0-9]/g, "");
  const cleanWhatsapp = displayPhone.replace(/[^0-9]/g, "");

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ScrapBuddy",
    "url": "https://scrapbuddy.org/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "ScrapBuddy",
      "telephone": displayPhone,
      "email": displayEmail,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400093",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Get In Touch
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Contact ScrapBuddy
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Need a quick scrap pickup in Mumbai or a bulk commercial recycling quote? Reach out to our customer service team via phone, WhatsApp, or email 7 days a week.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Cards */}
        <Card className="p-6 space-y-4 border-border/70 shadow-card rounded-2xl">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Phone className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">Phone Helpline</h3>
            <p className="text-xs text-muted-foreground mt-1">Speak directly with our Mumbai pickup dispatch team.</p>
          </div>
          <div className="pt-2">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 text-sm hover:underline"
            >
              {displayPhone}
            </a>
          </div>
        </Card>

        <Card className="p-6 space-y-4 border-border/70 shadow-card rounded-2xl">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <MessageCircle className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">WhatsApp Instant Estimate</h3>
            <p className="text-xs text-muted-foreground mt-1">Send photos of your scrap material for instant price quotation.</p>
          </div>
          <div className="pt-2">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi%20ScrapBuddy,%20I%20want%20to%20sell%20scrap`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 text-sm hover:underline"
            >
              Chat on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Card>

        <Card className="p-6 space-y-4 border-border/70 shadow-card rounded-2xl">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Mail className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">Corporate & Email Inquiries</h3>
            <p className="text-xs text-muted-foreground mt-1">For corporate IT asset disposal & demolition tenders.</p>
          </div>
          <div className="pt-2">
            <a
              href={`mailto:${displayEmail}`}
              className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 text-sm hover:underline break-all"
            >
              {displayEmail}
            </a>
          </div>
        </Card>
      </div>

      {/* Office & Operations Details */}
      <Card className="bg-slate-950 p-8 sm:p-10 text-white rounded-3xl border-slate-800 shadow-2xl space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <MapPin className="h-4 w-4" /> Operating Head Office
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">ScrapBuddy Mumbai Facility</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {displayAddress}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> Pollution Control Board License &amp; ISO Scale Certified
            </div>
          </div>

          <div className="space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-400" /> Service Hours &amp; Slots
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex justify-between py-1 border-b border-slate-800">
                <span>Monday – Sunday</span>
                <span className="font-semibold text-emerald-400">8:00 AM – 8:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-800">
                <span>Doorstep Pickup Window</span>
                <span className="font-semibold text-slate-200">24 Hours Guaranteed</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Commercial Bulk Disposal</span>
                <span className="font-semibold text-slate-200">Weekend &amp; After-Hours Support</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button asChild size="lg" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                <Link to="/request-pickup">Schedule Doorstep Pickup Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
