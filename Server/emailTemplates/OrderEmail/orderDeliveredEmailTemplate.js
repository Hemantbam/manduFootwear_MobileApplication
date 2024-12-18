export const orderDeliveredMessage = (orderId, orderDetails, userName) => {
  return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h1 style="color: black;">Mandu Footwear</h1>
          <h3 style="color: black;">Hi ${userName}, your order has been Delivered</h3>
          <p style="color: green;">Thank You for shopping with us</p>
          <hr style="border: 1px solid #ccc;">
          <p style="font-size: 1.2rem; color: black;">Order ID: ${orderId} </p>
          <p style="font-size: 1.2rem; color: black;">Order Status: ${orderDetails.orderStatus}</p>
          <p style="font-size: 1.2rem; color: black;">Payment Status: ${orderDetails.paymentStatus}</p>
        </div>
      `;
};
