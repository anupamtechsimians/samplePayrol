const TaxSlabs = require("../../models/TaxSlabs");
const {ObjectId} = require("mongoose").Types;
const getTaxSlabs = async (req,res)=>{
    const {id} = req.params;
    try {
        const plans = await TaxSlabs.findOneAndDelete({_id:new ObjectId(id)});
        res.status(200).json({"message":"removed successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
module.exports = getTaxSlabs;