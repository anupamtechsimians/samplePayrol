const User = require("../../models/User.model");

const me = async (req, res, next) => {
  try {
    // console.log(req.user)
    const data = await User.findById(req.user.userId)

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = me;
