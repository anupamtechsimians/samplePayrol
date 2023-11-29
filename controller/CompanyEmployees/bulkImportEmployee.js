const Employee = require("../../models/CompanyEmployees");
const XLSX = require("xlsx");
const formidable = require('formidable');

// Controller function to bulk import employees from Excel
const bulkImportEmployees = async (req, res) => {
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
          try{
          const employeeData = jsonData[i];
  
          var employee = new Employee({
            firstName: employeeData.firstName,
            middleName: employeeData.middleName,
            lastName: employeeData.lastName,
            gender: employeeData.gender,
            designation: employeeData.designation,
            department: employeeData.department,
            dateOfBirth: employeeData.dateOfBirth,
            employee_id:employeeData.employee_id,
            email: employeeData.email,
            salary: employeeData.salary,
            phone: employeeData.phone,
            companyId: req.user.company_id,
            address: employeeData.address,
           status: employeeData.status || "active",
           role: employeeData.role,
           dateOfJoining:employeeData.date_Of_Joining,
            userRefAccount: req.user.userId
            
          });
          await employee.save();
          }catch(e){
            console.log("employee skipped due to duplicate");
          }
          
        }
  
        // const insertedEmployees = await Employee.insertMany(employees);
  
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

module.exports = bulkImportEmployees;
