const Joi = require('joi');
const userJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    role: Joi.string().valid('user', 'admin').default('user'),
    address: Joi.string().trim().optional().allow(''),
    companyId: Joi.number().required(),
    password: Joi.string().required(),
    companyStregnth:Joi.number().optional(),
    planId:Joi.string().required(),
    metaData: Joi.object().optional(),
    ourHrmsFlag:Joi.boolean().optional()
  });
const userUpdateJoiSchema = Joi.object({
    name: Joi.string().optional(),
    phone: Joi.string().optional(),
    role: Joi.string().valid('user', 'admin'),
    address: Joi.string().trim().optional(),
    companyId: Joi.number().optional(),
    password: Joi.string().optional(),
    password: Joi.string().optional(),
    companyStregnth:Joi.number().optional(),
    planId:Joi.string().optional(),
    metaData: Joi.object().optional()
  });

  module.exports = {userJoiSchema,userUpdateJoiSchema};
