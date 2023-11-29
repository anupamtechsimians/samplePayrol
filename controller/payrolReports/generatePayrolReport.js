// const pdf = require("html-pdf");
const fs = require("fs");
const ejs = require("ejs");
const getEmployeeAndAttendenceHrms = require("./hrms/getEmployeeAndAttendence");
const getEmployeeAndAttendencenonHrms = require("./nonHrms.js/getDataFromDb");
const {sendEmailWithAttachment} = require('../../services/sendMail')
const generatePdf = require('../../helper/generatePdf')
const generateReport = async (req, res, next) => {
  try{
  const { role, startDate, endDate, employee_id, reportType, format,sendEmail } =
    req.query;
    console.log(req.user)
    const datetoMonth = (datestr)=>{
      var parts = datestr.split("-");
      var date = new Date(parts[0], parts[1] - 1, parts[2]);
      var options = { month: "long", year: "numeric" };
      var formattedDate = date.toLocaleDateString("en-US", options);
      return formattedDate   
      }
  const ourHrmsFlag = req.user.ourHrmsFlag;
  const userRefAccount = req.user.userId;
  // get employee for report..
  var report = {};
  report = await getEmployeeAndAttendencenonHrms({
    employee_id,
    userRefAccount,
    startDate,
    endDate,
    reportType,
  });
  // if (ourHrmsFlag === true) {
  //   report = await getEmployeeAndAttendenceHrms({
  //     employee_id,
  //     userRefAccount,
  //     company_id: req.user.company_id,
  //     startDate,endDate
  //   });
  // } else {
  //   report = await getEmployeeAndAttendencenonHrms({
  //     employee_id,
  //     userRefAccount,
  //     startDate,
  //     endDate,
  //     reportType,
  //   });
  // }
  const templatePath = "controller/payrolReports/payslip.ejs";

  // Check if the template file exists
  if (!fs.existsSync(templatePath)) {
    return res.status(404).send("Template file not found");
  }
  const template = fs.readFileSync(templatePath, "utf8");
  report.toMonth =  datetoMonth(startDate)
  report.companyName = req.user.name || "Company Name";
  const renderedHtml = ejs.render(template, report);

  const options = { format: "Letter" };
  const attachmentPath = 'attachment.pdf'; // Set the desired path
  await generatePdf(renderedHtml,attachmentPath);

 
  if(sendEmail==='false' || !sendEmail){
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    // fs.createReadStream(attachmentPath).pipe(res);
    const fileStream = fs.createReadStream(attachmentPath);
    fileStream.pipe(res);
    fileStream.on('end', () => {
      fs.unlink(attachmentPath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    });
  }

  if(sendEmail==="true"){
     res.status(200).json({message:"Payslip sent on Employee's registerd Email"})
     await sendEmailWithAttachment(
      // "anupams@techsimians.com",
      [report.employee.email],
      'salary slip ',
      `Dear ${report.employee.firstName},\n\nPlease find your salary slip for July attached. Feel free to reach out for any discrepancies.\n\nBest regards,
      `,
      attachmentPath
      );
      // Clean up the temporary file after sending the email
      fs.unlinkSync(attachmentPath);}
} catch (error) {
  console.error('Error generating and sending PDF:', error);
  if (res.writableEnded) {
    console.log('Response already sent, cannot send another response');
  } else {
    res.status(500).json({ message: 'Error generating and sending PDF', error: error.message });
  }
}
}


module.exports = generateReport;
