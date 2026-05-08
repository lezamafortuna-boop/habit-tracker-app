import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarHeatmap from "../../components/CalendarHeatmap";
import HistoryList from "../../components/HistoryList";
import { loadHistory } from "../../storage/history";

export default function HistoryScreen() {
  const [history, setHistory] = useState({});

  async function loadData() {
    const hist = await loadHistory();
    setHistory(hist);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          History
        </Text>

        <CalendarHeatmap history={history} />

        <View style={{ marginTop: 30 }}>
          <HistoryList history={history} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
