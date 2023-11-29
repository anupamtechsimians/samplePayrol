const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const componentSchema = new Schema({
  type: { type: String, required: true, enum: ["earning", "deduction","reimbursement"] },
  name: { type: String, required: true },
  code: { type: String, required: true },
  ledger: { type: String, required: false },
  userRefAccount: { type: Schema.Types.ObjectId, ref: "user", required: false },
  payType: {
    type: String,
    required: false,
    enum: ["fixed pay", "variable pay",''],
  },
  isTaxable: { type: Boolean, default: false },
  calculationType: {
    type: String,
    required: true,
    enum: ["flat amount", "percentage"],
  },
  fractionOf: { type: Schema.Types.ObjectId, ref: "SalaryComponent", required: false },
  payAmount: { type: Number, required: false },
  status: { type: String, default:'active',enum: ['active', 'inactive']},
  show_on_payslip: { type: Boolean, default:false },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

const yourModel = model("salaryComponent", componentSchema,'salaryComponent');
module.exports = yourModel;
