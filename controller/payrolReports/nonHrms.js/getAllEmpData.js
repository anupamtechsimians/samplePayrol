const Employee = require("../../../models/CompanyEmployees");
const { ObjectId } = require("mongoose").Types;
const NumberToWords = require("../../../helper/convertNumberToWords")

const getEmployeeAndAttendencenonHrms = async (data) => {
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
                amount: "$package.amount"
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
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
              from: "Attendence",
              let: {
                id: "$_id",
                startDate :"2023-06-01T00:00:00.000Z",
                endDate :"2024-07-30T00:00:00.000Z",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                    
                        { $eq: ["$companyEmployeId", "$$id"] },
                        { $gte: ["$date", "$$startDate"] },
                        { $lt: ["$date", "$$endDate"] },
                      ]
                    }
                  }
                }
              ],
              as: "attendence"
            }
          },
          {
            $addFields: {
              absentCount: { $size: "$attendence" }
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
                absentCount:1,
                title:1,middleName:1,firstName:1,lastName:1,designation:1,email:1,employee_id:1,package:{amount:1,taxSlabs:{taxRate:1,status:1,financialYear:1}}
            },
            salaryComponents: {
                type:1,name:1,payType:1,calculationType:1,payAmount:1,status:1,show_on_payslip:1,fractionOf:{
                    type:1,name:1,payType:1,calculationType:1,payAmount:1,status:1
                }
            }
          }
        }
      ]);
      
  const arr=[];
  
  employee.map(async (data)=>{
    // console.log(data)
    const obj={};
    obj.name = data.employee.firstName +' '+ data.employee.middleName +' '+ data.employee.lastName;
    obj.employee_id = data.employee.employee_id;
    obj.email= data.employee.email;
    obj.designation = data.employee.designation;
    obj.amount = data.employee.package.amount/12;
    if(data.employee.package.taxSlabs.length!==0){
        obj.taxAmount = data.employee.package.taxSlabs[0].taxRate*0.01*obj.amount
    }
    // obj.absentCount = data.employee.absentCount;
    const earning = 0;
    var deduction = 0;
    const rembersment = 0;
    data.salaryComponents.map(async (data1)=>{
        if(data1.type==='deduction'){
            if(data1.calculationType==='percentage'){
            if(data1.fractionOf.length===0){
                deduction += data1.payAmount* obj.amount*0.01;
            }
            else{
                if(data1.fractionOf[0].calculationType==='percentage'){
                    deduction += data1.fractionOf[0].payAmount*0.01*data1.amount
                }
                else{
                    deduction += data1.fractionOf[0].payAmount
                }
            }
        }
        else{
            deduction+=data1.payAmount;
        }
        }
       
    })
    obj.payableDays = 30 - data.employee.absentCount
    obj.deduction = deduction
    obj.totalAmount = obj.amount - deduction

    arr.push(obj);

})
// console.log(arr)
  return arr;
};

module.exports = getEmployeeAndAttendencenonHrms;
