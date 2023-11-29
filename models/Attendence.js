const { Schema, model } = require("mongoose");

const Attendence = new Schema(
  {
    
    userRefAccount:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    company_id:{type:String,required:true},
    employee_id:{type:String,required:true},
    companyEmployeId:{ type: Schema.Types.ObjectId, ref: "CompanyEmployee" },
    isPaidLeave:{type:Boolean,default:false},
    isOnLeave:{type:Boolean,default:false},
    date:{type:Date,required:true}, 
    status: { type: String, default: "absent", enum: ["present", "absent","leave","half day","late comming","early going"] },
    metaData:{type:Object, default:{}}   // leaves or any other thing to keep record for..
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
Attendence.index({ employee_id: 1,userRefAccount:1,date:1 }, { unique: true });
const employeeAtt = model("Attendence", Attendence, "Attendence");
module.exports = employeeAtt;
