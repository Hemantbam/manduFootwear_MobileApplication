import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRegister } from "../Repository/authRepository.js";
import { getUser } from "../Repository/authRepository.js";
import {
  userLoginInputValidation,
  userValidationSchema,
} from "../../validation/userDetailValidation.js";
import { generateOtpForUserRegistration } from "./sendOtpForRegistration.js";
import { verifyValidOtp } from "./verifyOtp.js";
import { updateOtpStatus } from "../Repository/generateOtp.js";

const key = "keyForFootwearMobileApplication986421@#$*_";

export const registerUser = async (userDetails, otp) => {
  console.log("asdsdsdds", userDetails, otp);
  try {
    const encodedPassword = await bcrypt.hash(userDetails.password, 10);
    const otpVerify = await verifyValidOtp(userDetails.email, otp);
    console.log(otpVerify);
    if (!otpVerify) {
      return {
        success: false,
        status: 400,
        message: "Invalid or expired Otp",
      };
    }

    const createUser = await userRegister(userDetails, encodedPassword);
    console.log(createUser);
    if (createUser === true) {
      return {
        success: true,
        status: 200,
        message: "User created Successfully",
      };
    }
    await updateOtpStatus(userDetails.email);
    return {
      success: false,
      status: 400,
      message: "Please enter the valid details",
    };
  } catch (error) {
    if (error.isJoi) {
      return {
        success: false,
        status: 422,
        message: error.details.map((detail) => detail.message).join(", "),
      };
    }

    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export const generateOtpForRegistration = async (userDetails) => {
  console.log(userDetails);
  let checkExitingUser = await getUser(userDetails.email);
  if (checkExitingUser) {
    return {
      status: 409,
      message: "User with a same email already existed",
      success: false,
    };
  }
  try {
    await userValidationSchema.validateAsync(userDetails);
    const userEmail = userDetails.email;
    const otpGeneration = await generateOtpForUserRegistration(userEmail);
    if (!otpGeneration) {
      return {
        success: false,
        status: 400,
        message: "Error in Otp generation.",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Otp sent successfully",
    };
  } catch (error) {
    if (error.isJoi) {
      return {
        success: false,
        status: 422,
        message: error.details.map((detail) => detail.message).join(", "),
      };
    }

    return {
      success: false,
      status: 500,
      message: error,
    };
  }
};

export const userLogin = async (email, password) => {
  const userDetails = {
    email: email,
    password: password,
  };
  try {
    await userLoginInputValidation.validateAsync(userDetails);
    const getUserDetails = await getUser(email);
    if (getUserDetails === false) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }
    const decodePassword = await bcrypt.compare(
      password,
      getUserDetails.password
    );
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
      token: token,
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
      message: "Internal Server Error",
    };
  }
};
