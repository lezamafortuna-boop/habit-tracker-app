import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { addHabit } from "../storage/habits";

export default function AddHabitForm({ onHabitAdded }) {
  const [text, setText] = useState("");
  const { theme } = useTheme();

  async function handleAdd() {
    if (!text.trim()) return;

    await addHabit(text.trim());
    setText("");

    // Notify parent to refresh habits
    if (typeof onHabitAdded === "function") {
      onHabitAdded();
    }
  }

  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New habit..."
        placeholderTextColor={theme.colors.placeholder}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: theme.spacing.md,
          borderRadius: theme.radius.sm,
          marginRight: theme.spacing.sm,
          backgroundColor: theme.colors.inputBackground,
          color: theme.colors.inputText,
        }}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}
