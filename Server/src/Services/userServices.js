import {
  addNewUser,
  getUserById,
  deleteUserById,
  editUserDetails,
  getUserByEmail,
} from "../Repository/userRepository";
import bcrypt from "bcryptjs";
import { userValidationSchema } from "../../validation/userDetailValidation";

export const addUser = async (userDetails, password) => {
  try {
    await userValidationSchema.validateAsync(userDetails);
    const checkUser = getUserByEmail(userDetails.email);
    if (checkUser) {
      return {
        success: false,
        status: 409,
        message: "User with a same email already existed",
      };
    }
    const encodedPassword = await bcrypt.hash(password, 10);
    const createUser = await addNewUser(userDetails, encodedPassword);
    if (createUser) {
      return {
        success: true,
        status: 200,
        message: "User created successfully",
      };
    }
    return {
      success: false,
      status: 400,
      message: "unable to create a user",
    };
  } catch (error) {
    if (error.isJoi) {
      return {
        success: false,
        status: 400,
        message: error.details.map((detail) => detail.message).join(", "),
      };
    }
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};
