import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { calculateStreak } from "../storage/history";
import HabitItem from "./HabitItem";
import ProgressBar from "./ProgressBar";
import ThemedText from "./ThemedText";

export default function HabitList({
  habits,
  completedToday,
  history,
  onToggle,
}) {
  const { theme } = useTheme();

  // Daily progress
  const total = habits.length;
  const completed = completedToday.length;
  const progress = total === 0 ? 0 : completed / total;

  // Weekly progress
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  let weeklyCompleted = 0;
  last7Days.forEach((date) => {
    if (history[date]) weeklyCompleted += history[date].length;
  });

  const weeklyTotal = habits.length * 7;
  const weeklyProgress = weeklyTotal === 0 ? 0 : weeklyCompleted / weeklyTotal;

  return (
    <View style={styles.container}>
      <ThemedText type="title">Today</ThemedText>

      {/* Daily Progress */}
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <ThemedText>
          {completed} of {total} habits completed
        </ThemedText>
        <ProgressBar progress={progress} />
      </View>

      {/* Weekly Progress */}
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <ThemedText>Weekly Progress</ThemedText>
        <ThemedText>
          {weeklyCompleted} of {weeklyTotal} possible completions
        </ThemedText>
        <ProgressBar progress={weeklyProgress} />
      </View>

      {habits.length === 0 && (
        <ThemedText style={styles.empty}>No habits yet</ThemedText>
      )}

      {habits.map((habit) => {
        const streak = calculateStreak(history, habit.id);

        return (
          <HabitItem
            key={habit.id}
            habit={habit}
            streak={streak}
            completed={completedToday.includes(habit.id)}
            onToggle={() => onToggle(habit.id)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  empty: {
    marginTop: 10,
    opacity: 0.6,
  },
});
