const bcrypt = require("bcrypt");

const User = require('../../models/User.model');
const UserOtp = require('../../models/UserOtp')
const {sendEmail} = require('../../services/sendMail');

const forgotPassword = async(req,res)=>{
    try{
    const {email} = req.body;
    const user = await User.findOne({email});
    
    if(!user){
        return res.status(400).json({message:"User Not Found"});
    }
    //Generate Token and Save it to DB
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const userOtp = await UserOtp.findOne({email});
    if(!userOtp){
        await UserOtp.create({email,otp});
        sendEmail(email,'Otp for Password Reset',
        `<p>Dear ${user.name},<br>
        You have requested to reset your password for your account.<br>
         To proceed with the password reset, please use the following OTP (One-Time Password):${otp}</p>
        `)
    }
    else{
        userOtp.otp = otp;
        sendEmail(email,'Otp for Password Reset',
        `<p>Dear ${user.name},<br>
        You have requested to reset your password for your account.<br>
         To proceed with the password reset, please use the following OTP (One-Time Password):${otp}</p>
        `)
        userOtp.verified= false;
        await userOtp.save();
    }
    return res.status(200).json({message:"Otp sent on Your email."})
    
}catch(e){
    console.log(e);
    return res.status(500).json({message:"Internal Server Error",error:e.message})
}
}

const verifyOtp = async(req,res)=>{
    try{
    const {email,otp} = req.body;
    const userOtp = await UserOtp.findOne({email,otp,verified:false});
    if(!userOtp){
        return res.status(400).json({message:"Otp not matched"});
    }
    userOtp.verified= true
    await userOtp.save();
    return res.status(200).json({message:"Otp verified Successfully"})
    
}catch(e){
    console.log(e);
    return res.status(500).json({message:"Internal Server Error",error:e.message})
}
}
const resetPassword = async(req,res)=>{
    try{
    const {email,password} = req.body;
    const userOtp = await UserOtp.findOne({email,verified:true});
    if(!userOtp){
        return res.status(400).json({message:"Please Verify Your Otp and Try again"});
    }
    const user = await User.findOne({email});
    if(!user){
    return res.status(400).json({message:"User not Exist"});
    }else{
        
        user.password= await bcrypt.hash(password, 10);
        await user.save();
        await UserOtp.deleteMany({email});
    }
    return res.status(200).json({message:"Password Updated Successfully "})
    
}catch(e){
    console.log(e);
    return res.status(500).json({message:"Internal Server Error",error:e.message})
}
}

module.exports = {forgotPassword,verifyOtp,resetPassword}