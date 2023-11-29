
const router = require("express").Router();

// importing middlewares
const AuthorizeUser= require("../../../middlewares/AuthorizeUser");
const AuthorizeAdmin= require("../../../middlewares/AuthorizeAdmin");
const JwtValidation= require("../../../middlewares/JwtValidation");

// importing controllers
const addPlan = require("../../../controller/Plans/addPlan");
const getPlans = require("../../../controller/Plans/getPlans");
const updatePlan = require("../../../controller/Plans/updatePlan");
const getPlan = require("../../../controller/Plans/getPlan");
const deletePlan = require("../../../controller/Plans/deletePlan");
const patchPlan = require("../../../controller/Plans/patchPlan");

router.post('/',JwtValidation,AuthorizeAdmin,addPlan);
router.get('/', getPlans);
router.get('/:id', getPlan);
router.put('/:id',JwtValidation,AuthorizeAdmin, updatePlan);
router.delete('/:id',JwtValidation,AuthorizeAdmin, deletePlan);
router.patch('/:id',JwtValidation,AuthorizeAdmin, patchPlan);


module.exports = router;
