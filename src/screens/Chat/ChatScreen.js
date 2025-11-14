import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  FlatList,
  Image,
  StatusBar,
  Keyboard,
  Animated,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import GlassCard from '../../components/cards/GlassCard';
import ChatBubble from '../../components/chat/ChatBubble';

// Mock messages data
const mockMessages = [
  {
    id: '1',
    text: 'Hey there! How are you? 😊',
    sender: 'them',
    time: '10:30 AM',
    status: 'read'
  },
  {
    id: '2',
    text: 'I\'m doing great, thanks! How about you?',
    sender: 'me',
    time: '10:32 AM',
    status: 'read'
  },
  {
    id: '3',
    text: 'I\'m good too! So, what are your plans for the weekend?',
    sender: 'them',
    time: '10:33 AM',
    status: 'read'
  },
  {
    id: '4',
    text: 'Not sure yet. Maybe check out that new coffee shop downtown. Wanna join?',
    sender: 'me',
    time: '10:35 AM',
    status: 'read'
  },
  {
    id: '5',
    text: 'That sounds great! What time works for you?',
    sender: 'them',
    time: '10:36 AM',
    status: 'read'
  },
  {
    id: '6',
    text: 'How about 2 PM on Saturday?',
    sender: 'me',
    time: '10:37 AM',
    status: 'read'
  },
  {
    id: '7',
    text: 'Perfect! Looking forward to it! 😊',
    sender: 'them',
    time: '10:38 AM',
    status: 'read'
  },
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = new Animated.Value(0);

  // Get user data from navigation params or use mock data
  const user = route.params?.user || {
    id: '1',
    name: 'Alexa',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: true,
    lastSeen: '2h ago'
  };

  // Handle sending a new message
  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };

    // Add the message to the chat
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsSending(true);

    // Simulate message sending and response
    setTimeout(() => {
      // Update status to sent
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'sent' } 
            : msg
        )
      );
      
      // Simulate typing indicator
      setIsTyping(true);
      
      // Simulate reply after a delay
      setTimeout(() => {
        const reply = {
          id: (Date.now() + 1).toString(),
          text: getRandomReply(),
          sender: 'them',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };
        
        setMessages(prev => [...prev, reply]);
        setIsTyping(false);
      }, 1500);
      
      setIsSending(false);
    }, 500);
  };

  // Generate a random reply (for demo purposes)
  const getRandomReply = () => {
    const replies = [
      'Sounds good!',
      'I\'ll be there!',
      'Can\'t wait!',
      'That works for me!',
      'Perfect! 😊',
      'Looking forward to it!',
      'See you then!',
      'Awesome!',
      'Great!',
      'Thanks for letting me know!'
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  // Handle keyboard events
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      Animated.timing(translateY, {
        toValue: -e.endCoordinates.height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Render a single message
  const renderMessage = ({ item }) => (
    <ChatBubble 
      message={item.text} 
      isCurrentUser={item.sender === 'me'}
      time={item.time}
      status={item.status}
    />
  );

  // Render typing indicator
  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <View style={styles.typingContainer}>
        <View style={styles.typingBubble}>
          <View style={styles.typingDot} />
          <View style={[styles.typingDot, { marginLeft: 4, marginRight: 4 }]} />
          <View style={styles.typingDot} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor={colors.background}
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: user.image }} 
            style={styles.avatar} 
          />
          <View style={styles.userText}>
            <Text style={styles.userName} numberOfLines={1}>
              {user.name}
            </Text>
            <View style={styles.statusContainer}>
              <View 
                style={[
                  styles.statusDot, 
                  user.online ? styles.statusOnline : styles.statusOffline
                ]} 
              />
              <Text style={styles.statusText}>
                {user.online ? 'Online' : user.lastSeen || 'Offline'}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="dots-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }}
          ListFooterComponent={renderTypingIndicator()}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        />
      </View>

      {/* Message Input */}
      <Animated.View 
        style={[
          styles.inputContainer,
          { transform: [{ translateY }] }
        ]}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachmentButton}>
            <Icon name="plus" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.textMuted}
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmitEditing={handleSend}
            multiline
          />
          
          {isSending ? (
            <ActivityIndicator size="small" color={colors.primary} style={styles.sendButton} />
          ) : (
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                newMessage.trim() === '' && styles.sendButtonDisabled
              ]}
              onPress={handleSend}
              disabled={newMessage.trim() === ''}
            >
              <Icon 
                name="send" 
                size={24} 
                color={newMessage.trim() === '' ? colors.textMuted : colors.primary} 
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      
      {/* Add extra space when keyboard is open */}
      {keyboardHeight > 0 && <View style={{ height: keyboardHeight - 50 }} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 11, 18, 0.9)',
  },
  backButton: {
    marginRight: 12,
    zIndex: 1,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userText: {
    flex: 1,
  },
  userName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusOnline: {
    backgroundColor: colors.onlineGreen,
  },
  statusOffline: {
    backgroundColor: colors.textMuted,
  },
  statusText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
  },
  menuButton: {
    padding: 8,
    marginRight: -8,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messagesList: {
    paddingBottom: 16,
  },
  typingContainer: {
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
  },
  typingBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
  },
  inputContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: colors.background,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 24,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 4,
  },
  input: {
    flex: 1,
    ...typography.body1,
    color: colors.textPrimary,
    maxHeight: 120,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  sendButton: {
    padding: 8,
    marginLeft: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatScreen;
