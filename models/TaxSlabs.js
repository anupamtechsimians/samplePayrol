const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const slabsComponent = new Schema({

 financialYear: {
    type: String,
    required: true,
 },
 slabMinAmount: {
    type: Number,
    required: true,
 },
 slabMaxAmount: {
    type: Number,
    required: true,
 },
 ageMin: {
    type: Number,
    required: true,
 },
 ageMax: {
    type: Number,
    required: true,
 },
 tax: {
    type: Number,
    required: true,
 },
 regime: {
    type: String,
    required: true,
 },
 type: {
    type: String,
    required: true,
 },
},


{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  });

const SalaryPackageModel = model("TaxSlabs", slabsComponent, "TaxSlabs");
module.exports = SalaryPackageModel;
