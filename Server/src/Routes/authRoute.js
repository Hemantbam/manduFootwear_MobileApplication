import { createUser, loginUser } from "../Controller/authController.js";
import express from "express";
const router = express.Router();

router.post("/registerUser",createUser)
router.post("/userLogin",loginUser)

export const authRoute = router;
