import React from "react";
import { Stack, styled, Text } from "tamagui";
import ProgressBar from "./ProgressBar";

type StatCardProps = {
  icon: React.ReactNode; // This allows you to pass any React element as an icon
  stat: string; // The label for the stat, e.g., "STR"
  minValue?: number; // Optional: The minimum value for the progress bar
  maxValue: number; // The maximum value for the progress bar
  value: number; // The current value for the progress bar
  level: number; // The level number to display
};

const Card = styled(Stack, {
  padding: 6,
  marginTop: 8,
  borderRadius: 10,
  borderWidth: 3,
  borderColor: "#CEBEB3",
  backgroundColor: "#EFECE2",
  flexDirection: "column", // Align children vertically
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
      <Stack alignItems="center" justifyContent="center">
        {icon}
      </Stack>
      <StatLabel alignSelf="center">{stat}</StatLabel>
      <ProgressBar
        // maxWidth={100}
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
