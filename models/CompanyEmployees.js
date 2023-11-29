const { date } = require("joi");
const { Schema, model } = require("mongoose");

const companyEmployee = new Schema(
  {
    title: { type: String, required: false },
    firstName: { type: String, required: false },
    middleName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: { type: String, required: true,enum:["male","female","other"] },
    dateOfJoining:{type:Date, required: false},
    designation:{type:String, required:false},
    department: {type : String, required: false},
    dateOfBirth: {type:Date, required: false},
    employee_id: {type: String},
    email: { type: String, required: true,unique: true },
    phone: { type: String },
    salary:{ type: Number, required: false},
    company_id: { type: String },
    address: { type: String },
    password: { type: String, required: false },
    status: { type: String,default: "active", enum: ["active", "inactive","pending"] },
    role: { type: String, required: false, default:"employee"},
    userRefAccount:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    packageId:{ type: Schema.Types.ObjectId, ref: "SalaryPackage" },
    metaData:{type:Object, default:{}},
    isFromBulk: { type: Boolean, default: false}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
companyEmployee.index({ employee_id: 1,userRefAccount:1 }, { unique: true });

const User = model("CompanyEmployee", companyEmployee, "CompanyEmployee");
module.exports = User;
