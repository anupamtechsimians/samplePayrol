const moment = require('moment')
const  excelSerialNumberToDate =(serialNumber)=> {
    if(typeof serialNumber === 'string'){
        return serialNumber;
    }
    else{

        const excelBaseDate = new Date('1899-12-31'); 
      
        const millisecondsInADay = 24 * 60 * 60 * 1000;
        const daysSinceExcelBaseDate = serialNumber - 1; 
      
        const date = new Date(excelBaseDate.getTime() + daysSinceExcelBaseDate * millisecondsInADay);
      
        return moment(date).format('DD-MM-YYYY');
    }
  }

  module.exports = {excelSerialNumberToDate};