import { generateOtp } from "../Controller/ControllerHelper/otpGeneration.js";
import {
  addOtp,
  getUserInOtpTable,
  getValidOtp,
  updateOtpStatus,
} from "../Repository/generateOtp.js";
import { getUserByEmail, resetPassword } from "../Repository/userRepository.js";
import bcrypt from "bcryptjs";
import { sendMail } from "./sendMail.js";
import { verifyValidOtp } from "./verifyOtp.js";
import { userPasswordValidation } from "../../validation/userDetailValidation.js";

export const sendOtpMailForResetPassword = async (email) => {
  try {
    const checkUser = await getUserByEmail(email);
    if (!checkUser) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }
    const otp = generateOtp();
    const status = "valid";
    const checkUserOnOtpTable = await getUserInOtpTable(email);
    if (checkUserOnOtpTable) {
      await updateOtpStatus(email);
    }
    const registerOtp = await addOtp(otp, email, status);
    if (!registerOtp) {
      return {
        success: false,
        status: 400,
        message: "Unable to generate a otp. Try again",
      };
    }

    const subject = "Otp for password reset";

    const message = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h1 style="color: black;">Mandu Footwear</h1>
  
  <h3 style="color: black;">One Time Password (OTP)</h3>
  <p style="color: red;">Do not share the OTP with anyone.</p>
  <hr style="border: 1px solid #ccc;">
  <p style="font-size: 1.2rem; color: black;">Your OTP for user registration is valid for only 5 minutes.</p>
  <p style="font-weight: 800; font-size: 1.1rem;">Your OTP: <span style="color: #6a994e;">${otp}</span></p>
  </div>
  `;

    const sendMailToEmail = sendMail(email, subject, message);
    if (sendMailToEmail) {
      return {
        success: true,
        status: 200,
        message: "OTP sent sucessfully",
      };
    }

    return {
      success: false,
      status: 400,
      message: "Unable to send otp at the moment",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal Server error",
    };
  }
};

export const resetUserPassword = async (email, password, otp) => {
  try {
    await userPasswordValidation.validateAsync(password);

    const checkValidOtpOfUser = await getValidOtp(email);
    if (!checkValidOtpOfUser) {
      return {
        success: false,
        status: 404,
        message: "No valid otp found",
      };
    }
    const checkOtp = await verifyValidOtp(email, otp);
    if (!checkOtp) {
      return {
        success: false,
        status: 400,
        message: "Invalid or expired otp",
      };
    }
    const encodePassword = await bcrypt.hash(password, 10);
    const updatePassword = await resetPassword(email, encodePassword);
    if (updatePassword) {
      await updateOtpStatus(email);
      return {
        success: true,
        status: 200,
        message: "Password reset successfully",
      };
    }
    return {
      success: false,
      status: 400,
      message: "Unable to reset password",
    };
  } catch (error) {
    console.log(error);
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
