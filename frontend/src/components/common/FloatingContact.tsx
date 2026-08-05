import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Phone } from "lucide-react";
import { fetchSettings } from "../../lib/api";

export function FloatingContact() {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  // Fallback numbers
  const whatsappNumber = settings?.whatsappNumber || "+919876543210";
  const phoneNumber = settings?.phoneNumber || "+919876543210";

  // Clean numbers for links
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");
  const cleanPhone = phoneNumber.replace(/\s+/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone Icon */}
      <a
        href={`tel:${cleanPhone}`}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
        aria-label="Call Us"
      >
        <Phone className="h-6 w-6 animate-pulse" />
        <span className="absolute right-16 scale-0 rounded-lg bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-md transition-all duration-200 group-hover:scale-100 border border-border whitespace-nowrap">
          Call Us: {phoneNumber}
        </span>
      </a>

      {/* WhatsApp Icon */}
      <a
        href={`https://wa.me/${cleanWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-16 scale-0 rounded-lg bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-md transition-all duration-200 group-hover:scale-100 border border-border whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
