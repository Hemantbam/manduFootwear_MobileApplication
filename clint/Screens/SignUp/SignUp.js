import React, { useContext } from "react";
import { styles } from "./SignUpStyle";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { UserRegistrationDetails } from "@/context/Context";
import { useNavigation } from "@react-navigation/native";
import { generateOtpForUserRegistration } from "@/api/authApi";
import Toast from "react-native-toast-message";

function SignUp() {
  const { userDetails, setUserDetails } = useContext(UserRegistrationDetails);
  const navigation = useNavigation();

  const handelOtpGeneration = async () => {
    console.log(userDetails.email);
    try {
      const result = await generateOtpForUserRegistration(userDetails);
      console.log(result);
      if (result.status == 200) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "success",
          text2: "Otp Sent to email successfully",
        });
        navigation.navigate("registrationValidation");
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: `${result.message || "Error in generating otp"}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Something went wrong please try again",
      });
      console.error("Otp generation Error:", error);
    }
  };

  return (
    <View style={styles.ContainerBox}>
      <View style={styles.headerBox}>
        <Image source={require("../images/logo.png")} />
      </View>
      <View>
        <View style={styles.backgroundBoxShadow}></View>
        <View style={styles.bodyBox}>
          <Text style={styles.bodyHeadingText}>Create an account</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.signUpInputs}>
              <Text style={styles.signUpFormLabel}>Full Name</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Username"
                  value={userDetails.username}
                  onChangeText={(text) =>
                    setUserDetails({ ...userDetails, username: text })
                  }
                />
              </View>

              <Text style={styles.signUpFormLabel}>Email</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={userDetails.email}
                  onChangeText={(text) =>
                    setUserDetails({ ...userDetails, email: text })
                  }
                />
              </View>

              <Text style={styles.signUpFormLabel}>Mobile Number</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Mobile"
                  keyboardType="phone-pad"
                  value={userDetails.mobileNumber}
                  onChangeText={(text) =>
                    setUserDetails({ ...userDetails, mobileNumber: text })
                  }
                />
              </View>

              <Text style={styles.signUpFormLabel}>Gender</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Gender"
                  value={userDetails.gender}
                  onChangeText={(text) =>
                    setUserDetails({ ...userDetails, gender: text })
                  }
                />
              </View>

              <Text style={styles.signUpFormLabel}>Occupation</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Occupation"
                  value={userDetails.occupation}
                  onChangeText={(text) =>
                    setUserDetails({ ...userDetails, occupation: text })
                  }
                />
              </View>

              <Text style={styles.signUpFormLabel}>Address</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Address"
                  value={userDetails.address}
                  onChangeText={(text) =>
                    setUserDetails({ ...userDetails, address: text })
                  }
                />
              </View>

              <Text style={styles.signUpFormLabel}>Password</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={userDetails.password}
                  onChangeText={(text) =>
                    setUserDetails({ ...userDetails, password: text })
                  }
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.registerButtonContainer}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handelOtpGeneration}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignUp;
