import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";
import ThemedText from "./ThemedText";

export default function CalendarHeatmap({ history }) {
  // Generate last 30 days
  const days = [...Array(30)]
    .map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    })
    .reverse();

  // Count completions per day
  const dayValues = days.map((date) => {
    const habits = history[date] || [];
    return habits.length;
  });

  // Color scale
  function getColor(value) {
    if (value === 0) return theme.colors.card;
    if (value === 1) return "#c6e48b";
    if (value === 2) return "#7bc96f";
    if (value === 3) return "#239a3b";
    return "#196127"; // 4+ completions
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title">Last 30 Days</ThemedText>

      <View style={styles.grid}>
        {dayValues.map((value, index) => (
          <View
            key={index}
            style={[styles.square, { backgroundColor: getColor(value) }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 210, // 7 columns * 30px
  },
  square: {
    width: 28,
    height: 28,
    margin: 1,
    borderRadius: 4,
  },
});
