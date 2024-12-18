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
  manageShippingState,
  manageOutForDeliveryState,
  userAllOrderDetailsById,
  orderDetailsByContactNumber,
  updateOrderDetailsById,
  userOrderDetailsByOrderId,
} from "../Repository/orderRepository.js";
import {
  orderDetailInputValidation,
  orderShoesSchema,
  orderUpdateValidation,
} from "../../validation/orderInputValidation.js";
import { contactNumberValidation } from "../../validation/inputValidation.js";
import { sendMail } from "./sendMail.js";
import { getUserById } from "../Repository/userRepository.js";
import { updateOrderMessage } from "../../emailTemplates/OrderEmail/orderUpdateEmailTemplate.js";
import { addNewOrderMessage } from "../../emailTemplates/OrderEmail/newOrderEmailTemplate.js";
import { orderOutForDeliveryMessage } from "../../emailTemplates/OrderEmail/orderOutForDeliveryTemplate.js";
import { orderDeliveredMessage } from "../../emailTemplates/OrderEmail/orderDeliveredEmailTemplate.js";
import { orderCancelledMessage } from "../../emailTemplates/OrderEmail/orderCancelledEmailTemplate.js";

export const addNewShoeOrderToDb = async (orderDetails, orderShoes) => {
  try {
    await orderDetailInputValidation.validateAsync(orderDetails);
    await orderShoesSchema.validateAsync(orderShoes);
    const userDetails = await getUserById(orderDetails.userId);
    if (!userDetails) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

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
    const latestOrderDetails = await checkValidOrderIdInTable(addNewOrder);
    const orderId = addNewOrder;
    const subject = "Order Placed successfully";
    const message = addNewOrderMessage(orderId, latestOrderDetails, orderShoes);
    sendMail(userDetails[0].email, subject, message);
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

export const manageOrderOutForDeliveryState = async (orderID) => {
  try {
    const checkValidOrder = await checkValidOrderIdInTable(orderID);
    if (!checkValidOrder) {
      return {
        success: false,
        status: 404,
        message: `Order details with order id ${orderID} not found`,
      };
    }
    const orderStatus = await checkOrderStatus(orderID);
    if (orderStatus != "Shipped") {
      return {
        success: false,
        status: 400,
        message: `Order is currently '${orderStatus}', not 'Shipped'.`,
      };
    }

    const updateState = await manageOutForDeliveryState(orderID);
    if (!updateState) {
      return {
        success: false,
        status: 400,
        message: "Error in updating the order state for out for delivery",
      };
    }
    const latestOrderState = await checkValidOrderIdInTable(orderID);
    const [userDetails] = await getUserById(checkValidOrder.userId);
    const subject = `${userDetails.username} your order is out for delivery`;
    const message = orderOutForDeliveryMessage(
      orderID,
      latestOrderState,
      userDetails.username
    );
    sendMail(userDetails.email, subject, message);
    return {
      success: true,
      status: 200,
      message: "The order has been sent out for the delivery",
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
    const checkOrderDetails = await checkValidOrderIdInTable(orderId);
    if (!checkOrderDetails) {
      return {
        success: false,
        status: 404,
        message: `Order details with order id ${orderId} not found`,
      };
    }
    const orderStatus = await checkOrderStatus(orderId);
    if (orderStatus === "Delivered") {
      return {
        success: false,
        status: 400,
        message: `Order is already delivered`,
      };
    }
    if (orderStatus !== "OutForDelivery") {
      return {
        success: false,
        status: 400,
        message: `Order is currently '${orderStatus}', not 'OutForDelivery'.`,
      };
    }
    const result = await manageDeliveredState(orderId);
    if (result) {
      const latestOrderStatus = await checkValidOrderIdInTable(orderId);
      const [userDetails] = await getUserById(checkOrderDetails.userId);
      const subject = `${userDetails.username} your order has been delivered`;
      const message = orderDeliveredMessage(
        orderId,
        latestOrderStatus,
        userDetails.username
      );
      sendMail(userDetails.email, subject, message);
      return {
        success: true,
        status: 200,
        message: "The Order has been delivered",
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

export const manageOrderShippedState = async (orderId) => {
  try {
    const checkOrderId = await checkValidOrderIdInTable(orderId);
    if (!checkOrderId) {
      return {
        success: false,
        status: 404,
        message: `Order details with order id ${orderId} not found`,
      };
    }

    const orderStatus = await checkOrderStatus(orderId);
    if (orderStatus != "Pending") {
      return {
        success: false,
        status: 400,
        message: `Order is currently '${orderStatus}', not 'Pending'.`,
      };
    }
    const result = await manageShippingState(orderId);
    if (result) {
      return {
        success: true,
        status: 200,
        message: "Updated the order as shipped",
      };
    }
    return {
      success: false,
      success: 400,
      message: "Error in updating the shipped state of the order",
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
    const checkOrderDetails = await checkValidOrderIdInTable(orderId);
    if (!checkOrderDetails) {
      return {
        success: false,
        status: 404,
        message: `Order details with order id ${orderId} not found`,
      };
    }
    const orderStatus = await checkOrderStatus(orderId);
    if (orderStatus === "Delivered" || orderStatus ==="Cancelled") {
      return {
        success: false,
        status: 400,
        message: `Unable to cancel the order. Order is already '${orderStatus}'.`,
      };
    }
    if (orderStatus != "Pending") {
      return {
        success: false,
        status: 400,
        message: `Order is currently '${orderStatus}', not 'Pending'.`,
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
    const latestOrderDetails= await checkValidOrderIdInTable(orderId)
    const userDetails = await getUserById(checkOrderDetails.userId);
    const subject = `${userDetails[0].username} your order has been cancelled`;
    const message = orderCancelledMessage(
      orderId,
      latestOrderDetails,
      userDetails[0].username
    );
    sendMail(userDetails[0].email, subject, message);
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

export const userOrderDetails = async (userId) => {
  try {
    const result = await userAllOrderDetailsById(userId);
    if (!result) {
      return {
        success: false,
        status: 404,
        message: "No previous order found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Data fetched of the user orders",
      details: result,
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

export const ordersByContactNumber = async (contactNumber) => {
  try {
    await contactNumberValidation.validateAsync(contactNumber);
    const result = await orderDetailsByContactNumber(contactNumber);
    if (!result) {
      return {
        success: false,
        status: 404,
        message: "No order found",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Data fetched of the order details",
      details: result,
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

export const updateOrderDetails = async (orderId, orderUpdateDetails) => {
  try {
    await orderUpdateValidation.validateAsync(orderUpdateDetails);
    const checkOrderDetails = await checkValidOrderIdInTable(orderId);
    if (!checkOrderDetails) {
      return {
        success: false,
        status: 404,
        message: `Order details with order id ${orderId} not found`,
      };
    }
    const result = await updateOrderDetailsById(orderId, orderUpdateDetails);
    if (!result) {
      return {
        success: false,
        status: 400,
        message: "Unable to update details",
      };
    }
    const orderDetails = await userOrderDetailsByOrderId(orderId);
    if (!orderDetails) {
      return {
        success: false,
        status: 404,
        message: "Order details not found",
      };
    }

    const userId = checkOrderDetails.userId;
    const userDetails = await getUserById(userId);
    const email = userDetails[0].email;

    const subject = "Update in order details";

    const message = updateOrderMessage(orderId, orderUpdateDetails);

    sendMail(email, subject, message);
    return {
      success: true,
      status: 200,
      message: "Order details updated successfully",
      details: result,
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
