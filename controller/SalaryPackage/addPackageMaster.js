const SalaryPackage = require("../../models/SalaryPackage");
const {
  validateSalaryPackage
} = require("../../validations/packageMaster");
const logger = require("../../config/logger");
const { ObjectId } = require("mongoose").Types;

const createSalaryPackage = async (req, res) => {
  try {
    const { error,value } = validateSalaryPackage(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const salaryPackage = new SalaryPackage(value);
    salaryPackage.userRefAccount = req.user.userId;
    salaryPackage.companyId = req.user.company_id;
    await salaryPackage.save();
    logger.info(
      `package id: ${salaryPackage._id} added successfully by  ${
        req.user.userId
      } at ${new Date()}`)
    res.status(201).json(salaryPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createSalaryPackage;
