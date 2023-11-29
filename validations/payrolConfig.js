const Joi = require('joi');

const payrolProcessSchema = Joi.object({
  startPeriod: Joi.string().optional().default('1st'),
  endPeriod: Joi.string().optional().default('last'),
  isPfValid: Joi.boolean().optional().default(false),
  isESICValid: Joi.boolean().optional().default(false),
  pfSalaryAmount: Joi.number().optional().default(0),
  epfCompanyContribution: Joi.number().optional().default(0),
  epfEmpContribution: Joi.number().optional().default(0),
  epfPensionFund: Joi.number().optional().default(0),
  minAmountForESIC: Joi.number().optional().default(0),
  maxAmountForESIC: Joi.number().optional().default(0),
  eSICCompanyContribution: Joi.number().optional().default(0),
  eSICEmpContribution: Joi.number().optional().default(0)
});

const calculationSchema = Joi.object({
  allowedDateForPayrol: Joi.number().optional().default(30),
  considerWorkingOnly: Joi.boolean().optional().default(false),
  considerPayrolMonth: Joi.boolean().optional().default(false),
  calSalaryForUnpaidDays: Joi.boolean().optional().default(false)
});

const configurationSchema = Joi.object({
  companyId: Joi.number().optional(),
  code: Joi.string().optional(),
  userRefAccount: Joi.string().optional(),
  calculations: calculationSchema,
  payrolProcess: payrolProcessSchema,
  taxDeduction:Joi.boolean().default(false),
  taxDeductionRegime:Joi.string().optional(),
  allowOvertime:Joi.boolean().default(false),
  overtimeScale:Joi.number(),
});


module.exports = configurationSchema;
