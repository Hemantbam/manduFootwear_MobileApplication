import React, { useState } from "react";
import { styles } from "./LoginStyle";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "@/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelUserLogin = async () => {
    const result = await loginUser(email, password);
    if (result.status === 200) {
      await AsyncStorage.setItem("token", `${result.token}`);
      navigation.navigate("home");
    } else {
      Alert.alert("Login Failed", result.message || "Invalid credentials");
    }
  };

  return (
    <>
      <View style={styles.ContainerBox}>
        <View style={styles.headerBox}>
          <Image source={require("../images/logo.png")} />
        </View>
        <View>
          <View style={styles.backgroundBoxShadow}></View>
          <View style={styles.bodyBox}>
            <Text style={styles.bodyHeadingText}>Welcome to ManduFootwear</Text>

            <View style={styles.logInInputs}>
              <View style={styles.inputFields}>
                <Image
                  source={require("../images/Icons/userIcon.png")}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Username"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              <View style={styles.inputFields}>
                <Image
                  source={require("../images/Icons/password.png")}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.forgetText}>Forget Password ?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomContent}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handelUserLogin}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.socialLink}>
                <Text style={styles.socialLoginOptions}>OR Log in with</Text>
                <View style={styles.socialImages}>
                  <TouchableOpacity>
                    <Image
                      source={require("../images/Icons/facebookIcon.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../images/Icons/googleIcon.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.createAccount}>
                <Text style={styles.signInTextOne}>
                  Don't have an account yet?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
                  <Text style={styles.signInTextTwo}>Create Here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default Login;
