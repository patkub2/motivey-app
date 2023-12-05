import React from "react";
import { YStack, XStack, styled, Text } from "tamagui";

type ProgressBarProps = {
  maxWidth: number;
  maxValue: number;
  value: number;
  color: string;
  height: number;
};

const Container = styled(YStack, {
  width: "100%",
  borderRadius: 9999,
  overflow: "hidden",
  backgroundColor: "#E0E0E0",
  position: "relative",
  justifyContent: "center",
});

const Filler = styled(XStack, {
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
});

const ProgressBar: React.FC<ProgressBarProps> = ({
  maxWidth,
  maxValue,
  value,
  color,
  height, // Destructure height from props
}) => {
  // Calculate width of the filler element as a percentage of the total width
  const widthPercentage = (value / maxValue) * 100;
  const fillerWidth = (widthPercentage * maxWidth) / 100;

  return (
    <Container width={maxWidth} height={height}>
      <Filler width={fillerWidth} style={{ backgroundColor: color }} />
      <Label>{`${value}/${maxValue}`}</Label>
    </Container>
  );
};

export default ProgressBar;
