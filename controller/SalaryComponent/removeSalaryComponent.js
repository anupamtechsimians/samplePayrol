const SalaryComponent = require("../../models/SalaryComponent");
const logger = require("../../config/logger")
const deletePlanById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const plan = await SalaryComponent.findByIdAndUpdate(id, {status: 'inactive'},{new:true});
        logger.info(`salaryComponent id: ${id} deleted by user ${req.user.userId} at ${new Date()} `);
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