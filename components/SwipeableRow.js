import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useTheme } from "../context/ThemeContext";

export default function SwipeableRow({ children, onDelete }) {
  const swipeRef = useRef(null);
  const { theme } = useTheme();

  const renderRightActions = () => (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          swipeRef.current?.close();
          onDelete();
        }}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  deleteButton: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", // ALWAYS visible in light mode
  },
});
