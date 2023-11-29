const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const { userUpdateJoiSchema } = require("../../validations/user");
const { ObjectId } = require("mongoose").Types;

const updateUser = async (req, res) => {
  try {
    const { name, phone, companyId, address, password,metaData } = req.body;

    // Validate the user data using the userJoiSchema
    const { error } = userUpdateJoiSchema.validate({
      name,
      phone,
      companyId,
      address,
      password,
      metaData
    });

    // Check for validation errors
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find the user by userId and update the details
    const user = await User.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      {
        name,
        phone,
        companyId,
        address,
        metaData,
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateUser;
