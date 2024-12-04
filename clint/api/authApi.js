import axios from "axios";

const API_URL = "http://10.0.2.2:8080";

export const registerUser = async (userDetails, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/registerUser`, {
      userDetails,
      otp,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      message:
        error.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};

export const loginUser = async (email, password) => {
  console.log(email, password);
  try {
    const response = await axios.post(`${API_URL}/auth/userLogin`, {
      email,
      password,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error during Login:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    return {
      message:
        error.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};

export const generateOtpForUserRegistration = async (userDetails) => {
  console.log(userDetails);
  try {
    const response = await axios.post(`${API_URL}/auth/generateOtp`, {
      userDetails,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error during Login:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
    return {
      message:
        error.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};
