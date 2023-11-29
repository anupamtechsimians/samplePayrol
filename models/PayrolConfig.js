const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const payrolProcess = new Schema({
  startPeriod: { type: String, required: false, default: "1st" },
  endPeriod: { type: String, required: false, default: "last" },
  isPfValid: { type: Boolean, required: false, default: false },
  isESICValid: { type: Boolean, required: false, default: false },
  pfSalaryAmount: { type: Number, required: false, default: 0 },
  epfCompanyContribution: { type: Number, required: false, default: 0 },
  epfEmpContribution: { type: Number, required: false, default: 0 },
  epfPensionFund: { type: Number, required: false, default: 0 },
  minAmountForESIC: { type: Number, required: false, default: 0 },
  maxAmountForESIC: { type: Number, required: false, default: 0 },
  eSICCompanyContribution: { type: Number, required: false, default: 0 },
  eSICEmpContribution: { type: Number, required: false, default: 0 },
},{ _id: false });
const calculationSchema = new Schema({
  allowedDateForPayrol: { type: Number, required: false, default: 30 },
  considerWorkingOnly: { type: Boolean, required: false, default: false },
  considerPayrolMonth: { type: Boolean, required: false, default: false },
  calSalaryForUnpaidDays: { type: Boolean, required: false, default: false },
},{ _id: false });

const configurationSchema = new Schema(
  {
    companyId: { type: Number, required: false },
    userRefAccount: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      
    },
    calculations: calculationSchema,
    payrolProcess: payrolProcess ,
    taxDeduction:{type:Boolean,default:false},
    taxDeductionRegime:{type:String,enum:['new','old',null,'']},
    allowOvertime:{type:Boolean,default:false},
    overtimeScale:{type:Number,required:false}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
configurationSchema.index({ userRefAccount: 1 }, { unique: true });
const SalaryPackageModel = model(
  "Configurations",
  configurationSchema,
  "Configurations"
);
module.exports = SalaryPackageModel;
