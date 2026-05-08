import { format } from "date-fns";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitList from "../../components/HabitList";
import { loadHabits } from "../../storage/habits";
import { loadHistory } from "../../storage/history";

export default function TodayScreen() {
  const [habits, setHabits] = useState([]);
  const [history, setHistory] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");

  async function loadData() {
    const h = await loadHabits();
    const hist = await loadHistory();

    setHabits(h);
    setHistory(hist);
  }

  useEffect(() => {
    loadData();
  }, []);

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

        <HabitList history={history} />
      </ScrollView>
    </SafeAreaView>
  );
}
