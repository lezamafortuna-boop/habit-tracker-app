import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { loadHistory } from '../storage/history';
import { loadHabits } from '../storage/habits';
import { theme } from '../constants/theme';
import ThemedText from '../components/ThemedText';

export default function HistoryList() {
  const [history, setHistory] = useState({});
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function loadData() {
      const hist = await loadHistory();
      const h = await loadHabits();
      setHistory(hist);
      setHabits(h);
    }
    loadData();
  }, []);

  function getHabitName(id) {
    const habit = habits.find(h => h.id === id);
    return habit ? habit.name : 'Unknown';
  }

  return (
    <View style={{ marginTop: theme.spacing.lg }}>
      <ThemedText style={[theme.typography.title, { marginBottom: theme.spacing.md }]}>
        History
      </ThemedText>

      {Object.keys(history)
        .sort()
        .reverse()
        .map(date => (
          <View key={date} style={{ marginBottom: theme.spacing.md }}>
            <ThemedText style={[theme.typography.subtitle, { fontWeight: 'bold' }]}>
              {date}
            </ThemedText>

            {history[date].map(id => (
              <ThemedText key={id}>• {getHabitName(id)}</ThemedText>
            ))}
          </View>
        ))}
    </View>
  );
}
