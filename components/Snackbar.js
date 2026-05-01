import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ThemedText from "./ThemedText";

export default function Snackbar({ message, actionLabel, onAction, visible }) {
  const slide = useRef(new Animated.Value(100)).current;
  const { theme } = useTheme();

  useEffect(() => {
    Animated.timing(slide, {
      toValue: visible ? 0 : 100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          transform: [{ translateY: slide }],
        },
      ]}
    >
      <ThemedText>{message}</ThemedText>

      {actionLabel && (
        <TouchableOpacity onPress={onAction}>
          <ThemedText style={{ color: theme.colors.primary }}>
            {actionLabel}
          </ThemedText>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
});
