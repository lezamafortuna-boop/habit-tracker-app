import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ProgressBar({ progress }) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        height: 12,
        width: "100%",
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        overflow: "hidden",
        marginTop: theme.spacing.sm,
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: theme.colors.primary,
        }}
      />
    </View>
  );
}
