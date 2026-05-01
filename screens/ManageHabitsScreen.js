import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AddHabitForm from "../components/AddHabitForm";
import Screen from "../components/Screen";
import Snackbar from "../components/Snackbar";
import SwipeableRow from "../components/SwipeableRow";
import ThemedText from "../components/ThemedText";
import { useTheme } from "../context/ThemeContext";
import { loadHabits, removeHabit } from "../storage/habits";

export default function ManageHabitsScreen() {
  const [habits, setHabits] = useState([]);
  const [snackbar, setSnackbar] = useState({ visible: false, habit: null });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async function refresh() {
      const h = await loadHabits();
      setHabits(h);
    }
    refresh();
  }, []);

  async function handleDelete(id) {
    const updated = await removeHabit(id);
    setHabits(updated);
  }

  function confirmDelete(habit) {
    Alert.alert("Delete Habit", `Delete "${habit.name}" permanently?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          handleDelete(habit.id);
          setSnackbar({ visible: true, habit });
        },
      },
    ]);
  }

  function undoDelete() {
    if (!snackbar.habit) return;
    setHabits((prev) => [...prev, snackbar.habit]);
    setSnackbar({ visible: false, habit: null });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Screen>
          <View style={{ padding: theme.spacing.lg, flex: 1 }}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={{ marginBottom: theme.spacing.md }}
            >
              <ThemedText>
                Switch to {theme.mode === "light" ? "Dark" : "Light"} Mode
              </ThemedText>
            </TouchableOpacity>

            <AddHabitForm onHabitAdded={setHabits} />

            <ThemedText
              type="title"
              style={{ marginVertical: theme.spacing.md }}
            >
              Your Habits
            </ThemedText>

            <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
              {habits.map((habit) => (
                <SwipeableRow
                  key={habit.id}
                  onDelete={() => confirmDelete(habit)}
                >
                  <View
                    style={[
                      styles.row,
                      {
                        borderBottomColor: theme.colors.border,
                        paddingVertical: theme.spacing.md,
                      },
                    ]}
                  >
                    <ThemedText>{habit.name}</ThemedText>

                    <Ionicons
                      name="trash-outline"
                      size={22}
                      color={theme.colors.muted}
                    />
                  </View>
                </SwipeableRow>
              ))}
            </ScrollView>
          </View>

          <Snackbar
            message="Habit deleted"
            actionLabel="Undo"
            visible={snackbar.visible}
            onAction={undoDelete}
          />
        </Screen>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});
