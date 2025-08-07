import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import clsx from "clsx";

type OverlappingIconProps = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  z?: number;
};

const OverlappingIcon: React.FC<OverlappingIconProps> = ({
  children,
  className = "",
  style,
  z = 0,
}) => {
  return (
    <View
      className={clsx(
        "w-6 h-6 rounded-full -ml-3 items-center justify-center",
        `z-[${z}]`,
        className
      )}
      style={style}
    >
      {children}
    </View>
  );
};

export default OverlappingIcon;
