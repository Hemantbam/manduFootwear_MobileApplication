export const orderCancelledMessage = (orderId, orderDetails, userName) => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h1 style="color: black;">Mandu Footwear</h1>
          <h3 style="color: black;">Hi ${userName}, your order has been cancelled</h3>
         <p style="color: black;"> <Strong>Your order details</Strong></p>
          <hr style="border: 1px solid #ccc;">
          <p style="font-size: 1.2rem; color: red;">Order ID: ${orderId}</p>
          <p style="font-size: 1.2rem; color: red;">Order Status: ${orderDetails.orderStatus}</p>
          <p style="font-size: 1.2rem; color: red;">Payment Status: ${orderDetails.paymentStatus}</p>
        </div>
      `;
  };
  