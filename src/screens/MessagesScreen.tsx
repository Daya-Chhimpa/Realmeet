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
import {useNavigation} from '../navigation/NavigationContext';

interface Message {
  id: number;
  name: string;
  age: number;
  image: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    name: 'Priya',
    age: 24,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    lastMessage: 'Hey! How are you doing?',
    time: '2m ago',
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: 'Anjali',
    age: 23,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
    lastMessage: 'That sounds great!',
    time: '1h ago',
    unread: false,
    online: true,
  },
  {
    id: 3,
    name: 'Simran',
    age: 22,
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop',
    lastMessage: 'See you tomorrow',
    time: '3h ago',
    unread: false,
    online: false,
  },
  {
    id: 4,
    name: 'Neha',
    age: 25,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
    lastMessage: 'Thanks for your help!',
    time: '1d ago',
    unread: false,
    online: false,
  },
];

export const MessagesScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMessagePress = (message: Message) => {
    console.log('Open chat with:', message.name);
    navigate('chat');
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
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Messages List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}>
        {MESSAGES.map(message => (
          <TouchableOpacity
            key={message.id}
            style={styles.messageCard}
            onPress={() => handleMessagePress(message)}
            activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
              <Image source={{uri: message.image}} style={styles.avatar} />
              {message.online && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.messageInfo}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageName}>
                  {message.name}, {message.age}
                </Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
              <Text 
                style={[
                  styles.messageText,
                  message.unread && styles.messageTextUnread
                ]}
                numberOfLines={1}>
                {message.lastMessage}
              </Text>
            </View>
            {message.unread && <View style={styles.unreadBadge} />}
          </TouchableOpacity>
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
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.borderDark,
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
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  messageTime: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  messageText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  messageTextUnread: {
    fontWeight: '600',
    color: colors.text.primary,
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brand.purple,
    marginLeft: 8,
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
