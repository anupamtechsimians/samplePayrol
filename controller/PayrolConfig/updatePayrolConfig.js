const PayrolConfig = require("../../models/PayrolConfig");
const AddPayrollConfigSchema  = require("../../validations/payrolConfig");
const {ObjectId} = require('mongoose').Types;
const updatePayrollConfig = async (req, res) => {
  try {
    const { error, value } = AddPayrollConfigSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await PayrolConfig.findOneAndUpdate(
      { userRefAccount: new ObjectId(req.user.userId) },
      value,
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = updatePayrollConfig;
