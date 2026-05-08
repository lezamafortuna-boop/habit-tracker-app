import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ThemedText from "./ThemedText";

export default function HistoryList({ history }) {
  const dates = Object.keys(history).sort().reverse();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Daily History
      </ThemedText>

      {dates.length === 0 && (
        <ThemedText style={styles.empty}>No history yet</ThemedText>
      )}

      {dates.map((date) => (
        <View
          key={date}
          style={[
            styles.row,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <ThemedText type="subtitle">{date}</ThemedText>
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
  header: {
    marginBottom: 10,
  },
  row: {
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  empty: {
    marginTop: 10,
    opacity: 0.6,
  },
});
