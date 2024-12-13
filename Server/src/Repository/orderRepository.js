import dbConn from "../../config/db/dbConn.js";

export const addNewOrderWithItems = async (orderDetails, orderShoes) => {
  const connection = await dbConn.getConnection();
  try {
    await connection.beginTransaction();

    const orderQuery =
      "Insert into orders(userId,address,contactNumber,orderStatus, paymentStatus,paymentMode,discount,totalPrice,orderTime) values(?,?,?,?,?,?,?,?,NOW())";
    const orderResult = await connection.query(orderQuery, [
      orderDetails.userId,
      orderDetails.address,
      orderDetails.contactNumber,
      orderDetails.orderStatus || "Pending",
      orderDetails.paymentStatus || "Pending",
      orderDetails.paymentMode || "COD",
      orderDetails.discount || 0.0,
      orderDetails.totalPrice,
    ]);

    const orderId = orderResult[0].insertId;

    const orderItemQuery =
      "Insert into orderItems (orderId,shoeId,quantity,size,unitPrice) values(?,?,?,?,?)";
    for (const shoe of orderShoes) {
      await connection.query(orderItemQuery, [
        orderId,
        shoe.shoeId,
        shoe.quantity,
        shoe.size,
        shoe.unitPrice,
      ]);
    }

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    console.error(`Transaction error: ${error.message}`);
    throw error;
  } finally {
    connection.release();
  }
};

export const manageShippingState = async (orderId) => {
  const query = "update orders set orderStatus='Shipped' where orderId=? ";
  const result = dbConn.query(query, orderId);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const manageDeliveredState = async (orderId) => {
  const query = "update orders set orderStatus='Delivered' where orderId=? ";
  const result = dbConn.query(query, orderId);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const manageCancelledState = async (orderId) => {
  const query = "update orders set orderStatus='Cancelled' where orderId=? ";
  const result = dbConn.query(query, orderId);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const getPendingOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Pending'";
  const result = dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const getShippedOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Shipped'";
  const result = dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const getCompletedOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Delivered'";
  const result = dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const getCancelledOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Cancelled'";
  const result = dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};
