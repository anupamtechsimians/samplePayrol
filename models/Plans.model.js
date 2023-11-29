const { Schema, model } = require("mongoose");

const PlanSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    allowedUnits: { type: Number, required: true },
    description: { type: String, required: true },
    media: { type: String, required: false },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const User = model("Plans", PlanSchema, "Plans");
module.exports = User;
