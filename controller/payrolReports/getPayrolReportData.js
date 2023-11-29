const getEmpData = require('./nonHrms.js/getAllEmpDataBulkAtt');
const getEmpDataHrms = require('./hrms/getEmployeeData');


const generatePayrolReport = async (req, res) => {
  try {
    const { startDate, endDate,start,limit } = req.query;
    var data=[];
    var count=0;
    const ourHrmsFlag = req.user.ourHrmsFlag;
    const company_id = req.user.company_id;
    
    if(ourHrmsFlag===true){
        // console.log('Generating')
        data = await getEmpDataHrms({
        userRefAccount: req.user.userId,
        startDate: startDate,
        endDate: endDate,
        company_id,
        start,limit
      });
  }
  else{
    data = await getEmpData({
        userRefAccount: req.user.userId,
        startDate: startDate,
        endDate: endDate,start,limit
      });
  }
  
res.status(data.status|| 200).json(data);
  }catch(e){
    console.log(e)
    res.status(500).json({message: e.message});
  }
};

module.exports = generatePayrolReport;
