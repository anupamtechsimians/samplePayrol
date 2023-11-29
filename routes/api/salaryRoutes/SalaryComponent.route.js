
const router = require("express").Router();

// importing middlewares
const AuthorizeUser= require("../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../middlewares/JwtValidation");
const AuthorizeCreator= require("../../../middlewares/AuthorizeCreator");

// importing controllers
const createSalaryComp = require("../../../controller/SalaryComponent/createSalaryComponent");
const update = require("../../../controller/SalaryComponent/updateSalaryComponent");
const get = require("../../../controller/SalaryComponent/getSalaryComponents");
const getById = require("../../../controller/SalaryComponent/getSalaryCompById");
const remove = require("../../../controller/SalaryComponent/removeSalaryComponent");


router.post('/',JwtValidation,createSalaryComp);
router.put('/:id',JwtValidation,update);
router.get('/',JwtValidation,get);
router.get('/:id',JwtValidation,getById);
router.delete('/:id',JwtValidation,remove);


module.exports = router;
