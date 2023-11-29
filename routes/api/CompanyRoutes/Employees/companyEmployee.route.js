
const router = require("express").Router();
const attendenceRoutes = require('../attendence/EmployeAttendence.route')

// importing middlewares
const AuthorizeUser= require("../../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../../middlewares/JwtValidation");

// importing controllers
const addEmployee = require("../../../../controller/CompanyEmployees/createEmployee");
const getEmployees = require("../../../../controller/CompanyEmployees/getAllEmployees");
const getEmployee = require("../../../../controller/CompanyEmployees/getEmploye");
const updateEmployee = require("../../../../controller/CompanyEmployees/updateEmployee");
const deleteEmployee = require("../../../../controller/CompanyEmployees/deleteEmployee");
const downloadSample = require("../../../../controller/CompanyEmployees/downloadSampleUpload");
const bulkImportEmployee = require("../../../../controller/CompanyEmployees/bulkImportEmployee");
const checkEmailDuplicate = require("../../../../controller/CompanyEmployees/checkEmailDuplicate");
const attendance = require("../attendence/Attendence.route");


router.use('/attendence2',JwtValidation,attendenceRoutes)
router.get('/sample/upload', downloadSample);
router.use('/attendence',JwtValidation,attendance)
router.use('/package',JwtValidation,attendance)
router.post('/',JwtValidation,addEmployee);
router.post('/bulk',JwtValidation,bulkImportEmployee);
router.get('/',JwtValidation, getEmployees);
router.get('/duplicate',JwtValidation, checkEmailDuplicate);
router.get('/:id',JwtValidation, getEmployee);
router.put('/:id',JwtValidation, updateEmployee);
router.delete('/:id',JwtValidation, deleteEmployee);


module.exports = router;
