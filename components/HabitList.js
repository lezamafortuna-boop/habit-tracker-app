import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { loadHabits } from "../storage/habits";
import { calculateStreak, toggleHabitForToday } from "../storage/history";
import HabitItem from "./HabitItem";
import ProgressBar from "./ProgressBar";
import ThemedText from "./ThemedText";

export default function HabitList({ history }) {
  const [habits, setHabits] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    async function loadData() {
      const h = await loadHabits();
      setHabits(h);
    }
    loadData();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todaysHabits = history[today] || [];

  async function handleToggle(id) {
    await toggleHabitForToday(id);
    // parent screen reloads history
  }

  // Daily progress
  const total = habits.length;
  const completed = todaysHabits.length;
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
          <TouchableOpacity
            key={habit.id}
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => handleToggle(habit.id)}
          >
            <HabitItem
              name={habit.name}
              completed={todaysHabits.includes(habit.id)}
              streak={streak}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  empty: {
    marginTop: 10,
    opacity: 0.6,
  },
});
