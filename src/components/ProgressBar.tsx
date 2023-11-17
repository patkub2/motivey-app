// ProgressBar.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ViewStyle } from "react-native";
interface ProgressBarProps {
  value: number; // value between 0 and 100
  color: string;
  text: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color, text }) => {
  // Ensure the value is between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const progressStyle: ViewStyle = {
    width: `${clampedValue}%`,
    backgroundColor: color,
  };
  return (
    <View style={styles.container}>
      <View style={[styles.progress, progressStyle]} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  progress: {
    height: "100%",
    borderRadius: 15,
  },
  text: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    lineHeight: 30, // Same as container height
  },
});

export default ProgressBar;
