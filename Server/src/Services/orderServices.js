import {
  addNewOrderWithItems,
  getCancelledOrdersFromDb,
  getCompletedOrdersFromDb,
  getPendingOrdersFromDb,
  getShippedOrdersFromDb,
} from "../Repository/orderRepository.js";
import { orderDetailInputValidation } from "../../validation/orderInputValidation.js";

export const addOrderToDb = async (orderDetails, orderShoes) => {
  try {
    await orderDetailInputValidation.validateAsync(orderDetails);
    const result = await addNewOrderWithItems(orderDetails, orderShoes);
    if (result) {
      return {
        success: true,
        status: 200,
        message: "Order placed successfully",
      };
    }
    return {
      success: false,
      status: 400,
      message: "Error in placing an order",
    };
  } catch (error) {
    console.log(error);
    if (error.isJoi) {
      return {
        success: false,
        status: 400,
        message: error.details.map((detail) => detail.message).join(", "),
      };
    }
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};

export const getShippedOrderDetails = async () => {
  try {
    const result = await getShippedOrdersFromDb();
    if (!result) {
      return {
        success: false,
        status: 404,
        message: "No shipped orders found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Data fetched of shipped orders details ",
      shippedOrders: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};

export const getPendingOrderDetails = async () => {
  try {
    const result = await getPendingOrdersFromDb();
    if (!result) {
      return {
        success: false,
        status: 404,
        message: "No pending orders found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Data fetched of pending orders details ",
      pendingOrders: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};

export const getCompletedOrderDetails = async () => {
  try {
    const result = await getCompletedOrdersFromDb();
    if (!result) {
      return {
        success: false,
        status: 404,
        message: "No completed orders found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Data fetched of completed orders details ",
      completedOrders: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};

export const getCancelledOrderDetails = async () => {
  try {
    const result = await getCancelledOrdersFromDb();
    if (!result) {
      return {
        success: false,
        status: 404,
        message: "No cancelled orders found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Data fetched of cancelled orders details ",
      cancelledOrders: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};
