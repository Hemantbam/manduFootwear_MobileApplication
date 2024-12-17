import {
  addNewShoeOrderToDb,
  allCancelledOrderDetails,
  allCompletedOrderDetails,
  allPendingOrderDetails,
  allShippedOrderDetails,
  manageOrderCancelState,
  manageOrderDeliveredState,
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
  return res
    .status(result.status)
    .json({
      message: result.message,
      pendingOrders: result.pendingOrders,
      status: result.status,
    });
};

export const allShippedOrders = async (req, res) => {
  const result = await allShippedOrderDetails();
  return res
    .status(result.status)
    .json({
      message: result.message,
      shippedOrders: result.shippedOrders,
      status: result.status,
    });
};

export const allCompletedOrder = async (req, res) => {
  const result = await allCompletedOrderDetails();
  return res
    .status(result.status)
    .json({
      message: result.message,
      completedOrders: result.completedOrders,
      status: result.status,
    });
};

export const allCancelledOrders = async (req, res) => {
  const result = await allCancelledOrderDetails();
  return res
    .status(result.status)
    .json({
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

export const manageCancelOfOrder = async (req, res) => {
  const { id } = req.params;
  const result = await manageOrderCancelState(id);
  return res
    .status(result.status)
    .json({ message: result.message, status: result.status });
};
