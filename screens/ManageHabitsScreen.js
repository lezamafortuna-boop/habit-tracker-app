import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import DraggableFlatList from "react-native-draggable-flatlist";

import AddHabitForm from "../components/AddHabitForm";
import Screen from "../components/Screen";
import Snackbar from "../components/Snackbar";
import SwipeableRow from "../components/SwipeableRow";
import ThemedText from "../components/ThemedText";

import { useTheme } from "../context/ThemeContext";
import { loadHabits, removeHabit, saveHabits } from "../storage/habits";
import { hasSeenSwipeHint, markSwipeHintSeen } from "../storage/hints";

export default function ManageHabitsScreen() {
  const [habits, setHabits] = useState([]);
  const [snackbar, setSnackbar] = useState({ visible: false, habit: null });
  const [showHint, setShowHint] = useState(false);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async function init() {
      const loaded = await loadHabits();
      setHabits(loaded);

      const seen = await hasSeenSwipeHint();
      if (!seen) {
        setShowHint(true);
        setTimeout(() => {
          setShowHint(false);
          markSwipeHintSeen();
        }, 4000);
      }
    }
    init();
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

  async function handleReorder({ data }) {
    setHabits(data);
    await saveHabits(data);
  }

  function renderItem({ item, drag, isActive }) {
    return (
      <SwipeableRow onDelete={() => confirmDelete(item)}>
        <View
          style={[
            styles.row,
            {
              backgroundColor:
                theme.mode === "light" ? "#fff" : theme.colors.card,
              borderBottomColor: theme.colors.border,
              paddingVertical: theme.spacing.md,
            },
          ]}
        >
          <ThemedText>{item.name}</ThemedText>

          <TouchableOpacity onLongPress={drag}>
            <Ionicons
              name="reorder-three-outline"
              size={28}
              color={theme.colors.muted}
            />
          </TouchableOpacity>
        </View>
      </SwipeableRow>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Screen scroll={false}>
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

            {showHint && (
              <View
                style={{
                  backgroundColor: theme.colors.card,
                  padding: theme.spacing.md,
                  borderRadius: 8,
                  marginVertical: theme.spacing.md,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <ThemedText style={{ textAlign: "center" }}>
                  Tip: Swipe left to delete. Long‑press the ≡ icon to reorder.
                </ThemedText>
              </View>
            )}

            <ThemedText
              type="title"
              style={{ marginVertical: theme.spacing.md }}
            >
              Your Habits
            </ThemedText>

            <DraggableFlatList
              data={habits}
              keyExtractor={(item) => item.id}
              onDragEnd={handleReorder}
              renderItem={renderItem}
              activationDistance={20} // IMPORTANT FIX
            />
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
