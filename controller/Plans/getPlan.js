const Plan = require("../../models/Plans.model");
const getPlan = async (req,res)=>{
    try {
        const { id } = req.params;
        const plan = await Plan.findById(id);
        if (!plan) {
          return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json({ plan });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
module.exports = getPlan;