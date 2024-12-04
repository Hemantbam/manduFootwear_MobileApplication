import React from "react";

export const UserRegistrationDetails = React.createContext({
    userDetails: {
      username: "",
      email: "",
      mobileNumber: "",
      gender: "",
      occupation: "",
      address: "",
      password: "",
    },
    setUserDetails: () => {} 
  });
