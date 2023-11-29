const getEmpData = require('./nonHrms.js/getAllEmpDataBulkAtt');
const getEmpDataHrms = require('./hrms/getEmployeeData');
const XLSX = require('xlsx');
const {sendEmailWithAttachment} = require('../../services/sendMail')

const generatePayrolReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    var data=[];
    const ourHrmsFlag = req.user.ourHrmsFlag;
    const company_id = req.user.company_id;
    
    if(ourHrmsFlag===true){
        // console.log('Generating')
        data = await getEmpDataHrms({
        userRefAccount: req.user.userId,
        startDate: startDate,
        endDate: endDate,
        company_id
      });
  }
  else{
    data = await getEmpData({
        userRefAccount: req.user.userId,
        startDate: startDate,
        endDate: endDate
      });
  }
  console.log(data)
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data.data);
  // XLSX.utils.sheet_set_column(worksheet, 0, 10,30 );

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate the Excel file as a Buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

  // Set response headers
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

  // Send the Excel file as a response for download
  res.send(excelBuffer);
// res.status(200).json(data);
};

module.exports = generatePayrolReport;
