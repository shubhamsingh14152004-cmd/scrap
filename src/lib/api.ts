export const API_URL = "http://localhost:5000";

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

export async function fetchStats(): Promise<StatsData> {
  const res = await fetch(`${API_URL}/api/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function fetchRequests(): Promise<RequestData[]> {
  const res = await fetch(`${API_URL}/api/requests`);
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
