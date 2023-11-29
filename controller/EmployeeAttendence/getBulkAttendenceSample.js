
const xlsx = require('xlsx-populate');
const Employees = require('../../models/CompanyEmployees')

const downloadData = async (req,res)=>{
    try{
        const employeeData = await Employees.find({userRefAccount : req.user.userId})
    
    xlsx.fromBlankAsync().then((workbook) => {
        const sheet = workbook.sheet(0);
        sheet.column('A').width(3+5);
        sheet.column('B').width(25);
        sheet.column('C').width(25);
        sheet.column('D').width(25);
        sheet.column('E').width(25);
        sheet.column('F').width(25);
        sheet.column('G').width(25);
        sheet.column('H').width(25);
        sheet.column('I').width(25);
        sheet.column('J').width(25);
        // Add headers to the columns
        sheet.cell('A1').value('employee_id');
        sheet.cell('B1').value('employee_name');
        sheet.cell('C1').value('email');
        sheet.cell('D1').value('startDate(dd-mm-yyyy)');
        sheet.cell('E1').value('endDate(dd-mm-yyyy)');
        sheet.cell('F1').value('attendence');
        sheet.cell('G1').value('totalPresentDates');
        sheet.cell('H1').value('absentDates');
        sheet.cell('I1').value('effectiveWorkingDates');
        sheet.cell('J1').value('overtimeHour');
    
        // Populate data in the Excel sheet
        for (let i = 0; i < employeeData.length; i++) {
          const data = employeeData[i];
          console.log(data._id.toString())
          sheet.cell(`A${i + 2}`).value(data._id.toString());
          sheet.cell(`B${i + 2}`).value(data.firstName +' '+data.lastName);
          sheet.cell(`C${i + 2}`).value(data.email);
          sheet.cell(`F${i + 2}`).value("monthly");
        }
    
        // Save the Excel file
        workbook.outputAsync().then((blob) => {
          res.setHeader('Content-Disposition', 'attachment; filename=employee_data.xlsx');
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.end(blob, 'binary');
        });
      });
    
}catch(e){
    console.log(e);
    return res.status(500).json({message:"Internal server error"})
}   
}

module.exports = downloadData;