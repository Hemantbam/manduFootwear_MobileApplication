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
      shoeId: Joi.number().integer().positive().required().messages({
        "number.base": "Shoe ID must be a number.",
        "number.positive": "Shoe ID must be a positive number.",
        "any.required": "Shoe ID is required.",
      }),
      shoeName: Joi.string().trim().required().min(3).max(30).messages({
        "string.base": "Shoe name must be a string",
        "string.min": "Shoe name must have a minimum of 3 characters",
        "string.max": "Shoe name must not exceed 30 characters",
        "any.required": "Shoe name is required",
      }),
      quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number.",
        "number.min": "Quantity must be positive number with at least 1.",
        "any.required": "Quantity is required.",
      }),
      size: Joi.number().integer().min(1).required().messages({
        "number.base": "Size must be a number.",
        "number.min": "Size must be at least 1.",
        "any.required": "Size is required.",
      }),
      unitPrice: Joi.number().precision(2).positive().required().messages({
        "number.base": "Unit Price must be a number.",
        "number.positive": "Unit Price must be a positive number.",
        "any.required": "Unit Price is required.",
      }),
    })
  )
  .required()
  .messages({
    "array.base": "Order Shoes must be an array.",
    "any.required": "Order Shoes is required.",
  });

export const orderUpdateValidation = Joi.object({
  contactNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Contact number must be exactly 10 digits.",
      "any.required": "Contact number is required.",
    }),

  address: Joi.string().trim().min(3).max(100).required().messages({
    "string.base": "Address must be a string.",
    "string.min": "Address must have at least 3 characters.",
    "string.max": "Address must not exceed 100 characters.",
    "any.required": "Address is required.",
  }),

  orderStatus: Joi.string()
    .valid("Pending", "OutForDelivery", "Shipped", "Delivered", "Cancelled")
    .required()
    .messages({
      "any.only":
        "Order status must be one of: Pending, OutForDelivery, Shipped, Delivered, Cancelled.",
      "any.required": "Order status is required.",
    }),

  paymentStatus: Joi.string()
    .valid("Pending", "Paid", "Failed")
    .required()
    .messages({
      "any.only": "Payment status must be one of: Pending, Paid, Failed.",
      "any.required": "Payment status is required.",
    }),
});
