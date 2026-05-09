import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HabitList from "../../components/HabitList";
import { loadHabits } from "../../storage/habits";
import { loadHistory, saveHistory } from "../../storage/history";

type History = {
  [date: string]: string[];
};

export default function TodayScreen() {
  const [habits, setHabits] = useState([]);
  const [history, setHistory] = useState<History>({});
  const [refreshing, setRefreshing] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");

  async function loadData() {
    const h = await loadHabits();
    const hist = await loadHistory();

    if (!hist[today]) hist[today] = [];

    setHabits(h);
    setHistory(hist);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  async function toggleHabit(id: string) {
    const todayList = history[today] || [];

    const updatedToday = todayList.includes(id)
      ? todayList.filter((h) => h !== id)
      : [...todayList, id];

    const updatedHistory: History = {
      ...history,
      [today]: updatedToday,
    };

    setHistory(updatedHistory);
    await saveHistory(updatedHistory);
  }

  async function onRefresh() {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        style={{ flex: 1, padding: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Today’s Habits
        </Text>

        <HabitList
          habits={habits}
          completedToday={history[today] || []}
          history={history}
          onToggle={toggleHabit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
