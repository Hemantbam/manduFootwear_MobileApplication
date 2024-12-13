import { addNewOrder } from "../Controller/orderController.js";
  import express from "express";
  const router = express.Router();
  
  router.post("/addNewOrder", addNewOrder);
  
  export const orderRoute = router;
  