import Joi from "joi";

export const shoeDetailsValidationSchema = Joi.object({
  brandName: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(30)
    .messages({
      "string.base": "Brand name must be a string",
      "string.min": "Brand name must have a minimum of 3 characters",
      "string.max": "Brand name must not exceed 30 characters",
      "any.required": "Brand name is required",
    }),

  shoeName: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(30)
    .messages({
      "string.base": "Shoe name must be a string",
      "string.min": "Shoe name must have a minimum of 3 characters",
      "string.max": "Shoe name must not exceed 30 characters",
      "any.required": "Shoe name is required",
    }),

  gender: Joi.string()
    .valid("Male", "Female", "Unisex")
    .required()
    .messages({
      "any.only": "Gender must be one of 'Male', 'Female', or 'Unisex'.",
      "any.required": "Gender is required",
    }),

  price: Joi.number()
    .greater(0)
    .required()
    .messages({
      "number.base": "Price must be a valid number",
      "number.greater": "Price must be greater than 0",
      "any.required": "Price is required",
    }),

  description: Joi.string()
    .optional()
    .max(500)
    .messages({
      "string.base": "Description must be a string",
      "string.max": "Description must not exceed 500 characters",
    }),

  category: Joi.string()
    .optional()
    .max(50)
    .messages({
      "string.base": "Category must be a string",
      "string.max": "Category must not exceed 50 characters",
    }),

  material: Joi.string()
    .optional()
    .max(100)
    .messages({
      "string.base": "Material must be a string",
      "string.max": "Material must not exceed 100 characters",
    }),
});
