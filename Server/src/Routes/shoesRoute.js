import { addShoes, deleteShoeById, getAllShoes, getShoeById, updateShoeById } from "../Controller/shoeController.js";
import { verifyToken, isAdmin } from "../Middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/addNewShoe", verifyToken, isAdmin, addShoes);
router.get("/getShoe/:id", verifyToken, getShoeById);
router.delete("/delShoe/:id", verifyToken, isAdmin, deleteShoeById);
router.put("/updateShoe/:id", verifyToken, isAdmin, updateShoeById);
router.get("/getAllShoes",verifyToken, getAllShoes)
export const shoesRoute = router;
