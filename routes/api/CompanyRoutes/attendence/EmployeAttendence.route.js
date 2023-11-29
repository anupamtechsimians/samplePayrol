
const router = require("express").Router();

// importing middlewares
const AuthorizeUser= require("../../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../../middlewares/JwtValidation");

// importing controllers
const addEmployeeAtt = require("../../../../controller/EmployeeAttendence/createEmployeeAttendence");
const updateEmployeeAtt = require("../../../../controller/EmployeeAttendence/updateEmployeAttendence");
const getEmployeeAttendences = require("../../../../controller/EmployeeAttendence/getEmployeeAttendences");
const getEmployeeAttendence = require("../../../../controller/EmployeeAttendence/getEmployeeAttendence");
const createEmployeeBulk = require("../../../../controller/EmployeeAttendence/bulkImportAttendence");
const downloadBulkAtt = require('../../../../controller/EmployeeAttendence/getBulkAttendenceSample');

router.get('/',JwtValidation,getEmployeeAttendences);
router.get('/bulk/download',downloadBulkAtt);
router.post('/',JwtValidation,addEmployeeAtt);
router.post('/bulk',JwtValidation,createEmployeeBulk);
router.put('/:id',JwtValidation,updateEmployeeAtt);
router.get('/:id',JwtValidation,getEmployeeAttendence);


module.exports = router;
