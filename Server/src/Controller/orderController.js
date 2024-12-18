import {
  addNewShoeOrderToDb,
  allCancelledOrderDetails,
  allCompletedOrderDetails,
  allPendingOrderDetails,
  allShippedOrderDetails,
  manageOrderCancelState,
  manageOrderDeliveredState,
  manageOrderOutForDeliveryState,
  manageOrderShippedState,
  ordersByContactNumber,
  updateOrderDetails,
  userOrderDetails,
} from "../Services/orderServices.js";

export const addNewOrder = async (req, res) => {
  const { orderDetails, orderShoes } = req.body;
  const result = await addNewShoeOrderToDb(orderDetails, orderShoes);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const allPendingOrders = async (req, res) => {
  const result = await allPendingOrderDetails();
  return res.status(result.status).json({
    message: result.message,
    pendingOrders: result.pendingOrders,
    status: result.status,
  });
};

export const allShippedOrders = async (req, res) => {
  const result = await allShippedOrderDetails();
  return res.status(result.status).json({
    message: result.message,
    shippedOrders: result.shippedOrders,
    status: result.status,
  });
};

export const allCompletedOrder = async (req, res) => {
  const result = await allCompletedOrderDetails();
  return res.status(result.status).json({
    message: result.message,
    completedOrders: result.completedOrders,
    status: result.status,
  });
};

export const allCancelledOrders = async (req, res) => {
  const result = await allCancelledOrderDetails();
  return res.status(result.status).json({
    message: result.message,
    cancelledOrders: result.cancelledOrders,
    status: result.status,
  });
};

export const manageDeliveryOfOrder = async (req, res) => {
  const { id } = req.params;
  const result = await manageOrderDeliveredState(id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const manageShippingOfOrder = async (req, res) => {
  const { id } = req.params;
  const result = await manageOrderShippedState(id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const manageCancelOfOrder = async (req, res) => {
  const { id } = req.params;
  const result = await manageOrderCancelState(id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const manageOutForDeliveryOfOrder = async (req, res) => {
  const { id } = req.params;
  const result = await manageOrderOutForDeliveryState(id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};

export const userOrderDetailsById = async (req, res) => {
  const { id } = req.params;
  const result = await userOrderDetails(id);
  return res.status(result.status).json({ message: result.message, orders: result.details});
};

export const userOrderDetailsByContactNumber = async (req, res) => {
  const { contactNumber } = req.body;
  const result = await ordersByContactNumber(contactNumber);
  return res.status(result.status).json({ message: result.message, orders: result.details});
};

export const orderUpdateById = async (req, res) => {
  const { orderDetails } = req.body;
  const { id } = req.params;
  const result = await updateOrderDetails(id, orderDetails);
  return res.status(result.status).json({ message: result.message});
};