import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";

export default function ProgressBar({ progress }) {
  const { theme } = useTheme();

  // Shared value for animation
  const animatedProgress = useSharedValue(0);

  // Animate whenever progress changes
  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 600,
    });
  }, [progress]);

  // Animated width style
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.border }]}>
      <Animated.View
        style={[
          styles.fill,
          animatedStyle,
          { backgroundColor: theme.colors.primary },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 6,
  },
});
