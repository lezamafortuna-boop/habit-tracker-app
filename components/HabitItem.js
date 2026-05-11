import { FontAwesome5 } from "@expo/vector-icons";
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

  const animatedDotStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(
      colorProgress.value,
      [0, 1, 3, 7],
      ["#999", "#4caf50", "#4da6ff", "#f5c542"],
    );
    return { backgroundColor: bg };
  });

  // --- 🔥 Flame animation ---
  const flameScale = useSharedValue(0);

  useEffect(() => {
    if (streak > 0) {
      flameScale.value = withTiming(1.4, { duration: 150 }, () => {
        flameScale.value = withTiming(1, { duration: 150 });
      });
    }
  }, [streak]);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flameScale.value }],
    opacity: flameScale.value,
  }));

  // --- ✨ Glow halo behind flame ---
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (streak >= 7) {
      glowOpacity.value = withTiming(1, { duration: 400 });
    } else {
      glowOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [streak]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: 1.8 }],
  }));

  // --- 🔥 Heatwave shimmer (subtle pulse) ---
  const heatwave = useSharedValue(1);

  useEffect(() => {
    if (streak >= 7) {
      heatwave.value = withTiming(1.15, { duration: 1200 }, () => {
        heatwave.value = withTiming(1, { duration: 1200 });
      });
    }
  }, [streak]);

  const heatwaveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heatwave.value }],
    opacity: streak >= 7 ? 0.25 : 0,
  }));

  // --- 💥 Confetti burst on milestones ---
  useEffect(() => {
    if (streak === 7 || streak === 14 || streak === 30) {
      console.log("🎉 CONFETTI BURST! (visual effect placeholder)");
      // You can later integrate Lottie or Reanimated particles here.
    }
  }, [streak]);

  // --- 🔥 Flame color logic ---
  let flameColor = "#ff9800"; // default orange

  if (streak >= 30) {
    flameColor = "#ff00ff"; // rainbow/magenta
  } else if (streak >= 14) {
    flameColor = "#ffd700"; // gold
  }

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[styles.container, animatedScale]}
    >
      <View style={styles.row}>
        <Animated.View style={[styles.streakDot, animatedDotStyle]} />

        {streak > 0 && (
          <View style={{ position: "relative" }}>
            {/* Glow halo */}
            <Animated.View style={[styles.glow, glowStyle]} />

            {/* Heatwave shimmer */}
            <Animated.View style={[styles.heatwave, heatwaveStyle]} />

            {/* Flame */}
            <Animated.View style={[styles.flameContainer, flameStyle]}>
              <FontAwesome5 name="fire" size={14} color={flameColor} />
            </Animated.View>
          </View>
        )}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  flameContainer: {
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  glow: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff9800",
  },
  heatwave: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff9800",
  },
});
