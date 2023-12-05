import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import StatCard from "../../components/StatCard";
import swordImage from "../../assets/images/test.png";
import Icon from "../../components/Icon";

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
      <StatCard
        icon={<Icon source={swordImage} style={{ width: 50, height: 50 }} />}
        stat="STR"
        minValue={0}
        maxValue={100}
        value={50}
        level={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFF6",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MainScreen;
