import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "../../components/ProgressBar";
import StatCard from "../../components/StatCard";
import Icon from "../../components/Icon";
import TaskCard from "../../components/TaskCard";

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
        icon={
          <Icon
            source={require("../../assets/images/test.png")}
            style={{ width: 50, height: 50 }}
          />
        }
        stat="STR"
        minValue={0}
        maxValue={100}
        value={50}
        level={5}
      />
      <TaskCard
        executionsCount={12}
        icon={
          <Icon
            source={require("../../assets/images/test.png")}
            style={{ width: 50, height: 50 }}
          />
        } // Replace with your actual icon component
        name="10 Push ups"
        description="some text"
        difficultyLevel={3} // Renders 3 coin icons
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
