import axios from "axios";

const API_URL = "http://10.0.2.2:8080";

export const addNewOrder = async (orderDetails, orderShoes) => {
  try {
    const response = await axios.post(`${API_URL}/order/addNewOrder`, {
        orderDetails,
        orderShoes,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during placing order:", error);
    return {
      message:
        error.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};