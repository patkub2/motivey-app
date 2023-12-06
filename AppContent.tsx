import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import MainScreen from "./src/features/Main/MainScreen";
import { AuthContext } from "./src/context/AuthContext";

const AppContent = () => {
  const { userToken } = useContext(AuthContext); // userToken is null when not logged in

  return (
    <NavigationContainer>
      {userToken ? <MainScreen /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default AppContent;
