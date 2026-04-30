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

export function calculateStreak(history, habitId) {
  const dates = Object.keys(history).sort().reverse();
  let streak = 0;

  for (const date of dates) {
    if (history[date].includes(habitId)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function streakColor(streak) {
  if (streak >= 7) return '#f5c542';     // gold
  if (streak >= 3) return '#4da6ff';     // blue
  if (streak >= 1) return '#4caf50';     // green
  return '#999';                         // gray
}

