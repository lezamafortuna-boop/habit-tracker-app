import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ThemedText from "./ThemedText";

export default function CalendarHeatmap({ history }) {
  const { theme } = useTheme();

  // Get all days in the current month
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Weekday labels
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Convert history to a quick lookup
  const historyMap = history || {};

  function getCompletionCount(date) {
    const key = format(date, "yyyy-MM-dd");
    return historyMap[key] ? historyMap[key].length : 0;
  }

  function getColor(count) {
    if (count === 0) return theme.colors.border;
    if (count === 1) return "#c6e48b";
    if (count === 2) return "#7bc96f";
    if (count === 3) return "#239a3b";
    return "#196127"; // 4+ completions
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        This Month
      </ThemedText>

      {/* Weekday labels */}
      <View style={styles.weekRow}>
        {weekDays.map((d) => (
          <ThemedText key={d} style={styles.weekLabel}>
            {d}
          </ThemedText>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {/* Empty slots before the first day */}
        {Array.from({ length: getDay(monthStart) }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.dayCell} />
        ))}

        {/* Actual days */}
        {days.map((date) => {
          const count = getCompletionCount(date);
          const bg = getColor(count);

          return (
            <TouchableOpacity
              key={date.toISOString()}
              style={[styles.dayCell, { backgroundColor: bg }]}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.dayNumber}>
                {format(date, "d")}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    marginBottom: 10,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  weekLabel: {
    width: 40,
    textAlign: "center",
    opacity: 0.6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: 40,
    height: 40,
    borderRadius: 6,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dayNumber: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});
