const Attendence = require("../../models/EmployeeAttendence");
const XLSX = require("xlsx");
const formidable = require('formidable');
const {ObjectId} = require('mongoose').Types
const moment = require('moment');

const {excelSerialNumberToDate} = require('../../services/dates')
const formatDate = (date) => {
  return moment(date).format('DD-MM-YYYY');
};
// Controller function to bulk import employees from Excel
const bulkImportAttendence = async (req, res) => {
  try {
      const form = new formidable.IncomingForm();
  
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            message: 'Error parsing form data',
            error: err.message
          });
        }
  
        const file = files?.file;
        if(!file){
          return res.status(400).json({message:"file missing. please upload file"})
        }
        const filePath = file.filepath;
        const workbook = XLSX.readFile(filePath);
  
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
        const employees = [];
        
        for (let i = 0; i < jsonData.length; i++) {
          try{
            let metaData = {};
          const employeeData = jsonData[i];
            console.log(employeeData);
            const startDateParts = excelSerialNumberToDate(employeeData['startDate(dd-mm-yyyy)']);
            const endDateParts = excelSerialNumberToDate(employeeData['endDate(dd-mm-yyyy)'])
            const startDateParts1 = startDateParts.split('-');
            const endDateParts1 = endDateParts.split('-');
            const overtimeHour = employeeData['overtimeHour'];

            const startDate = new Date(
              startDateParts
            );
            const monthString = `${startDateParts1[2]}-${endDateParts1[1]}`;

            const endDate = new Date(
              startDateParts
            );
            const employee = new Attendence({
              companyEmployeId:new ObjectId(employeeData.employee_id),
              employee_name:employeeData.employee_name,
              email:employeeData.email,
              startDate: startDate,
              endDate: endDate,
              monthString:monthString,
              attendence: employeeData.attendence,
              totalPresentDates:employeeData.totalPresentDates,
              absentDates: employeeData.absentDates,
              effectiveWorkingDates: employeeData.effectiveWorkingDates,
              userRefAccount: req.user.userId,
              company_id:req.user.company_id,
              isfromBulk:true,
              metaData:{overtimeHour}
          });
          
  
          // employees.push(employee);
          await employee.save();
        }catch(e){
          console.log("skipped due to duplicate..!!",e);
        }
        }
  
        // await Attendence.insertMany(employees);
  
        res.status(200).json({
          message: 'Attendence imported successfully',
          
        });
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to import employees',
        error: error.message
      });
    }
  };

module.exports = bulkImportAttendence;
