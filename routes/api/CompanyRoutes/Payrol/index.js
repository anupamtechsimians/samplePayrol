
const router = require("express").Router();
const payrollConfigRoute = require('./Config/index')
const payrollRoute = require('./payrol/index')

router.use('/config',payrollConfigRoute)
router.use('/reports',payrollRoute)



module.exports = router;
