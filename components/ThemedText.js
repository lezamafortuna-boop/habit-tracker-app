import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function ThemedText({ style, children, ...props }) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.body.fontSize,
  },
});
