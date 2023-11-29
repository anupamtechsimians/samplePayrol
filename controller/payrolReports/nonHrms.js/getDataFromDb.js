
// const Attendence = require("../../../models/Attendence");
const ProcessedPayrols = require("../../../models/ProcessPayroll");

const NumberToWords = require("../../../helper/convertNumberToWords")

const getEmployeeAndAttendencenonHrms = async (data) => {
  try{
 let start = data.startDate.substring(0,7);
const processedPayrol = await ProcessedPayrols.findOne({monthString:start,employee_id: data.employee_id});
const employee = {employee_id:processedPayrol.employee_id,email:processedPayrol.email,name:processedPayrol.name,
  designation:processedPayrol.designation}
   
  const amount = processedPayrol.amount;
  var effamount = processedPayrol.totalAmount
  const componentArray = [];
  var earning = 0;
  var deduction = 0;
  processedPayrol?.metaData?.data?.forEach(async (data) => {
    const obj = {};
    
  
    obj.name = data?.name;
    obj.type = data?.type;
    obj.payType = data?.payType;
    let current = data;
    if(current.calculationType ==='flat amount'){
      obj.payAmount = data?.payAmount;
      
    }
    else if(current.fractionOf[0]){
      let curr2 =current.fractionOf[0]
      if(curr2?.calculationType ==='flat amount'){
        obj.payAmount = Number(curr2?.payAmount) * (Number(current.payAmount)/100);
      }
      else{
        obj.payAmount = Number(curr2?.payAmount) * (0.01)* (Number(curr2?.payAmount) * effamount/100)
      }
    }
    else{
      obj.payAmount = (Number(current.payAmount) * effamount/100)
    }
    if(obj.type==='earning'){
      earning +=obj.payAmount
    }
    else{
      deduction +=obj.payAmount
    }
    
    componentArray.push(obj);
  });

  let tax = 0;
  let taxableAmount = processedPayrol.taxableAmount
  if(taxableAmount){
    componentArray.push({name:'Tax Deducted at Source (TDS)',taxableAmount,type:"Tax"});
    tax=taxableAmount;
  }

  let deductionAmount =(30- processedPayrol.payableDays) * processedPayrol.amount/30;
  componentArray.push(
    {
      name: 'deduction',
      type: 'deduction',
      payType: 'fixed pay',
      payAmount: deductionAmount
    },
  )
  var total = effamount - deduction -tax;
  let specialAllow = effamount - earning;
  let gross = total
  let total1 = total
  total = total.toFixed(2)
  const wordsTotal = NumberToWords(total)
 
  const records = { employee, attendence:processedPayrol?.payableDays || 0, comp:componentArray,total,wordsTotal,gross,specialAllow,amount:total1 };
  return records;
}
  catch(e){
    console.log(e);
    return []

  }
};

module.exports = getEmployeeAndAttendencenonHrms;
