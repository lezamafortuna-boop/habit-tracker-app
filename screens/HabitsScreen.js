import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CalendarHeatmap from "../components/CalendarHeatmap";
import HabitList from "../components/HabitList";
import HistoryList from "../components/HistoryList";
import ThemedView from "../components/ThemedView";
import { theme } from "../constants/theme";
import { loadHistory } from "../storage/history";

export default function HabitsScreen() {
  const [history, setHistory] = useState({});

  useEffect(() => {
    async function loadData() {
      const hist = await loadHistory();
      setHistory(hist);
    }
    loadData();
  }, []);

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.container}>
        <CalendarHeatmap history={history} />
        <HabitList history={history} />
        <HistoryList history={history} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
});
