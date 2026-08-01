import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Helper function to read from DB
function readDb() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return { requests: [], materials: [] };
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

// Analytics Stats endpoint
app.get("/api/stats", (req, res) => {
  const db = readDb();
  const requests = db.requests || [];
  
  const total = requests.length;
  const pending = requests.filter(r => r.status === "pending").length;
  const approved = requests.filter(r => r.status === "approved").length;
  const completed = requests.filter(r => r.status === "completed").length;
  const cancelled = requests.filter(r => r.status === "cancelled").length;

  // Calculate estimated total weight and revenue based on quantity estimate
  // small = 8kg, medium = 30kg, large = 125kg, bulk = 300kg
  let estimatedWeight = 0;
  requests.forEach(r => {
    if (r.status === "completed") {
      if (r.quantity === "small") estimatedWeight += 8;
      else if (r.quantity === "medium") estimatedWeight += 30;
      else if (r.quantity === "large") estimatedWeight += 125;
      else if (r.quantity === "bulk") estimatedWeight += 300;
    }
  });

  // Calculate mock revenue: $5 per kg or direct calculation
  const estimatedRevenue = estimatedWeight * 35; // Rupee estimate or general currency units

  res.json({
    total,
    pending,
    approved,
    completed,
    cancelled,
    estimatedWeight,
    estimatedRevenue
  });
});

// GET all requests
app.get("/api/requests", (req, res) => {
  const db = readDb();
  res.json(db.requests || []);
});

// POST new request
app.post("/api/requests", (req, res) => {
  const db = readDb();
  const newRequest = {
    id: "req_" + Date.now(),
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    scrapType: req.body.scrapType,
    quantity: req.body.quantity,
    preferredDate: req.body.preferredDate,
    preferredSlot: req.body.preferredSlot,
    notes: req.body.notes || "",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  db.requests.unshift(newRequest); // Add to beginning of list
  writeDb(db);
  res.status(201).json(newRequest);
});

// PATCH update request status
app.patch("/api/requests/:id", (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const { status } = req.body;

  const requestIndex = db.requests.findIndex(r => r.id === id);
  if (requestIndex === -1) {
    return res.status(404).json({ error: "Request not found" });
  }

  db.requests[requestIndex].status = status;
  writeDb(db);
  res.json(db.requests[requestIndex]);
});

// DELETE request
app.delete("/api/requests/:id", (req, res) => {
  const db = readDb();
  const { id } = req.params;
  
  const filtered = db.requests.filter(r => r.id !== id);
  if (filtered.length === db.requests.length) {
    return res.status(404).json({ error: "Request not found" });
  }

  db.requests = filtered;
  writeDb(db);
  res.json({ success: true, message: "Request deleted successfully" });
});

// GET all materials
app.get("/api/materials", (req, res) => {
  const db = readDb();
  res.json(db.materials || []);
});

// PUT update materials
app.put("/api/materials", (req, res) => {
  const db = readDb();
  const updatedMaterials = req.body.materials;
  
  if (!Array.isArray(updatedMaterials)) {
    return res.status(400).json({ error: "Invalid payload format. Must be an array." });
  }

  db.materials = updatedMaterials;
  writeDb(db);
  res.json(db.materials);
});

// GET settings
app.get("/api/settings", (req, res) => {
  const db = readDb();
  res.json(db.settings || { whatsappNumber: "+919876543210", phoneNumber: "+919876543210", address: "Mumbai, India", email: "hello@scrapwise.in" });
});

// PUT update settings
app.put("/api/settings", (req, res) => {
  const db = readDb();
  db.settings = {
    whatsappNumber: req.body.whatsappNumber,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    email: req.body.email
  };
  writeDb(db);
  res.json(db.settings);
});

// Start server
app.listen(PORT, () => {
  console.log(`ScrapWise Backend Admin server running on http://localhost:${PORT}`);
});
