import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@/Screens/Login/Login";
import SignUp from "@/Screens/SignUp/SignUp";
import HomePage from "@/Screens/Home/HomePage";
import OtpValidation from "@/Screens/OtpValidationScreen/OtpValidation";
import { UserRegistrationContextProvider } from "@/context/UserDetails";
import Sample from "@/Screens/Sample";
import Toast from "react-native-toast-message";
import ShoeDetails from "@/Screens/ShoeDetails/ShoeDetails";
import ShoeCart from "@/Screens/ShoeCart/ShoeCart";
import CheckOut from "@/Screens/CheckOut/CheckOut";
const Stack = createNativeStackNavigator();
export default function RootLayout() {
  return (
    <UserRegistrationContextProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registrationValidation"
          component={OtpValidation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="test"
          component={Sample}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="shoeDetails"
          component={ShoeDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="cart"
          component={ShoeCart}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="checkOut"
          component={CheckOut}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </UserRegistrationContextProvider>
  );
}
