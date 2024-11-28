import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@/Screens/Login/Login";
import SignUp from "@/Screens/SignUp/SignUp";
import HomePage from "@/Screens/Home/HomePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="signUp" component={SignUp} options={{headerShown:false}} />
      <Stack.Screen name="home" component={HomePage} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}
