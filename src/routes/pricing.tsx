import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, TrendingUp, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMaterials } from "../lib/api";
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
      { title: "Scrap Price List — ScrapWise" },
      {
        name: "description",
        content:
          "Live scrap and e-waste prices per kg. Transparent, competitive rates for metals, paper, plastics and appliances with ScrapWise.",
      },
      { property: "og:title", content: "Scrap Price List — ScrapWise" },
      {
        property: "og:description",
        content: "Transparent, competitive per-kg rates for all scrap materials.",
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
  { item: "Aluminium", category: "Metal", unit: "kg", price: 115, trend: "up" },
  { item: "Brass", category: "Metal", unit: "kg", price: 380, trend: "down" },
  { item: "Copper", category: "Metal", unit: "kg", price: 620, trend: "up" },
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

const categories = ["All", "Paper", "Metal", "Plastic", "E-Waste", "Appliance", "Furniture", "Other"];

function getCategoryForMaterial(id: string, icon?: string): string {
  const matId = id.toLowerCase();
  const matIcon = (icon || "").toLowerCase();
  
  if (matId.includes("ewaste") || matId.includes("laptop") || matId.includes("phone") || matId.includes("cpu") || matIcon === "laptop") {
    return "E-Waste";
  }
  if (matId.includes("metal") || matId.includes("iron") || matId.includes("steel") || matId.includes("aluminium") || matId.includes("copper") || matId.includes("brass") || matIcon === "wrench") {
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
      <div className="max-w-2xl">
        <Badge variant="secondary" className="mb-3">Updated daily</Badge>
        <h1 className="text-4xl font-extrabold">Scrap Price List</h1>
        <p className="mt-3 text-muted-foreground">
          Transparent, competitive market rates. Final prices confirmed at doorstep
          after digital weighing.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search materials…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Card className="mt-6 overflow-hidden p-0 shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Material</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Rate (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.item}>
                <TableCell className="font-medium">{r.item}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{r.category}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">per {r.unit}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    ₹{r.price}
                    {r.trend === "up" && (
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    )}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No materials found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-secondary/40 p-8 text-center sm:flex-row sm:text-left">
        <div>
          <h3 className="text-lg font-bold">Have bulk scrap?</h3>
          <p className="text-sm text-muted-foreground">
            Get custom corporate rates and scheduled pickups.
          </p>
        </div>
        <Button asChild variant="hero">
          <Link to="/request-pickup">
            Book a Pickup <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
