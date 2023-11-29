const Joi = require('joi');

const slabsComponentSchema = Joi.object({
  financialYear: Joi.string().valid('2022-23', '2023-24', '2024-25').required(),
  companyId: Joi.number().optional(),
  userRefAccount: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'all').required(),
  citizenType: Joi.string().valid('senior', 'general').required(),
  slabMinAmount: Joi.number().default(0),
  slabMaxAmount: Joi.number().default(0),
  taxRate: Joi.number().default(0),
  surCharge: Joi.number().default(0),
  healthAndEdu: Joi.number().default(0),
  comments: Joi.string().optional(true).allow(''),
  status: Joi.string().valid('active', 'inactive').default('active'),
})
const UpdateSlabsComponentSchema = Joi.object({
  financialYear: Joi.string().valid('2022-23', '2023-24', '2024-25').optional(),
  companyId: Joi.number().optional(),
  userRefAccount: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'all').optional(),
  citizenType: Joi.string().valid('senior', 'general').optional(),
  slabMinAmount: Joi.number().default(0),
  slabMaxAmount: Joi.number().default(0),
  taxRate: Joi.number().default(0),
  surCharge: Joi.number().default(0),
  healthAndEdu: Joi.number().default(0),
  comments: Joi.string().optional(true).allow(''),
  status: Joi.string().valid('active', 'inactive').default('active'),
})

module.exports = {slabsComponentSchema,UpdateSlabsComponentSchema};
