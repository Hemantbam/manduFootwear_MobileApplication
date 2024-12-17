import {
  addOrderDetails,
  checkOrderStatus,
  checkValidOrderIdInTable,
  decreaseShoeSizeStock,
  findShoeSizeId,
  findShoeSizeStock,
  cancelledOrdersFromDb,
  completedOrdersFromDb,
  pendingOrdersFromDb,
  shippedOrdersFromDb,
  increaseShoeSizeStock,
  manageDeliveredState,
  orderCancelledStatusUpdate,
  orderItemsDetails,
} from "../Repository/orderRepository.js";
import {
  orderDetailInputValidation,
  orderShoesSchema,
} from "../../validation/orderInputValidation.js";

export const addNewShoeOrderToDb = async (orderDetails, orderShoes) => {
  try {
    await orderDetailInputValidation.validateAsync(orderDetails);
    await orderShoesSchema.validateAsync(orderShoes);
    for (const shoe of orderShoes) {
      const shoeSizeId = await findShoeSizeId(shoe.shoeId, shoe.size);
      if (!shoeSizeId) {
        return {
          success: false,
          status: 404,
          message: `Shoe size ${shoe.size} is not available currently`,
        };
      }
      const shoeSizeStock = await findShoeSizeStock(shoeSizeId);
      if (shoeSizeStock < shoe.quantity) {
        return {
          success: false,
          status: 400,
          message: `Insufficient stock for Shoe ID ${shoe.shoeId} (Size: ${shoe.size}). Requested quantity exceeds available stock.`,
        };
      }
      const manageShoeStock = await decreaseShoeSizeStock(
        shoe.quantity,
        shoeSizeId
      );
      if (!manageShoeStock) {
        return {
          success: false,
          status: 400,
          message: `Failed to update stock for Shoe ID ${shoe.shoeId} (Size: ${shoe.size}). Please try again.`,
        };
      }
    }
    const addNewOrder = await addOrderDetails(orderDetails, orderShoes);
    if (!addNewOrder) {
      return {
        success: false,
        status: 400,
        message: "Unable to place a new order. please try again",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Order placed successfully",
    };
  } catch (error) {
    if (error.isJoi) {
      return {
        success: false,
        status: 400,
        message: error.details.map((detail) => detail.message).join(", "),
      };
    }
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal server error",
    };
  }
};



export const allShippedOrderDetails = async () => {
  try {
    const result = await shippedOrdersFromDb();
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

export const allPendingOrderDetails = async () => {
  try {
    const result = await pendingOrdersFromDb();
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

export const allCompletedOrderDetails = async () => {
  try {
    const result = await completedOrdersFromDb();
    console.log(result);
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

export const allCancelledOrderDetails = async () => {
  try {
    const result = await cancelledOrdersFromDb();
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

export const manageOrderDeliveredState = async (orderId) => {
  try {
    const checkOrderId = await checkValidOrderIdInTable(orderId);
    if (!checkOrderId) {
      return {
        success: false,
        status: 404,
        message: `Order details with order id ${orderId} not found`,
      };
    }
    const result = await manageDeliveredState(orderId);
    if (result) {
      return {
        success: true,
        status: 200,
        message: "Updated the order as delivered",
      };
    }
    return {
      success: false,
      success: 400,
      message: "Error in updating the delivered state of the order",
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

export const manageOrderCancelState = async (orderId) => {
  try {
    const orderDetails = await checkOrderStatus(orderId);
    console.log(orderDetails);
    if (!orderDetails) {
      return {
        success: false,
        status: 404,
        message: "Order details  not found",
      };
    }
    if (orderDetails === "Shipped" || orderDetails === "Cancelled") {
      return {
        success: false,
        status: 400,
        message: `Unable to cancel the order. The order is already ${orderDetails}`,
      };
    }
    const orderItems = await orderItemsDetails(orderId);
    if (!orderItems) {
      return {
        success: false,
        status: 404,
        message: "No order Items found",
      };
    }

    for (const orderItem of orderItems) {
      const shoeId = orderItem.shoeId;
      const shoeSize = orderItem.size;
      const quantity = orderItem.quantity;
      const shoeSizeId = await findShoeSizeId(shoeId, shoeSize);
      console.log(shoeSizeId);
      if (!shoeSizeId) {
        return {
          success: false,
          status: 404,
          message: "No shoe size id found",
        };
      }
      const updateShoeSizeStock = await increaseShoeSizeStock(
        shoeSizeId,
        quantity
      );
      if (!updateShoeSizeStock) {
        return {
          success: false,
          status: 400,
          message: "Unable to update the shoe stock currently",
        };
      }
    }
    const updateOrderStatus = await orderCancelledStatusUpdate(orderId);
    if (!updateOrderStatus) {
      return {
        success: false,
        status: 400,
        message: "Unable to update the order cancellation status",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Order cancelled successfully",
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
