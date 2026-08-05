import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isAuthenticated, getAuthToken, API_URL } from "@/lib/api";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — My Scrap Buddy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardRoute,
});

function AdminDashboardRoute() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const token = getAuthToken();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  if (!authorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-sm font-medium text-slate-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  // Construct iframe URL with token parameter to pass JWT to the backend dashboard
  const iframeSrc = `${API_URL}/admin?token=${encodeURIComponent(token || "")}`;

  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden">
      <iframe
        src={iframeSrc}
        title="Admin Dashboard"
        className="w-full h-full border-0"
        allow="clipboard-write"
      />
    </div>
  );
}
