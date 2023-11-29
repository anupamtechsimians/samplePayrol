
const router = require("express").Router();

// importing middlewares
const AuthorizeUser= require("../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../middlewares/JwtValidation");
const AuthorizeCreator= require("../../../middlewares/AuthorizeCreator");

// importing controllers
const createPackage = require("../../../controller/SalaryPackage/addPackageMaster");
const updatePackage = require("../../../controller/SalaryPackage/updatePackageMaster");
const get = require("../../../controller/SalaryPackage/getPackageMasters");
const getById = require("../../../controller/SalaryPackage/getPackageMaster");
const remove = require("../../../controller/SalaryPackage/removePackageMaster");


router.post('/',JwtValidation,createPackage);
router.put('/:id',JwtValidation,updatePackage);
router.get('',JwtValidation,get);
router.get('/:id',JwtValidation,getById);
router.delete('/:id',JwtValidation,remove);


module.exports = router;
