const User = require("../models/User.model");
// const { ObjectId } = require("mongoose").Types;
const authorizeCreator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (userId === id) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = authorizeCreator;
