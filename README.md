# 📘 Habit Tracker App

A simple and clean habit tracking application built with **Expo**, **React Native**, and **TypeScript**.  
This app allows users to create habits, track daily progress, and view their history in an intuitive interface.

---

## 🚀 Features

- Add, edit, and delete habits
- Track daily progress
- View habit history
- Tab-based navigation (Expo Router)
- Reusable UI components
- Local storage using AsyncStorage
- Clean folder structure

---

## 📂 Project Structure

```txt
habit-tracker-app/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── manage.tsx
├── components/
├── screens/
├── navigation/
├── storage/
├── assets/
└── ...
```

---

## 🛠️ Tech Stack

- **Expo SDK 51**
- **React Native**
- **TypeScript**
- **Expo Router**
- **AsyncStorage**

---

## ▶️ Running the App

### Install dependencies

```bash
npm install
```

### Start the Expo development server

```bash
npx expo start
```

### Run on:

- **Android** → press `a`
- **iOS (Mac only)** → press `i`
- **Web** → press `w`

---

## 📦 Build (EAS)

```bash
npx eas build --platform android
npx eas build --platform ios
```

---

## 📄 License

This project is for educational and personal use.
