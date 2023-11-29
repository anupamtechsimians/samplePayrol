const salaryComponent = require("../../models/SalaryComponent");
const {
  updateModelValidation,
} = require("../../validations/salaryComponent");
const logger = require("../../config/logger");

const { ObjectId } = require("mongoose").Types;

const createModel = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      code,
      ledger,
      payType,
      calculationType,
      payAmount,
      isTaxable,
      show_in_payslip, } = req.body;

    const { error } = updateModelValidation.validate({
    name,
    type,
    code,
    ledger,
    payType,
    calculationType,
    payAmount,
    isTaxable,
    show_in_payslip,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new model instance
    const component = await salaryComponent.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      {
        name,
        type,
        code,
        ledger,
        payType,
        calculationType,
        payAmount,
        isTaxable,
        show_in_payslip,
      },
      { new: true }
    );

    // Save the model to the database
    await component.save();
    logger.info(
      `configuration id: ${component._id} updated successfully by  ${
        req.user.userId
      } at ${new Date()}`
    );
    res.status(201).json({
      message: "Component  updated successfully",
      component: component,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createModel;
