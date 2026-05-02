import AsyncStorage from "@react-native-async-storage/async-storage";

const HINT_KEY = "swipe_hint_shown";

export async function hasSeenSwipeHint() {
  const value = await AsyncStorage.getItem(HINT_KEY);
  return value === "true";
}

export async function markSwipeHintSeen() {
  await AsyncStorage.setItem(HINT_KEY, "true");
}
