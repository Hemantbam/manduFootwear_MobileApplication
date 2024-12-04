import React from "react";
import { View, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "react-native-vector-icons";
import Login from "@/Screens/Login/Login";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: '#f8f8f8', 
          height: 55, 
          
        },
        tabBarLabelStyle: {
          fontSize: 10, 
          fontWeight: 800, 
        },
        tabBarInactiveTintColor: '#aaa', 
        tabBarActiveTintColor: '#FF6F61', 
        tabBarLabelPosition: 'below-icon', 
      }}
    >
      <Tab.Screen
        name="home"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={25} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="savedShoes"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-bag" size={25} color={color} />
          ),
          tabBarLabel: 'Saved Shoes',
        }}
      />
      <Tab.Screen
        name="offers"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tags" size={25} color={color} />
          ),
          tabBarLabel: 'Offers',
        }}
      />
      <Tab.Screen
        name="userAccount"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={25} color={color} />
          ),
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
