const Joi = require('joi');

const createUserSchema = Joi.object({
  title: Joi.string().optional(),
  firstName: Joi.string().optional(),
  middleName: Joi.string().optional().allow(''),
  lastName: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfJoining: Joi.date().optional(),
  designation: Joi.string().optional(),
  department: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  employee_id: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  salary: Joi.number().optional(),
  address: Joi.string().optional(),
  password: Joi.string().optional(),
  status: Joi.string().valid('active', 'inactive', 'pending').default('active'),
  role: Joi.string().optional().default('employee'),
  packageId: Joi.string().optional(),
  metaData: Joi.object().default({}),
  isFromBulk: Joi.boolean().default(false),
});
const updateUserSchema = Joi.object({
  title: Joi.string().optional(),
  firstName: Joi.string().optional(),
  middleName: Joi.string().optional().allow(''),
  lastName: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  dateOfJoining: Joi.date().optional(),
  designation: Joi.string().optional(),
  department: Joi.string().optional(),
  dateOfBirth: Joi.date().optional(),
  employee_id: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  salary: Joi.number().optional(),
  company_id: Joi.string().optional(),
  address: Joi.string().optional(),
  password: Joi.string().optional(),
  status: Joi.string().valid('active', 'inactive', 'pending').default('active'),
  role: Joi.string().optional().default('employee'),
  packageId: Joi.string().optional(),
  metaData: Joi.object().default({}),
  isFromBulk: Joi.boolean().default(false),
});

module.exports = {createUserSchema,updateUserSchema};
