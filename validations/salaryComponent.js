const Joi = require('joi');

const createModelValidation = Joi.object({
      type: Joi.string().valid('earning', 'deduction','reimbursement').required(),
      name: Joi.string().required(),
      code: Joi.string().required(),
      ledger: Joi.string().optional(),
      payType: Joi.string().valid('fixed pay', 'variable pay','').optional().allow(null),
      status: Joi.string().valid('active', 'inactive').optional(),
      calculationType: Joi.string().valid('flat amount', 'percentage').required(),
      payAmount: Joi.number().optional(),
      isTaxable:Joi.boolean().optional(),
      show_on_payslip: Joi.boolean().optional(),
      fractionOf: Joi.string().optional().allow(null),
});
const updateModelValidation = Joi.object({
      type: Joi.string().valid('earning', 'deduction','reimbursement').optional(),
      name: Joi.string().optional(),
      code: Joi.string().optional(),
      ledger: Joi.string().optional(),
      payType: Joi.string().valid('fixed pay', 'variable pay','').optional().allow(null),
      status: Joi.string().valid('active', 'inactive').optional,
      calculationType: Joi.string().valid('flat amount', 'percentage').optional(),
      payAmount: Joi.number().optional(),
      isTaxable:Joi.boolean().optional(),
      fractionOf: Joi.string().optional().allow(null),
      show_on_payslip: Joi.boolean().optional(),
});

module.exports = {createModelValidation,updateModelValidation};
