import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { cn } from "../../lib/utils"; // Optional utility for conditional Tailwind classes

type Props = TouchableOpacityProps & {
  title: string;
  variant?: "primary" | "secondary";
  textClassName?: string;
};

export default function Button({
  title,
  variant = "primary",
  textClassName,
  className,
  ...rest
}: Props) {
  const baseStyle =
    variant === "primary"
      ? "bg-black text-white"
      : "bg-white border border-gray-300 text-black";

  return (
    <TouchableOpacity
      className={cn(
        "px-4 py-3 rounded-xl items-center justify-center",
        baseStyle,
        className
      )}
      {...rest}
    >
      <Text className={cn("text-base font-clash font-semibold", textClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
