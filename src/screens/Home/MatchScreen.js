import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  PanResponder, 
  TouchableOpacity,
  StatusBar,
  Image,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import MatchCard from '../../components/cards/MatchCard';
import Header from '../../components/layout/Header';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;
const SWIPE_OUT_DURATION = 250;

// Mock data for demo purposes
const mockProfiles = [
  {
    id: '1',
    name: 'Alexa',
    age: 24,
    distance: 2.5,
    location: 'New York',
    bio: 'Adventure seeker and coffee lover. Looking for someone to explore the city with!',
    tags: ['Adventure', 'Coffee', 'Travel'],
    images: [
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/women/45.jpg',
      'https://randomuser.me/api/portraits/women/46.jpg',
    ],
    online: true,
  },
  {
    id: '2',
    name: 'Sarah',
    age: 26,
    distance: 3.2,
    location: 'Brooklyn',
    bio: 'Artist and dog mom. Love hiking and trying new restaurants.',
    tags: ['Art', 'Dogs', 'Hiking'],
    images: [
      'https://randomuser.me/api/portraits/women/40.jpg',
      'https://randomuser.me/api/portraits/women/41.jpg',
    ],
    online: false,
  },
  {
    id: '3',
    name: 'Mia',
    age: 27,
    distance: 1.8,
    location: 'Manhattan',
    bio: 'Software engineer by day, amateur chef by night. Let\'s cook something delicious together!',
    tags: ['Tech', 'Cooking', 'Travel'],
    images: [
      'https://randomuser.me/api/portraits/women/47.jpg',
      'https://randomuser.me/api/portraits/women/48.jpg',
    ],
    online: true,
  },
];

const MatchScreen = () => {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([...mockProfiles]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          // Swipe right (like)
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe left (dislike)
          forceSwipe('left');
        } else {
          // Return to center
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? width * 1.5 : -width * 1.5;
    
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const user = profiles[currentIndex];
    
    // Handle the swipe action (like/dislike)
    if (direction === 'right') {
      console.log('Liked:', user.name);
      // In a real app, you would make an API call here
      
      // Check for a match (mock implementation)
      if (Math.random() > 0.7) { // 30% chance of a match
        Alert.alert(
          'It\'s a Match!',
          `You and ${user.name} have liked each other. Start a conversation!`,
          [
            { text: 'Keep Swiping', style: 'cancel' },
            { 
              text: 'Say Hi', 
              onPress: () => navigation.navigate('Chat', { match: user }),
              style: 'default' 
            },
          ]
        );
      }
    } else {
      console.log('Disliked:', user.name);
    }
    
    // Move to the next card
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const renderCards = () => {
    if (currentIndex >= profiles.length) {
      // No more profiles to show
      return (
        <View style={styles.noMoreContainer}>
          <Icon name="heart-broken" size={60} color={colors.primary} />
          <Text style={styles.noMoreText}>No more profiles in your area</Text>
          <Text style={styles.noMoreSubtext}>Check back later for new matches</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={() => {
              setProfiles([...mockProfiles]);
              setCurrentIndex(0);
            }}
          >
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return profiles
      .map((profile, index) => {
        if (index < currentIndex) return null;
        if (index === currentIndex) {
          return (
            <Animated.View
              key={profile.id}
              style={[
                styles.card,
                {
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { rotate },
                  ],
                },
              ]}
              {...panResponder.panHandlers}
            >
              <MatchCard 
                user={profile}
                onLike={() => forceSwipe('right')}
                onDislike={() => forceSwipe('left')}
                onSuperLike={() => {
                  // Super like functionality
                  Alert.alert("Super Like!", `You super liked ${profile.name}`);
                  forceSwipe('right');
                }}
                onPress={() => navigation.navigate('ProfileDetail', { profile })}
              />
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={profile.id}
            style={[
              styles.card,
              {
                top: (index - currentIndex) * 10,
                opacity: 1 - (index - currentIndex) * 0.2,
                transform: [{ scale: 1 - (index - currentIndex) * 0.05 }],
              },
            ]}
          >
            <MatchCard 
              user={profile}
              onPress={() => navigation.navigate('ProfileDetail', { profile })}
            />
          </Animated.View>
        );
      })
      .reverse();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Header 
          title={`Hi, User 👋`}
          rightIcon="filter-outline"
          onRightPress={() => navigation.navigate('Filter')}
          rightIconStyle={styles.filterIcon}
        />
        
        <View style={styles.container}>
          {renderCards()}
          
          {currentIndex < profiles.length && (
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.dislikeButton]}
                onPress={() => forceSwipe('left')}
              >
                <Icon name="close" size={32} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.superLikeButton]}
                onPress={() => {
                  Alert.alert("Super Like!", `You super liked ${profiles[currentIndex]?.name}`);
                  forceSwipe('right');
                }}
              >
                <LinearGradient
                  colors={colors.gradientMain}
                  style={styles.superLikeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="star" size={28} color="white" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.likeButton]}
                onPress={() => forceSwipe('right')}
              >
                <Icon name="heart" size={32} color="white" />
              </TouchableOpacity>
            </View>
          )}
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
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: '100%',
    maxWidth: 400,
    height: height * 0.7,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  noMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noMoreText: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: 16,
    textAlign: 'center',
  },
  noMoreSubtext: {
    ...typography.body1,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  refreshButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    backgroundColor: colors.primary,
  },
  refreshText: {
    ...typography.button,
    color: 'white',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    ...shadows.medium,
  },
  dislikeButton: {
    backgroundColor: colors.offlineRed,
  },
  likeButton: {
    backgroundColor: colors.primary,
  },
  superLikeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
  },
  superLikeGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: 8,
  },
});

export default MatchScreen;
