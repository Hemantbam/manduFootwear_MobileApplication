import res from "express/lib/response.js";
import dbConn from "../../config/db/dbConn.js";

export const findShoeSizeId = async (shoeId, size) => {
  const query = "select * from shoesizes where shoeId=? and shoeSizes=?";

  const [result] = await dbConn.query(query, [shoeId, size]);
  if (result.length > 0) {
    return result[0].shoeSizeId;
  }
  return false;
};

export const findShoeSizeStock = async (shoeSizeId) => {
  const query = "select * from shoesizestock where shoeSizeId=?";
  const [result] = await dbConn.query(query, [shoeSizeId]);
  console.log(result);
  if (result.length > 0) {
    return result[0].stock;
  }
  return false;
};

export const checkValidOrderIdInTable = async (orderId) => {
  const query = "select * from orders where id=?";
  const result = await dbConn.query(query, [orderId]);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
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
  const query =
    "update orders set orderStatus='Delivered' and paymentStatus='paid' where id=? ";
  const result = await dbConn.query(query, [orderId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const manageCancelledState = async (orderId) => {
  const connection = await dbConn.getConnection();
  try {
    const query =
      "update orders set orderStatus='Cancelled', paymentStatus='failed' where id=? ";

    const checkUnshippedOrdersQuery = "select * from orders where id=?";
    const [checkOrderStatus] = await connection.query(
      checkUnshippedOrdersQuery,
      [orderId]
    );

    console.log(checkOrderStatus[0]);
    if (
      checkOrderStatus[0].orderStatus === "Shipped" ||
      checkOrderStatus[0].orderStatus === "Cancelled"
    ) {
      throw new Error(
        `Unable to cancel the order. The ${orderId} is already ${checkOrderStatus[0].orderStatus}`
      );
    }
    const result = await connection.query(query, orderId);
    if (result[0].affectedRows === 0) {
      throw new Error(`Unable to cancel the order of the order Id ${orderId}`);
    }

    const queryToGetOrderItems = "select * from orderitems where orderId=?";
    const orderItemsResult = await connection.query(queryToGetOrderItems, [
      orderId,
    ]);
    if (orderItemsResult[0].length === 0) {
      throw new Error(`No order details found for the order id ${orderId}`);
    }

    for (const orderItem of orderItemsResult[0]) {
      const shoeId = orderItem.shoeId;
      const shoeSize = orderItem.size;
      const quantity = orderItem.quantity;

      const getShoeSizeIdQuery =
        "select * from shoesizes where shoeId=? and shoeSizes=?";
      const [getShoeSizeResult] = await connection.query(getShoeSizeIdQuery, [
        shoeId,
        shoeSize,
      ]);
      if (getShoeSizeResult[0].length === 0) {
        throw new Error(
          `No shoe size details found for the shoe ID ${shoeId} and shoe size ${shoeSize}`
        );
      }
      const shoeSizeId = getShoeSizeResult[0].shoeSizeId;

      const manageShoeSizeStockQuery =
        "update shoesizestock set stock=stock+? where shoeSizeId=?";
      const manageShoeSizeStockResult = await connection.query(
        manageShoeSizeStockQuery,
        [quantity, shoeSizeId]
      );
      if (manageShoeSizeStockResult[0].affectedRows === 0) {
        throw new Error(
          `Unable to manage the stock of the shoe size id ${shoeSizeId}`
        );
      }
    }
    await connection.commit();
    return true;
  } catch (error) {
    console.log(error);
    await connection.rollback();
    console.log(`Transaction error ${error.message}`);
  } finally {
    connection.release();
  }
};

// add a new order
//------------------------------------------------------------------------------------

export const addOrderDetails = async (orderDetails, orderShoes) => {
  const connection = await dbConn.getConnection();
  try {
    await connection.beginTransaction();
    const query =
      "Insert into orders(userId,address,contactNumber,orderStatus, paymentStatus,paymentMode,discount,totalPrice,orderTime) values(?,?,?,?,?,?,?,?,NOW())";

    const result = await connection.query(query, [
      orderDetails.userId,
      orderDetails.address,
      orderDetails.contactNumber,
      orderDetails.orderStatus || "Pending",
      orderDetails.paymentStatus || "Pending",
      orderDetails.paymentMode || "COD",
      orderDetails.discount || 0.0,
      orderDetails.totalPrice,
    ]);

    console.log(result[0].affectedRows);

    if (result[0].affectedRows > 0) {
      const orderId = result[0].insertId;
      const orderItemQuery =
        "Insert into orderItems (orderId,shoeId,quantity,size,unitPrice) values(?,?,?,?,?)";
      for (const shoes of orderShoes) {
        const orderItemResult = await connection.query(orderItemQuery, [
          orderId,
          shoes.shoeId,
          shoes.quantity,
          shoes.size,
          shoes.unitPrice,
        ]);

        if (orderItemResult[0].affectedRows === 0) {
          throw new Error("Failed to insert order items");
        }
      }
    }
    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    console.log(error);
  } finally {
    await connection.release();
  }
};

export const decreaseShoeSizeStock = async (quantity, shoeSizeId) => {
  const query = "update shoesizestock set stock=stock-? where shoeSizeId=?";

  const result = await dbConn.query(query, [quantity, shoeSizeId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

//------------------------------------------------------------------------------------

// cancel the order
//------------------------------------------------------------------------------------

export const orderCancelledStatusUpdate = async (orderId) => {
  const query =
    "update orders set orderStatus='Cancelled', paymentStatus='failed' where id=? ";
  const result = await dbConn.query(query, [orderId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const checkOrderStatus = async (orderId) => {
  const query = "select * from orders where id=?";
  const [result] = await dbConn.query(query, [orderId]);
  if (result.length > 0) {
    return result[0].orderStatus;
  }
  return false;
};

export const orderItemsDetails = async (orderId) => {
  const query = "select * from orderitems where orderId=?";
  const result = await dbConn.query(query, [orderId]);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const increaseShoeSizeStock = async (shoeSizeId, quantity) => {
  const query = "update shoesizestock set stock=stock+? where shoeSizeId=?";
  const result = await dbConn.query(query, [quantity, shoeSizeId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

//------------------------------------------------------------------------------------

export const pendingOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Pending'";
  const result = dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const shippedOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Shipped'";
  const result = dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const completedOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Delivered'";
  const result = await dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};

export const cancelledOrdersFromDb = async () => {
  const query = "select * from orders where orderStatus='Cancelled'";
  const result = dbConn.query(query);
  if (result[0].length > 0) {
    return result[0];
  }
  return false;
};
