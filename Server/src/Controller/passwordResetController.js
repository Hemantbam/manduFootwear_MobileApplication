import {
  resetUserPassword,
  sendOtpMailForResetPassword,
} from "../Services/passwordResetServices.js";

export const sendOtpForResetpassword = async (req, res) => {
  const { email } = req.body;
  const result = await sendOtpMailForResetPassword(email);
  return res.status(result.status).json({ message: result.message });
};

export const updateUserPassword = async (req, res) => {
  const { email, password, otp } = req.body;
  const result = await resetUserPassword(email, password, otp);
  return res.status(result.status).json({ message: result.message });
};
