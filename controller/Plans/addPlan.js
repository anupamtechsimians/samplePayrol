const Plan = require("../../models/Plans.model");
const {planCreateJoiSchema} = require("../../validations/plans");
const addPlan = async (req,res)=>{
    try {
        const { name, price, allowedUnits, description, media, status } = req.body;
        
        const { error } = planCreateJoiSchema.validate({ name, price, allowedUnits, description, media, status });
      
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
          }

        const plan = new Plan({ name, price, allowedUnits, description, media, status });
    
        await plan.save();
    
        res.status(201).json({ message: "Plan created successfully", plan });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
module.exports = addPlan;