const TaxSlabs = require("../../models/TaxSlabs");
const {ObjectId} = require("mongoose").Types;
const getTaxSlabs = async (req,res)=>{
    const userRefId = req.user.userId;
    const start = req.query.start || 0;
    const limit = req.query.limit || 10;
    const {financialYear,amount,regime} = req.query
    const filter={}
    if(financialYear){
        filter.financialYear = financialYear
    }
    if(regime){
      filter.regime = regime
  }
    if(amount){
        filter.slabMinAmount={$lte: +amount}
        filter.slabMaxAmount={$gte: +amount}
    }
    try {
        const plans = await TaxSlabs.find(filter).skip(start).limit(limit);
        const totalCount = await TaxSlabs.countDocuments(filter);
        res.status(200).json({ start,limit,totalCount,plans });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
module.exports = getTaxSlabs;