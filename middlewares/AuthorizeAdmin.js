const User = require('../models/User.model');
const authorizeCreator = async (req, res, next) =>{
    try{  
   if(req.user.role==='admin'){
      next();
    } else {
      return res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }
}
catch(e){
    return res.status(500).json({"message":e.message})
}
  }

  module.exports=authorizeCreator
  