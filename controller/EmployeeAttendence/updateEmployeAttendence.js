const EmployeeAttendence = require("../../models/EmployeeAttendence");
const {
  updateEmplAttendence,
} = require("../../validations/EmployeeAttendance");
const { ObjectId } = require("mongoose").Types;

const createAttendence = async (req, res) => {
  const { id } = req.params;
  try {
    const { startDate,endDate,attendence,totalPresentDates,absentDates,effectiveWorkingDates} = req.body;
    const { error, value } = updateEmplAttendence.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newResource = await EmployeeAttendence.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { startDate,endDate,attendence,totalPresentDates,absentDates,effectiveWorkingDates },
      { new: true }
    );
    res.status(200).json(newResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createAttendence;
