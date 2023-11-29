const HrmsEmpPackage = require("../../models/hrmsEmployeePackages");
const { updateEmpPackage } = require("../../validations/hrmsEmpPackage");
const { ObjectId } = require("mongoose").Types;

const createHrmsEmpPackage = async (req, res)=> {
    const {id}=req.params;
    try {
      // Validate the request body
      const { error, value } = updateEmpPackage.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const newResource = await HrmsEmpPackage.findOneAndUpdate({_id:new ObjectId(id)}, req.body,{new:true});
  
      res.status(200).json(newResource);
    } catch (error) {
      if(error.message.includes('employee_id_1_userRefAccount_1_date_1')){
        return res.status(400).json({message:"package already added for this employee in this date"})
      }
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = createHrmsEmpPackage;