const Plan = require("../../models/Plans.model");
const addPlan = async (req,res)=>{
    try {
        const { id } = req.params;
        const { name, price, allowedUnits, description, media, status } = req.body;
    
        const plan = await Plan.findByIdAndUpdate(
          id,
          { name, price, allowedUnits, description, media, status },
          { new: true }
        );
    
        if (!plan) {
          return res.status(404).json({ message: "Plan not found" });
        }
    
        res.status(200).json({ message: "Plan updated successfully", plan });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
module.exports = addPlan;