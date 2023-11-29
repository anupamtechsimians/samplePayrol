const sequelize = require("../../../config/hrmsDb");
const Package = require("../../../models/hrmsEmployeePackages");
const NumberToWords = require("../../../helper/convertNumberToWords");
const { ObjectId } = require("mongoose").Types;
const TaxSlabs = require('../../../models/TaxSlabs')
const getEmployeeAndAttendence = async (data) => {
  const record = await sequelize.query(
    `SELECT CAST(e.id as CHAR) as employee_id,e.first_name as firstName,e.last_name as lastName,e.middle_name as middleName,
    e.emp_type,e.work_email as email,
    d.job_title as designation,sum(ea.overtime) as overtime,
    COUNT(CASE WHEN ea.status = 'present' THEN 1 END)/2 AS present_count,
    COUNT(CASE WHEN ea.status = 'absent' THEN 1 END)/2 AS absent_count,
    count(DISTINCT el.total_leave_days) as leave_count,
    count(h.holiday_date) as holiday_count,
    30- (COUNT(CASE WHEN ea.status = 'absent' THEN 1 END)/2 + COUNT(DISTINCT el.total_leave_days)) AS effective_date
    FROM employees e
    left join designation d on e.designation_id = d.id
    left JOIN attendance ea ON e.id = ea.employee_id  and ea.attendence_date BETWEEN '${data.startDate}' AND '${data.endDate}'
    left join employee_leave el on el.emp_id = e.id and el.isApproved =1 and el.isUnpaidLeave=1 and el.to_date >= '${data.startDate}' AND el.from_date <= '${data.endDate}'
    left join holiday_employees he on he.employee_id = e.id 
    left join holiday h on h.id = he.holiday_id and h.holiday_date >='${data.startDate}'AND h.holiday_date <='${data.endDate}' where e.company_id = ${data.company_id}
    and e.id=${data.employee_id}
    GROUP BY e.id
    `,
    { type: sequelize.QueryTypes.SELECT }
  );

  const getEmployeePackage = await Package.aggregate([
    {
      $match: {
        userRefAccount: new ObjectId(data.userRefAccount),
        employeeId: data.employee_id,
      },
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
            amount: "$package.amount"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userRefAccount", new ObjectId(data.userRefAccount)] },
                    { $lte: ["$slabMinAmount", "$$amount"] },
                    { $gte: ["$slabMaxAmount", "$$amount"] }
                  ]
                }
              }
            }
          ],
          as: "package.taxSlabs"
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
      $addFields: {
        "package.salaryPackages.overrridedAmount": "$package.salaryPackages.overrridedAmount"  // Replace 1000 with the actual value you want to insert
      }
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
    },{
      $project:{
          employee:{employeeId:1,package:{amount:1,taxSlabs:{gender:1,citizenType:1,taxRate:1}}},
          salaryComponents:{_id:1,overrridedAmount:1,type:1,name:1,payType:1,calculationType:1,payAmount:1,status:1,fractionOf:{
              _id:1,type:1,name:1,payType:1,calculationType:1,payAmount:1,status:1,fractionOf:1
          }}
      }
    }
    
  ]);

  var amount = getEmployeePackage[0]?.employee.package?.amount / 12 || 0;
  var effamount = amount*(record[0]?.effective_date)/30 || 0
  const componentArray = [];
  var earning = 0;
  var deduction = 0;
  getEmployeePackage[0]?.salaryComponents.forEach(async (data) => {
    // console.log("======================",data)
    const obj = {};
    obj.name = data?.name;
    obj.type = data?.type;
    obj.payType = data?.payType;
    obj.overrridedAmount = data?.overrridedAmount;
    obj.payAmount1 = data?.payAmount;
    let basic = 0;
    let ded1 = 0;
    if(data.payType==='fixed pay') {
      if( data.fractionOf.length!==0){
        basic = data.fractionOf[0]?.calculationType==='percentage'?data.fractionOf[0].payAmount * 0.01 * effamount:data.fractionOf[0].payAmount;
        ded1+= 0.01 *basic * (data.overrridedAmount?data.overrridedAmount:data.payAmount) ;
      }
      else{
        ded1 += data.calculationType==='percentage'?0.01 *effamount*(data.overrridedAmount?data.overrridedAmount:data.payAmount):data.overrridedAmount?data.overrridedAmount:data.payAmount
      }
      deduction += data.type==='deduction'?ded1:0;
      if(data.type==='earning'){
        earning+=ded1;
      }
      obj.payAmount = ded1
    }
    componentArray.push(obj);
  });
  // console.log(componentArray)
 const taxSlabs =getEmployeePackage[0]?.employee?.package?.taxSlabs[0]
let tax = 0;

if(taxSlabs){
  componentArray.push({name:'Tax Deducted at Source (TDS)',payAmount:taxSlabs.taxRate*(amount/100),type:"Tax"});
  tax=taxSlabs.taxRate*(amount/100)
}

  componentArray.push({name:'LOP',payAmount:amount - effamount,type:"deduction"});
  deduction += (amount - effamount)

  var total = amount - deduction -tax;
  total = total.toFixed(2)
  gross = amount - earning
  const wordsTotal = NumberToWords(total);
  return {
    employee: record[0],
    attendence: record[0].absent_count || 0,
    comp: componentArray,
    total,
    wordsTotal,
    gross,    
    amount   // total salary
  };
};

module.exports = getEmployeeAndAttendence;
