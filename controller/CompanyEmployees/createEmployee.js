const CompanyEmployee = require("../../models/CompanyEmployees");
const { createUserSchema } = require("../../validations/companyEmployees");
const { ObjectId } = require("mongoose").Types;

const createEmployee = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    value.company_id = req.user.company_id
    value.userRefAccount = req.user.userId
    if (error) {
      console.error(req.body);
      return res.status(400).json({ message: error.details[0].message });
    }

    const newUser = new CompanyEmployee(value);
    await newUser.save();

    res
      .status(201)
      .json({
        message: "company Employee created successfully",
        user: newUser,
      });
  } catch (error) {
    console.error(error);
    if(error.message.includes('index: email_1 dup key:')){
      return res.status(400).json({"message":"This email is already registerd With another employee"})
    }
    else if(error.message.includes('index: company_id_1')){
      return res.status(400).json({"message":"This company id is already registerd With another employee"})
    }
    res.status(500).json({ message: error.message });
  }
};
module.exports = createEmployee;
