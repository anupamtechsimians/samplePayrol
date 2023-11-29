const EmployeeAttendence = require("../../models/EmployeeAttendence");
const { createEmplAttendence } = require("../../validations/EmployeeAttendance");
const { ObjectId } = require("mongoose").Types;

const createAttendence = async (req, res)=> {
    try {
      // Validate the request body
      const { error, value } = createEmplAttendence.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      value.userRefAccount = new ObjectId(req.user.userId)
      value.company_id  = req.user.company_id
      const newResource = await EmployeeAttendence.create(value);
  
      res.status(201).json(newResource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = createAttendence;