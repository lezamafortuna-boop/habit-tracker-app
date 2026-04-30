import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HabitList from '../components/HabitList';
import HistoryList from '../components/HistoryList';
import ThemedView from '../components/ThemedView';
//import ThemedText from '../components/ThemedText';
import { theme } from '../constants/theme';

export default function HabitsScreen() {
  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.container}>
        <HabitList />
        <HistoryList />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
});

