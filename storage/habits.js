import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid/non-secure';

const HABITS_KEY = 'HABITS_LIST';

// Load habits
export async function loadHabits() {
  try {
    const json = await AsyncStorage.getItem(HABITS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
}

// Save habits
export async function saveHabits(habits) {
  try {
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
  }
}

// Add a habit
export async function addHabit(name) {
  const habits = await loadHabits();
  const newHabit = { id: nanoid(), name };
  const updated = [...habits, newHabit];
  await saveHabits(updated);
  return updated;
}

// Remove a habit
export async function removeHabit(id) {
  const habits = await loadHabits();
  const updated = habits.filter(h => h.id !== id);
  await saveHabits(updated);
  return updated;
}
