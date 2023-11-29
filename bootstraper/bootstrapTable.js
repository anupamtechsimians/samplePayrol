const Plan = require("../models/Plans.model");
const User = require("../models/User.model");
const { ObjectId } = require("mongoose").Types;
const bootstrapData = async (req, res) => {
  try {
    const plans = [
      {
        _id: "64883e05a94acd61d9683cdf",
        name: "Free tier",
        price: 200,
        allowedUnits: 200,
        description: "get free payrol generation for 200 users",
        status: "active",
        created_at: "2023-06-13T09:59:33.928Z",
        updated_at: "2023-06-13T10:03:26.994Z",
        __v: 0,
      },
    ];

    const users = [
      {
        name: "techsimians",
        email: "admin@techsimians.com",
        phone: "7877889986",
        role: "admin",
        companyId: "1",
        address: "marol naka mumbai",
        password:
          "$2b$10$xVASqZ48EZJax1evXsUFD.Ebd.Y7hHHMwiK9cpV/TgFtVqeD2/2Xy", //admin 123
        companyStregnth: 50,
        planId: new ObjectId("64883e05a94acd61d9683cdf"),
        status: "pending",
        created_at: "2023-06-15T09:26:00.916Z",
        updated_at: "2023-06-15T09:26:00.916Z",
        __v: 0,
      },
    ];
    const planCount = await Plan.countDocuments()
    const userCount = await User.countDocuments()
    if(planCount===0){
        const plan = await Plan.insertMany(plans);
        console.log("plan inserted..");
    }
    if(userCount===0){
    const user = await User.insertMany(users);
    console.log("user inserted..");
    }
    console.log("bootstrapping done..");
    res.status(200).json({ message: "Bootstrapping done. You can start adding plans now" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = bootstrapData;
