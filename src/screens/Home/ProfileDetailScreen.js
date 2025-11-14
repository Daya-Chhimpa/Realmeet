import React, { useRef, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Animated,
  StatusBar,
  Platform,
  Share
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import Carousel from 'react-native-snap-carousel';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import GlassCard from '../../components/cards/GlassCard';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.6;

const ProfileDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const carouselRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get profile data from navigation params or use mock data
  const profile = route.params?.profile || {
    id: '1',
    name: 'Alexa',
    age: 24,
    distance: 2.5,
    location: 'New York',
    bio: 'Adventure seeker and coffee lover. Looking for someone to explore the city with! I enjoy hiking, trying new restaurants, and watching sunsets. My idea of a perfect date would be a picnic in the park followed by a walk around the city.',
    tags: ['Adventure', 'Coffee', 'Travel', 'Hiking', 'Foodie', 'Photography'],
    images: [
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/women/45.jpg',
      'https://randomuser.me/api/portraits/women/46.jpg',
    ],
    interests: [
      { icon: 'hiking', label: 'Hiking' },
      { icon: 'camera', label: 'Photography' },
      { icon: 'silverware-fork-knife', label: 'Foodie' },
      { icon: 'airplane', label: 'Travel' },
    ],
    details: {
      education: 'New York University',
      job: 'Graphic Designer',
      height: '5\'7\"',
      zodiac: 'Gemini',
      pets: 'Dog Lover',
    },
  };

  const renderImage = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: item }} 
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  const handleSnapToItem = (index) => {
    setCurrentImageIndex(index);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${profile.name}'s profile on Spark!`,
        url: 'https://sparkdating.app',
        title: `${profile.name} on Spark`,
      });
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  const handleLike = () => {
    // Handle like action
    navigation.goBack();
  };

  const handleMessage = () => {
    navigation.navigate('Chat', { match: profile });
  };

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Image scale animation
  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [2, 1],
    extrapolate: 'extend',
  });

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {profile.images.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot,
              index === currentImageIndex && styles.paginationDotActive
            ]} 
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header with back button */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {profile.name}, {profile.age}
        </Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Icon name="share-variant" size={22} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Image Carousel */}
      <Animated.View style={[styles.carouselContainer, { transform: [{ scale: imageScale }] }]}>
        <Carousel
          ref={carouselRef}
          data={profile.images}
          renderItem={renderImage}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={handleSnapToItem}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          loop
        />
        {renderPagination()}
      </Animated.View>

      {/* Profile Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.contentContainer}>
          {/* Basic Info */}
          <View style={styles.basicInfo}>
            <View>
              <Text style={styles.name}>
                {profile.name}, {profile.age}
              </Text>
              <View style={styles.locationContainer}>
                <Icon name="map-marker" size={18} color={colors.textSecondary} />
                <Text style={styles.location}>
                  {profile.distance} km away · {profile.location}
                </Text>
              </View>
            </View>
            <View style={styles.onlineIndicator}>
              <View style={[styles.onlineDot, profile.online && styles.onlineDotActive]} />
              <Text style={styles.onlineText}>
                {profile.online ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {profile.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>

          {/* Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsGrid}>
              {Object.entries(profile.details).map(([key, value]) => (
                <View key={key} style={styles.detailItem}>
                  <Text style={styles.detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Text>
                  <Text style={styles.detailValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interestsContainer}>
              {profile.interests.map((interest, index) => (
                <View key={index} style={styles.interestItem}>
                  <View style={styles.interestIcon}>
                    <Icon name={interest.icon} size={20} color={colors.primary} />
                  </View>
                  <Text style={styles.interestText}>{interest.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Spacer for bottom buttons */}
          <View style={styles.spacer} />
        </View>
      </Animated.ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.messageButton]}
          onPress={handleMessage}
        >
          <Icon name="message-text" size={24} color="white" />
        </TouchableOpacity>
        <PrimaryButton
          title="Like"
          onPress={handleLike}
          style={[styles.likeButton, { flex: 1 }]}
          textStyle={styles.likeButtonText}
          iconRight="heart"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 90 : 60,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 11, 18, 0.7)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  headerTitle: {
    ...typography.h3,
    color: 'white',
    maxWidth: width * 0.6,
    textAlign: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  carouselContainer: {
    height: IMAGE_HEIGHT,
  },
  imageContainer: {
    width,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
  },
  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 28,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...typography.body2,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
    marginRight: 4,
  },
  onlineDotActive: {
    backgroundColor: colors.onlineGreen,
  },
  onlineText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tag: {
    backgroundColor: 'rgba(161, 89, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(161, 89, 255, 0.3)',
  },
  tagText: {
    ...typography.caption,
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
    marginBottom: 12,
  },
  bioText: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    flexDirection: 'row',
    padding: 8,
  },
  detailLabel: {
    ...typography.body2,
    color: colors.textMuted,
    marginRight: 4,
  },
  detailValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  interestItem: {
    alignItems: 'center',
    margin: 8,
  },
  interestIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(161, 89, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  interestText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  spacer: {
    height: 80,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  likeButton: {
    height: 56,
    borderRadius: 28,
  },
  likeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileDetailScreen;
