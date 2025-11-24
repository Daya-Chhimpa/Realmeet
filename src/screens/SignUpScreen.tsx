import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {colors} from '../theme/colors';
import {Input} from '../components/Input';
import {GenderSelector} from '../components/GenderSelector';
import {Button} from '../components/Button';
import {useNavigation} from '../navigation/NavigationContext';

interface SignUpData {
  firstName: string;
  gender: 'male' | 'female' | null;
  birthday: {
    day: string;
    month: string;
    year: string;
  };
  password: string;
}

export const SignUpScreen: React.FC = () => {
  const {navigate, goBack} = useNavigation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    gender: null,
    birthday: {
      day: '',
      month: '',
      year: '',
    },
    password: '',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      console.log('Step:', step + 1, 'Data:', formData);
    } else {
      console.log('Sign Up Complete!', formData);
      navigate('relationship');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      goBack();
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const renderProgressBar = () => {
    const progress = (step / 4) * 100;
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>What should we call you? ✨</Text>
            <Input
              placeholder="First name"
              value={formData.firstName}
              onChangeText={text => updateFormData('firstName', text)}
              autoFocus
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <GenderSelector
              selected={formData.gender}
              onSelect={gender => updateFormData('gender', gender)}
            />
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>When's your birthday?</Text>
            <View style={styles.birthdayContainer}>
              <Input
                placeholder="Day"
                value={formData.birthday.day}
                onChangeText={text =>
                  updateFormData('birthday', {...formData.birthday, day: text})
                }
                keyboardType="number-pad"
                maxLength={2}
                style={styles.birthdayInput}
              />
              <Input
                placeholder="Month"
                value={formData.birthday.month}
                onChangeText={text =>
                  updateFormData('birthday', {...formData.birthday, month: text})
                }
                style={styles.birthdayInput}
              />
              <Input
                placeholder="Year"
                value={formData.birthday.year}
                onChangeText={text =>
                  updateFormData('birthday', {...formData.birthday, year: text})
                }
                keyboardType="number-pad"
                maxLength={4}
                style={styles.birthdayInput}
              />
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>Finally, create a secure password</Text>
            <Text style={styles.subtitle}>
              We'll keep your profile safe and secure
            </Text>
            <Input
              placeholder="Password"
              value={formData.password}
              onChangeText={text => updateFormData('password', text)}
              secureTextEntry
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {step > 1 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Complete your profile!</Text>
            <Text style={styles.headerSubtitle}>
              It just takes a few seconds, hurry!
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Step Content */}
        <View style={styles.formContainer}>{renderStep()}</View>

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>
              {step === 5 ? 'COMPLETE' : 'NEXT'}
            </Text>
          </TouchableOpacity>
        </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 28,
    color: colors.text.primary,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.ui.borderDark,
    borderRadius: 2,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.brand.purple,
    borderRadius: 2,
  },
  formContainer: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countryCode: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ui.borderDark,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  phoneInput: {
    flex: 1,
  },
  changeLink: {
    fontSize: 14,
    color: colors.accent.lightBlue,
    textAlign: 'right',
    marginTop: 8,
  },
  birthdayContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  birthdayInput: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 20,
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
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 1,
  },
});
