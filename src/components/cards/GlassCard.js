import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { colors, shadows } from '../../theme';

const GlassCard = ({ 
  children, 
  style, 
  onPress, 
  blurType = 'light',
  blurAmount = 10,
  borderRadius = 20,
  padding = 16,
  borderWidth = 1,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
}) => {
  const content = (
    <View 
      style={[
        styles.container,
        { 
          borderRadius,
          padding,
          borderWidth,
          borderColor,
          backgroundColor,
        },
        style
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={onPress}
        style={styles.touchable}
      >
        <BlurView
          style={[styles.blurView, { borderRadius }]}
          blurType={blurType}
          blurAmount={blurAmount}
          reducedTransparencyFallbackColor="white"
        />
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.touchable}>
      <BlurView
        style={[styles.blurView, { borderRadius }]}
        blurType={blurType}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor="white"
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.soft,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    overflow: 'hidden',
    borderStyle: 'solid',
  },
});

export default GlassCard;
