import React, { useContext } from "react";
import { styles } from "./SignUpStyle";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { registerUser } from "@/api/authApi";
import { UserRegistrationDetails } from "@/context/Context";

function SignUp() {

  const { userDetails, setUserDetails } = useContext(UserRegistrationDetails);

  const handleUserRegistration = async () => {
    console.log(userDetails)
    try {
      const result = await registerUser(userDetails);
      if (result.status == 200) {
        Alert.alert("Success", "Account created successfully!");
      } else {
        Alert.alert("Error", result.message || "Registration failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error("Registration Error:", error);
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
                  placeholder="Username"
                  value={userDetails.username}
                  onChangeText={(text) => setUserDetails({ ...userDetails, username: text })}
                />
              </View>

              <Text style={styles.signUpFormLabel}>Email</Text>
              <View style={styles.inputFields}>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  value={userDetails.email}
                  onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
                />
              </View>

              <Text style={styles.signUpFormLabel}>Mobile Number</Text>
              <View style={styles.inputFields}>
                <TextInput
                  placeholder="Mobile"
                  keyboardType="phone-pad"
                  value={userDetails.mobileNumber}
                  onChangeText={(text) => setUserDetails({ ...userDetails, mobileNumber: text })}
                />
              </View>

              <Text style={styles.signUpFormLabel}>Gender</Text>
              <View style={styles.inputFields}>
                <TextInput
                  placeholder="Gender"
                  value={userDetails.gender}
                  onChangeText={(text) => setUserDetails({ ...userDetails, gender: text })}
                />
              </View>

              <Text style={styles.signUpFormLabel}>Occupation</Text>
              <View style={styles.inputFields}>
                <TextInput
                  placeholder="Occupation"
                  value={userDetails.occupation}
                  onChangeText={(text) => setUserDetails({ ...userDetails, occupation: text })}
                />
              </View>

              <Text style={styles.signUpFormLabel}>Address</Text>
              <View style={styles.inputFields}>
                <TextInput
                  placeholder="Address"
                  value={userDetails.address}
                  onChangeText={(text) => setUserDetails({ ...userDetails, address: text })}
                />
              </View>

              <Text style={styles.signUpFormLabel}>Password</Text>
              <View style={styles.inputFields}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  value={userDetails.password}
                  onChangeText={(text) => setUserDetails({ ...userDetails, password: text })}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.registerButtonContainer}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleUserRegistration}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignUp;
