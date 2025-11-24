import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import {colors} from '../theme/colors';
import {Sidebar} from '../components/Sidebar';
import {useNavigation} from '../navigation/NavigationContext';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  status: string;
  lookingFor: string;
  phone: string;
  image: string;
}

const PROFILES: Profile[] = [
  {
    id: 1,
    name: 'Kanchan',
    age: 21,
    location: 'Amritsar',
    status: 'Single',
    lookingFor: 'Looking for non-committal relationship',
    phone: '6284XXXXXX',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
  },
  {
    id: 2,
    name: 'Priya',
    age: 24,
    location: 'Delhi',
    status: 'Single',
    lookingFor: 'Looking for serious relationship',
    phone: '9876XXXXXX',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
  },
  {
    id: 3,
    name: 'Anjali',
    age: 23,
    location: 'Mumbai',
    status: 'Single',
    lookingFor: 'Looking for new friends',
    phone: '8765XXXXXX',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
  },
  {
    id: 4,
    name: 'Simran',
    age: 22,
    location: 'Chandigarh',
    status: 'Single',
    lookingFor: 'Looking for dating',
    phone: '7654XXXXXX',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop',
  },
  {
    id: 5,
    name: 'Neha',
    age: 25,
    location: 'Bangalore',
    status: 'Single',
    lookingFor: 'Looking for marriage',
    phone: '6543XXXXXX',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',
  },
];

export const MatchesScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const currentProfile = PROFILES[currentIndex];

  const handleSendMessage = () => {
    console.log('Send Message to:', currentProfile.name);
  };

  const handleSkip = () => {
    console.log('Skip:', currentProfile.name);
    if (currentIndex < PROFILES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('No more profiles');
    }
  };

  const handleLike = () => {
    console.log('Like:', currentProfile.name);
    if (currentIndex < PROFILES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('No more profiles');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Matches</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => navigate('search')}>
          <Text style={styles.filterIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        {currentProfile ? (
          <View style={styles.card}>
            <Image
              source={{uri: currentProfile.image}}
              style={styles.profileImage}
              resizeMode="cover"
            />

            {/* Send Message Button */}
            <TouchableOpacity
              style={styles.sendMessageButton}
              onPress={handleSendMessage}
              activeOpacity={0.8}>
              <Text style={styles.sendMessageIcon}>💬</Text>
              <Text style={styles.sendMessageText}>SEND MESSAGE</Text>
            </TouchableOpacity>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
                <View style={styles.locationBadge}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.location}>{currentProfile.location}</Text>
                </View>
              </View>

              <Text style={styles.status}>{currentProfile.status}</Text>
              <Text style={styles.looking}>{currentProfile.lookingFor}</Text>

              {/* Verification */}
              <View style={styles.verification}>
                <Text style={styles.verificationTitle}>Verification</Text>
                <View style={styles.verificationRow}>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedIcon}>📱</Text>
                  </View>
                  <Text style={styles.verifiedText}>Mobile Number</Text>
                </View>
                <Text style={styles.phoneNumber}>{currentProfile.phone}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.noMoreProfiles}>
            <Text style={styles.noMoreText}>No more profiles</Text>
            <Text style={styles.noMoreSubtext}>Check back later for new matches!</Text>
          </View>
        )}

      </ScrollView>

      {/* Action Buttons - Fixed at Bottom */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.8}>
          <View style={styles.buttonContent}>
            <Text style={styles.skipIcon}>✕</Text>
            <Text style={styles.skipText}>SKIP</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.likeButton}
          onPress={handleLike}
          activeOpacity={0.8}>
          <View style={styles.buttonContent}>
            <Text style={styles.likeIcon}>✓</Text>
            <Text style={styles.likeText}>LIKE</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Sidebar Drawer */}
      <Modal
        visible={sidebarVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSidebarVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.sidebarContainer}>
            <Sidebar onClose={() => setSidebarVisible(false)} />
          </View>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setSidebarVisible(false)}
          />
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.background.cardBg,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: colors.brand.purple,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  profileImage: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
  },
  sendMessageButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  sendMessageIcon: {
    fontSize: 18,
  },
  sendMessageText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  profileInfo: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.green,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  locationIcon: {
    fontSize: 12,
  },
  location: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
  },
  status: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  looking: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginBottom: 20,
  },
  verification: {
    borderTopWidth: 1,
    borderTopColor: colors.ui.borderDark,
    paddingTop: 16,
  },
  verificationTitle: {
    fontSize: 14,
    color: colors.text.tertiary,
    marginBottom: 12,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  verifiedBadge: {
    width: 40,
    height: 40,
    backgroundColor: colors.accent.green,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 20,
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  phoneNumber: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 52,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.ui.borderDark,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    flex: 1,
    backgroundColor: colors.background.cardBg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ui.borderDark,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  skipIcon: {
    fontSize: 20,
    color: colors.text.tertiary,
    marginRight: 6,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.tertiary,
  },
  likeButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  likeIcon: {
    fontSize: 20,
    color: colors.text.primary,
    marginRight: 6,
  },
  likeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },
  noMoreProfiles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  noMoreSubtext: {
    fontSize: 16,
    color: colors.text.tertiary,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
  },
  sidebarContainer: {
    width: '75%',
    maxWidth: 300,
    backgroundColor: colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});
