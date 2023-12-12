import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/Login/LoginScreen";
import MainScreen from "../features/Main/MainScreen";
import RegisterScreen from "../features/Register/RegisterScreen";
import OptionsScreen from "../features/Options/OptionsScreen"; // Import the OptionsScreen

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Options" component={OptionsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
