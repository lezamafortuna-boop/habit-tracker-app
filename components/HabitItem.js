import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import { theme } from '../constants/theme';


export default function HabitItem({ name, completed, onToggle }) {
  return (
    <Pressable onPress={onToggle} style={styles.container}>
      <View style={[styles.checkbox, completed && styles.checked]} />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.md,
    borderRadius: theme.radius.sm,
  },
  checked: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
});

