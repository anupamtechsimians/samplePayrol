const salaryComponent = require("../../models/SalaryComponent");
const {
  createModelValidation,
} = require("../../validations/salaryComponent");
const logger = require("../../config/logger");
const { ObjectId } = require("mongoose").Types;

const createModel = async (req, res) => {
  try {
    const { error, value } = createModelValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if(value.fractionOf==='0'){
      delete value.fractionOf;
    }
    if(value.payType===null || value.payType===undefined){
      delete value.payType;
    }
    value.userRefAccount = req.user.userId;
    value.companyId = req.user.company_id;
    
    // Create a new model instance
    const component = new salaryComponent(value);

    // Save the model to the database
    await component.save();
    logger.info(
      `configuration id: ${component._id} added successfully by  ${
        req.user.userId
      } at ${new Date()}`
    );
    res
      .status(201)
      .json({ message: "Component  created successfully", component });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createModel;
