import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useTheme } from "../context/ThemeContext";

export default function SwipeableRow({ children, onDelete }) {
  const swipeRef = useRef(null);
  const { theme } = useTheme();

  const renderRightActions = () => (
    <TouchableOpacity
      style={[styles.deleteButton, { backgroundColor: theme.colors.danger }]}
      onPress={() => {
        swipeRef.current?.close();
        onDelete();
      }}
    >
      <Ionicons name="trash-outline" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <Swipeable ref={swipeRef} renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
