import Joi from "joi";

export const orderDetailInputValidation = Joi.object({
  userId: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "any.required": "User ID is required",
  }),

  address: Joi.string().trim().required().min(3).max(100).messages({
    "string.base": "Address name must be a string",
    "string.min": "Address name must have a minimum of 3 characters",
    "string.max": "Address name must not exceed 100 characters",
    "any.required": "Address name is required",
  }),

  contactNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be 10 digits.",
      "any.required": "Mobile number is required.",
    }),

  orderStatus: Joi.string()
    .valid("pending", "confirmed", "shipped", "delivered")
    .optional(),

  paymentStatus: Joi.string().valid("pending", "paid", "failed").optional(),

  paymentMode: Joi.string().valid("COD", "online", "credit").optional(),

  discount: Joi.number().optional(),

  totalPrice: Joi.number().positive().required().messages({
    "number.base": "Total price must be a number",
    "number.positive": "Total price must be a positive number",
    "any.required": "Total price is required",
  }),
});

export const orderShoesSchema = Joi.array()
  .items(
    Joi.object({
      shoeId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
          'number.base': 'Shoe ID must be a number.',
          'number.positive': 'Shoe ID must be a positive number.',
          'any.required': 'Shoe ID is required.',
        }),
      quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
          'number.base': 'Quantity must be a number.',
          'number.min': 'Quantity must be positive number with at least 1.',
          'any.required': 'Quantity is required.',
        }),
      size: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
          'number.base': 'Size must be a number.',
          'number.min': 'Size must be at least 1.',
          'any.required': 'Size is required.',
        }),
      unitPrice: Joi.number()
        .precision(2)
        .positive()
        .required()
        .messages({
          'number.base': 'Unit Price must be a number.',
          'number.positive': 'Unit Price must be a positive number.',
          'any.required': 'Unit Price is required.',
        }),
    })
  )
  .required()
  .messages({
    'array.base': 'Order Shoes must be an array.',
    'any.required': 'Order Shoes is required.',
  });
