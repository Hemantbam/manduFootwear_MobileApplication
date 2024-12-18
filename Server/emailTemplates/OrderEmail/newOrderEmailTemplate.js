export const addNewOrderMessage = (orderId, newOrderDetails, orderShoes) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: black;">Mandu Footwear</h1>
        <h3 style="color: black;">Your new order has been placed</h3>
        <p style="color: green;">Your order details</p>
        <hr style="border: 1px solid #ccc;">
        <p style="font-size: 1.2rem; color: black;">Order ID: ${orderId}</p>
        <p style="font-size: 1.2rem; color: black;">Contact Number: ${newOrderDetails.contactNumber}</p>
        <p style="font-size: 1.2rem; color: black;">Order Status: ${newOrderDetails.orderStatus}</p>
        <p style="font-size: 1.2rem; color: black;">Payment Status: ${newOrderDetails.paymentStatus}</p>
        <h3 style="color: #386641;">Purchased Shoes:</h3>
        <ul style="">
      ${orderShoes
        .map(
          (shoe) => `
        <li style="margin-bottom: 15px; padding: 10px; border: 2px solid #ddd; border-radius: 5px;">
          <strong style="font-size: 1.1em;">Shoe Id ${shoe.shoeId}</strong><br>
          <strong style="font-size: 1.1em;">Shoe Name ${shoe.shoeName}</strong><br>
          <span style="color: #555;">Shoe Size: ${shoe.size}</span><br>
          <span style="color: #000; font-weight:600;">Price: <strong>Rs ${shoe.unitPrice.toFixed(
            2
          )}</strong></span><br>
          <span style="color: #555;">Quantity: ${shoe.quantity}</span>
        </li>
      `
        )
        .join("")}
    </ul>
      </div>
    `;
  };
  