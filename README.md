Perfect timing, Luis — now that your habit tracker is stable, swipe + reorder works, and the UI is clean in both light and dark mode, this is the right moment to create a **professional README** that reflects the current state of the app but leaves room to grow.

Here’s a **clean, modern, GitHub‑ready README** you can drop into `README.md` right now.  
It’s structured, polished, and expandable as your app evolves.

---

# 📘 Habit Tracker App

A clean, gesture‑driven habit tracking app built with **React Native**, **Expo**, and a custom **Theme System**.  
Designed for simplicity, speed, and a premium mobile experience.

---

## 🚀 Features (Current)

### ✅ Habit Management

- Add new habits
- Delete habits with **swipe‑to‑delete**
- Undo accidental deletions with a **snackbar**
- One‑time swipe hint for new users

### 🔄 Reorder Habits

- Long‑press the ≡ icon to drag and reorder
- Smooth gesture handling with `react-native-draggable-flatlist`
- Fully compatible with swipe‑to‑delete

### 🎨 Theming

- Light & Dark mode toggle
- Themed components (`ThemedText`, `ThemedView`)
- Adaptive colors for inputs, cards, borders, and backgrounds

### 💾 Persistent Storage

- Habits saved locally using AsyncStorage
- Reorder and delete actions persist automatically

---

## 🧱 Project Structure

```
HABIT-TRACKER-APP/
│
├── components/
│   ├── AddHabitForm.js
│   ├── HabitItem.js
│   ├── ProgressBar.js
│   ├── Snackbar.js
│   ├── SwipeableRow.js
│   ├── ThemedText.js
│   └── ThemedView.js
│
├── context/
│   └── ThemeContext.js
│
├── screens/
│   ├── HabitsScreen.js
│   └── ManageHabitsScreen.js
│
├── storage/
│   ├── habits.js
│   ├── hints.js
│   └── history.js
│
└── navigation/
    └── TabNavigator.js
```

---

## 📦 Tech Stack

- **React Native** (Expo)
- **Expo Router / Navigation**
- **AsyncStorage** for persistence
- **react-native-gesture-handler** for swipe gestures
- **react-native-draggable-flatlist** for drag‑and‑drop reorder
- **Custom Theme System** (light/dark mode)

---

## 🛠️ Installation

```bash
git clone <your-repo-url>
cd HABIT-TRACKER-APP
npm install
npx expo start
```

---

## 🧭 Usage

- Add a habit using the input field
- Swipe left to delete
- Tap **Undo** if needed
- Long‑press the ≡ icon to reorder
- Toggle light/dark mode from the top of the Manage Habits screen

---

## 🧩 Upcoming Features (Planned)

These will be added as the app grows:

- 🔥 Streak colors
- 📅 Calendar heatmap
- 📊 Weekly progress bars
- 🌓 System‑level theme sync
- ✏️ Edit habit names
- 🗂️ Habit categories (Morning / Evening / Work / Health)
- 🎯 Habit icons (🔥 💧 📚 🧘‍♂️)
- 🪄 Drag animations + haptic feedback

---

## 🤝 Contributing

Pull requests are welcome.  
For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

Luis, this README is clean, professional, and ready for GitHub.  
When you're ready to expand the app, we’ll update the README to match.

If you want, I can also:

- Add badges (Expo, React Native, License, etc.)
- Add screenshots
- Add a “Demo Video” section
- Add a roadmap table

Just tell me what direction you want next.
