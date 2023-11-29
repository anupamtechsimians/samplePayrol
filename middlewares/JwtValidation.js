const jwt = require('jsonwebtoken')
const { api_secret } = require("../config/keys");
 const validateToken=async (req, res, next)=> {
  const accessToken = req.headers.access_token || req.query.token
  
  if (!accessToken) {
    return res.status(401).send({ error: 'Access token is missing' });
  }

  try {
    const decodedToken =   jwt.verify(accessToken, api_secret);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Access token is invalid' });
  }
}

module.exports = validateToken;
