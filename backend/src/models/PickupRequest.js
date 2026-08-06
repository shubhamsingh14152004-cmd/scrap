import mongoose from "mongoose";

const pickupRequestSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      default: "",
    },
    scrapType: {
      type: String,
      default: "mixed",
    },
    quantity: {
      type: String,
      default: "medium",
    },
    preferredDate: {
      type: String,
      required: true,
    },
    preferredSlot: {
      type: String,
      default: "morning",
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],
      default: "pending",
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: true,
  }
);

pickupRequestSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const PickupRequest =
  mongoose.models.PickupRequest || mongoose.model("PickupRequest", pickupRequestSchema);

export default PickupRequest;
