import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query";
import { fetchStats, fetchRequests } from "../lib/api";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Wallet,
  Package,
  Leaf,
  Truck,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ScrapWise" },
      {
        name: "description",
        content:
          "Track your recycling activity, earnings and pickups with the ScrapWise dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

const monthly = [
  { month: "Jan", earnings: 4200, weight: 210 },
  { month: "Feb", earnings: 3800, weight: 190 },
  { month: "Mar", earnings: 5100, weight: 260 },
  { month: "Apr", earnings: 6200, weight: 300 },
  { month: "May", earnings: 5400, weight: 280 },
  { month: "Jun", earnings: 7300, weight: 360 },
  { month: "Jul", earnings: 8100, weight: 410 },
];

const breakdown = [
  { name: "E-Waste", value: 38 },
  { name: "Metals", value: 27 },
  { name: "Paper", value: 20 },
  { name: "Plastics", value: 15 },
];

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-4)",
  "var(--color-chart-3)",
];

const statusStyles: Record<string, string> = {
  completed: "bg-secondary text-primary",
  approved: "bg-accent text-accent-foreground",
  pending: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/15 text-destructive",
};

function Dashboard() {
  const { data: liveStats, isLoading: statsLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  const { data: liveRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  // Calculate live values or fallback to default mock values
  const earningsVal = liveStats ? `₹${liveStats.estimatedRevenue.toLocaleString()}` : "₹40,100";
  const weightVal = liveStats ? `${liveStats.estimatedWeight.toLocaleString()} kg` : "2,010 kg";
  const pickupsVal = liveStats ? liveStats.total.toString() : "48";
  const co2Val = liveStats ? `${(liveStats.estimatedWeight * 0.0017).toFixed(1)} t` : "3.4 t";

  const pickupsList = liveRequests && liveRequests.length > 0
    ? liveRequests.map((r) => {
        let weightEstimate = "—";
        if (r.quantity === "small") weightEstimate = "~8 kg";
        else if (r.quantity === "medium") weightEstimate = "~30 kg";
        else if (r.quantity === "large") weightEstimate = "~125 kg";
        else if (r.quantity === "bulk") weightEstimate = "~300 kg";

        const displayStatus = r.status || "pending";

        let amount = "—";
        let numericWeight = 0;
        if (r.quantity === "small") numericWeight = 8;
        else if (r.quantity === "medium") numericWeight = 30;
        else if (r.quantity === "large") numericWeight = 125;
        else if (r.quantity === "bulk") numericWeight = 300;

        if (numericWeight > 0) {
          amount = `₹${(numericWeight * 35).toLocaleString()}`;
        }

        return {
          id: r.id || "SW-UNKNOWN",
          date: r.preferredDate ? new Date(r.preferredDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—",
          material: r.scrapType ? r.scrapType.charAt(0).toUpperCase() + r.scrapType.slice(1) : "—",
          weight: weightEstimate,
          amount: amount,
          status: displayStatus,
        };
      })
    : [
        { id: "SW-1042", date: "Jul 02, 2026", material: "E-Waste", weight: "42 kg", amount: "₹3,780", status: "completed" },
        { id: "SW-1041", date: "Jul 01, 2026", material: "Metals", weight: "88 kg", amount: "₹2,640", status: "completed" },
        { id: "SW-1040", date: "Jun 29, 2026", material: "Paper", weight: "120 kg", amount: "₹1,560", status: "pending" },
        { id: "SW-1039", date: "Jul 04, 2026", material: "Appliances", weight: "2 pc", amount: "₹3,200", status: "approved" },
        { id: "SW-1038", date: "Jun 25, 2026", material: "Plastics", weight: "34 kg", amount: "₹748", status: "completed" },
      ];

  const statCards = [
    { icon: Wallet, label: "Total Earnings", value: earningsVal, delta: "+18%" },
    { icon: Package, label: "Total Weight", value: weightVal, delta: "+12%" },
    { icon: Truck, label: "Pickups", value: pickupsVal, delta: "+6%" },
    { icon: Leaf, label: "CO₂ Saved", value: co2Val, delta: "+22%" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <p className="text-muted-foreground">Your recycling activity at a glance.</p>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label} className="p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                <ArrowUpRight className="h-4 w-4" /> {s.delta}
              </span>
            </div>
            <div className="mt-4 font-display text-2xl font-extrabold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 shadow-card lg:col-span-2">
          <h3 className="font-bold">Earnings over time</h3>
          <p className="text-sm text-muted-foreground">Monthly scrap earnings (₹)</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly} margin={{ left: -10, right: 10 }}>
                <defs>
                  <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  fill="url(#earn)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="font-bold">Material mix</h3>
          <p className="text-sm text-muted-foreground">By weight (%)</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  isAnimationActive={false}
                >
                  {breakdown.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            {breakdown.map((b, i) => (
              <div key={b.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: pieColors[i] }} />
                <span className="text-muted-foreground">{b.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 shadow-card">
        <h3 className="font-bold">Volume collected</h3>
        <p className="text-sm text-muted-foreground">Monthly weight (kg)</p>
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly} margin={{ left: -10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <Tooltip
                cursor={{ fill: "var(--color-secondary)" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                }}
              />
              <Bar dataKey="weight" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent pickups table */}
      <Card className="mt-6 overflow-hidden p-0 shadow-card">
        <div className="flex items-center justify-between p-6">
          <h3 className="font-bold">Recent pickups</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pickupsList.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell className="text-muted-foreground">{p.date}</TableCell>
                <TableCell>{p.material}</TableCell>
                <TableCell>{p.weight}</TableCell>
                <TableCell className="font-semibold">{p.amount}</TableCell>
                <TableCell className="text-right">
                  <Badge className={statusStyles[p.status] || statusStyles.pending}>{p.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
