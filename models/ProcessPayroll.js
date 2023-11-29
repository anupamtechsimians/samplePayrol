const mongoose = require('mongoose');
const { Schema } = mongoose;
// Define the schema
const processPayrol = new mongoose.Schema({
  taxAmount: { type: Number, default: 0 },
  name: { type: String, required: true },
  employee_id: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  taxPercent: { type: Number, default: 10 },
  full_day_working_hrs: { type: Number, default: 9 },
  overtimeAmount: { type: Number, default: 0 },
  deduction: { type: Number, default: 0 },
  taxableAmount: { type: Number, default: 0 },
  payableDays: { type: Number, required: true },
  amount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  overtime: { type: Number, default: 0 },
  monthString:{type:String},
  userRefAccount: { type: Schema.Types.ObjectId, ref: "user", required: true },
  metaData: { type: Object,default:{}},
});

// Create the model

processPayrol.index({ employee_id: 1,monthString:1 }, { unique: true });
const ProcessPayrol = mongoose.model('ProcessPayroll', processPayrol);

module.exports = ProcessPayrol;
