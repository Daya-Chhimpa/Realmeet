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
  Modal,
} from 'react-native';
import {colors} from '../theme/colors';
import {Sidebar} from '../components/Sidebar';

interface OnlineUser {
  id: number;
  name: string;
  age: number;
  location: string;
  status: string;
  image: string;
  isOnline: boolean;
  verified: boolean;
}

const ONLINE_USERS: OnlineUser[] = [
  {
    id: 1,
    name: 'Janvi Agrawal',
    age: 21,
    location: 'Indore',
    status: 'Single',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    isOnline: true,
    verified: true,
  },
  {
    id: 2,
    name: 'Sweety',
    age: 45,
    location: 'Hyderabad',
    status: 'Separated with kids',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    isOnline: true,
    verified: true,
  },
  {
    id: 3,
    name: 'Priyanka Padhy',
    age: 34,
    location: 'Chennai',
    status: 'Single',
    image: 'https://via.placeholder.com/200/6B7280/FFFFFF?text=P',
    isOnline: true,
    verified: true,
  },
  {
    id: 4,
    name: 'Mukti',
    age: 25,
    location: 'Ranchi',
    status: 'Single',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    isOnline: true,
    verified: false,
  },
  {
    id: 5,
    name: 'Divya',
    age: 36,
    location: 'Mumbai',
    status: 'Married with kids',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop',
    isOnline: true,
    verified: true,
  },
  {
    id: 6,
    name: 'Swathi',
    age: 39,
    location: 'Vijayawada',
    status: 'Working in Sales and Marketing',
    image: 'https://via.placeholder.com/200/6B7280/FFFFFF?text=S',
    isOnline: true,
    verified: true,
  },
  {
    id: 7,
    name: 'Deepa',
    age: 38,
    location: 'Mumbai',
    status: 'Working in Beauty Industry',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
    isOnline: true,
    verified: true,
  },
  {
    id: 8,
    name: 'Dipali',
    age: 30,
    location: 'Jaysingpur',
    status: 'Single',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    isOnline: true,
    verified: false,
  },
];

export const NewAndOnlineScreen: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleChatNow = (user: OnlineUser) => {
    console.log('Chat with:', user.name);
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
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>New and Online</Text>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineCount}>11659</Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Users List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}>
        {ONLINE_USERS.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Image source={{uri: user.image}} style={styles.avatar} />
                {user.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <View style={styles.userDetails}>
                <View style={styles.nameRow}>
                  <Text style={styles.userName}>{user.name}</Text>
                  {user.verified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedIcon}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.userLocation}>
                  {user.age}, {user.location}
                </Text>
                <Text style={styles.userStatus}>{user.status}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => handleChatNow(user)}
              activeOpacity={0.8}>
              <Text style={styles.chatButtonText}>Chat Now</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.green,
    marginRight: 4,
  },
  onlineCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.borderDark,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background.cardBg,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent.green,
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  userDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginRight: 6,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 10,
    color: colors.text.primary,
    fontWeight: '700',
  },
  userLocation: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  userStatus: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  chatButton: {
    backgroundColor: colors.accent.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
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
