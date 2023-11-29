const SalaryPackage = require("../../models/SalaryPackage");
const CompanyEmployees = require("../../models/CompanyEmployees");
const HrmsEmpPackage = require("../../models/hrmsEmployeePackages");
const ObjectId = require("mongoose").Types.ObjectId;
const logger = require("../../config/logger")
const deletePlanById = async (req, res) => {
    try {
      const { id } = req.params;
      //check assigned employee package
      const empPackageExist = await CompanyEmployees.findOne({packageId:new ObjectId(id)});
      if(empPackageExist){
        return res.status(400).json({"message":"Please remove Existing packages for Employee"})
      }
      const empPackageExistHrms = await HrmsEmpPackage.findOne({packageId:new ObjectId(id)});
      if(empPackageExistHrms){
        return res.status(400).json({"message":"Please remove Existing packages for Employee"})
      }
      const plan = await SalaryPackage.findByIdAndUpdate(id, {status: 'inactive'},{new:true});
        logger.info(`SalaryPackage id: ${id} deleted by user ${req.user.userId} at ${new Date()} `);
      if (!plan) {
        return res.status(404).json({ message: "SalaryComponent not found" });
      }
  
      res.status(200).json({ message: "SalaryComponent deleted successfully", plan });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  module.exports = deletePlanById