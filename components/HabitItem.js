import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ThemedText from "./ThemedText";

export default function HabitItem({ habit, streak, onToggle, completed }) {
  // --- Press scale animation ---
  const scale = useSharedValue(1);

  const animatedScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePress() {
    scale.value = withTiming(0.97, { duration: 80 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 12 });
    }, 80);

    onToggle(habit.id);
  }

  // --- Streak color animation ---
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    colorProgress.value = withTiming(streak, { duration: 400 });
  }, [streak]);

  const animatedDot = useAnimatedStyle(() => {
    const bg = interpolateColor(
      colorProgress.value,
      [0, 1, 3, 7],
      ["#999", "#4caf50", "#4da6ff", "#f5c542"],
    );

    return { backgroundColor: bg };
  });

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[styles.container, animatedScale]}
    >
      <View style={styles.left}>
        <Animated.View style={[styles.streakDot, animatedDot]} />
        <ThemedText>{habit.name}</ThemedText>
      </View>

      <ThemedText style={{ opacity: 0.6 }}>
        {streak} day{streak === 1 ? "" : "s"}
      </ThemedText>

      {/* Invisible press overlay */}
      <Animated.View
        style={StyleSheet.absoluteFill}
        onTouchStart={handlePress}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  streakDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
