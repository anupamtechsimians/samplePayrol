const router = require("express").Router();
const authRoutes = require("./auth/Auth.route");
const planRoutes = require("./plans/Plan.route");
const salaryRoutes = require("./salaryRoutes/index");
const companyRoute = require("./CompanyRoutes")
// const {validateToken} =  require('../../middlewares/JwtValidation');

router.use("/auth", authRoutes);
router.use("/plans", planRoutes);
router.use("/salary", salaryRoutes);
router.use("/company", companyRoute);





module.exports = router;