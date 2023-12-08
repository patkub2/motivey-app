import React from "react";
import { Button, styled } from "tamagui";

type TamaguiButtonProps = {
  width?: string | number;
  text: string;
  color: string;
  onPress?: () => void;
};

const StyledButton = styled(Button, {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  backgroundColor: "transparent",
  // You can add more styles here if you want
});

const TamaguiButton: React.FC<TamaguiButtonProps> = ({
  width = "100%",
  text,
  color,
}) => {
  return (
    <StyledButton style={{ width, backgroundColor: color }}>
      {text}
    </StyledButton>
  );
};

export default TamaguiButton;
