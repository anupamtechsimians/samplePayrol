const Employee = require("../../../models/CompanyEmployees");
const { ObjectId } = require("mongoose").Types;
const NumberToWords = require("../../../helper/convertNumberToWords")
const ProcessPayroll = require('../../../models/ProcessPayroll');
const Configuration = require('../../../models/PayrolConfig');
const employeeAtt = require("../../../models/EmployeeAttendence");
const getEmployeeAndAttendencenonHrms = async (data) => {
  let {startDate,endDate} = data;
  let start = data.startDate.substring(0,7);
  const payrolProcessed = await ProcessPayroll.countDocuments({userRefAccount: new ObjectId(data.userRefAccount),monthString: start});
  if(payrolProcessed >0){
    return {message:"Payroll already processed For this Month",status:200}
  }

  const configuration = await Configuration.findOne({userRefAccount: new ObjectId(data.userRefAccount)})
  const count = await Employee.countDocuments({userRefAccount:new ObjectId(data.userRefAccount),packageId:{ $ne: null }})
  if(count===0){
    return {message:'Please assign package to Employees',status:400}
  }
  let userRef = new ObjectId(data.userRefAccount);
    const employee = await Employee.aggregate([
        {
          $match: { userRefAccount: new ObjectId(data.userRefAccount) }
        },
        {
          $lookup: {
            from: "SalaryPackage",
            localField: "packageId",
            foreignField: "_id",
            as: "package"
          }
        },
        {
          $unwind: "$package"
        },
        {
          $lookup: {
            from: "TaxSlabs",
            let: {
              amount: "$package.amount",
              regime: "new"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $lte: ["$slabMinAmount", "$$amount"] },
                      { $gte: ["$slabMaxAmount", "$$amount"] },
                      { $eq: ["$regime", "$$regime"] },
                    ]
                  }
                }
              }
            ],
            as: "package.taxSlabs"
          }
          },
          
          {
            $addFields: {
              attendence: "$attendence"
            }
          },
        {
          $lookup: {
            from: "salaryComponent",
            localField: "package.salaryPackages.salaryComponent",
            foreignField: "_id",
            as: "package.salaryPackages"
          }
        },
        {
          $unwind: "$package.salaryPackages"
        },
        {
          $lookup: {
            from: "salaryComponent",
            let: { fractionOfId: "$package.salaryPackages.fractionOf" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$fractionOfId"] }
                }
              },
              {
                $limit: 1
              }
            ],
            as: "package.salaryPackages.fractionOf"
          }
        },
        
        {
          $group: {
            _id: "$_id",
            employee: { $first: "$$ROOT" },
            salaryComponents: { $push: "$package.salaryPackages" }
          }
        },
        {
          $project: {
            _id: "$employee._id",
            employee: {
              attendence:1,
                title:1,middleName:1,firstName:1,lastName:1,designation:1,email:1,employee_id:1,package:{amount:1,taxSlabs:{tax:1,regime:1,type:1}}
            },
            salaryComponents: {
                type:1,name:1,payType:1,calculationType:1,payAmount:1,status:1,show_on_payslip:1,isTaxable:1,fractionOf:{
                    type:1,name:1,payType:1,calculationType:1,payAmount:1,status:1
                }
            }
          }
        },
      ]);
      
  const arr=[];
 const allPromise =  employee.map(async (data)=>{
    if(!data?.employee?.package){
      return;
    }
    var attendence = await employeeAtt.findOne({companyEmployeId:new ObjectId(data?._id),monthString:start
    })
    if(!attendence){
      return
    }
    
    let taxableAmount = 0;
    const obj ={};
    var deduction = 0 ;
    obj.taxAmount=0;
    const amount = data?.employee?.package?.amount/12
    obj.name = data?.employee?.firstName +' '+  data?.employee?.lastName;
    obj.employee_id = data?._id;
    obj.userRefAccount =userRef;
    obj.monthString = start
    obj.email=data?.employee?.email;
    obj.designation = data?.employee?.designation;
    obj.taxPercent = 0;
    obj.full_day_working_hrs = +data?.employee?.full_day_working_hrs || 9;
    obj.overtime = data?.employee.overtime?data?.employee?.overtime:0
    let overtimeAmount = amount * obj.overtime * configuration?.overtimeScale  /(obj.full_day_working_hrs*30) || 0 
    obj.overtimeAmount = +overtimeAmount.toFixed(2);

    if(data?.employee?.package?.taxSlabs.length!==0){
      obj.taxPercent = data?.employee?.package?.taxSlabs[0]?.tax ||0
  }
      obj.metaData = {data:data?.salaryComponents};
    if(data?.salaryComponents.length!==0){
      data?.salaryComponents.map((d)=>{
        if(d.payType==='fixed pay' && d.type==='deduction'){
          let ded1=0;
          let basic = 0 ;
            if (d.fractionOf.length!==0){
                basic = d.fractionOf[0]?.calculationType==='percentage'?d.fractionOf[0].payAmount * 0.01 * amount:d.fractionOf[0].payAmount;
                if(d.calculationType==='percentage'){
                  ded1+= 0.01 *basic * (d.overrridedAmount?d.overrridedAmount:d.payAmount) ;
                }
              }
              else{
                ded1+= d.calculationType==='percentage'?amount *0.01* d.overrridedAmount?d.overrridedAmount:d.payAmount:d.overrridedAmount?d.overrridedAmount:d.payAmount;
              }
              deduction+= ded1;
              if(d.isTaxable){
                taxableAmount+=ded1;
              }
        }
        })
    }
   
    let effectiveWorkingDates = attendence?.effectiveWorkingDates || 0;
    deduction += (amount - (amount *effectiveWorkingDates )/30) || 0
    obj.deduction = +Number(deduction || 0 ).toFixed(2);
    obj.taxableAmount = taxableAmount;
    let taxPercent = data?.employee?.package?.taxSlabs[0]?.tax
    obj.taxAmount=taxableAmount * 0.01 * taxPercent || 0 ;
    obj.payableDays =  attendence.effectiveWorkingDates || 0; 
    obj.amount = +(amount || 0 ).toFixed(2)
    obj.totalAmount = Number((obj.amount - obj.deduction - obj.taxAmount + obj.overtimeAmount ) || 0 )
    ProcessPayroll.create(obj);
    arr.push(obj);
    return obj;

})
const resp = await Promise.all(allPromise)
  return {message:"payroll processed Successfully",status:200};
};

module.exports = getEmployeeAndAttendencenonHrms;
