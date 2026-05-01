import React from "react";
import { StyleSheet, View } from "react-native";
import { streakColor } from "../storage/history";
import ThemedText from "./ThemedText";

export default function HabitItem({ name, completed, streak }) {
  return (
    <View style={[styles.container, { borderLeftColor: streakColor(streak) }]}>
      <ThemedText>{name}</ThemedText>
      <ThemedText>{streak}🔥</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderLeftWidth: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
