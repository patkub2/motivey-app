import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../../components/Icon";
import TaskCard from "../../components/TaskCard";

import ButtonSection from "../../components/ButtonSection";
import UserStats from "../../components/UserStats";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <UserStats />

      <ButtonSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFF6",
    borderWidth: 1,
    borderBlockColor: "red",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MainScreen;
