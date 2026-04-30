import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AddHabitForm from '../components/AddHabitForm';
import { loadHabits, removeHabit } from '../storage/habits';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import { theme } from '../constants/theme';


export default function ManageHabitsScreen() {
  const [habits, setHabits] = useState([]);

  async function refresh() {
    const h = await loadHabits();
    setHabits(h);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleDelete(id) {
    const updated = await removeHabit(id);
    setHabits(updated);
  }

  return (
    <View style={styles.container}>
      <AddHabitForm onHabitAdded={setHabits} />

      <Text style={styles.title}>Your Habits</Text>

      {habits.map(habit => (
        <View key={habit.id} style={styles.row}>
          <Text style={styles.text}>{habit.name}</Text>
          <Button title="Delete" color="red" onPress={() => handleDelete(habit.id)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.title,
    marginVertical: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  text: {
    ...theme.typography.body,
  },
});
