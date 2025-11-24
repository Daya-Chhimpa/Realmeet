import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../theme/colors';
import {Input} from '../components/Input';
import {useNavigation} from '../navigation/NavigationContext';

export const PasswordScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (password === confirmPassword) {
      console.log('Password set successfully');
      navigate('matches');
    } else {
      console.log('Passwords do not match');
    }
  };

  const isValid = password.length >= 6 && password === confirmPassword;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create a secure password</Text>
          <Text style={styles.subtitle}>
            We'll keep your profile safe and secure
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Password"
            placeholder="Enter password (min 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoFocus
          />
          <Input
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isValid}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>COMPLETE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.background.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  formContainer: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: colors.brand.purple,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.brand.purple,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: colors.ui.borderDark,
    shadowOpacity: 0,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 1,
  },
});
