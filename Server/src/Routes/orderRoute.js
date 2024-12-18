import {
  addNewOrder,
  allCancelledOrders,
  allCompletedOrder,
  allPendingOrders,
  allShippedOrders,
  manageCancelOfOrder,
  manageDeliveryOfOrder,
  manageOutForDeliveryOfOrder,
  manageShippingOfOrder,
  orderUpdateById,
  userOrderDetailsByContactNumber,
  userOrderDetailsById,
} from "../Controller/orderController.js";
import express from "express";
import { isAdmin, verifyToken } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/addNewOrder", verifyToken, addNewOrder);
router.get("/allPendingOrders", verifyToken, isAdmin, allPendingOrders);
router.get("/allCancelledOrders", verifyToken, isAdmin, allCancelledOrders);
router.get("/allDeliveredOrders", verifyToken, isAdmin, allCompletedOrder);
router.get("/allShippedOrders", verifyToken, isAdmin, allShippedOrders);
router.post("/manageOrderDelivery/:id", verifyToken, isAdmin, manageDeliveryOfOrder);
router.post("/manageOrderShipping/:id", verifyToken, isAdmin,manageShippingOfOrder);
router.post("/manageOrderOutForDelivery/:id", verifyToken, isAdmin,manageOutForDeliveryOfOrder);
router.post("/manageOrderCancel/:id", verifyToken, manageCancelOfOrder);
router.get("/orderDetails/:id", verifyToken,userOrderDetailsById );
router.get("/orderDetailsByContactNumber", verifyToken,userOrderDetailsByContactNumber );
router.put("/updateOrder/:id", verifyToken, isAdmin, orderUpdateById );


export const orderRoute = router;
