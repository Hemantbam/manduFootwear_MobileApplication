import React, { useState, useRef, useContext, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styles } from "./OtpValidationStyle";
import { registerUser } from "@/api/authApi";
import { UserRegistrationDetails } from "@/context/Context";
import Toast from "react-native-toast-message";
function OtpValidation() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const { userDetails, setUserDetails } = useContext(UserRegistrationDetails);

  const handleUserRegistration = async () => {
    try {
      const otpNumber = parseInt(otp.join(""), 10);
      const result = await registerUser(userDetails, otpNumber);
      if (result.status == 200) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "success",
          text2: "Account created successfully",
        });
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: `${result.message || "Invalid or expired otp"}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Something went wrong please try again",
      });
      console.error("Registration Error:", error);
    }
  };

  const handleInputChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1].focus();
      }
      if (value.length === 0 && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.otpHeading}>OTP Verification</Text>
      <Text style={styles.instruction}>
        Please enter the 6-digit code sent to your email.
      </Text>
      <View style={styles.otpInputBoxContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
          />
        ))}
      </View>
      <Text style={styles.resendText}>
        Didn't receive the code? <Text style={styles.resendLink}>Resend</Text>
      </Text>
      <TouchableOpacity
        style={styles.submitRegisterBtn}
        onPress={handleUserRegistration}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OtpValidation;
