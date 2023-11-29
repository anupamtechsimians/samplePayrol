const Joi = require("joi");

// Joi validation schema for SalaryComponent subdocument
const SalaryComponentSchema = Joi.object({
  salaryComponent: Joi.string().optional(),
  overridedAmount: Joi.number().optional(),
  calculationTypeOverridden: Joi.boolean().optional(),
  calculationType: Joi.string().valid("flat amount", "percentage").optional(),
});

// Joi validation schema for SalaryPackage document
const SalaryPackageSchema = Joi.object({
  companyId: Joi.number().optional(),
  code: Joi.string().required(),
  salaryPackages: Joi.array().items(SalaryComponentSchema).optional(),
  year: Joi.date().optional(),
  amount: Joi.number().default(0),
  status: Joi.string().valid("active", "inactive").default("active"),
  name: Joi.string().required(),
});
const SalaryPackageUpdateSchema = Joi.object({
  companyId: Joi.number().optional(),
  code: Joi.string().optional(),
  salaryPackages: Joi.array().items(SalaryComponentSchema).optional(),
  year: Joi.date().optional(),
  amount: Joi.number().optional(),
  status: Joi.string().valid("active", "inactive").optional(),
  name: Joi.string().optional(),
});

// Validate function using Joi
const validateSalaryPackage = (salaryPackage) => {
  return SalaryPackageSchema.validate(salaryPackage);
};
const validateSalaryPackageUpdate = (salaryPackage) => {
  return SalaryPackageUpdateSchema.validate(salaryPackage);
};

module.exports = { validateSalaryPackage, validateSalaryPackageUpdate };
