🌱 Habit Tracker App
A clean, modern habit‑tracking app built with React Native, Expo, and TypeScript.

📸 Overview
The Habit Tracker App helps users build consistency through daily habits. It includes:

Daily habit tracking

Streak visualization

Calendar heatmap

Weekly & daily progress bars

Swipe‑to‑delete habit management

Persistent storage

Light/dark theme support

Smooth animations (Reanimated)

This project was built as part of a mobile development learning journey and demonstrates real‑world app architecture, UI/UX patterns, and React Native best practices.

🚀 Features
✔ Track Daily Habits
Mark habits as completed for the current day with a single tap.

✔ Streak Tracking
Each habit displays a streak count with color‑coded intensity:

Gray → no streak

Green → 1–2 days

Blue → 3–6 days

Gold → 7+ days

✔ Calendar Heatmap
A full monthly calendar grid showing completion intensity per day.

✔ Progress Bars
Daily progress

Weekly progress
Both animated for a smooth experience.

✔ Habit Management
Add new habits

Swipe left to delete

One‑time swipe hint animation

✔ Persistent Storage
All data is saved locally using AsyncStorage.

✔ Theming
Custom light/dark theme support using a ThemeContext provider.

✔ Modern Animations
Built with React Native Reanimated 3:

Press scale

Fade‑in

Streak dot transitions

Swipe hint animation

Animated progress bars

🧱 Tech Stack
Category Technology
Framework React Native (Expo)
Language TypeScript
Navigation Expo Router
Animations Reanimated 3, Gesture Handler
Storage AsyncStorage
UI Custom components + Themed context
Icons Expo Vector Icons

📂 Project Structure
Code
HABIT-TRACKER-APP/
│
├── app/
│ ├── (tabs)/
│ │ ├── index.tsx
│ │ ├── history.tsx
│ │ └── manage.tsx
│ ├── \_layout.tsx
│ └── modal.tsx
│
├── components/
│ ├── HabitItem.js
│ ├── HabitList.js
│ ├── ProgressBar.js
│ ├── CalendarHeatmap.js
│ ├── SwipeableRow.js
│ └── AddHabitForm.js
│
├── context/
│ └── ThemeContext.js
│
├── storage/
│ ├── habits.js
│ └── history.js
│
├── assets/
├── package.json
├── tsconfig.json
└── README.md
📱 Screens
Today Screen
List of habits

Toggle completion

Streak colors

Daily & weekly progress bars

History Screen
Calendar heatmap

Past completions list

Manage Habits
Add new habits

Swipe‑to‑delete

Animated swipe hint

💾 Data Model
Habits
json
[
{ "id": "123", "name": "Drink Water" },
{ "id": "124", "name": "Read 10 minutes" }
]
History
json
{
"2026-05-08": ["123", "124"],
"2026-05-07": ["123"]
}
🛠 Installation & Running

1. Clone the repo
   sh
   git clone https://github.com/YOUR_USERNAME/habit-tracker-app.git
   cd habit-tracker-app
2. Install dependencies
   sh
   npm install
3. Start the app
   sh
   npx expo start
   Scan the QR code with the Expo Go app or run on an emulator.

🎨 Theming
The app uses a custom ThemeContext to support:

Light mode

Dark mode

Dynamic colors for cards, borders, text, and primary accents

🧠 What I Learned
React Native component architecture

Expo Router navigation

Persistent storage patterns

Calendar rendering logic

Gesture handling with Swipeable

Reanimated animations

Theming and UI consistency

Debugging async state issues

Modular code organization

📈 Future Improvements
Notifications / reminders

Habit categories

Cloud sync

User accounts

Detailed analytics

Animated calendar transitions

Undo snackbar for deletions

📄 License
This project is for educational purposes.
Feel free to fork and experiment.

# 🌱 **Habit Tracker App — What the App Does (Full Explanation)**

Your app is a **simple, clean, fully functional habit‑tracking system** built with:

- React Native
- Expo Router
- AsyncStorage
- Reanimated (for gestures)
- A modular component architecture

The app has **three main screens**:

1. **Today Screen (index.tsx)**
2. **Manage Habits Screen (manage.tsx)**
3. **History Screen**

Let’s walk through them in order.

---

# 🟦 1. **Today Screen (index.tsx)**

This is the **home screen** — the first thing the user sees.

### ✔ Purpose

To show the user:

- Their list of habits
- Whether each habit is completed today
- Their streak progress
- Their daily history

### ✔ What it does

- Loads all habits from AsyncStorage
- Loads the full history object (dates → completed habits)
- Displays each habit with a checkbox or toggle
- When the user marks a habit as done:
  - It updates today’s entry in history
  - Saves the updated history
  - Recalculates streaks
- Shows a small history preview (like a mini heatmap or list)

### ✔ Why it matters

This screen is the **daily interaction point** — the place where the user checks off habits and builds streaks.

---

# 🟩 2. **Manage Habits Screen (manage.tsx)**

This is the **habit management** screen — where the user creates and deletes habits.

### ✔ Purpose

To let the user:

- Add new habits
- Delete existing habits
- Organize their habit list

### ✔ What it does

- Loads all habits from AsyncStorage
- Displays them in a scrollable list
- Uses **SwipeableRow** so the user can swipe left to delete
- Uses **AddHabitForm** to create new habits
- After adding or deleting:
  - Saves the updated list
  - Refreshes the screen
  - Updates storage

### ✔ Key architecture detail

`AddHabitForm` handles adding the habit internally, then calls:

```ts
onHabitAdded();
```

Which triggers:

```ts
refresh();
```

This reloads the habit list from storage.

### ✔ Why it matters

This screen gives the user **full control** over their habit list.  
It’s the “settings” or “management” area of the app.

---

# 🟧 3. **History Screen**

This screen shows the **long‑term progress** of the user.

### ✔ Purpose

To let the user:

- See past days
- View which habits were completed
- Visualize streaks
- Understand consistency over time

### ✔ What it does

- Loads the full history object from AsyncStorage
- Displays:
  - A calendar heatmap
  - A list of past days
  - Streak colors (gray → green → blue → gold)
- Each day shows:
  - The date
  - Which habits were completed
  - Streak indicators

### ✔ Why it matters

This screen gives the user **motivation** — they can see their progress visually and stay consistent.

---

# 🔗 **How all screens work together**

### **Manage Screen**

→ Creates the habits  
→ Saves them to storage

### **Today Screen**

→ Loads habits  
→ Lets the user complete them  
→ Saves daily history

### **History Screen**

→ Reads the saved history  
→ Visualizes streaks and consistency

Everything is connected through **AsyncStorage**, which acts as your local database.

---

# 🧠 **In one sentence**

Your app lets users **create habits, complete them daily, and track their long‑term progress with streaks and history visualization.**
