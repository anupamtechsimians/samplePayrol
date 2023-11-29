const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    companyId: { type: String },
    address: { type: String },
    password: { type: String, required: true },
    companyStregnth: { type: Number, required: false },
    planId:{ type: Schema.Types.ObjectId, ref: "Plans", required: true },
    status: { type: String,default: "pending", enum: ["active", "inactive","pending"] },
    ourHrmsFlag:{type:Boolean, default: true},
    metaData:{type:Object, default:{}},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const Company = model("User", companySchema, "user");
module.exports = Company;
