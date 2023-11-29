
const router = require("express").Router();

// importing middlewares
const AuthorizeUser= require("../../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../../middlewares/JwtValidation");

// importing controllers
const addEmployeeAtt = require("../../../../controller/Attendence/createEmployeeAttendence");
const updateEmployeeAtt = require("../../../../controller/Attendence/updateEmployeAttendence");
const getEmployeeAttendences = require("../../../../controller/Attendence/getEmployeeAttendences");
const getEmployeeAttendence = require("../../../../controller/Attendence/getEmployeeAttendence");
const createEmployeeBulk = require("../../../../controller/Attendence/bulkImportAttendence");
const createHrmsEmpPackage = require("../../../../controller/hrmsEmpController/addHrmsEmpPackage");
const updateHrmsEmpPackage = require("../../../../controller/hrmsEmpController/updateHrmsEmpPackage");
const getEmpPackage = require("../../../../controller/hrmsEmpController/getEmpPackage");


router.get('/',JwtValidation,getEmployeeAttendences);
router.post('/hrms',JwtValidation,createHrmsEmpPackage);
router.put('/hrms/:id',JwtValidation,updateHrmsEmpPackage);
router.get('/hrms',JwtValidation,getEmpPackage);
router.post('/:id',JwtValidation,addEmployeeAtt);
router.post('/bulk',JwtValidation,createEmployeeBulk);
router.put('/:id',JwtValidation,updateEmployeeAtt);
router.get('/:id',JwtValidation,getEmployeeAttendence);


module.exports = router;
