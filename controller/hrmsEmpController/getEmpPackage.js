const HrmsEmpPackage = require("../../models/hrmsEmployeePackages");
const Package = require("../../models/SalaryPackage");
const { createEmpPackage,updateEmpPackage } = require("../../validations/hrmsEmpPackage");
const { ObjectId } = require("mongoose").Types;

const createHrmsEmpPackage = async (req, res)=> {
    const {userId} = req.query
    try {
    const filter = {}
    filter.userRefAccount = new ObjectId(req.user.userId)
    if(userId) {
        filter.employeeId = userId
    }
      const newResource = await HrmsEmpPackage.findOne(filter);
      
     if(!newResource) {
      return res.status(400).json({message:"package is not assigned for this employee"})
     }
     const getEmployeePackage = await Package.aggregate([
      {
        $match: {
          _id: newResource.packageId
        }
      },
      {
        $lookup: {
          from: "salaryComponent",
          localField: "salaryPackages.salaryComponent",
          foreignField: "_id",
          as: "salaryComponentLookup"
        }
      },
      {
        $addFields: {
          "salaryPackages": {
            $map: {
              input: "$salaryPackages",
              as: "salaryPackage",
              in: {
                $mergeObjects: [
                  "$$salaryPackage",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$salaryComponentLookup",
                          cond: { $eq: ["$$this._id", "$$salaryPackage.salaryComponent"] }
                        }
                      },
                      0
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "TaxSlabs",
          let: {
            amount: "$amount"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userRefAccount", newResource.userRefAccount] },
                    { $lte: ["$slabMinAmount", "$$amount"] },
                    { $gte: ["$slabMaxAmount", "$$amount"] }
                  ]
                }
              }
            }
          ],
          as: "taxSlabs"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          amount: 1,
          taxSlabs: 1,
          salaryPackages: 1
        }
      }
    ]);
    
      res.status(200).json(getEmployeePackage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = createHrmsEmpPackage;