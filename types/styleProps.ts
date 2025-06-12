import { PressableProps, TextProps, ViewProps } from "react-native";

export interface styleProps extends PressableProps {
  textStyle?: TextProps["style"];
  viewStyle?: ViewProps["style"];
  blackButton?: boolean;
  children: TextProps["children"]
}
