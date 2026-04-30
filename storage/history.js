import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'HABIT_HISTORY';

// Get today's date in YYYY-MM-DD format
function getToday() {
  return new Date().toISOString().split('T')[0];
}

// Load history
export async function loadHistory() {
  try {
    const json = await AsyncStorage.getItem(HISTORY_KEY);
    return json ? JSON.parse(json) : {};
  } catch (error) {
    console.error('Error loading history:', error);
    return {};
  }
}

// Save history
export async function saveHistory(history) {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
  }
}

// Toggle a habit for today
export async function toggleHabitForToday(habitId) {
  const history = await loadHistory();
  const today = getToday();

  const todaysHabits = history[today] || [];

  const updated = todaysHabits.includes(habitId)
    ? todaysHabits.filter(id => id !== habitId)
    : [...todaysHabits, habitId];

  const newHistory = { ...history, [today]: updated };

  await saveHistory(newHistory);
  return newHistory;
}
