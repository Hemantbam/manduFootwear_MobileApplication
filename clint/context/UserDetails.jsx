import React, { createContext, useState } from "react";
import { UserRegistrationDetails } from "./Context";

export const UserRegistrationContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    gender: "",
    occupation: "",
    address: "",
    password: "",
  });
  const [shoeDetails, setShoeDetails] = useState([])
  return (
    <UserRegistrationDetails.Provider value={{ userDetails, setUserDetails, shoeDetails, setShoeDetails }}>
      {children}
    </UserRegistrationDetails.Provider>
  );
};
