const Joi = require('joi');

const createEmplAttendence = Joi.object({
  userRefAccount: Joi.string().optional(),
  company_id: Joi.string().optional(),
  employee_id: Joi.string().required(),
  companyEmployeId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  attendence: Joi.string().valid('monthly', 'daily', 'weekly', 'yearly').default('monthly'),
  status: Joi.string().valid('active', 'inactive').default('active'),
  totalPresentDates:Joi.number().required(),
  absentDates:Joi.number().required(),
  effectiveWorkingDates:Joi.number().required(),
  metaData: Joi.object().default({})
});
const updateEmplAttendence = Joi.object({
    userRefAccount: Joi.string().optional(),
    company_id: Joi.string().optional(),
    employee_id: Joi.string().optional(),
    companyEmployeId: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    attendence: Joi.string().valid('monthly', 'daily', 'weekly', 'yearly').default('monthly'),
    status: Joi.string().valid('active', 'inactive').default('active'),
    totalPresentDates:Joi.number().required(),
    absentDates:Joi.number().required(),
    effectiveWorkingDates:Joi.number().required(),
    metaData: Joi.object().default({})
  });
module.exports = {createEmplAttendence,updateEmplAttendence};