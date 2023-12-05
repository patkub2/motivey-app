import React from "react";
import { Image, ImageStyle } from "react-native";

type IconProps = {
  source: any; // The source of the image
  style?: ImageStyle; // Optional style prop to customize the icon
};

const Icon: React.FC<IconProps> = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={[{ width: 24, height: 24 }, style]}
      resizeMode="contain"
    />
  );
};

export default Icon;
