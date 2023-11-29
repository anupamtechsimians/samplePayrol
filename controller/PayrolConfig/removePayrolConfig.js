const PayrolConfig = require("../../models/PayrolConfig");
const { updatePayrolConfigSchema } = require("../../validations/payrolConfig");
const {ObjectId} = require('mongoose').Types;
const removePayloadConfig = async (req, res) => {
    const {id} = req.params
  try {
    
    const data = await PayrolConfig.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {status:'inactive'},
      { new: true }
    );
    res.status(202).json({message:"deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = removePayloadConfig;
