import { generateOtp } from "../Controller/ControllerHelper/otpGeneration.js";
import { getUser } from "../Repository/authRepository.js";
import {
  addOtp,
  getUserInOtpTable,
  updateOtpStatus,
} from "../Repository/generateOtp.js";
import { sendMail } from "./sendMail.js";

export const generateOtpForUserRegistration = async (userEmail) => {
  const otp = generateOtp();
  const status = "valid";

  const checkRegisteredUser = await getUser(userEmail);

  if (checkRegisteredUser) {
    return {
      success: false,
      status: 409,
      message: "user already exist",
    };
  }

  const checkUserOnOtpTable = await getUserInOtpTable(userEmail);
  if (checkUserOnOtpTable) {
    await updateOtpStatus(userEmail);
  }

  const generatedNewValidOtp = await addOtp(otp, userEmail, status);
  if (generatedNewValidOtp === false) {
    return {
      success: false,
      status: 400,
      message: "Error in generating otp",
    };
  }

  const subject = "Otp for user registration";

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

  sendMail(userEmail, subject, message);
  return {
    success: true,
    status: 200,
    message: "Otp successfully send to email",
  };
};
