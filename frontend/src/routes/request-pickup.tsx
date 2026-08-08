import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Truck, Clock, ShieldCheck, CalendarCheck, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createRequest, fetchMaterials } from "../lib/api";

export const Route = createFileRoute("/request-pickup")({
  head: () => ({
    meta: [
      { title: "Book Free Doorstep Scrap Pickup — My Scrap Buddy Mumbai" },
      {
        name: "description",
        content:
          "Schedule a free doorstep scrap pickup in Mumbai. Household, office, construction waste, iron rods, steel, e-waste & appliances. Digital weighing & instant payment.",
      },
      {
        name: "keywords",
        content:
          "book scrap pickup Mumbai, schedule scrap collection, free doorstep pickup Mumbai, scrap pickup request, e-waste pickup booking Mumbai",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "My Scrap Buddy" },
      { property: "og:title", content: "Book Free Doorstep Scrap Pickup — My Scrap Buddy Mumbai" },
      {
        property: "og:description",
        content: "Schedule a free doorstep scrap pickup across Mumbai in under 2 minutes.",
      },
      { property: "og:url", content: "https://myscrapbuddy.com/request-pickup" },
      { property: "og:image", content: "https://myscrapbuddy.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Book Free Doorstep Scrap Pickup — My Scrap Buddy Mumbai" },
      {
        name: "twitter:description",
        content: "Schedule a free doorstep scrap pickup across Mumbai in under 2 minutes.",
      },
      { name: "twitter:image", content: "https://myscrapbuddy.com/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://myscrapbuddy.com/request-pickup" },
    ],
  }),
  component: RequestPickup,
});

const perks = [
  { icon: Truck, label: "100% Free Doorstep Collection" },
  { icon: Clock, label: "Fast Pickup Within 24 Hours" },
  { icon: ShieldCheck, label: "Government Authorized Recycler" },
  { icon: MapPin, label: "Servicing All Locality Hubs Across Mumbai" },
];

function RequestPickup() {
  const { data: liveMaterials } = useQuery({
    queryKey: ["materials"],
    queryFn: fetchMaterials,
  });

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [scrapType, setScrapType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date();
  const localDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const requestMutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Pickup request received! Our Mumbai pickup coordinator will call you shortly.");
      setName("");
      setPhone("");
      setAddress("");
      setScrapType("");
      setQuantity("");
      setPreferredDate("");
      setPreferredSlot("");
      setNotes("");
    },
    onError: (error: any) => {
      console.error("Pickup submit error:", error);
      toast.error(error?.message || "Failed to submit pickup request. Please try again or call us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      toast.error("Please fill in your name, phone number, and address.");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
    if (!scrapType || !quantity || !preferredSlot) {
      toast.error("Please fill in all material and slot select fields.");
      return;
    }
    if (!preferredDate) {
      toast.error("Please select a preferred pickup date.");
      return;
    }
    if (preferredDate < localDateString) {
      toast.error("Please select a future date (today or later).");
      return;
    }

    requestMutation.mutate({
      name,
      phone,
      address,
      scrapType,
      quantity,
      preferredDate,
      preferredSlot,
      notes,
    });
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-foreground">Pickup Request Confirmed!</h1>
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
          Thanks for choosing My Scrap Buddy. Our area coordinator will call your phone within a few hours to confirm your scheduled doorstep slot.
        </p>
        <Button className="mt-8" variant="hero" onClick={() => setSubmitted(false)}>
          Book Another Pickup
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Free Doorstep Collection
            </span>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Book a Pickup
            </h1>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
              Fill in your details below. Our verified executive will arrive with ISO digital weighing scales and issue instant payment on the spot.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {perks.map((p) => (
              <div key={p.label} className="flex items-center gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="font-semibold text-sm text-foreground">{p.label}</span>
              </div>
            ))}
          </div>

          <Card className="p-6 bg-secondary/40 border-border/60 rounded-2xl text-xs space-y-2 text-muted-foreground">
            <div className="font-bold text-foreground flex items-center gap-1.5 text-sm">
              <CalendarCheck className="h-4 w-4 text-emerald-600" /> Instant Pickup Confirmation
            </div>
            <p>
              We service all Mumbai areas including MIDC, Andheri, Powai, Saki Naka, Bandra, Juhu, Malad, Goregaon, Borivali, and central Mumbai.
            </p>
          </Card>
        </div>

        <Card className="p-6 sm:p-8 shadow-2xl rounded-3xl border-border/80">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold">Full Name</Label>
                <Input
                  id="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) {
                      setPhone(val);
                    }
                  }}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs font-bold">Pickup Address & Mumbai Locality</Label>
              <Input
                id="address"
                required
                placeholder="Flat / Building, Street, Area (e.g. MIDC, Andheri East, Mumbai)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Scrap Category / Type</Label>
                <Select value={scrapType} onValueChange={setScrapType} required>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select material category" />
                  </SelectTrigger>
                  <SelectContent>
                    {liveMaterials && liveMaterials.length > 0 ? (
                      liveMaterials.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="construction_scrap">Construction Scrap & Debris</SelectItem>
                        <SelectItem value="iron_rods_steel">Iron Rods, TMT & Steel</SelectItem>
                        <SelectItem value="ewaste">E-Waste & IT Corporate Disposal</SelectItem>
                        <SelectItem value="metal">Metals (Copper, Brass, Aluminium)</SelectItem>
                        <SelectItem value="paper">Paper, Books & Cardboard</SelectItem>
                        <SelectItem value="plastic">Plastics & PET Bottles</SelectItem>
                        <SelectItem value="appliance">Appliances (AC, Fridge, Washing Machine)</SelectItem>
                        <SelectItem value="furniture">Old Furniture & Bulk Scrap</SelectItem>
                        <SelectItem value="mixed">Mixed Bulk Scrap</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Estimated Quantity</Label>
                <Select value={quantity} onValueChange={setQuantity} required>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Under 10 kg</SelectItem>
                    <SelectItem value="medium">10 – 50 kg</SelectItem>
                    <SelectItem value="large">50 – 200 kg</SelectItem>
                    <SelectItem value="bulk">200 kg + / Commercial Tonnage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-xs font-bold">Preferred Pickup Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  min={localDateString}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="rounded-xl cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold">Preferred Time Slot</Label>
                <Select value={preferredSlot} onValueChange={setPreferredSlot} required>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9am – 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm – 4pm)</SelectItem>
                    <SelectItem value="evening">Evening (4pm – 7pm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-xs font-bold">Additional Notes / Instructions</Label>
              <Textarea
                id="notes"
                placeholder="Mention specific items (e.g. 5 TMT bars, 2 old laptops, 1 AC unit) or elevator availability..."
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full shadow-lg shadow-emerald-600/20 font-bold rounded-xl"
              disabled={requestMutation.isPending}
            >
              {requestMutation.isPending ? "Submitting Pickup Request..." : "Confirm Doorstep Pickup"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
