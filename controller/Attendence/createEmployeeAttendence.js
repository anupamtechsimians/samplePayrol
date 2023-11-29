const Attendence = require("../../models/Attendence");
const { createAttendanceSchema } = require("../../validations/attendence");
const { ObjectId } = require("mongoose").Types;

const createAttendence = async (req, res)=> {
  const {id} = req.params
    try {
      // Validate the request body
      const { error, value } = createAttendanceSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      value.userRefAccount = new ObjectId(req.user.userId)
      value.companyEmployeId = new ObjectId(id)
      value.company_id  = req.user.company_id
      const newResource = await Attendence.create(value);
  
      res.status(201).json(newResource);
    } catch (error) {
      if(error.message.includes('employee_id_1_userRefAccount_1_date_1')){
        return res.status(400).json({message:"attendence already added for this employee in this date"})
      }
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = createAttendence;