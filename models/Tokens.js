const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    userId:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    token:{ type:String, required: true},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const Company = model("Token", companySchema, "Token");
module.exports = Company;
