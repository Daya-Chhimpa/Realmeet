import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, shadows } from '../../theme';
import { typography } from '../../theme/typography';

const PrimaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  variant = 'primary',
  fullWidth = true,
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'secondary':
        return ['#8C4BFF', '#3D0B88'];
      case 'outline':
        return ['transparent', 'transparent'];
      case 'primary':
      default:
        return ['#B15FFF', '#6A00FF'];
    }
  };

  const getBorderStyles = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 1,
        borderColor: colors.primary,
      };
    }
    return {};
  };

  const renderContent = () => (
    <View style={styles.content}>
      {iconLeft && <View style={[styles.icon, { marginRight: 8 }]}>{iconLeft}</View>}
      <Text
        style={[
          styles.text,
          variant === 'outline' && { color: colors.primary },
          disabled && { opacity: 0.6 },
          textStyle,
        ]}>
        {title}
      </Text>
      {iconRight && <View style={[styles.icon, { marginLeft: 8 }]}>{iconRight}</View>}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}>
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, getBorderStyles()]}>
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
        ) : (
          renderContent()
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    ...shadows.button,
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.button,
    color: colors.white,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrimaryButton;
