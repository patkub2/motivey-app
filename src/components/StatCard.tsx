import React from "react";
import { YStack, XStack, styled, Text } from "tamagui";
import ProgressBar from "./ProgressBar";

type StatCardProps = {
  icon: React.ReactNode; // This allows you to pass any React element as an icon
  stat: string; // The label for the stat, e.g., "STR"
  minValue: number; // The minimum value for the progress bar
  maxValue: number; // The maximum value for the progress bar
  value: number; // The current value for the progress bar
  level: number; // The level number to display
};

const Card = styled(YStack, {
  padding: 8,
  borderRadius: 10,
  borderWidth: 3, // Add border
  borderColor: "#CEBEB3", // Border color is black
  backgroundColor: "#EFECE2",
});

const StatLabel = styled(Text, {
  fontWeight: "bold",
  marginVertical: 8,
});

const LevelText = styled(Text, {
  fontWeight: "bold",
  marginTop: 4,
  alignSelf: "center",
});

const StatCard: React.FC<StatCardProps> = ({
  icon,
  stat,
  maxValue,
  value,
  level,
}) => {
  return (
    <Card>
      <YStack alignItems="center" justifyContent="center">
        {icon}
      </YStack>
      <StatLabel alignSelf="center">{stat}</StatLabel>
      <ProgressBar
        maxWidth={100}
        maxValue={maxValue}
        value={value}
        color="#3B577D"
        height={10}
        showText={false}
      />
      <LevelText>{level}</LevelText>
    </Card>
  );
};

export default StatCard;
