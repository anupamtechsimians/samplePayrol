const SalaryPackage = require("../../models/SalaryPackage");
const ObjectId = require("mongoose").Types.ObjectId;
const getPlans = async (req, res) => {
  let start = req.query.start || 0;
  let limit = req.query.limit || 10;
  const status = req.query.status;
  const filter = { userRefAccount: new ObjectId(req.user.userId) };
  filter.status = "active";
  if (status) {
    filter.status = status;
  }
  if (req.query.search) {
    filter.$or = [];
    filter.$or.push({ name: { $regex: req.query.search, $options: "i" } });
    filter.$or.push({ code: { $regex: req.query.search, $options: "i" } });
  }
  try {
    const plans = await SalaryPackage.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "salaryComponent",
          localField: "salaryPackages.salaryComponent",
          foreignField: "_id",
          as: "salaryComponents",
        },
      },
      {
        $addFields: {
          "salaryComponents": {
            $map: {
              input: "$salaryComponents",
              as: "component",
              in: {
                $mergeObjects: [
                  "$$component",
                  {
                    "overridedAmount": {
                      $let: {
                        vars: {
                          matchedPackage: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$salaryPackages",
                                  cond: { $eq: ["$$this.salaryComponent", "$$component._id"] }
                                }
                              },
                              0
                            ]
                          }
                        },
                        in: "$$matchedPackage.overridedAmount"
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          code: 1,
          year: 1,
          amount: 1,
          status: 1,
          name: 1,
          companyId: 1,
          salaryComponents: {_id:1,type:1,name:1,code:1,ledger:1,payType:1,isTaxable:1,calculationType:1,fractionOf:1,
            payAmount:1,overridedAmount:1},
        },
      },
    ]);
    
    

    const totalCount = await SalaryPackage.countDocuments(filter);
    res.status(200).json({ totalCount, start, limit, plans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getPlans;
