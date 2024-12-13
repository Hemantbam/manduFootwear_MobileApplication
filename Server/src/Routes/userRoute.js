import express from "express";
import {
  updateUserPassword,
  sendOtpForResetpassword,
} from "../Controller/passwordResetController.js";

const router = express.Router();

router.post("/sendOtpEmail", sendOtpForResetpassword);
router.put("/resetUserPassword", updateUserPassword);
export const userRoute = router;
