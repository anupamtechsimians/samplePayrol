const Joi = require('joi');

const createEmpPackage = Joi.object({
  userRefAccount: Joi.string().optional(),
  companyId: Joi.string().optional(),
  amount: Joi.number().optional(),
  employeeId: Joi.string().required(),
  packageId: Joi.string().required(),
  status: Joi.string().valid("active", "inactive").optional(),
});
const updateEmpPackage = Joi.object({
    userRefAccount: Joi.string().optional(),
    amount: Joi.number().optional(),
    companyId: Joi.string().optional(),
    employeeId: Joi.string().required(),
    packageId: Joi.string().required(),
    status: Joi.string().valid("active", "inactive").optional(),
  });
module.exports = {createEmpPackage,updateEmpPackage};