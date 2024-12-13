import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://10.0.2.2:8080";

export const getAllShoesDetails = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log(token)
  if (!token) {
    return { error: "unauthorized" };
  }
  try {
    const response = await axios.get(`${API_URL}/shoes/getAllShoes`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during getting shoes details:", error);
    return {
      message:
        error.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};



export const getShoeById = async (id) => {
  const token = await AsyncStorage.getItem("token");
  console.log(token);
  if (!token) {
    return { error: "unauthorized" };
  }
  try {
    const response = await axios.get(`${API_URL}/shoes/getShoe/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during getting shoes details:", error);
    return {
      message:
        error.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};
