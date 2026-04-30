import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HabitsScreen from '../screens/HabitsScreen';
import ManageHabitsScreen from '../screens/ManageHabitsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Habits" 
        component={HabitsScreen} 
        options={{ headerTitle: 'Today & History' }}
      />
      <Tab.Screen 
        name="Manage" 
        component={ManageHabitsScreen} 
        options={{ headerTitle: 'Manage Habits' }}
      />
    </Tab.Navigator>
  );
}
