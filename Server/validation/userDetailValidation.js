import Joi from "joi";

export const userValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "Username must be a string.",
    "string.min": "Username should have at least 3 characters.",
    "string.max": "Username should not exceed 30 characters.",
    "any.required": "Username is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),

  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10}$/) 
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be 10 digits.",
      "any.required": "Mobile number is required.",
    }),

  gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.only": "Gender must be one of 'Male', 'Female', or 'Other'.",
    "any.required": "Gender is required.",
  }),

  occupation: Joi.string().trim().min(3).required().messages({
    "string.min": "Occupation should have at least 3 characters.",
    "any.required": "Occupation is required.",
  }),

  address: Joi.string().trim().min(5).required().messages({
    "string.min": "Address should have at least 5 characters.",
    "any.required": "Address is required.",
  }),

  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.min": "Password should have at least 8 characters.",
      "string.pattern.base":
        "Password must include at least one uppercase, one lowercase, one digit, and one special character.",
      "any.required": "Password is required.",
    }),
});

export const userLoginInputValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
});
