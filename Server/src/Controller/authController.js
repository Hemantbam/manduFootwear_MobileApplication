import {
  generateOtpForRegistration,
  registerUser,
  userLogin,
} from "../Services/authServices.js";

export const createUser = async (req, res) => {
  const { userDetails, otp } = req.body;
  const result = await registerUser(userDetails, otp);
  return res.status(result.status).json({ message: result.message });
};

export const generateOtpForUserRegistration = async (req, res) => {
  const { userDetails } = req.body;
  const result = await generateOtpForRegistration(userDetails);
  return res.status(result.status).json({ message: result.message });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await userLogin(email, password);
  return res
    .status(result.status)
    .json({
      message: result.message,
      token: result.token,
      status: result.status,
    });
};
