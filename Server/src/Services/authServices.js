import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRegister } from "../Repository/authRepository.js";
import { getUser } from "../Repository/authRepository.js";
import { userValidationSchema } from "../../validation/userDetailValidation.js";

const key = "keyForFootwearMobileApplication986421@#$*_";

export const registerUser = async (userDetails) => {
  const checkExitingUser = await getUser(userDetails.email);
  if (checkExitingUser) {
    return {
      status: 409,
      message: "User with a same email already existed",
      success: false,
    };
  }
  try {
    const inputValidate = await userValidationSchema.validateAsync(userDetails);
    const encodedPassword = await bcrypt.hash(userDetails.password, 10);

    const newUserData = {
      username: inputValidate.username,
      email: inputValidate.email,
      mobileNumber: inputValidate.mobileNumber,
      gender: inputValidate.gender,
      occupation: inputValidate.occupation,
      address: inputValidate.address,
      password: encodedPassword,
    };

    const createUser = await userRegister(newUserData);
    if (createUser === true) {
      return {
        success: true,
        status: 200,
        message: "User created Successfully",
      };
    }
    return {
      success: false,
      status: 400,
      message: "Please enter the valid details",
    };
  } catch (error) {
    return {
      success: false,
      status: 400,
      message: error.message,
    };
  }
};

export const userLogin = async (email, password) => {
  const getUserDetails = await getUser(email);
  console.log( getUserDetails)
  console.log( password)
  if (getUserDetails) {
    const decodePassword = bcrypt.compare(password, getUserDetails.password);
    if (!decodePassword) {
      return {
        success: false,
        status: 400,
        message: "Password did not match",
      };
    }
    const token = jwt.sign(
      {
        id: getUserDetails.id,
        email: getUserDetails.email,
        userDetails: getUserDetails,
      },
      key,
      { expiresIn: "1hr" }
    );
    return {
      success: true,
      status: 200,
      message: "User authenticated successfully",
      token:token
    };
  }
  return {
    success: false,
    status: 404,
    message: "User not found",
  };
};
