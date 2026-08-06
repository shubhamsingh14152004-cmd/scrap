import mongoose from "mongoose";

const scrapMaterialSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
      default: "kg",
    },
    icon: {
      type: String,
      default: "Package",
    },
  },
  {
    timestamps: true,
  }
);

scrapMaterialSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const ScrapMaterial =
  mongoose.models.ScrapMaterial || mongoose.model("ScrapMaterial", scrapMaterialSchema);

export default ScrapMaterial;
