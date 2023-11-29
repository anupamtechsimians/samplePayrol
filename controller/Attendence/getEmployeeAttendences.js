const EmployeeAttendence = require("../../models/Attendence");
const {ObjectId} = require("mongoose").Types
const getEmpHrms = require("../../services/getEmpAttDaily")
const getEmployeesAtten = async (req, res) => {
  try {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  const search = req.query.search;
  const date = req.query.date;
  if(req.user.ourHrmsFlag && req.user.ourHrmsFlag===true){
    const data = await getEmpHrms({user:req.user,start,limit})
    const modifiedData =  data.record.map( (obj) => {
      const { startTime, outTime, title, firstName,middleName, lastName, ...rest } = obj;
      return {
        metaData: {
          startTime,
          endTime: outTime
        },
        employee: {
          title,
          firstName,
          middleName,
          lastName,
        },
        ...rest
      };
    });
    return res.status(200).json({start,limit,totalCount:data.totalCount[0]?.count,"attendence":modifiedData});
  }
  const query={}
  query.userRefAccount = new ObjectId(req.user.userId);
  if(date){
    query.date=new Date(date);
  }
  const searchFilter=search?{
    $or: [
      { "employee.firstName": { $regex: search, $options: "i" } },
      { "employee.middleName": { $regex: search, $options: "i" } },
      { "employee.lastName": { $regex: search, $options: "i" } },
      { "employee.email": { $regex: search, $options: "i" } },
    ],
  }:{};

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getEmployeesAtten;
