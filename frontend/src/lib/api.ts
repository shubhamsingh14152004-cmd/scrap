const DEFAULT_PRODUCTION_API = "https://scrap-ntjs.vercel.app";

const getBaseApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === "string" && envUrl.trim() !== "") {
    let url = envUrl.trim().replace(/\/+$/, "");
    if (url.startsWith("http://") && !url.includes("localhost") && !url.includes("127.0.0.1")) {
      url = url.replace(/^http:\/\//, "https://");
    }
    return url;
  }
  return DEFAULT_PRODUCTION_API;
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

/**
 * Centralized API fetch wrapper ensuring consistent headers, error reporting,
 * and development logging across all requests.
 */
async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  const isDev = import.meta.env.DEV || (typeof window !== "undefined" && window.location.hostname === "localhost");
  if (isDev) {
    console.log(`[API Request] ${options.method || "GET"} -> ${url}`);
    if (options.body) {
      console.log(`[Request Body]`, options.body);
    }
  }

  let res: Response;
  try {
    res = await fetch(url, { ...options, headers });
  } catch (netErr: any) {
    console.error(`[Network Error] Failed to connect to ${url}`, netErr);
    throw new Error(`Network connection error to ${API_URL}. Please verify backend status.`);
  }

  let data: any = null;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await res.json().catch(() => null);
  } else {
    const text = await res.text().catch(() => "");
    data = { error: text || `Server returned non-JSON response with status ${res.status}` };
  }

  if (isDev) {
    console.log(`[API Response] Status ${res.status} from ${url}:`, data);
  }

  if (!res.ok) {
    const errorMsg = data?.error || data?.message || `Request failed with status code ${res.status}`;
    if (isDev) {
      console.error(`[Backend Error] Status ${res.status} from ${url}:`, errorMsg);
    }
    throw new Error(errorMsg);
  }

  return data as T;
}

export async function checkHealth(): Promise<{ status: string; message: string; timestamp: string }> {
  return apiFetch<{ status: string; message: string; timestamp: string }>("/api/health");
}

export async function adminLogin(
  email: string,
  password: string
): Promise<{ token: string; user: { email: string; role: string } }> {
  const data = await apiFetch<{ token: string; user: { email: string; role: string } }>(
    "/api/admin/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );

  setAuthToken(data.token);
  return data;
}

export async function fetchStats(): Promise<StatsData> {
  const token = getAuthToken();
  try {
    return await apiFetch<StatsData>("/api/stats", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch (err: any) {
    if (err.message?.includes("401") || err.message?.includes("Unauthorized") || err.message?.includes("Access denied")) {
      removeAuthToken();
    }
    throw err;
  }
}

export async function fetchRequests(): Promise<RequestData[]> {
  const token = getAuthToken();
  try {
    return await apiFetch<RequestData[]>("/api/requests", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch (err: any) {
    if (err.message?.includes("401") || err.message?.includes("Unauthorized") || err.message?.includes("Access denied")) {
      removeAuthToken();
    }
    throw err;
  }
}

export async function createRequest(
  data: Omit<RequestData, "id" | "status" | "createdAt">
): Promise<RequestData> {
  return apiFetch<RequestData>("/api/request-pickup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchMaterials(): Promise<MaterialData[]> {
  try {
    return await apiFetch<MaterialData[]>("/api/materials");
  } catch (err) {
    console.warn("Backend materials fetch failed, using frontend defaults:", err);
    return [];
  }
}

export async function fetchSettings(): Promise<SettingsData> {
  try {
    return await apiFetch<SettingsData>("/api/settings");
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
