import PickupRequest from "../models/PickupRequest.js";
import ScrapMaterial from "../models/ScrapMaterial.js";
import Settings from "../models/Settings.js";
import Admin from "../models/Admin.js";

const initialRequests = [
  {
    id: "req_1785956414030",
    name: "ramchandarpur",
    phone: "8591770877",
    address: "semri",
    scrapType: "cardboard",
    quantity: "medium",
    preferredDate: "2026-08-07",
    preferredSlot: "afternoon",
    notes: "",
    status: "pending",
    createdAt: "2026-08-05T19:00:14.030Z",
  },
  {
    id: "req_1785951187823",
    name: "rishi ",
    phone: "8433762136",
    address: "shukla chawl, andheri , mumbai",
    scrapType: "cardboard",
    quantity: "medium",
    preferredDate: "2026-08-05",
    preferredSlot: "afternoon",
    notes: "",
    status: "approved",
    createdAt: "2026-08-05T17:33:07.823Z",
  },
  {
    id: "req_1785579851281",
    name: "saahsg",
    phone: "0993939383939",
    address: "semri",
    scrapType: "paper",
    quantity: "large",
    preferredDate: "2026-07-29",
    preferredSlot: "afternoon",
    notes: "szjk bjs",
    status: "completed",
    createdAt: "2026-08-01T10:24:11.281Z",
  },
  {
    id: "req_1",
    name: "Arjun Sharma",
    phone: "+91 85917 70877",
    address: "402, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103",
    scrapType: "ewaste",
    quantity: "medium",
    preferredDate: "2026-08-01",
    preferredSlot: "morning",
    notes: "Old laptop, 2 defunct smartphones, charger cables.",
    status: "approved",
    createdAt: "2026-07-29T10:30:00Z",
  },
  {
    id: "req_2",
    name: "Priya Patel",
    phone: "+91 99112 23344",
    address: "B-705, Sky High Towers, Sector 62, Noida, Uttar Pradesh 201301",
    scrapType: "metal",
    quantity: "large",
    preferredDate: "2026-07-31",
    preferredSlot: "afternoon",
    notes: "Iron rods from construction, old steel utensils.",
    status: "approved",
    createdAt: "2026-07-29T11:15:00Z",
  },
  {
    id: "req_3",
    name: "Rohan Das",
    phone: "+91 88877 66554",
    address: "Flat 12A, Heritage Heights, Ballygunge, Kolkata, West Bengal 700019",
    scrapType: "paper",
    quantity: "small",
    preferredDate: "2026-07-28",
    preferredSlot: "evening",
    notes: "Stack of old newspapers and cardboard boxes.",
    status: "completed",
    createdAt: "2026-07-27T09:00:00Z",
  },
];

const initialMaterials = [
  { id: "newspaper", name: "Newspaper", price: 14, unit: "kg", icon: "FileText" },
  { id: "cardboard", name: "Cardboard", price: 9, unit: "kg", icon: "FileText" },
  { id: "books", name: "Books / Magazines", price: 12, unit: "kg", icon: "FileText" },
  { id: "iron", name: "Iron / Steel", price: 30, unit: "kg", icon: "Wrench" },
  { id: "aluminium", name: "Aluminium", price: 115, unit: "kg", icon: "Wrench" },
  { id: "brass", name: "Brass", price: 380, unit: "kg", icon: "Wrench" },
  { id: "copper", name: "Copper", price: 620, unit: "kg", icon: "Wrench" },
  { id: "pet_bottles", name: "PET Bottles", price: 18, unit: "kg", icon: "Layers" },
  { id: "hard_plastic", name: "Hard Plastic", price: 22, unit: "kg", icon: "Layers" },
  { id: "laptop", name: "Laptop", price: 450, unit: "pc", icon: "Laptop" },
  { id: "cpu", name: "Desktop CPU", price: 350, unit: "pc", icon: "Laptop" },
  { id: "mobile", name: "Mobile Phone", price: 120, unit: "pc", icon: "Laptop" },
  { id: "refrigerator", name: "Refrigerator", price: 1600, unit: "pc", icon: "Tv" },
  { id: "washing_machine", name: "Washing Machine", price: 1200, unit: "pc", icon: "Tv" },
  { id: "ac", name: "Air Conditioner", price: 2200, unit: "pc", icon: "Tv" },
  { id: "sofa", name: "Sofa / Couch", price: 800, unit: "pc", icon: "Tv" },
  { id: "office_chair", name: "Office Chair", price: 150, unit: "pc", icon: "Tv" },
  { id: "wooden_table", name: "Wooden Table", price: 300, unit: "pc", icon: "Tv" },
  { id: "plastic_table", name: "Plastic Chair / Table", price: 70, unit: "pc", icon: "Layers" },
];

const initialSettings = {
  whatsappNumber: "+91 85917 70877",
  phoneNumber: "+91 85917 70877",
  address:
    "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid, Mumbai – 400093, Maharashtra, India",
  email: "myscrapbuddy6272@gmail.com",
};

/**
 * Seeds initial data into MongoDB if collections are empty.
 */
export async function seedInitialData() {
  try {
    // 1. Seed PickupRequests if empty
    const requestCount = await PickupRequest.countDocuments();
    if (requestCount === 0) {
      console.log("Seeding initial Pickup Requests into MongoDB...");
      await PickupRequest.insertMany(initialRequests);
      console.log(`Seeded ${initialRequests.length} pickup requests.`);
    }

    // 2. Seed ScrapMaterials if empty
    const materialCount = await ScrapMaterial.countDocuments();
    if (materialCount === 0) {
      console.log("Seeding initial Scrap Materials into MongoDB...");
      await ScrapMaterial.insertMany(initialMaterials);
      console.log(`Seeded ${initialMaterials.length} scrap materials.`);
    }

    // 3. Seed Settings if empty
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      console.log("Seeding initial Settings into MongoDB...");
      await Settings.create(initialSettings);
      console.log("Seeded initial settings.");
    }

    // 4. Seed Admin if empty
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const adminEmail = (process.env.ADMIN_EMAIL || "myscrapbuddy6272@gmail.com").trim().toLowerCase();
      const adminPassword = process.env.ADMIN_PASSWORD || "Rehan3103";
      console.log(`Seeding initial Admin user (${adminEmail}) into MongoDB...`);
      await Admin.create({
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log("Seeded initial admin user.");
    }
  } catch (err) {
    console.error("Error during initial data seeding:", err);
  }
}

export default seedInitialData;
