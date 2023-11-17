import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "../../components/ProgressBar";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <ProgressBar value={50} color="blue" text="Progress" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MainScreen;
