import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Phone } from "lucide-react";
import { fetchSettings } from "../../lib/api";

export function FloatingContact() {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const whatsappNumber = settings?.whatsappNumber || "+91 85917 70877";
  const phoneNumber = settings?.phoneNumber || "+91 85917 70877";

  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");
  const cleanPhone = phoneNumber.startsWith("+")
    ? "+" + phoneNumber.replace(/[^0-9]/g, "")
    : "+91" + phoneNumber.replace(/[^0-9]/g, "");

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3">
      {/* Phone Icon & Label */}
      <a
        href={`tel:${cleanPhone}`}
        className="group flex items-center justify-end gap-2 rounded-full bg-gradient-primary p-3 text-primary-foreground shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-emerald-500/30"
        aria-label={`Call Us at ${phoneNumber}`}
      >
        <span className="hidden md:inline-block pl-3 text-xs font-extrabold tracking-wide text-white whitespace-nowrap">
          Call Us
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white">
          <Phone className="h-4 w-4 animate-pulse" />
        </span>
      </a>

      {/* WhatsApp Icon & Label */}
      <a
        href={`https://wa.me/${cleanWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-end gap-2 rounded-full bg-[#25D366] p-3 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-green-500/30"
        aria-label="Chat on WhatsApp"
      >
        <span className="hidden md:inline-block pl-3 text-xs font-extrabold tracking-wide text-white whitespace-nowrap">
          WhatsApp Us
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white">
          <MessageCircle className="h-5 w-5" />
        </span>
      </a>
    </div>
  );
}
