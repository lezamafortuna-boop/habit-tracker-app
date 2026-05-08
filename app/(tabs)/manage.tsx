import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddHabitForm from "../../components/AddHabitForm";
import SwipeableRow from "../../components/SwipeableRow";
import { loadHabits, saveHabits } from "../../storage/habits";

type Habit = {
  id: string;
  name: string;
};

export default function ManageHabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load habits from storage
  async function refresh() {
    const h = await loadHabits();
    setHabits(h);
  }

  useEffect(() => {
    refresh();
  }, []);

  // Delete habit
  async function deleteHabit(id: string) {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    await saveHabits(updated);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Manage Habits
        </Text>

        {/* AddHabitForm will add the habit internally, then call refresh() */}
        <AddHabitForm onHabitAdded={refresh} />

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
    </SafeAreaView>
  );
}
