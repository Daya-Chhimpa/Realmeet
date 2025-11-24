import React, {forwardRef} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
  Dimensions,
  Platform,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
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
    paddingHorizontal: Math.max(12, SCREEN_WIDTH * 0.04),
    minHeight: Math.max(50, SCREEN_WIDTH * 0.13),
  },
  inputError: {
    borderColor: colors.accent.red,
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: Math.max(50, SCREEN_WIDTH * 0.13),
    fontSize: Math.min(16, SCREEN_WIDTH * 0.04),
    color: colors.text.primary,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
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
