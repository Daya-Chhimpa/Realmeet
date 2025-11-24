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

export const MobileNumberScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [phone, setPhone] = useState('');

  const handleNext = () => {
    console.log('Mobile Number:', phone);
    navigate('otp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What's your mobile number?</Text>
          <Text style={styles.subtitle}>
            We'll send you a verification code
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <View style={styles.phoneInputWrapper}>
              <Input
                placeholder="Mobile number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus
              />
            </View>
          </View>

          <Text style={styles.changeLink}>Not in India? Change</Text>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !phone && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!phone}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>NEXT</Text>
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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  countryCode: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ui.borderDark,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
    marginRight: 12,
    minWidth: 70,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  phoneInputWrapper: {
    flex: 1,
  },
  changeLink: {
    fontSize: 14,
    color: colors.accent.lightBlue,
    textAlign: 'right',
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
