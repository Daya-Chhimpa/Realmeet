import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const { width, height } = Dimensions.get('window');

const GetStartedScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={colors.gradientDark}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        
        <View style={styles.contentContainer}>
          {/* App Logo/Title */}
          <View style={styles.logoContainer}>
            <Text style={styles.appTitle}>Spark</Text>
            <Text style={styles.appSubtitle}>Find your spark nearby</Text>
          </View>
          
          {/* Hero Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../../assets/images/get-started.png')} 
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Bottom Section */}
          <View style={styles.bottomContainer}>
            <PrimaryButton 
              title="Get Started" 
              onPress={handleGetStarted}
              style={styles.getStartedButton}
              textStyle={styles.getStartedButtonText}
            />
            
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: 'rgba(161, 89, 255, 0.1)',
    top: -width * 0.7,
    right: -width * 0.5,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: 'rgba(106, 0, 255, 0.1)',
    bottom: -width * 0.3,
    left: -width * 0.3,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  appTitle: {
    ...typography.h1,
    fontSize: 48,
    color: colors.textPrimary,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  appSubtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  heroImage: {
    width: width * 0.9,
    height: width * 0.9,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  getStartedButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    marginBottom: 24,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});

export default GetStartedScreen;
