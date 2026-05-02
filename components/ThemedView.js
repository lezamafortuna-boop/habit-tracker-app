import React from "react";
import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemedView({ style = undefined, ...props }) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.mode === "light" ? "#ffffff" : theme.colors.bg,
          flex: 1,
        },
        style,
      ]}
      {...props}
    />
  );
}
