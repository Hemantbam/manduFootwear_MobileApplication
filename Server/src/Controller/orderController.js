import { addOrderToDb, getCancelledOrderDetails, getCompletedOrderDetails, getPendingOrderDetails, getShippedOrderDetails } from "../Services/orderServices.js";

export const addNewOrder = async (req, res) => {
  const { orderDetails, orderShoes } = req.body;
  const result = await addOrderToDb(orderDetails, orderShoes);
  return res.status(result.status).json({ message: result.message });
};

export const getPendingOrders = async (req, res) => {
  const result = await getPendingOrderDetails();
  return res
    .status(result.status)
    .json({ message: result.message, pendingOrders: result.pendingOrders });
};

export const getShippedOrders = async (req, res) => {
  const result = await getShippedOrderDetails();
  return res
    .status(result.status)
    .json({ message: result.message, shippedOrders: result.pendingOrders });
};

export const getCompletedOrder = async (req, res) => {
  const result = await getCompletedOrderDetails();
  return res
    .status(result.status)
    .json({ message: result.message, completedOrders: result.pendingOrders });
};

export const getCancelledOrders = async (req, res) => {
  const result = await getCancelledOrderDetails();
  return res
    .status(result.status)
    .json({ message: result.message, cancelledOrders: result.pendingOrders });
};
