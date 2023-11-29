
const router = require("express").Router();
const JwtValidation = require('../../../../../middlewares/JwtValidation')
const getPayrolConfigs = require('../../../../../controller/payrolReports/generatePayrolReport');
const generatePayrolReportOverall = require('../../../../../controller/payrolReports/generatePayrolReportOverall');
const getPayrolData = require('../../../../../controller/payrolReports/getPayrolReportData');
const getProcessedPayrols = require('../../../../../controller/ProcessedPayrols/getProcessedPayrols');



router.get('/',JwtValidation,generatePayrolReportOverall);
router.get('/generate',JwtValidation,getPayrolData);
router.get('/data',JwtValidation,getProcessedPayrols);
router.get('/slip',JwtValidation,getPayrolConfigs);



module.exports = router;
