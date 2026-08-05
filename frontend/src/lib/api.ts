export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

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

export async function adminLogin(email: string, password: string): Promise<{ token: string; user: { email: string; role: string } }> {
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

export async function createRequest(data: Omit<RequestData, "id" | "status" | "createdAt">): Promise<RequestData> {
  const res = await fetch(`${API_URL}/api/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return res.json();
}

export async function fetchMaterials(): Promise<MaterialData[]> {
  const res = await fetch(`${API_URL}/api/materials`);
  if (!res.ok) throw new Error("Failed to fetch materials");
  return res.json();
}

export async function fetchSettings(): Promise<SettingsData> {
  const res = await fetch(`${API_URL}/api/settings`);
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

