
const router = require("express").Router();
const companyEmployeeRoute = require ('../Employees/companyEmployee.route')

router.use('/',companyEmployeeRoute);



module.exports = router;
