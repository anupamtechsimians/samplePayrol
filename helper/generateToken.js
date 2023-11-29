const jwt = require("jsonwebtoken");

const generateToken = async (user,api_secret)=>{
    const accessToken = jwt.sign(
        { userId: user._id,name:user.name, email: user.email,company_id: user.companyId,role:user.role,ourHrmsFlag:user.ourHrmsFlag},
        api_secret,{ expiresIn:'1d'}
      );
      return accessToken;
}
module.exports = generateToken;