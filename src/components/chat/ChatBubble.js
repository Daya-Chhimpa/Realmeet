import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

const ChatBubble = ({ message, isCurrentUser, time, status }) => {
  return (
    <View 
      style={[
        styles.container,
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
      ]}
    >
      {isCurrentUser ? (
        <LinearGradient
          colors={['#B15FFF', '#6A00FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.bubble, styles.currentUserBubble]}
        >
          <Text style={[styles.message, styles.currentUserMessage]}>{message}</Text>
          <View style={styles.footer}>
            <Text style={[styles.time, styles.currentUserTime]}>{time}</Text>
            {status === 'read' ? (
              <Text style={styles.status}>✓✓</Text>
            ) : (
              <Text style={styles.status}>✓</Text>
            )}
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.bubble, styles.otherUserBubble]}>
          <Text style={[styles.message, styles.otherUserMessage]}>{message}</Text>
          <Text style={[styles.time, styles.otherUserTime]}>{time}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    borderTopLeftRadius: 4,
  },
  currentUserBubble: {
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 20,
  },
  otherUserBubble: {
    backgroundColor: colors.glassBackground,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  message: {
    ...typography.body1,
    lineHeight: 20,
  },
  currentUserMessage: {
    color: colors.white,
  },
  otherUserMessage: {
    color: colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  time: {
    ...typography.caption,
    marginTop: 2,
  },
  currentUserTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: 4,
  },
  otherUserTime: {
    color: colors.textMuted,
  },
  status: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 2,
  },
});

export default ChatBubble;
