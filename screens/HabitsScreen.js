import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import CalendarHeatmap from "../components/CalendarHeatmap";
import HabitList from "../components/HabitList";
import HistoryList from "../components/HistoryList";
import Screen from "../components/Screen";
import ThemedText from "../components/ThemedText";
import { useTheme } from "../context/ThemeContext";
import { loadHistory } from "../storage/history";

export default function HabitsScreen() {
  const [history, setHistory] = useState({});
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async function loadData() {
      const hist = await loadHistory();
      setHistory(hist);
    }
    loadData();
  }, []);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { padding: theme.spacing.lg },
        ]}
      >
        {/* Theme Toggle */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={{ marginBottom: theme.spacing.md }}
        >
          <ThemedText>
            Switch to {theme.mode === "light" ? "Dark" : "Light"} Mode
          </ThemedText>
        </TouchableOpacity>

        <CalendarHeatmap history={history} />
        <HabitList history={history} />
        <HistoryList history={history} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
