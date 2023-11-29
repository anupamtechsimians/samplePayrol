const TaxSlabs = require('../models/TaxSlabs')

const jsonData = require('../taxSlabs.json');
// console.log(jsonData)
const addSeed = async(req,res)=>{
    const count = await TaxSlabs.countDocuments();
    if(count > 0){
        return res.status(200).json({message:"data added successfully"})
    }
    await TaxSlabs.insertMany(jsonData);
    console.log("added data")
    return res.status(200).json({mssage:"data added successfully"})
}

module.exports = addSeed;