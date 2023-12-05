import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "../../components/ProgressBar";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welasdasdcome</Text>
      <ProgressBar
        maxWidth={180}
        maxValue={180}
        value={15}
        color="#FFCC00"
        height={20}
      />
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
