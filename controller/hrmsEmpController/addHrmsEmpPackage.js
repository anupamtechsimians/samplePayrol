const HrmsEmpPackage = require("../../models/hrmsEmployeePackages");
const { createEmpPackage,updateEmpPackage } = require("../../validations/hrmsEmpPackage");
const { ObjectId } = require("mongoose").Types;

const createHrmsEmpPackage = async (req, res)=> {
    try {
      // Validate the request body
      const { error, value } = createEmpPackage.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      value.userRefAccount = new ObjectId(req.user.userId)
      value.companyId  = req.user.company_id
      const newResource = await HrmsEmpPackage.create(value);
  
      res.status(201).json(newResource);
    } catch (error) {
      if(error.message.includes('employee_id_1_userRefAccount_1_date_1')){
        return res.status(400).json({message:"package already added for this employee in this date"})
      }
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = createHrmsEmpPackage;