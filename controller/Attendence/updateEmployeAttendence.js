const Attendence = require("../../models/Attendence");
const { updateAttendanceSchema } = require("../../validations/attendence");
const { ObjectId } = require("mongoose").Types;

const updateAttendence = async (req, res)=> {
    try {
      const {id} = req.params
      // Validate the request body
      const { error, value } = updateAttendanceSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const newResource = await Attendence.findOneAndUpdate({_id:new ObjectId(id)},value,{new:true});
  
      res.status(200).json(newResource);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = updateAttendence;