const Joi = require('joi');

// Joi schema for creating attendance
const createAttendanceSchema = Joi.object({
  userRefAccount: Joi.string().optional(),
  company_id: Joi.string().optional(),
  employee_id: Joi.string().optional(),
  companyEmployeId: Joi.string().optional(),
  isPaidLeave: Joi.boolean().default(false),
  date: Joi.date().required(),
  status: Joi.string().valid('present', 'absent', 'leave',"half day","late comming","early going").default('absent'),
  metaData: Joi.object().default({})
});

// Joi schema for updating attendance
const updateAttendanceSchema = Joi.object({
  userRefAccount: Joi.string(),
  company_id: Joi.string(),
  employee_id: Joi.string(),
  companyEmployeId: Joi.string(),
  isPaidLeave: Joi.boolean(),
  date: Joi.date(),
  status: Joi.string().valid('present', 'absent', 'leave', "half day","late comming","early going"),
  metaData: Joi.object()
});

module.exports = {
  createAttendanceSchema,
  updateAttendanceSchema
};
