import { useTheme } from "../context/ThemeContext";

export function useStreakColor() {
  const { theme } = useTheme();

  return (streak) => {
    if (streak >= 7) return theme.colors.primary;
    if (streak >= 3) return "#4da6ff";
    if (streak >= 1) return "#4caf50";
    return theme.colors.muted;
  };
}
