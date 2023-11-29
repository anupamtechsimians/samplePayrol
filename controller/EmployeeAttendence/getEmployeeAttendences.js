const EmployeeAttendence = require("../../models/EmployeeAttendence");

const getEmployeesAtten = async (req, res) => {
  try {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  const {search} = req.query;
  const query={}
  query.userRefAccount = req.user.userId;
  if(search){
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
    const attendence = await EmployeeAttendence.find(query)
      .skip(start)
      .limit(limit);
    const totalCount = await EmployeeAttendence.countDocuments(query);
    res.status(200).json({ start, limit, totalCount, attendence });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getEmployeesAtten;
