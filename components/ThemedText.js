import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function ThemedText({ children, type = 'default', style = {}, ...props }) {
  return (
    <Text style={[styles[type], style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: theme.colors.text,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  link: {
    fontSize: 16,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
});
