import React from "react";
import { Stack, styled, Text } from "tamagui";

type ProgressBarProps = {
  maxWidth?: number;
  maxValue: number;
  value: number;
  color: string;
  height: number;
  borderColor?: string; // Optional prop for border color
  showText?: boolean; // Optional prop to control text visibility
};

const Container = styled(Stack, {
  width: "100%",
  borderRadius: 9999,
  overflow: "hidden",
  backgroundColor: "#E0E0E0",
  position: "relative",
  justifyContent: "center",
  borderWidth: 3,
});

const Filler = styled(Stack, {
  height: "100%",
  borderRadius: 9999,
});

const Label = styled(Text, {
  position: "absolute",
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  color: "white",
  fontWeight: "bold",
  fontSize: 12,
});

const ProgressBar: React.FC<ProgressBarProps> = ({
  maxWidth,
  maxValue,
  value,
  color,
  height,
  borderColor = "transparent",
  showText = true,
}) => {
  const widthPercentage = (value / maxValue) * 100;
  const fillerWidth = `${widthPercentage}%`;

  // Determine label color based on widthPercentage
  const labelColor = widthPercentage > 50 ? "white" : "black";

  return (
    <Container width={maxWidth} height={height} style={{ borderColor }}>
      <Filler style={{ width: fillerWidth, backgroundColor: color }} />
      {showText && (
        <Label style={{ color: labelColor }}>{`${value}/${maxValue}`}</Label>
      )}
    </Container>
  );
};

export default ProgressBar;
