import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useStreakColor } from "../hooks/useStreakColor";
import ThemedText from "./ThemedText";

export default function HabitItem({ name, completed, streak }) {
  const { theme } = useTheme();
  const streakColor = useStreakColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderLeftColor: streakColor(streak),
        },
      ]}
    >
      <ThemedText>{name}</ThemedText>
      <ThemedText>{streak}🔥</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
