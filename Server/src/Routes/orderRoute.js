import {
  addNewOrder,
  allCancelledOrders,
  allCompletedOrder,
  allPendingOrders,
  allShippedOrders,
  manageCancelOfOrder,
  manageDeliveryOfOrder,
} from "../Controller/orderController.js";
import express from "express";
import { isAdmin, verifyToken } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/addNewOrder", verifyToken, addNewOrder);
router.get("/allPendingOrders", verifyToken, isAdmin, allPendingOrders);
router.get("/allCancelledOrders", verifyToken, isAdmin, allCancelledOrders);
router.get("/allDeliveredOrders", verifyToken, isAdmin, allCompletedOrder);
router.get("/allShippedOrders", verifyToken, isAdmin, allShippedOrders);
router.post("/manageOrderDelivery/:id", verifyToken, manageDeliveryOfOrder);
router.post("/manageOrderCancel/:id", verifyToken, manageCancelOfOrder);

export const orderRoute = router;
