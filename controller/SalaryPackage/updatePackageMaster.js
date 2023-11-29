const SalaryPackage = require("../../models/SalaryPackage");
const {
  validateSalaryPackageUpdate,
} = require("../../validations/packageMaster");
const logger = require("../../config/logger");
const { ObjectId } = require("mongoose").Types;

const createSalaryPackage = async (req, res) => {
  const { id } = req.params;
  try {
    const { error, value } = validateSalaryPackageUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const salaryPackage = await SalaryPackage.findOneAndUpdate(
      { _id: new ObjectId(id) },
      value,
      { new: true }
    );
    logger.info(
      `package id: ${salaryPackage._id} updated  successfully by  ${
        req.user.userId
      } at ${new Date()}`)
    res.status(200).json(salaryPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createSalaryPackage;
