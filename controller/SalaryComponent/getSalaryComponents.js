const SalaryComponent = require("../../models/SalaryComponent");
const {ObjectId} = require("mongoose").Types
const getPlans = async (req, res) => {
  let start = req.query.start || 0;
  let limit = req.query.limit || 10;
  const filter={};
  filter.userRefAccount=new ObjectId(req.user.userId);
   filter.status = req.query.status || "active"
   if(req.query.search){
    filter.$or = [];
    filter.$or.push({ name: { $regex: req.query.search, $options: 'i' } });
    filter.$or.push({ code: { $regex: req.query.search, $options: 'i' } });
   }  
  try {
    const data = await SalaryComponent.aggregate([
      {$match: filter},
      {
        $lookup: {
          from: "salaryComponent", // The collection name for SalaryComponent
          localField: "fractionOf",
          foreignField: "_id",
          as: "fractionOf",
        },
      },
      {$unwind:{path:"$fractionOf",preserveNullAndEmptyArrays: true}},
      // {
      //   $lookup: {
      //     from: "salaryComponent", // The collection name for SalaryComponent
      //     localField: "fractionOf.fractionOf",
      //     foreignField: "_id",
      //     as: "fractionOf.fractionOf",
      //   },
      // },
      // {$unwind:{path:"$fractionOf.fractionOf",preserveNullAndEmptyArrays: true}},
      {
        $project:{
          _id:1,
          type:1,
          name:1,
          code:1,
          payType:1,
          isTaxable:1,
          ledger:1,
          calculationType:1,
          payAmount:1,
          show_on_payslip:1,
          fractionOf:1,
          // fractionOf:{
          //   $cond: [
          //     { $ifNull: ["$fractionOf", false] },
          //     {
          //       _id: "$fractionOf._id",
          //       name: "$fractionOf.name",
          //       code: "$fractionOf.code",
          //       payAmount: "$fractionOf.payAmount"
          //     },
          //     {name:"Annual CTC"}
          //   ]
          // }
        }
      }
      
    ])
    // const plans = await SalaryComponent.find(filter)
    //   .skip(start)
    //   .limit(limit);
    const totalCount = await SalaryComponent.countDocuments(filter);
    res.status(200).json({ totalCount, start, limit, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = getPlans;
