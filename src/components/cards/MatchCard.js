import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, shadows } from '../../theme';
import { typography } from '../../theme/typography';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const MatchCard = ({
  user = {
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
  },
  onLike,
  onDislike,
  onSuperLike,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPress}
      style={[styles.container, style]}
    >
      <Image 
        source={{ uri: user.images[0] }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
        style={styles.gradientOverlay}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{user.age}</Text>
            </View>
            {user.online && (
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            )}
          </View>
          
          <View style={styles.footer}>
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <View style={styles.locationContainer}>
                <Icon name="map-marker" size={14} color="white" style={styles.icon} />
                <Text style={styles.location}>{user.distance} km away</Text>
              </View>
              
              <View style={styles.tagsContainer}>
                {user.tags?.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.dislikeButton]}
          onPress={onDislike}
        >
          <Icon name="close" size={30} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.superLikeButton]}
          onPress={onSuperLike}
        >
          <LinearGradient
            colors={colors.gradientMain}
            style={styles.superLikeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="star" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={onLike}
        >
          <Icon name="heart" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: colors.cardBackground,
    ...shadows.medium,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    ...shadows.small,
  },
  badgeText: {
    ...typography.body2,
    color: 'white',
    fontWeight: '600',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.onlineGreen,
    marginRight: 4,
  },
  onlineText: {
    ...typography.caption,
    color: 'white',
    fontSize: 10,
  },
  footer: {
    marginTop: 'auto',
  },
  name: {
    ...typography.h2,
    color: 'white',
    fontSize: 32,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 4,
  },
  location: {
    ...typography.body2,
    color: 'white',
    opacity: 0.9,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    ...typography.caption,
    color: 'white',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  dislikeButton: {
    backgroundColor: colors.offlineRed,
  },
  likeButton: {
    backgroundColor: colors.primary,
  },
  superLikeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  superLikeGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MatchCard;
