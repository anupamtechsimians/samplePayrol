
const router = require("express").Router();
const employeeRoute = require('./Employees/index')
const payrollRoute = require('./Payrol/index')
const taxSlabsRoute = require('./taxSlabs/index')

router.use('/employees',employeeRoute);
router.use('/payroll',payrollRoute)
router.use('/taxSlabs',taxSlabsRoute)



module.exports = router;
