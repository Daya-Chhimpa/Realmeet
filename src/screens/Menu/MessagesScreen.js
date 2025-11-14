import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';

// Mock data for conversations
const conversations = [
  {
    id: '1',
    userId: '101',
    name: 'Emma Watson',
    lastMessage: 'Hey! How are you doing?',
    time: '2h ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    unreadCount: 3,
    isOnline: true,
    isTyping: false,
  },
  {
    id: '2',
    userId: '102',
    name: 'Chris Evans',
    lastMessage: 'Let\'s meet up this weekend!',
    time: '5h ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    unreadCount: 0,
    isOnline: true,
    isTyping: true,
  },
  {
    id: '3',
    userId: '103',
    name: 'Sophie Turner',
    lastMessage: 'Thanks for the great time yesterday 😊',
    time: '1d ago',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
  },
  {
    id: '4',
    userId: '104',
    name: 'Tom Holland',
    lastMessage: 'Check out this cool place I found!',
    time: '2d ago',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
  },
];

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  // Filter conversations based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conv => 
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchQuery]);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('Chat', { 
        chatId: item.id,
        userName: item.name,
        userAvatar: item.avatar,
        isOnline: item.isOnline
      })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.userName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.timeText}>
            {item.time}
          </Text>
        </View>
        
        <View style={styles.messagePreview}>
          {item.isTyping ? (
            <View style={styles.typingContainer}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={[styles.typingDot, styles.typingDotMiddle]} />
                <View style={styles.typingDot} />
              </View>
              <Text style={styles.typingText}>typing...</Text>
            </View>
          ) : (
            <Text 
              style={[
                styles.lastMessage,
                item.unreadCount > 0 && styles.unreadMessage
              ]} 
              numberOfLines={1}
            >
              {item.lastMessage}
            </Text>
          )}
          
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {item.unreadCount > 9 ? '9+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <Icon name="pencil" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Icon name="close-circle" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Active Now Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Now</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.activeNowContainer}>
        <FlatList
          data={conversations.filter(conv => conv.isOnline)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.activeUser}>
              <View style={styles.activeAvatarContainer}>
                <Image source={{ uri: item.avatar }} style={styles.activeAvatar} />
                <View style={styles.activeBadge} />
              </View>
              <Text style={styles.activeUserName} numberOfLines={1}>
                {item.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => `active-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.activeNowList}
        />
      </View>
      
      {/* Messages List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Messages</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Requests</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredConversations}
        renderItem={renderConversationItem}
        keyExtractor={item => `conv-${item.id}`}
        contentContainerStyle={styles.conversationList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="message-text-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No Messages</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'No conversations match your search' : 'When you message someone, it will appear here'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  newMessageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(161, 89, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    ...typography.body1,
    color: colors.textPrimary,
    height: '100%',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  seeAllText: {
    ...typography.body2,
    color: colors.primary,
  },
  activeNowContainer: {
    marginBottom: 8,
  },
  activeNowList: {
    paddingHorizontal: 12,
  },
  activeUser: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  activeAvatarContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  activeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  activeBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.onlineGreen,
    borderWidth: 2,
    borderColor: colors.background,
  },
  activeUserName: {
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  conversationList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.onlineGreen,
    borderWidth: 2,
    borderColor: colors.background,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    ...typography.subtitle2,
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    ...typography.body2,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginHorizontal: 1.5,
  },
  typingDotMiddle: {
    opacity: 0.6,
  },
  typingText: {
    ...typography.body2,
    color: colors.primary,
    fontStyle: 'italic',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    ...typography.caption,
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 40,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default MessagesScreen;
