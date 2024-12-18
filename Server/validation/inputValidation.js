import Joi from "joi";
export const contactNumberValidation = Joi.string()
  .pattern(/^[0-9]{10}$/)
  .required()
  .messages({
    "string.pattern.base": "Mobile number must be 10 digits.",
    "any.required": "Mobile number is required.",
  });
