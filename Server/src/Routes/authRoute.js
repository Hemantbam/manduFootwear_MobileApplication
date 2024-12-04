import {
  createUser,
  generateOtpForUserRegistration,
  loginUser,
} from "../Controller/authController.js";
import express from "express";
const router = express.Router();

router.post("/registerUser", createUser);
router.post("/userLogin", loginUser);
router.post("/generateOtp", generateOtpForUserRegistration);

export const authRoute = router;
