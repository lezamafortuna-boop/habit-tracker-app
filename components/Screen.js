import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ThemedView from "./ThemedView";

export default function Screen({ children, scroll = true, style }) {
  const { theme } = useTheme();

  if (scroll) {
    return (
      <ThemedView style={[styles.container, style]}>
        <ScrollView
          contentContainerStyle={{
            padding: theme.spacing.lg,
          }}
        >
          {children}
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={[styles.container, { padding: theme.spacing.lg }, style]}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
