import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {colors} from '../theme/colors';
import {useNavigation} from '../navigation/NavigationContext';

const {width, height} = Dimensions.get('window');

export const WelcomeScreen: React.FC = () => {
  const {navigate} = useNavigation();

  const handleGetStarted = () => {
    console.log('Get Started pressed');
    navigate('mobile');
  };

  const handleSignUp = () => {
    console.log('Sign Up pressed');
    navigate('mobile');
  };

  const handleLogin = () => {
    console.log('Login pressed');
    navigate('login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      
      {/* Gradient Background */}
      <View style={styles.gradientBackground} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Profile Images Section */}
          <View style={styles.profileSection}>
            {/* Main Profile Card */}
            <View style={styles.mainProfileCard}>
              <View style={styles.profileImageContainer}>
                {/* Main Profile Image */}
                <Image
                  source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop'}}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Secondary Profile Cards */}
            <View style={styles.secondaryProfiles}>
              <View style={[styles.smallProfileCard, styles.leftCard]}>
                <Image
                  source={{uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'}}
                  style={styles.smallProfileImage}
                  resizeMode="cover"
                />
              </View>
              <View style={[styles.smallProfileCard, styles.rightCard]}>
                <Image
                  source={{uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop'}}
                  style={styles.smallProfileImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Text Section */}
          <View style={styles.textSection}>
            <Text style={styles.mainTitle}>Get Started</Text>
            <Text style={styles.subtitle}>Find your special someone.</Text>
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonsSection}>
            {/* Get Started Button */}
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}>
              <View style={styles.getStartedGradient}>
                <Text style={styles.getStartedText}>Get Started</Text>
              </View>
            </TouchableOpacity>

            {/* Sign up or Log in */}
            <View style={styles.authLinksContainer}>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Text style={styles.authLink}>Sign up</Text>
              </TouchableOpacity>
              <Text style={styles.authSeparator}>or</Text>
              <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
                <Text style={styles.authLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },

  // Profile Section
  profileSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  mainProfileCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    width: width * 0.65,
    height: width * 0.85,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.cardBg,
    shadowColor: colors.brand.purple,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  profileEmoji: {
    fontSize: 120,
  },

  // Secondary Profiles
  secondaryProfiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: -40,
  },
  smallProfileCard: {
    width: width * 0.28,
    height: width * 0.36,
    borderRadius: 20,
    overflow: 'hidden',
  },
  leftCard: {
    transform: [{rotate: '-8deg'}],
  },
  rightCard: {
    transform: [{rotate: '8deg'}],
  },
  smallProfileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  smallProfileEmoji: {
    fontSize: 60,
  },

  // Text Section
  textSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.text.secondary,
    textAlign: 'center',
  },

  // Buttons Section
  buttonsSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  getStartedButton: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: colors.brand.purple,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  getStartedGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: colors.brand.purple,
  },
  getStartedText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    letterSpacing: 0.5,
  },

  // Auth Links
  authLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authLink: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.text.primary,
    paddingHorizontal: 8,
  },
  authSeparator: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.text.tertiary,
    paddingHorizontal: 8,
  },
});
