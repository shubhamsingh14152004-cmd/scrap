import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Truck, Clock, ShieldCheck } from "lucide-react";
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

export const Route = createFileRoute("/request-pickup")({
  head: () => ({
    meta: [
      { title: "Book a Scrap Pickup — ScrapWise" },
      {
        name: "description",
        content:
          "Schedule a free doorstep scrap and e-waste pickup with ScrapWise. Quick booking, transparent weighing and instant payment.",
      },
      { property: "og:title", content: "Book a Scrap Pickup — ScrapWise" },
      {
        property: "og:description",
        content: "Schedule a free doorstep scrap and e-waste pickup in minutes.",
      },
    ],
  }),
  component: RequestPickup,
});

const perks = [
  { icon: Truck, label: "Free doorstep pickup" },
  { icon: Clock, label: "Pickup within 24 hours" },
  { icon: ShieldCheck, label: "Government authorized" },
];

import { useMutation, useQuery } from "@tanstack/react-query";
import { createRequest, fetchMaterials } from "../lib/api";

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
      toast.success("Pickup request received! Our team will call you shortly.");
      // Reset form
      setName("");
      setPhone("");
      setAddress("");
      setScrapType("");
      setQuantity("");
      setPreferredDate("");
      setPreferredSlot("");
      setNotes("");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to submit pickup request. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapType || !quantity || !preferredSlot) {
      toast.error("Please fill in all select fields.");
      return;
    }
    if (preferredDate < localDateString) {
      toast.error("Please select a future date (today or later).");
      return;
    }
    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
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
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold">Request submitted!</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks for choosing ScrapWise. Our area incharge will contact you within a
          few hours to confirm your pickup slot.
        </p>
        <Button className="mt-8" variant="hero" onClick={() => setSubmitted(false)}>
          Book another pickup
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="text-4xl font-extrabold">Book a pickup</h1>
          <p className="mt-3 text-muted-foreground">
            Fill in a few details and we'll arrange a free doorstep collection at your
            convenience.
          </p>
          <div className="mt-8 space-y-4">
            {perks.map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="font-medium">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-6 shadow-card sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="10-digit phone number"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) {
                      setPhone(val);
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Pickup address</Label>
              <Input
                id="address"
                required
                placeholder="Flat, building, area, city"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Scrap type</Label>
                <Select value={scrapType} onValueChange={setScrapType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
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
                        <SelectItem value="ewaste">E-Waste</SelectItem>
                        <SelectItem value="metal">Metals</SelectItem>
                        <SelectItem value="paper">Paper & Cardboard</SelectItem>
                        <SelectItem value="plastic">Plastics</SelectItem>
                        <SelectItem value="appliance">Appliances</SelectItem>
                        <SelectItem value="mixed">Mixed / Bulk</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estimated quantity</Label>
                <Select value={quantity} onValueChange={setQuantity} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Under 10 kg</SelectItem>
                    <SelectItem value="medium">10 – 50 kg</SelectItem>
                    <SelectItem value="large">50 – 200 kg</SelectItem>
                    <SelectItem value="bulk">200 kg +</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  min={localDateString}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred slot</Label>
                <Select value={preferredSlot} onValueChange={setPreferredSlot} required>
                  <SelectTrigger>
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
              <Label htmlFor="notes">Additional notes</Label>
              <Textarea
                id="notes"
                placeholder="Anything we should know?"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={requestMutation.isPending}
            >
              {requestMutation.isPending ? "Submitting..." : "Confirm pickup request"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
