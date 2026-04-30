import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import { streakColor } from '../storage/history';

export default function HabitItem({ name, completed, streak }) {
  return (
    <View style={[styles.container, { borderLeftColor: streakColor(streak) }]}>
      <ThemedText>{name}</ThemedText>
      <ThemedText>{streak}🔥</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderLeftWidth: 6,
  },
});

