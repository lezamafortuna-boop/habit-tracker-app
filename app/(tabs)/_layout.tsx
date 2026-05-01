import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Today & History" }} />
      <Tabs.Screen name="manage" options={{ title: "Manage Habits" }} />
    </Tabs>
  );
}
