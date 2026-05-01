import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: "100%",
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  fill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
});
