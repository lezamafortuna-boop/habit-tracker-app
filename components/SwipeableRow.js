import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

export default function SwipeableRow({ children, onDelete }) {
  const swipeRef = useRef(null);
  const { theme } = useTheme();

  // --- One-time swipe hint animation ---
  const translateX = useSharedValue(0);
  const [hintShown, setHintShown] = useState(false);

  useEffect(() => {
    if (hintShown) return;

    setHintShown(true);

    translateX.value = withDelay(
      300,
      withSequence(
        withTiming(-12, { duration: 150 }),
        withTiming(0, { duration: 150 }),
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderRightActions = () => (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: theme.colors.danger }]}
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
      <Animated.View style={[animatedStyle]}>{children}</Animated.View>
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
  },
});
