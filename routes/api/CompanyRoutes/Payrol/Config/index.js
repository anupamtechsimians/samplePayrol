
const router = require("express").Router();
const JwtValidation = require('../../../../../middlewares/JwtValidation')
const createConfig = require('../../../../../controller/PayrolConfig/addPayrolConfig');
const updateConfig = require('../../../../../controller/PayrolConfig/updatePayrolConfig');
const getPayrolConfigs = require('../../../../../controller/PayrolConfig/getPayrolConfigs');
const getPayrolConfig = require('../../../../../controller/PayrolConfig/getPayrolConfig');
const removePayloadConfig = require('../../../../../controller/PayrolConfig/removePayrolConfig');

router.post('/',JwtValidation,createConfig);
router.put('/',JwtValidation,updateConfig);
router.put('/:id',JwtValidation,updateConfig);
// router.get('/',JwtValidation,getPayrolConfigs);
router.get('/',JwtValidation,getPayrolConfig);
router.delete('/:id',JwtValidation,removePayloadConfig);



module.exports = router;
