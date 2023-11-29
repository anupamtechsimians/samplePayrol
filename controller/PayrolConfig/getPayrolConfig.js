const PayrolConfig = require("../../models/PayrolConfig");
const { ObjectId } = require("mongoose").Types;
const getPayrolConfig = async (req, res) => {
  try {
    const data = await PayrolConfig.findOne({userRefAccount:new ObjectId(req.user.userId)});
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getPayrolConfig;
