const Employee = require('../../models/CompanyEmployees');

const checkEmailDuplicate = async (req,res,next)=>{
    const checkEmail = await Employee.findOne({ email: req.query.email});
    if(checkEmail){
    res.status(400).json({message:"email already in use"}); 
    }
    else{
        res.status(200).json({message:"email available"});
    } 
}
module.exports =checkEmailDuplicate;