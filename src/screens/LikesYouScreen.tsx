import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import {colors} from '../theme/colors';
import {Sidebar} from '../components/Sidebar';
import {useNavigation} from '../navigation/NavigationContext';

interface LikedUser {
  id: number;
  name: string;
  age: number;
  image: string;
  likedTime: string;
}

const LIKED_USERS: LikedUser[] = [
  {
    id: 1,
    name: 'Priya',
    age: 24,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    likedTime: '2 hours ago',
  },
  {
    id: 2,
    name: 'Anjali',
    age: 23,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    likedTime: '5 hours ago',
  },
  {
    id: 3,
    name: 'Simran',
    age: 22,
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
    likedTime: '1 day ago',
  },
  {
    id: 4,
    name: 'Neha',
    age: 25,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop',
    likedTime: '2 days ago',
  },
];

export const LikesYouScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleUserPress = (user: LikedUser) => {
    console.log('User pressed:', user.name);
    navigate('profiledetail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSidebarVisible(true)}>
          <Text style={styles.backIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Likes You</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Likes Grid */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {LIKED_USERS.map(user => (
            <TouchableOpacity
              key={user.id}
              style={styles.card}
              onPress={() => handleUserPress(user)}
              activeOpacity={0.8}>
              <Image source={{uri: user.image}} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>
                    {user.name}, {user.age}
                  </Text>
                  <Text style={styles.cardTime}>Liked {user.likedTime}</Text>
                  <View style={styles.likeIcon}>
                    <Text style={styles.likeIconText}>💜</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.borderDark,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: colors.background.cardBg,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  cardInfo: {
    gap: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  cardTime: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  likeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(138, 43, 226, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIconText: {
    fontSize: 18,
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
