import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import HabitItem from './HabitItem';
import ThemedText from './ThemedText';
import { theme } from '../constants/theme';
import { loadHabits } from '../storage/habits';
import { loadHistory, toggleHabitForToday } from '../storage/history';

export default function HabitList() {
  const [habits, setHabits] = useState([]);
  const [history, setHistory] = useState({});

  useEffect(() => {
    async function loadData() {
      const h = await loadHabits();
      const hist = await loadHistory();
      setHabits(h);
      setHistory(hist);
    }
    loadData();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todaysHabits = history[today] || [];

  async function handleToggle(id) {
    const updatedHistory = await toggleHabitForToday(id);
    setHistory(updatedHistory);
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title">Today</ThemedText>

      {habits.length === 0 && (
        <ThemedText style={styles.empty}>No habits yet</ThemedText>
      )}

      {habits.map(habit => (
        <TouchableOpacity
          key={habit.id}
          style={styles.card}
          onPress={() => handleToggle(habit.id)}
        >
          <HabitItem
            name={habit.name}
            completed={todaysHabits.includes(habit.id)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  empty: {
    marginTop: 10,
    opacity: 0.6,
  },
});
