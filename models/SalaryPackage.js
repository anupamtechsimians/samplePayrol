const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const SalaryComponentSchema = new Schema({
  salaryComponent: { type: Schema.Types.ObjectId, ref: "SalaryComponent", required: false },
  overridedAmount: { type: Number, required: false },
  calculationTypeOverridden: { type: Boolean, required: false, default: false },
  calculationType: { type: String, required: false, enum: ["flat amount", "percentage"] },
});

const SalaryPackageSchema = new Schema(
  {
    companyId: { type: Number, required: true },
    code: { type: String, required: true },
    userRefAccount: { type: Schema.Types.ObjectId, ref: "user", required: true },
    salaryPackages: [SalaryComponentSchema],
    year: { type: String, required:false },
    amount: { type: Number, default: 0 },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    name: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const SalaryPackageModel = model("SalaryPackage", SalaryPackageSchema, "SalaryPackage");
module.exports = SalaryPackageModel;
