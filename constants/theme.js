// constants/theme.js

export const lightTheme = {
  mode: "light",
  colors: {
    bg: "#FAFAFA",
    card: "#FFFFFF",
    text: "#111111",
    muted: "#666666",
    primary: "#4CAF50",
    border: "#DDDDDD",
    inputBackground: "#FFFFFF",
    inputText: "#000000",
    placeholder: "#888888",

    // heatmap (light)
    heatmapLow: "#c6e48b",
    heatmapMid: "#7bc96f",
    heatmapHigh: "#239a3b",
    heatmapMax: "#196127",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    title: {
      fontSize: 22,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    body: {
      fontSize: 16,
    },
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
};

export const darkTheme = {
  mode: "dark",
  colors: {
    bg: "#121212",
    card: "#1E1E1E",
    text: "#EEEEEE",
    muted: "#AAAAAA",
    primary: "#4CAF50",
    border: "rgba(255,255,255,0.1)",
    inputBackground: "#1E1E1E",
    inputText: "#FFFFFF",
    placeholder: "#888888",

    // heatmap (dark)
    heatmapLow: "#2A2A2A",
    heatmapMid: "#3E5F3E",
    heatmapHigh: "#2F8A2F",
    heatmapMax: "#1F6A1F",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    title: {
      fontSize: 22,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "600",
    },
    body: {
      fontSize: 16,
    },
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
};
