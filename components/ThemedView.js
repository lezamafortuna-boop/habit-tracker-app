import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function ThemedView({ style, ...props }) {
  return <View style={[styles.base, style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});
