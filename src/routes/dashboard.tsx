import { createFileRoute } from "@tanstack/react-router";
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

const stats = [
  { icon: Wallet, label: "Total Earnings", value: "₹40,100", delta: "+18%" },
  { icon: Package, label: "Total Weight", value: "2,010 kg", delta: "+12%" },
  { icon: Truck, label: "Pickups", value: "48", delta: "+6%" },
  { icon: Leaf, label: "CO₂ Saved", value: "3.4 t", delta: "+22%" },
];

type Status = "Completed" | "Scheduled" | "In Transit";
const pickups: { id: string; date: string; material: string; weight: string; amount: string; status: Status }[] = [
  { id: "SW-1042", date: "Jul 02, 2026", material: "E-Waste", weight: "42 kg", amount: "₹3,780", status: "Completed" },
  { id: "SW-1041", date: "Jul 01, 2026", material: "Metals", weight: "88 kg", amount: "₹2,640", status: "Completed" },
  { id: "SW-1040", date: "Jun 29, 2026", material: "Paper", weight: "120 kg", amount: "₹1,560", status: "In Transit" },
  { id: "SW-1039", date: "Jul 04, 2026", material: "Appliances", weight: "2 pc", amount: "₹3,200", status: "Scheduled" },
  { id: "SW-1038", date: "Jun 25, 2026", material: "Plastics", weight: "34 kg", amount: "₹748", status: "Completed" },
];

const statusStyles: Record<Status, string> = {
  Completed: "bg-secondary text-primary",
  Scheduled: "bg-accent text-accent-foreground",
  "In Transit": "bg-muted text-muted-foreground",
};

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <p className="text-muted-foreground">Your recycling activity at a glance.</p>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
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
            {pickups.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell className="text-muted-foreground">{p.date}</TableCell>
                <TableCell>{p.material}</TableCell>
                <TableCell>{p.weight}</TableCell>
                <TableCell className="font-semibold">{p.amount}</TableCell>
                <TableCell className="text-right">
                  <Badge className={statusStyles[p.status]}>{p.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
