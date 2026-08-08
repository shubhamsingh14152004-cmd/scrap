import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Target, Users, Recycle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About My Scrap Buddy — Sustainable Scrap Recycling in Mumbai" },
      {
        name: "description",
        content:
          "My Scrap Buddy is a trusted scrap collection service in Mumbai. We purchase household scrap, office scrap, industrial scrap, electronic waste, construction waste, iron, steel, copper, aluminium, brass and other recyclable materials.",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "About My Scrap Buddy — Sustainable Scrap Recycling in Mumbai" },
      {
        property: "og:description",
        content: "Making recycling simple, fair and sustainable for everyone in Mumbai.",
      },
      { property: "og:url", content: "https://scrapbuddy.org/about" },
      { property: "og:image", content: "https://scrapbuddy.org/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About My Scrap Buddy — Sustainable Scrap Recycling in Mumbai" },
      {
        name: "twitter:description",
        content: "Making recycling simple, fair and sustainable for everyone in Mumbai.",
      },
      { name: "twitter:image", content: "https://scrapbuddy.org/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://scrapbuddy.org/about" },
    ],
  }),
  component: About,
});

const values = [
  { icon: Leaf, title: "Sustainability", desc: "Every kilogram we recycle keeps waste out of landfills and cuts carbon." },
  { icon: Target, title: "Transparency", desc: "Digital weighing and live pricing mean you always know what you earn." },
  { icon: Users, title: "Community", desc: "We serve homes, societies and corporates with the same care." },
  { icon: Recycle, title: "Compliance", desc: "Fully licensed, government authorized recycling with proper documentation." },
];

function About() {
  return (
    <div>
      <section className="bg-gradient-hero py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Recycling, reimagined
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/85">
            My Scrap Buddy is a trusted scrap collection service in Mumbai. We purchase household scrap, office scrap, industrial scrap, electronic waste, construction waste, iron, steel, copper, aluminium, brass and other recyclable materials. We provide fair market prices, instant quotations, doorstep pickup and secure digital payments.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold">Our mission</h2>
            <p className="mt-4 text-muted-foreground">
              We believe recycling should be effortless and rewarding. That's why we
              built a modern platform that connects people with reliable scrap buyers,
              offering the best market prices, free doorstep pickup and instant
              payment — all with full environmental compliance.
            </p>
            <p className="mt-4 text-muted-foreground">
              From a single newspaper stack to bulk corporate e-waste, our goal is a
              cleaner, circular economy where nothing valuable goes to waste.
            </p>
          </div>
          <Card className="grid grid-cols-2 gap-6 bg-secondary/40 p-8">
            {[
              { v: "50K+", l: "Pickups" },
              { v: "12K+", l: "Tonnes recycled" },
              { v: "2018", l: "Founded" },
              { v: "15+", l: "Cities served" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-extrabold text-primary">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-extrabold">What we stand for</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="p-6 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Card className="bg-gradient-primary p-10 text-center text-primary-foreground shadow-elegant md:p-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Join the recycling movement
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Book your first pickup and see how easy sustainable recycling can be.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-8 border-white/40 bg-white/15 text-primary-foreground hover:bg-white/25 hover:text-primary-foreground"
          >
            <Link to="/request-pickup">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
