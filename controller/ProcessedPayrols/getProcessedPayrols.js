const ProcessedPayrols = require("../../models/ProcessPayroll");
const {ObjectId} = require("mongoose").Types
const getData = async (req, res) => {

  const filter={};
  const {search,monthString,start=0,limit=10,employee_id} = req.query
  filter.userRefAccount=new ObjectId(req.user.userId);
    if(monthString){
        filter.monthString=monthString;
    }
    if(employee_id){
        filter.employee_id=employee_id;
    }
   if(search){
    filter.$or = [];
    filter.$or.push({ name: { $regex: req.query.search, $options: 'i' } });
    filter.$or.push({ email: { $regex: req.query.search, $options: 'i' } });
   }  
  try {

    const data = await ProcessedPayrols.find(filter).select('-metaData');
    const totalCount = await ProcessedPayrols.countDocuments(filter);
    res.status(200).json({ totalCount, start, limit, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getData;
