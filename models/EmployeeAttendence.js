const { Schema, model } = require("mongoose");

const employeeAttendance = new Schema(
  {
    
    userRefAccount:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    company_id:{type:String,required:true},
    employee_id:{type:String,required:false},
    employee_name:{type:String,required:false},
    email:{type:String,required:false},
    companyEmployeId:{ type: Schema.Types.ObjectId, ref: "CompanyEmployee" },
    startDate:{type:Date,required:true}, 
    endDate:{type:Date,required:true}, 
    attendence: { type: String, default: "monthly", enum: ["monthly", "daily","yearly"] },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    totalPresentDates: { type: Number },
    absentDates: { type: Number },
    monthString:{type:String},
    effectiveWorkingDates: { type: Number },
    isfromBulk:{type:Boolean,default:false},
    metaData:{type:Object, default:{}}   // leaves or any other thing to keep record for..
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
// employeeAttendance.index({companyEmployeId ,startDate:1,endDate:1 }, { unique: true });
const employeeAtt = model("EmployeeAttendence", employeeAttendance, "EmployeeAttendence");
module.exports = employeeAtt;
