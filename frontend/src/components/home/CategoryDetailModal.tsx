import React from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, Truck, ArrowRight, ShieldAlert, Tag, CalendarCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface CategoryDetailData {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
  acceptedMaterials: string[];
  rejectedMaterials: string[];
  pickupProcess: string[];
  estimatedPricingNote: string;
  safetyNotes?: string;
}

interface CategoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryDetailData | null;
}

export function CategoryDetailModal({ isOpen, onClose, category }: CategoryDetailModalProps) {
  if (!category) return null;

  const IconComponent = category.icon;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl border-emerald-500/20 shadow-2xl">
        <DialogHeader className="text-left space-y-3">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
              <IconComponent className="h-7 w-7" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="text-2xl font-extrabold tracking-tight text-foreground">
                  {category.title}
                </DialogTitle>
                {category.badge && (
                  <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
                    {category.badge}
                  </Badge>
                )}
              </div>
              <DialogDescription className="mt-1 text-sm text-muted-foreground">
                Comprehensive recycling guidance, accepted materials & instant rates
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Overview Description */}
          <div className="rounded-xl bg-secondary/40 p-4 border border-border/60 text-sm leading-relaxed text-foreground">
            {category.description}
          </div>

          {/* Accepted vs Rejected Materials Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Accepted Materials */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Accepted Materials</span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {category.acceptedMaterials.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rejected Materials */}
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-400">
                <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>Rejected Materials</span>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {category.rejectedMaterials.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pickup Process */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-foreground">
              <Truck className="h-4 w-4 text-emerald-600" />
              <span>Doorstep Pickup Process</span>
            </h4>
            <div className="grid gap-2 sm:grid-cols-3 text-xs">
              {category.pickupProcess.map((step, idx) => (
                <div key={idx} className="rounded-lg bg-secondary/50 p-3 border border-border/50">
                  <span className="font-bold text-emerald-600 text-xs block mb-1">Step {idx + 1}</span>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Note */}
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 flex items-start gap-3">
            <Tag className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <div className="font-semibold text-amber-900 dark:text-amber-300">Estimated Pricing & Valuation</div>
              <div className="text-amber-800/80 dark:text-amber-300/80">{category.estimatedPricingNote}</div>
            </div>
          </div>

          {/* Safety Notes (if present) */}
          {category.safetyNotes && (
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3.5 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-blue-900 dark:text-blue-300">Safety & Environmental Note</div>
                <div className="text-blue-800/80 dark:text-blue-300/80">{category.safetyNotes}</div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border/60">
          <Button
            asChild
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto text-xs"
          >
            <Link to="/pricing">
              View Live Price List
            </Link>
          </Button>
          <Button
            asChild
            variant="hero"
            onClick={onClose}
            className="w-full sm:w-auto text-xs flex items-center gap-2"
          >
            <Link to="/request-pickup">
              <CalendarCheck className="h-4 w-4" />
              Book Pickup Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
