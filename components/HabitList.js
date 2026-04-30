import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import HabitItem from './HabitItem';
import { loadHabits } from '../storage/habits';
import { loadHistory, toggleHabitForToday } from '../storage/history';

export default function HabitList() {
  const [habits, setHabits] = useState([]);
  const [history, setHistory] = useState({});

  useEffect(() => {
    async function loadData() {
      const h = await loadHabits();
      const hist = await loadHistory();
      setHabits(h);
      setHistory(hist);
    }
    loadData();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todaysHabits = history[today] || [];

  async function handleToggle(id) {
    const updatedHistory = await toggleHabitForToday(id);
    setHistory(updatedHistory);
  }

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Today
      </Text>

      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          name={habit.name}
          completed={todaysHabits.includes(habit.id)}
          onToggle={() => handleToggle(habit.id)}
        />
      ))}
    </View>
  );
}
