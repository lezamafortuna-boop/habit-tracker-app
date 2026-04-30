import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import { theme } from '../constants/theme';
import { loadHistory } from '../storage/history';

export default function HistoryList() {
  const [history, setHistory] = useState({});

  useEffect(() => {
    async function loadData() {
      const hist = await loadHistory();
      setHistory(hist);
    }
    loadData();
  }, []);

  const dates = Object.keys(history).sort().reverse();

  return (
    <View style={styles.container}>
      <ThemedText type="title">History</ThemedText>

      {dates.length === 0 && (
        <ThemedText style={styles.empty}>No history yet</ThemedText>
      )}

      {dates.map(date => (
        <View key={date} style={styles.row}>
          <ThemedText>{date}</ThemedText>
          <ThemedText>{history[date].length} completed</ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    backgroundColor: theme.colors.card,
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  empty: {
    marginTop: 10,
    opacity: 0.6,
  },
});
