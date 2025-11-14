import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, typography } from '../../theme';

const Header = ({
  title,
  leftIcon = 'menu',
  rightIcon = 'account-circle',
  onLeftPress,
  onRightPress,
  showGreeting = false,
  userName = '',
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
        <Icon name={leftIcon} size={24} color={colors.iconDefault} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        {showGreeting ? (
          <Text style={styles.greeting}>
            Hi, <Text style={styles.userName}>{userName}</Text> 👋
          </Text>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
        {rightIcon === 'account-circle' ? (
          <View style={styles.avatar}>
            <Icon name={rightIcon} size={32} color={colors.primary} />
          </View>
        ) : (
          <Icon name={rightIcon} size={24} color={colors.iconDefault} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  greeting: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  userName: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default Header;
