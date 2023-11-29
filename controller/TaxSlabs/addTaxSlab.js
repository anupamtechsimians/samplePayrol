const TaxSlabs = require('../../models/TaxSlabs');
const {slabsComponentSchema} = require('../../validations/taxSlabs');

const createPayrollConfig = async (req, res) => {
    try {
      const { error, value } =  slabsComponentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      value.companyId = req.user.company_id;
      value.userRefAccount = req.user.userId;
      const data = await TaxSlabs.create(value);
      res.status(201).json(data);
      
    } catch (error) {
      console.error( error.message)
      res.status(500).json({ error: error.message });
    }
  };

module.exports = createPayrollConfig;
