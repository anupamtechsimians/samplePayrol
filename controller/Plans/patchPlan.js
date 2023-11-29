const Plan = require("../../models/Plans.model");
const addPlan = async (req,res)=>{
    try {
        const { name, price, allowedUnits, description, media, status } = req.body;
    
        const plan = new Plan({
          name,
          price,
          allowedUnits,
          description,
          media,
          status,
        });
    
        await plan.save();
    
        res.status(201).json({ message: "Plan created successfully", plan });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
module.exports = addPlan;