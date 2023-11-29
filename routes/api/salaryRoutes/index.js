const router = require("express").Router();
const salaryComponentRoutes = require("./SalaryComponent.route")
const salaryPackage = require("./SalaryPackage.route")

router.use('/components',salaryComponentRoutes)
router.use('/package',salaryPackage)
module.exports = router;