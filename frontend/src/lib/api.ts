const getBaseApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === "string" && envUrl.trim() !== "") {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return "http://localhost:5002";
};

export const API_URL = getBaseApiUrl();

export interface RequestData {
  id?: string;
  name: string;
  phone: string;
  address: string;
  scrapType: string;
  quantity: string;
  preferredDate: string;
  preferredSlot: string;
  notes?: string;
  status?: string;
  createdAt?: string;
}

export interface StatsData {
  total: number;
  pending: number;
  approved: number;
  completed: number;
  cancelled: number;
  estimatedWeight: number;
  estimatedRevenue: number;
}

export interface MaterialData {
  id: string;
  name: string;
  price: number;
  unit: string;
  icon: string;
}

export interface SettingsData {
  whatsappNumber: string;
  phoneNumber: string;
  address: string;
  email: string;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_token", token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export async function adminLogin(
  email: string,
  password: string
): Promise<{ token: string; user: { email: string; role: string } }> {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  setAuthToken(data.token);
  return data;
}

export async function fetchStats(): Promise<StatsData> {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/stats`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (res.status === 401) {
    removeAuthToken();
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchRequests(): Promise<RequestData[]> {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/requests`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (res.status === 401) {
    removeAuthToken();
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}

export async function createRequest(
  data: Omit<RequestData, "id" | "status" | "createdAt">
): Promise<RequestData> {
  const res = await fetch(`${API_URL}/api/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return res.json();
}

export async function fetchMaterials(): Promise<MaterialData[]> {
  try {
    const res = await fetch(`${API_URL}/api/materials`);
    if (!res.ok) throw new Error("Failed to fetch materials");
    return await res.json();
  } catch (err) {
    console.warn("Backend materials fetch failed, using frontend defaults:", err);
    return [];
  }
}

export async function fetchSettings(): Promise<SettingsData> {
  try {
    const res = await fetch(`${API_URL}/api/settings`);
    if (!res.ok) throw new Error("Failed to fetch settings");
    return await res.json();
  } catch (err) {
    console.warn("Backend settings fetch failed, using frontend defaults:", err);
    return {
      whatsappNumber: "+91 85917 70877",
      phoneNumber: "+91 85917 70877",
      address:
        "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid, Mumbai – 400093, Maharashtra, India",
      email: "myscrapbuddy6272@gmail.com",
    };
  }
}
