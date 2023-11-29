const PayrolConfig = require("../../models/PayrolConfig");
const AddPayrollConfigSchema = require("../../validations/payrolConfig");
const createPayrollConfig = async (req, res) => {
  try {
    const { error, value } = AddPayrollConfigSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    value.companyId = req.user.company_id;
    value.userRefAccount = req.user.userId;

    console.log(value);
    const data = await PayrolConfig.create(value);
    res.status(201).json(data);
    
  } catch (error) {
    console.error( error.message)
    if( error.message.includes("duplicate key error collection")){
      return res.status(400).json({ error:"cannot create duplicate config for company. use PUT method to update existing record."})
    }
    res.status(500).json({ error: error.message });
  }
};
module.exports = createPayrollConfig;
