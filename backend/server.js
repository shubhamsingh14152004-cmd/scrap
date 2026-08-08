import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import connectDB from "./src/config/db.js";
import seedInitialData from "./src/utils/seedData.js";
import PickupRequest from "./src/models/PickupRequest.js";
import ScrapMaterial from "./src/models/ScrapMaterial.js";
import Settings from "./src/models/Settings.js";
import Admin from "./src/models/Admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5002;

const ALLOWED_ORIGINS = [
  "https://scrapbuddy.org",
  "https://www.scrapbuddy.org",
  "https://scrap-8qoj.vercel.app",
  "https://scrap-ntjs.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5002",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5002",
];

// Comprehensive CORS middleware for Mobile Web & Cross-Domain Vercel Deployments
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
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware to ensure database connection and auto-seeding on API requests (Serverless Friendly)
let isSeeded = false;
app.use(async (req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/pickup")) {
    try {
      await connectDB();
      if (!isSeeded) {
        await seedInitialData();
        isSeeded = true;
      }
      next();
    } catch (err) {
      console.error("Database connection middleware error:", err);
      return res.status(500).json({
        error: "Database connection failed. Please try again later.",
        details: err.message,
      });
    }
  } else {
    next();
  }
});

// ==========================================
// 1. PUBLIC ROUTES (No Token Required)
// ==========================================

// GET /api/health Endpoint - Always returns JSON
app.get(["/api/health", "/health"], async (req, res) => {
  try {
    await connectDB();
    const dbState = mongoose.connection.readyState;
    const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
    return res.json({
      status: "ok",
      dbStatus: states[dbState] || "unknown",
      message: "My Scrap Buddy API is healthy and connected to MongoDB Atlas",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "production",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Health check failed: Unable to connect to MongoDB",
      error: err.message,
    });
  }
});

// Admin Login Endpoint (Public POST)
app.post(["/api/admin/login", "/api/login"], async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const envAdminEmail = (process.env.ADMIN_EMAIL || "myscrapbuddy6272@gmail.com").trim().toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD || "Rehan3103";
    const jwtSecret =
      process.env.JWT_SECRET ||
      "6b9f3d2e8c1a7f5d4b8e2c9a6f1d7b3e5c8a9f2d4e6b1c7a3f8d5e9c2b6a1f7d4c8e5a2b9f6d1c3e7a8b4f2d9e5c1a6";
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    let admin = await Admin.findOne({ email: cleanEmail });

    if (!admin) {
      if (cleanEmail === envAdminEmail && password === envAdminPassword) {
        admin = { email: envAdminEmail, role: "admin" };
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      if (admin.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    }

    const token = jwt.sign(
      { email: admin.email, role: admin.role || "admin" },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: { email: admin.email, role: admin.role || "admin" },
    });
  } catch (err) {
    console.error("Login endpoint error:", err);
    return res.status(500).json({ error: "Internal server error during authentication" });
  }
});

// Public Customer Pickup Booking (POST - Always returns JSON)
const handleCreatePickup = async (req, res) => {
  try {
    const body = req.body || {};

    const name = body.name || body.fullName || "Customer";
    const phone = body.phone || body.phoneNumber || "";
    const address = body.address || "";
    const scrapType = body.scrapType || body.category || "mixed";
    const quantity = body.quantity || "medium";
    const preferredDate = body.preferredDate || new Date().toISOString().split("T")[0];
    const preferredSlot = body.preferredSlot || "morning";
    const notes = body.notes || body.message || "";

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const requestId = "req_" + Date.now();
    const newRequest = await PickupRequest.create({
      id: requestId,
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
    });

    return res.status(201).json(newRequest.toJSON());
  } catch (err) {
    console.error("Error handling pickup request:", err);
    return res.status(500).json({ error: "Internal server error processing pickup request" });
  }
};

app.post(
  ["/api/requests", "/api/request-pickup", "/api/pickup", "/pickup", "/api/request", "/api/book", "/api/contact"],
  handleCreatePickup
);

// GET Public Materials list
app.get(["/api/materials"], async (req, res) => {
  try {
    const materials = await ScrapMaterial.find().sort({ createdAt: 1 }).lean();
    const formatted = materials.map((m) => ({
      id: m.id || m._id.toString(),
      name: m.name,
      price: m.price,
      unit: m.unit,
      icon: m.icon,
    }));
    return res.json(formatted);
  } catch (err) {
    console.error("Failed to fetch materials:", err);
    return res.status(500).json({ error: "Failed to fetch materials" });
  }
});

// GET Public Settings
app.get(["/api/settings"], async (req, res) => {
  try {
    let settings = await Settings.findOne().lean();
    if (!settings) {
      settings = {
        whatsappNumber: "+91 85917 70877",
        phoneNumber: "+91 85917 70877",
        address:
          "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid, Mumbai – 400093, Maharashtra, India",
        email: "myscrapbuddy6272@gmail.com",
      };
    } else {
      delete settings._id;
      delete settings.__v;
      delete settings.createdAt;
      delete settings.updatedAt;
    }
    return res.json(settings);
  } catch (err) {
    console.error("Failed to fetch settings:", err);
    return res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// Serve Admin Login & Dashboard HTML pages
app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get(["/admin", "/admin/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==========================================
// 2. ADMIN PROTECTED ROUTES (JWT Required)
// ==========================================
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

// Analytics Stats (Admin protected)
app.get(["/api/stats", "/api/admin/stats"], authenticateAdminToken, async (req, res) => {
  try {
    const requests = await PickupRequest.find().lean();

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

    return res.json({
      total,
      pending,
      approved,
      completed,
      cancelled,
      estimatedWeight,
      estimatedRevenue,
    });
  } catch (err) {
    console.error("Error calculating stats:", err);
    return res.status(500).json({ error: "Failed to calculate stats" });
  }
});

// GET all requests (Admin protected)
app.get(["/api/requests", "/api/admin/requests"], authenticateAdminToken, async (req, res) => {
  try {
    const requests = await PickupRequest.find().sort({ createdAt: -1 }).lean();
    const formatted = requests.map((r) => ({
      id: r.id || r._id.toString(),
      name: r.name,
      phone: r.phone,
      address: r.address,
      scrapType: r.scrapType,
      quantity: r.quantity,
      preferredDate: r.preferredDate,
      preferredSlot: r.preferredSlot,
      notes: r.notes || "",
      status: r.status,
      createdAt: r.createdAt,
    }));
    return res.json(formatted);
  } catch (err) {
    console.error("Failed to fetch requests:", err);
    return res.status(500).json({ error: "Failed to fetch pickup requests" });
  }
});

// PATCH update request status (Admin protected)
app.patch(
  ["/api/requests/:id", "/api/admin/requests/:id", "/api/request-pickup/:id", "/api/pickup/:id", "/pickup/:id"],
  authenticateAdminToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body || {};

      const updated = await PickupRequest.findOneAndUpdate(
        { id: id },
        { status: status },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ error: "Request not found" });
      }

      return res.json(updated.toJSON());
    } catch (err) {
      console.error("Error updating request status:", err);
      return res.status(500).json({ error: "Failed to update request status" });
    }
  }
);

// DELETE request (Admin protected)
app.delete(
  ["/api/requests/:id", "/api/admin/requests/:id", "/api/request-pickup/:id", "/api/pickup/:id", "/pickup/:id"],
  authenticateAdminToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await PickupRequest.findOneAndDelete({ id: id });

      if (!deleted) {
        return res.status(404).json({ error: "Request not found" });
      }

      return res.json({ success: true, message: "Request deleted successfully" });
    } catch (err) {
      console.error("Error deleting request:", err);
      return res.status(500).json({ error: "Failed to delete request" });
    }
  }
);

// PUT update materials (Admin protected)
app.put(["/api/materials", "/api/admin/materials"], authenticateAdminToken, async (req, res) => {
  try {
    const updatedMaterials = req.body.materials;

    if (!Array.isArray(updatedMaterials)) {
      return res.status(400).json({ error: "Invalid payload format. Must be an array." });
    }

    await ScrapMaterial.deleteMany({});
    const docs = updatedMaterials.map((m) => ({
      id: m.id,
      name: m.name,
      price: parseFloat(m.price) || 0,
      unit: m.unit || "kg",
      icon: m.icon || "Package",
    }));
    const inserted = await ScrapMaterial.insertMany(docs);

    const formatted = inserted.map((m) => m.toJSON());
    return res.json(formatted);
  } catch (err) {
    console.error("Error updating materials:", err);
    return res.status(500).json({ error: "Failed to update materials" });
  }
});

// PUT update settings (Admin protected)
app.put(["/api/settings", "/api/admin/settings"], authenticateAdminToken, async (req, res) => {
  try {
    const payload = {
      whatsappNumber: req.body.whatsappNumber,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
    };

    let settings = await Settings.findOne();
    if (settings) {
      Object.assign(settings, payload);
      await settings.save();
    } else {
      settings = await Settings.create(payload);
    }

    return res.json(settings.toJSON());
  } catch (err) {
    console.error("Error updating settings:", err);
    return res.status(500).json({ error: "Failed to update settings" });
  }
});

// Start local server if not running inside Vercel serverless environment
if (!process.env.VERCEL) {
  const server = app.listen(PORT, async () => {
    console.log(`My Scrap Buddy Backend Admin server running on http://localhost:${PORT}`);
    try {
      await connectDB();
      await seedInitialData();
    } catch (err) {
      console.error("Failed initial DB connect/seed on server boot:", err.message);
    }
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`\n❌ Port ${PORT} is already in use by another running server instance.`);
      console.error("Please stop the other running server or close the duplicate terminal tab.\n");
      process.exit(1);
    }
  });
}

export default app;
