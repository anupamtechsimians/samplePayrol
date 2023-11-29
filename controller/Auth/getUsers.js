const User = require("../../models/User.model");

const getAll = async (req, res, next) => {
  try {
    let start = req.query.start || 0;
    let limit = req.query.limit || 10;
    const data = await User.find({}).skip(start).limit(limit);
    const totalCount = await User.countDocuments({});

    res.status(201).json({ start, limit, totalCount, data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = getAll;
