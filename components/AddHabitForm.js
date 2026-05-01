import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addHabit } from '../storage/habits';
import { useTheme } from '../context/ThemeContext';

export default function AddHabitForm({ onHabitAdded }) {
  const [text, setText] = useState('');
  const { theme } = useTheme();

  async function handleAdd() {
    if (!text.trim()) return;
    const updated = await addHabit(text.trim());
    setText('');
    onHabitAdded(updated);
  }

  return (
    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
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
