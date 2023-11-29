const SalaryPackage = require("../../models/SalaryPackage");
const getPlan = async (req,res)=>{
    try {
        const { id } = req.params;
        const salaryComp = await SalaryPackage.findById(id);
        if (!salaryComp) {
          return res.status(404).json({ message: "salaryPackage  not found" });
        }
        res.status(200).json({ data:salaryComp });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
    };
module.exports = getPlan;