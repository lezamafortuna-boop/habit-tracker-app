import React from "react";
import { Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemedText({
  children,
  type = "default",
  style,
  ...props
}) {
  const { theme } = useTheme();

  const fontSize = type === "title" ? 24 : type === "subtitle" ? 18 : 16;

  const fontWeight =
    type === "title" ? "bold" : type === "subtitle" ? "600" : "400";

  return (
    <Text
      style={[
        {
          color: theme.colors.text,
          fontSize,
          fontWeight,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
