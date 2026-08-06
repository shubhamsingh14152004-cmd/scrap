import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    whatsappNumber: {
      type: String,
      default: "+91 85917 70877",
    },
    phoneNumber: {
      type: String,
      default: "+91 85917 70877",
    },
    address: {
      type: String,
      default:
        "Shop B-1, K.A. Scrap Traders, Gupta Compound Road No. 11, MIDC, Andheri East, Near Masjid, Mumbai – 400093, Maharashtra, India",
    },
    email: {
      type: String,
      default: "myscrapbuddy6272@gmail.com",
    },
  },
  {
    timestamps: true,
  }
);

settingsSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
