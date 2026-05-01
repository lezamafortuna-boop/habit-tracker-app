import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ThemedText from "./ThemedText";

export default function CalendarHeatmap({ history }) {
  const { theme } = useTheme();

  const days = [...Array(30)]
    .map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    })
    .reverse();

  const dayValues = days.map((date) => {
    const habits = history[date] || [];
    return habits.length;
  });

  function getColor(value) {
    if (value === 0) return theme.colors.card;
    if (value === 1) return theme.colors.heatmapLow;
    if (value === 2) return theme.colors.heatmapMid;
    if (value === 3) return theme.colors.heatmapHigh;
    return theme.colors.heatmapMax;
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title">Last 30 Days</ThemedText>

      <View style={styles.grid}>
        {dayValues.map((value, index) => (
          <View
            key={index}
            style={[styles.square, { backgroundColor: getColor(value) }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 210,
  },
  square: {
    width: 28,
    height: 28,
    margin: 1,
    borderRadius: 4,
  },
});
