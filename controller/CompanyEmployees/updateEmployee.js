const CompanyEmployee = require('../../models/CompanyEmployees')
const {updateUserSchema} = require('../../validations/companyEmployees')
const {ObjectId} = require('mongoose').Types
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    try {
          const { error,value } = updateUserSchema.validate(req.body);
      if (error) {
        console.error(error)
        return res.status(400).json({ message: error.details[0].message });
      }
      if(value.packageId){
        value.packageId = new ObjectId(value.packageId);
      }
      const updatedUser = await CompanyEmployee.findByIdAndUpdate(id, value, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Employee updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      if(error.message.includes('index: email_1 dup key:')){
        return res.status(400).json({"message":"This email is already registerd With another employee"})
      }
      else if(error.message.includes('index: company_id_1')){
        return res.status(400).json({"message":"This company id is already registerd With another employee"})
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports = updateEmployee;