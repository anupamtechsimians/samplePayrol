const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const SalaryPackageSchema = new Schema(
  {
    companyId: { type: Number, required: true },
    amount: { type: Number, required: false },
    packageId: { type: Schema.Types.ObjectId, ref: "SalaryPackage", required: true },
    userRefAccount: { type: Schema.Types.ObjectId, ref: "user", required: true },
    employeeId:{type:String, required: true},
    status:{type:String, required: false, default:"active",enum:['active', 'inactive']},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

SalaryPackageSchema.index({ employeeId: 1,userRefAccount:1 }, { unique: true });
const SalaryPackageModel = model("hrmsEmpSalary", SalaryPackageSchema, "hrmsEmpSalary");
module.exports = SalaryPackageModel;
