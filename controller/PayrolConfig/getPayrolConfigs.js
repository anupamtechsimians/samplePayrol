const PayrolConfig = require("../../models/PayrolConfig");

const getPayrolConfigs = async (req, res) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  const { status } = req.query;
  const query = {};
  if (status) {
    query.status = status;
  }
  query.userRefAccount = req.user.userId;
  try {
    const data = await PayrolConfig.find(query).skip(start).limit(limit);
    const totalCount = await PayrolConfig.countDocuments({});
    res.status(200).json({ start, limit, totalCount, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getPayrolConfigs;
