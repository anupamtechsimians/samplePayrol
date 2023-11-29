const sequelize = require("../../../config/hrmsDb");
const Package = require("../../../models/hrmsEmployeePackages");
const NumberToWords = require("../../../helper/convertNumberToWords");
const { ObjectId } = require("mongoose").Types;
const TaxSlabs = require('../../../models/TaxSlabs')
const Conf = require('../../../models/PayrolConfig');
const ProcessPayroll = require('../../../models/ProcessPayroll');
const getEmployeeAndAttendence = async (data) => {
  try{
  let filter= '';
  if(data.start && data.limit){
    filter  = `limit ${data.start || 0},${data.limit || 100}`
  }
  let start = data.startDate.substring(0,7);
  const payrolProcessed = await ProcessPayroll.countDocuments({userRefAccount: new ObjectId(data.userRefAccount),monthString: start});
  if(payrolProcessed >0){
    return {message:"Payroll already processed For this Month",status:200}
  }
  const record = await sequelize.query(
    `SELECT CAST(e.id as CHAR) as employee_id,e.first_name as firstName,e.last_name as lastName,e.middle_name as middleName,
    e.emp_type,e.work_email as email,
    d.job_title as designation,s.full_day_working_hrs,
    COUNT(CASE WHEN ea.status = 'present' THEN 1 END)/2 AS present_count,
    COUNT(CASE WHEN ea.status = 'absent' THEN 1 END)/2 AS absent_count,
    count(DISTINCT el.total_leave_days) as leave_count,sum(ea.overtime) as overtime,
    count(h.holiday_date) as holiday_count,
    30- (COUNT(CASE WHEN ea.status = 'absent' THEN 1 END)/2 + COUNT(DISTINCT el.total_leave_days)) AS effective_date
    FROM employees e
    left join designation d on e.designation_id = d.id
    left join shift s on s.id = e.emp_shift
    left JOIN attendance ea ON e.id = ea.employee_id  and ea.attendence_date BETWEEN '${data.startDate}' AND '${data.endDate}'
    left join employee_leave el on el.emp_id = e.id and el.isApproved =1 and el.isUnpaidLeave=1 and el.to_date >= '${data.startDate}' AND el.from_date <= '${data.endDate}'
    left join holiday_employees he on he.employee_id = e.id 
    left join holiday h on h.id = he.holiday_id and h.holiday_date >='${data.startDate}'AND h.holiday_date <='${data.endDate}' where e.company_id = ${data.company_id}
    GROUP BY e.id ${filter}
    `,
    { type: sequelize.QueryTypes.SELECT }
  );
  const configuration  = await Conf.findOne({userRefAccount: new ObjectId(data.userRefAccount)});
  // console.log(configuration)
  const totalCount = await sequelize.query(
    `SELECT count(*) as count FROM employees e
    left join designation d on e.designation_id = d.id
    left JOIN attendance ea ON e.id = ea.employee_id  and ea.attendence_date BETWEEN '${data.startDate}' AND '${data.endDate}'
    left join employee_leave el on el.emp_id = e.id and el.isApproved =1 and el.to_date >= '${data.startDate}' AND el.from_date <= '${data.endDate}'
    left join holiday_employees he on he.employee_id = e.id 
    left join holiday h on h.id = he.holiday_id and h.holiday_date >='${data.startDate}'AND h.holiday_date <='${data.endDate}' where e.company_id = ${data.company_id}
    GROUP BY e.id `,
    { type: sequelize.QueryTypes.SELECT }
  );
 
  const allPromise = record.map(async(d)=>{
    const emp={};
    d.overtime=d.overtime?d.overtime:0
    emp.emp=d;
  const getEmployeePackage = await Package.aggregate([
    {
      $match: {
        userRefAccount: new ObjectId(data.userRefAccount),
        employeeId: d.employee_id
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
            employee:{employeeId:1,package:{amount:1,taxSlabs:{tax:1,regime:1,type:1}}},
            salaryComponents:{_id:1,overrridedAmount:1,type:1,name:1,payType:1,calculationType:1,payAmount:1,isTaxable:1,status:1,fractionOf:{
                _id:1,type:1,name:1,payType:1,calculationType:1,payAmount:1,status:1,fractionOf:1
            }}
        }
      }
      
  ]);
  emp.package=getEmployeePackage;
  return emp
})
const sample = await Promise.all(allPromise);
const excelRecords = [];
sample.map(async (record) =>{
    if(!record?.package[0]){
      return;
    }
    let taxableAmount = 0;
    const obj ={};
    var deduction = 0 ;
    obj.taxAmount=0;
    const amount = record?.package[0]?.employee?.package?.amount/12
    obj.name = record?.emp?.firstName +' '+  record?.emp?.middleName +' '+  record?.emp?.lastName;
    obj.employee_id = record?.emp?.employee_id;
    obj.userRefAccount = new ObjectId(data.userRefAccount);
    obj.monthString = start
    obj.email= record?.emp?.email;
    obj.designation = record?.emp?.designation;
    obj.taxPercent = 0;
    obj.full_day_working_hrs = +record?.emp?.full_day_working_hrs;
    obj.overtime = record?.emp?.overtime?record?.emp?.overtime:0
    let overtimeAmount = amount * obj.overtime * configuration?.overtimeScale  /(obj.full_day_working_hrs*30) || 0 
    obj.overtimeAmount = +overtimeAmount.toFixed(2);
    // if(record?.package[0]?.employee?.package?.taxSlabs.length!==0){
    //     obj.taxAmount = record?.package[0]?.employee?.package?.taxSlabs[0].tax*0.01*amount || 0 
    // }
    if(record?.package[0]?.employee?.package?.taxSlabs.length!==0){
      obj.taxPercent = record?.package[0]?.employee?.package?.taxSlabs[0].tax 
  }
      obj.metaData = {data:record?.package[0]?.salaryComponents};
    if(record?.package.length!==0){
        record?.package[0]?.salaryComponents.map((d)=>{
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
    deduction += (amount - (amount *record.emp.effective_date)/30)
    obj.deduction = +Number(deduction || 0 ).toFixed(2);
    obj.taxableAmount = taxableAmount;
    let taxPercent = record?.package[0]?.employee?.package?.taxSlabs[0]?.tax
    obj.taxAmount=taxableAmount * 0.01 * taxPercent || 0 
    obj.payableDays =  record.emp.pay!==0?30 - record.emp.absent_count: 0 
    obj.amount = +(amount || 0 ).toFixed(2)
    obj.totalAmount = Number((obj.amount - obj.deduction - obj.taxAmount + obj.overtimeAmount ) || 0 )
    ProcessPayroll.create(obj);
    excelRecords.push(obj)
}) 
    return {message:"payroll processed Successfully",status:200};
}catch(e){
  console.log('error',e);
  return {error:e.message,status:500}
}
};

module.exports = getEmployeeAndAttendence;
