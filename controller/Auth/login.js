const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const { api_secret } = require("../../config/keys");
const logger = require('../../config/logger')
const generateToken = require('../../helper/generateToken')
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create an access token with the user's ID as the payload
    const accessToken =await  generateToken(user,api_secret);
      logger.info(` user ${user._id} logged in successfully ${new Date()}`);
    res.status(200).json({ message: "success", accessToken });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = login;
