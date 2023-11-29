const Joi = require('joi');
const planCreateJoiSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    allowedUnits: Joi.number().required(),
    description: Joi.string().trim().optional(),
    media: Joi.string().optional(),
    status: Joi.string().valid('active','inactive').default('active'),
  });
const planUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    allowedUnits: Joi.number().optional(),
    description: Joi.string().trim().optional(),
    media: Joi.string().optional(),
    status: Joi.string().valid('active','inactive').default('active'),
  });
  module.exports = {planCreateJoiSchema,planUpdateSchema};
