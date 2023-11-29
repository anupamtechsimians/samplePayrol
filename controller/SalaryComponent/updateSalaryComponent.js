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
      fractionOf,
      show_on_payslip, } = req.body;

    const { error,value } = updateModelValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log(value)
    // Create a new model instance
    if(value.fractionOf === undefined || value.fractionOf === null ) {
       value.fractionOf=null;
    }
    if(value.payType===null || value.payType===undefined){
      delete value.payType;
    }
    const component = await salaryComponent.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      value,
      { new: true }
    );

    // Save the model to the database
    await component.save();
    logger.info(
      `configuration id: ${component._id} updated successfully by  ${
        req.user.userId
      } at ${new Date()}`
    );
    res.status(200).json({
      message: "Component  updated successfully",
      component: component,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createModel;
