
const router = require("express").Router();
const JwtValidation = require('../../../../middlewares/JwtValidation');
const addTaxSlabs = require('../../../../controller/TaxSlabs/addTaxSlab');
const updateTaxSalbs = require('../../../../controller/TaxSlabs/updateTaxSlabs');
const getTaxSlabs = require('../../../../controller/TaxSlabs/getTaxSlabs');
const removeTaxSlabs = require('../../../../controller/TaxSlabs/removeTaxSlab');

// router.post('/',JwtValidation,addTaxSlabs);
// router.put('/:id',JwtValidation,updateTaxSalbs);
router.get('/',JwtValidation,getTaxSlabs);
// router.delete('/:id',JwtValidation,removeTaxSlabs);




module.exports = router;
