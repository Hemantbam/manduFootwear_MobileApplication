export const updateOrderMessage = (orderId, orderDetails) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: black;">Mandu Footwear</h1>
        <h3 style="color: black;">Your order details have been updated</h3>
        <p style="color: green;">Your updated order status</p>
        <hr style="border: 1px solid #ccc;">
        <p style="font-size: 1.2rem; color: black;">Order ID: ${orderId}</p>
        <p style="font-size: 1.2rem; color: black;">Contact Number: ${orderDetails.contactNumber}</p>
        <p style="font-size: 1.2rem; color: black;">Delivery Address: ${orderDetails.address}</p>
        <p style="font-size: 1.2rem; color: black;">Order Status: ${orderDetails.orderStatus}</p>
        <p style="font-size: 1.2rem; color: black;">Payment Status: ${orderDetails.paymentStatus}</p>
      </div>
    `;
};
