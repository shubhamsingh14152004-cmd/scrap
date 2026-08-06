import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5002;

// Writable database file path for Serverless Environments
const BUNDLED_DB_FILE = path.join(__dirname, "db.json");
const DB_FILE = path.join(os.tmpdir(), "db.json");

// Initialize db.json in temp folder if it doesn't exist
function initDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      if (fs.existsSync(BUNDLED_DB_FILE)) {
        fs.copyFileSync(BUNDLED_DB_FILE, DB_FILE);
        console.log("Initialized database from bundled db.json at:", DB_FILE);
      } else {
        fs.writeFileSync(
          DB_FILE,
          JSON.stringify({ requests: [], materials: [], settings: {} }, null, 2),
          "utf8"
        );
        console.log("Initialized empty database at:", DB_FILE);
      }
    }
  } catch (err) {
    console.error("Error initializing database file:", err);
  }
}
initDb();

// Comprehensive CORS middleware for Mobile Web (iOS Safari, Android Chrome) & Cross-Domain Vercel Deployments
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// GET /api/health Endpoint
app.get(["/api/health", "/health"], (req, res) => {
  return res.json({
    status: "ok",
    message: "My Scrap Buddy API is healthy and running",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "production",
  });
});

// Admin Authentication Middleware
const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const jwtSecret =
    process.env.JWT_SECRET ||
    "6b9f3d2e8c1a7f5d4b8e2c9a6f1d7b3e5c8a9f2d4e6b1c7a3f8d5e9c2b6a1f7d4c8e5a2b9f6d1c3e7a8b4f2d9e5c1a6";

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Admin Login Endpoint
app.post(["/api/admin/login", "/api/login"], (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL || "myscrapbuddy6272@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Rehan3103";
  const jwtSecret =
    process.env.JWT_SECRET ||
    "6b9f3d2e8c1a7f5d4b8e2c9a6f1d7b3e5c8a9f2d4e6b1c7a3f8d5e9c2b6a1f7d4c8e5a2b9f6d1c3e7a8b4f2d9e5c1a6";
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || password !== adminPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { email: adminEmail, role: "admin" },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );

  return res.json({
    success: true,
    message: "Login successful",
    token,
    user: { email: adminEmail, role: "admin" },
  });
});

// Serve Admin Login HTML page on /admin/login route
app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serve Admin Dashboard HTML on /admin route
app.get(["/admin", "/admin/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Helper function to read from DB
function readDb() {
  try {
    initDb();
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return { requests: [], materials: [], settings: {} };
  }
}

// Helper function to write to DB
function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing database:", err);
    return false;
  }
}

// Analytics Stats endpoint (Admin protected)
const handleGetStats = (req, res) => {
  const db = readDb();
  const requests = db.requests || [];

  const total = requests.length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const completed = requests.filter((r) => r.status === "completed").length;
  const cancelled = requests.filter((r) => r.status === "cancelled").length;

  let estimatedWeight = 0;
  requests.forEach((r) => {
    if (r.status === "completed") {
      if (r.quantity === "small") estimatedWeight += 8;
      else if (r.quantity === "medium") estimatedWeight += 30;
      else if (r.quantity === "large") estimatedWeight += 125;
      else if (r.quantity === "bulk") estimatedWeight += 300;
    }
  });

  const estimatedRevenue = estimatedWeight * 35;

  res.json({
    total,
    pending,
    approved,
    completed,
    cancelled,
    estimatedWeight,
    estimatedRevenue,
  });
};

app.get(["/api/stats", "/api/admin/stats"], authenticateAdminToken, handleGetStats);

// GET all requests (Admin protected)
const handleGetRequests = (req, res) => {
  const db = readDb();
  res.json(db.requests || []);
};
app.get(
  ["/api/requests", "/api/admin/requests", "/api/request-pickup", "/api/pickup", "/pickup"],
  authenticateAdminToken,
  handleGetRequests
);

// POST new request (Public - customer pickup booking)
const handleCreatePickup = (req, res) => {
  const db = readDb();
  const body = req.body || {};

  const name = body.name || body.fullName || "Customer";
  const phone = body.phone || body.phoneNumber || "";
  const address = body.address || "";
  const scrapType = body.scrapType || body.category || "mixed";
  const quantity = body.quantity || "medium";
  const preferredDate = body.preferredDate || new Date().toISOString().split("T")[0];
  const preferredSlot = body.preferredSlot || "morning";
  const notes = body.notes || "";

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const newRequest = {
    id: "req_" + Date.now(),
    name,
    phone,
    address,
    scrapType,
    quantity,
    preferredDate,
    preferredSlot,
    notes,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.requests.unshift(newRequest);
  writeDb(db);
  return res.status(201).json(newRequest);
};

app.post(
  ["/api/requests", "/api/request-pickup", "/api/pickup", "/pickup"],
  handleCreatePickup
);

// PATCH update request status (Admin protected)
app.patch(
  ["/api/requests/:id", "/api/admin/requests/:id", "/api/request-pickup/:id", "/api/pickup/:id", "/pickup/:id"],
  authenticateAdminToken,
  (req, res) => {
    const db = readDb();
    const { id } = req.params;
    const { status } = req.body || {};

    const requestIndex = db.requests.findIndex((r) => r.id === id);
    if (requestIndex === -1) {
      return res.status(404).json({ error: "Request not found" });
    }

    db.requests[requestIndex].status = status;
    writeDb(db);
    res.json(db.requests[requestIndex]);
  }
);

// DELETE request (Admin protected)
app.delete(
  ["/api/requests/:id", "/api/admin/requests/:id", "/api/request-pickup/:id", "/api/pickup/:id", "/pickup/:id"],
  authenticateAdminToken,
  (req, res) => {
    const db = readDb();
    const { id } = req.params;

    const filtered = db.requests.filter((r) => r.id !== id);
    if (filtered.length === db.requests.length) {
      return res.status(404).json({ error: "Request not found" });
    }

    db.requests = filtered;
    writeDb(db);
    res.json({ success: true, message: "Request deleted successfully" });
  }
);

// GET all materials (Public - pricing page)
app.get(["/api/materials", "/api/admin/materials"], (req, res) => {
  const db = readDb();
  res.json(db.materials || []);
});

// PUT update materials (Admin protected)
app.put(["/api/materials", "/api/admin/materials"], authenticateAdminToken, (req, res) => {
  const db = readDb();
  const updatedMaterials = req.body.materials;

  if (!Array.isArray(updatedMaterials)) {
    return res.status(400).json({ error: "Invalid payload format. Must be an array." });
  }

  db.materials = updatedMaterials;
  writeDb(db);
  res.json(db.materials);
});

// GET settings (Public - header / footer contact info)
app.get(["/api/settings", "/api/admin/settings"], (req, res) => {
  const db = readDb();
  res.json(
    db.settings || {
      whatsappNumber: "+91 85917 70877",
      phoneNumber: "+91 85917 70877",
      address:
        "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid, Mumbai – 400093, Maharashtra, India",
      email: "myscrapbuddy6272@gmail.com",
    }
  );
});

// PUT update settings (Admin protected)
app.put(["/api/settings", "/api/admin/settings"], authenticateAdminToken, (req, res) => {
  const db = readDb();
  db.settings = {
    whatsappNumber: req.body.whatsappNumber,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    email: req.body.email,
  };
  writeDb(db);
  res.json(db.settings);
});

// Start local server if not running inside Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`My Scrap Buddy Backend Admin server running on http://localhost:${PORT}`);
  });
}

export default app;
