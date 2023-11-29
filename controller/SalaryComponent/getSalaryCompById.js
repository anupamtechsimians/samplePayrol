const SalaryComponent = require("../../models/SalaryComponent");
const getPlan = async (req,res)=>{
    try {
        const { id } = req.params;
        const salaryComp = await SalaryComponent.findById(id);
        if (!salaryComp) {
          return res.status(404).json({ message: "salaryComp not found" });
        }
        res.status(200).json({ data:salaryComp });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
module.exports = getPlan;