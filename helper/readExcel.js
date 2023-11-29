const XLSX = require("xlsx");

// Controller function to bulk import employees from Excel
const readExcel = async (form) => {
    try {
  
      form.parse(reqa, async (err, fields, files) => {
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
        return jsonData;
     } ) }
     catch (e) {
        throw new Error(e);
     }
  };

module.exports = readExcel;
