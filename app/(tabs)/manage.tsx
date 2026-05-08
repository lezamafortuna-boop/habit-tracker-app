import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AddHabitForm from "../../components/AddHabitForm";
import SwipeableRow from "../../components/SwipeableRow";
import { loadHabits, saveHabits } from "../../storage/habits";

export default function ManageHabitsScreen() {
  const [habits, setHabits] = useState([]);

  async function load() {
    const h = await loadHabits();
    setHabits(h);
  }

  useEffect(() => {
    load();
  }, []);

  async function addHabit(name: string) {
    const newHabit = {
      id: Date.now().toString(),
      name,
    };

    const updated = [...habits, newHabit];
    setHabits(updated);
    await saveHabits(updated);
  }

  async function deleteHabit(id: string) {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    await saveHabits(updated);
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Manage Habits
      </Text>

      <AddHabitForm onAdd={addHabit} />

      <View style={{ marginTop: 20 }}>
        {habits.map((habit) => (
          <SwipeableRow key={habit.id} onDelete={() => deleteHabit(habit.id)}>
            <View
              style={{
                padding: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#fff",
              }}
            >
              <Text>{habit.name}</Text>
            </View>
          </SwipeableRow>
        ))}
      </View>
    </ScrollView>
  );
}
