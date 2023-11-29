const jwt = require("jsonwebtoken");
const Token = require("../../models/Tokens");
const generateToken = require("../../helper/generateToken");
const { api_secret } = require("../../config/keys");
const createNewToken = async (req, res) => {
  try {
    const { existingToken } = req.body;

    // Find the existing token in the database
    const existingTokenRecord = await Token.findOne({ token: existingToken });

    if (!existingTokenRecord) {
      return res.status(404).json({ message: "Existing token not found." });
    }

    // Generate a new token based on the existing token
    const decoded = jwt.decode(existingToken);
    const newToken = await generateToken(decoded, api_secret);

    // Save the new token in the database
    const tokenRecord = Token.findOneAndUpdate(
      { userId: decoded.userId },
      {
        token: newToken,
        userId: decoded.userId,
      },
      { new: true }
    );

    return res.status(200).json({ access_token: newToken });
  } catch (error) {
    console.error("Error creating new token:", error);
    return res.status(500).json({ message: "Failed to create new token." });
  }
};

module.exports = createNewToken;
