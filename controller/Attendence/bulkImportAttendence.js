const Attendence = require("../../models/Attendence");
const XLSX = require("xlsx");
const formidable = require('formidable');

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
  
        const file = files.file;
        const filePath = file.filepath;
        const workbook = XLSX.readFile(filePath);
  
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
        const employees = [];
        
        for (let i = 0; i < jsonData.length; i++) {
          const employeeData = jsonData[i];
  
          const employee = new Attendence({
              employee_id:employeeData.employee_id,
              isOnLeave: employeeData.isOnLeave==='yes'?true:false,
              date: employeeData.date,
              isPaidLeave: employeeData.isPaidLeave==='yes'?true:false,
              status:employeeData.status,
              metadata:{startTime: employeeData.startTime, endTime: employeeData.endTime},
              userRefAccount: req.user.userId,
              company_id:req.user.company_id,
              isfromBulk:true,
          });
          
  
          employees.push(employee);
        }
  
        await Attendence.insertMany(employees);
  
        res.status(200).json({
          message: 'Employees imported successfully',
          
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
