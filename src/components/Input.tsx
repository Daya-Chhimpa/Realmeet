import React, {forwardRef} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
} from 'react-native';
import {colors} from '../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({label, error, leftIcon, style, ...props}, ref) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={[styles.inputContainer, error ? styles.inputError : null]}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[styles.input, leftIcon ? styles.inputWithIcon : null, style]}
            placeholderTextColor={colors.text.tertiary}
            {...props}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ui.borderDark,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: colors.accent.red,
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: colors.text.primary,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  errorText: {
    fontSize: 12,
    color: colors.accent.red,
    marginTop: 4,
    marginLeft: 4,
  },
});
