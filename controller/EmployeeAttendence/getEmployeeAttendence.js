const EmployeeAttendence = require("../../models/EmployeeAttendence");

const getEmployeesAtten = async (req, res) => {
  const { id } = req.params;
  try {
    const attendence = await EmployeeAttendence.findOne({ _id: id });
    res.status(200).json({ attendence });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getEmployeesAtten;
