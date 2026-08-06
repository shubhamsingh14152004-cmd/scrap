import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, TrendingUp, Phone, MessageCircle, ArrowRight, Building, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMaterials, fetchSettings } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Scrap Price List & Bulk Pricing — My Scrap Buddy Mumbai" },
      {
        name: "description",
        content:
          "Live scrap prices per kg in Mumbai. Updated market rates for metals, iron rods, steel, e-waste, construction scrap, paper, plastic & appliances. Commercial bulk rates available.",
      },
      { property: "og:title", content: "Scrap Price List & Bulk Pricing — My Scrap Buddy Mumbai" },
      {
        property: "og:description",
        content: "Transparent daily market rates per kg for household, office & construction scrap in Mumbai.",
      },
    ],
  }),
  component: Pricing,
});

type Row = {
  item: string;
  category: string;
  unit: string;
  price: number;
  trend: "up" | "down" | "flat";
};

const rows: Row[] = [
  { item: "Newspaper", category: "Paper", unit: "kg", price: 14, trend: "up" },
  { item: "Cardboard", category: "Paper", unit: "kg", price: 9, trend: "flat" },
  { item: "Books / Magazines", category: "Paper", unit: "kg", price: 12, trend: "up" },
  { item: "Iron / Steel", category: "Metal", unit: "kg", price: 30, trend: "up" },
  { item: "TMT Bars & Steel Rods", category: "Steel", unit: "kg", price: 36, trend: "up" },
  { item: "Construction Waste & Tiles", category: "Construction", unit: "kg", price: 8, trend: "flat" },
  { item: "PVC Pipes & Fittings", category: "Construction", unit: "kg", price: 16, trend: "up" },
  { item: "Aluminium Window Frames", category: "Construction", unit: "kg", price: 118, trend: "up" },
  { item: "Aluminium Scrap", category: "Metal", unit: "kg", price: 115, trend: "up" },
  { item: "Brass", category: "Metal", unit: "kg", price: 380, trend: "down" },
  { item: "Copper Wiring", category: "Metal", unit: "kg", price: 620, trend: "up" },
  { item: "PET Bottles", category: "Plastic", unit: "kg", price: 18, trend: "flat" },
  { item: "Hard Plastic", category: "Plastic", unit: "kg", price: 22, trend: "up" },
  { item: "Laptop", category: "E-Waste", unit: "pc", price: 450, trend: "up" },
  { item: "Desktop CPU", category: "E-Waste", unit: "pc", price: 350, trend: "flat" },
  { item: "Mobile Phone", category: "E-Waste", unit: "pc", price: 120, trend: "down" },
  { item: "Refrigerator", category: "Appliance", unit: "pc", price: 1600, trend: "up" },
  { item: "Washing Machine", category: "Appliance", unit: "pc", price: 1200, trend: "flat" },
  { item: "Air Conditioner", category: "Appliance", unit: "pc", price: 2200, trend: "up" },
  { item: "Sofa / Couch", category: "Furniture", unit: "pc", price: 800, trend: "flat" },
  { item: "Office Chair", category: "Furniture", unit: "pc", price: 150, trend: "up" },
  { item: "Wooden Table", category: "Furniture", unit: "pc", price: 300, trend: "up" },
  { item: "Plastic Chair / Table", category: "Furniture", unit: "pc", price: 70, trend: "flat" },
];

const categories = ["All", "Paper", "Metal", "Steel", "Construction", "Plastic", "E-Waste", "Appliance", "Furniture", "Other"];

function getCategoryForMaterial(id: string, icon?: string): string {
  const matId = id.toLowerCase();
  const matIcon = (icon || "").toLowerCase();
  
  if (matId.includes("tmt") || matId.includes("rebar") || matId.includes("rod") || matId.includes("steel")) {
    return "Steel";
  }
  if (matId.includes("construction") || matId.includes("tile") || matId.includes("pvc") || matId.includes("brick")) {
    return "Construction";
  }
  if (matId.includes("ewaste") || matId.includes("laptop") || matId.includes("phone") || matId.includes("cpu") || matIcon === "laptop") {
    return "E-Waste";
  }
  if (matId.includes("metal") || matId.includes("iron") || matId.includes("aluminium") || matId.includes("copper") || matId.includes("brass") || matIcon === "wrench") {
    return "Metal";
  }
  if (matId.includes("paper") || matId.includes("cardboard") || matId.includes("book") || matIcon === "filetext") {
    return "Paper";
  }
  if (matId.includes("plastic") || matId.includes("bottle") || matIcon === "layers") {
    return "Plastic";
  }
  if (matId.includes("appliance") || matId.includes("refrigerator") || matIcon === "tv") {
    return "Appliance";
  }
  if (matId.includes("furniture") || matId.includes("chair") || matId.includes("table") || matId.includes("sofa")) {
    return "Furniture";
  }
  return "Other";
}

function Pricing() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const { data: liveMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: fetchMaterials,
  });

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const displayPhone = settings?.phoneNumber || "+91 85917 70877";
  const displayWhatsapp = settings?.whatsappNumber || "+91 85917 70877";

  const cleanPhone = displayPhone.startsWith("+")
    ? "+" + displayPhone.replace(/[^0-9]/g, "")
    : "+91" + displayPhone.replace(/[^0-9]/g, "");
  const cleanWhatsapp = displayWhatsapp.replace(/[^0-9]/g, "");

  const dynamicRows = useMemo(() => {
    if (!liveMaterials || liveMaterials.length === 0) return rows;

    return liveMaterials.map((m) => ({
      item: m.name,
      category: getCategoryForMaterial(m.id, m.icon),
      unit: m.unit,
      price: m.price,
      trend: "flat" as const,
    }));
  }, [liveMaterials]);

  const filtered = useMemo(
    () =>
      dynamicRows.filter(
        (r) =>
          (active === "All" || r.category === active) &&
          r.item.toLowerCase().includes(query.toLowerCase()),
      ),
    [dynamicRows, query, active],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="max-w-3xl space-y-3">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          Daily Mumbai Market Rates
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Scrap Price List
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Transparent rates per kilogram & piece. Daily live updates for household, commercial, industrial, e-waste, construction scrap, and steel in Mumbai.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search scrap material (e.g. Copper, TMT, Laptop)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                active === c
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Card className="mt-6 overflow-hidden p-0 shadow-card rounded-2xl border-border/70">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60">
              <TableHead className="font-bold text-foreground">Material</TableHead>
              <TableHead className="font-bold text-foreground">Category</TableHead>
              <TableHead className="font-bold text-foreground">Unit</TableHead>
              <TableHead className="text-right font-bold text-foreground">Live Rate (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.item} className="hover:bg-muted/40 transition-colors">
                <TableCell className="font-semibold text-foreground flex items-center gap-2">
                  <span>{r.item}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[11px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20">
                    {r.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">per {r.unit}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{r.price}
                    {r.trend === "up" && (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-muted-foreground text-sm">
                  No matching materials found. Contact us directly for custom scrap rates.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Commercial / Bulk Pricing Premium Section */}
      <section className="mt-16 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-8 sm:p-12 text-white shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
              <Building className="h-3.5 w-3.5" /> Corporate & Demolition Solutions
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Bulk / Commercial Scrap Pricing
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Commercial, Industrial, Office, Warehouse and Construction Scrap pricing depends upon:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-slate-200 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Quantity:</strong> Higher volume receives premium rate tier</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Material Quality:</strong> Metal grade & purity inspection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Pickup Location:</strong> Distance & site accessibility</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Loading Requirements:</strong> Crane & labor deployment</span>
              </li>
              <li className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Market Rates:</strong> Daily Mandi & foundry rate index</span>
              </li>
            </ul>
          </div>

          <div className="shrink-0 space-y-3 w-full md:w-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 text-center md:text-left">
              Get Instant Bulk Quote
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <a href={`tel:${cleanPhone}`}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-600/30"
              >
                <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 flex items-center justify-center gap-2 font-semibold"
              >
                <Link to="/request-pickup">
                  Get Bulk Pricing <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
