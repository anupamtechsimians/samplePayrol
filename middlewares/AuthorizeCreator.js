const SalaryComponent = require("../models/SalaryComponent");
const { ObjectId } = require("mongoose").Types;
const authorizeCreator = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const salaryCom = await SalaryComponent.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (salaryCom && salaryCom.userId.equals(userId) === true) {
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
