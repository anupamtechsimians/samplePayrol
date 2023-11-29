const Plan = require("../../models/Plans.model");
const getPlans = async (req,res)=>{
    try {
        const plans = await Plan.find();
        res.status(200).json({ plans });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
module.exports = getPlans;