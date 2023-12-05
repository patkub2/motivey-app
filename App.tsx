// App.tsx at the root of your Expo project
import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import MainScreen from "./src/features/Main/MainScreen";
import { AuthContext, AuthProvider } from "./src/context/AuthContext"; // You need to create this

import { TamaguiProvider } from "tamagui";

import config from "./tamagui.config";
const AppContent = () => {
  const { userToken } = useContext(AuthContext); // userToken is null when not logged in

  return (
    <NavigationContainer>
      {userToken ? <MainScreen /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TamaguiProvider config={config}>
        <AppContent />
      </TamaguiProvider>
    </AuthProvider>
  );
}
