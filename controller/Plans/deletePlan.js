const Plan = require("../../models/Plans.model");
const deletePlanById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const plan = await Plan.findByIdAndDelete(id);
  
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }
  
      res.status(200).json({ message: "Plan deleted successfully", plan });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  module.exports = deletePlanById