import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import GlassCard from '../../components/cards/GlassCard';

// Mock data for likes
const likes = [
  {
    id: '1',
    name: 'Emma Watson',
    age: 30,
    distance: '2.3',
    timeAgo: '2h ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isSuperLike: true,
    hasLikedBack: false,
  },
  {
    id: '2',
    name: 'Chris Evans',
    age: 40,
    distance: '5.1',
    timeAgo: '5h ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isSuperLike: false,
    hasLikedBack: true,
  },
  {
    id: '3',
    name: 'Sophie Turner',
    age: 26,
    distance: '1.2',
    timeAgo: '1d ago',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    isSuperLike: false,
    hasLikedBack: false,
  },
];

const LikesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'likes', 'super'

  const renderLikeItem = ({ item }) => (
    <View style={styles.likeItem}>
      <TouchableOpacity 
        style={styles.avatarContainer}
        onPress={() => navigation.navigate('ProfileDetail', { userId: item.id })}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isSuperLike && (
          <View style={styles.superLikeBadge}>
            <Icon name="star" size={12} color="white" />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.likeInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}, {item.age}
          </Text>
          <Text style={styles.distance}>
            {item.distance} km away • {item.timeAgo}
          </Text>
        </View>
        <View style={styles.actions}>
          {item.hasLikedBack ? (
            <TouchableOpacity 
              style={[styles.actionButton, styles.messageButton]}
              onPress={() => navigation.navigate('Chat', { userId: item.id })}
            >
              <Icon name="message-text" size={20} color="white" />
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.passButton]}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
                <Icon name="heart" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Likes</Text>
        <TouchableOpacity>
          <Icon name="tune" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
          onPress={() => setActiveTab('likes')}
        >
          <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>
            Likes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'super' && styles.activeTab]}
          onPress={() => setActiveTab('super')}
        >
          <View style={styles.tabWithIcon}>
            <Icon name="star" size={16} color={activeTab === 'super' ? 'white' : colors.primary} />
            <Text style={[styles.tabText, activeTab === 'super' && styles.activeTabText, { marginLeft: 4 }]}>
              Super Likes
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      {likes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Icon name="heart-outline" size={48} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No Likes Yet</Text>
          <Text style={styles.emptySubtitle}>Your likes will appear here when someone likes your profile</Text>
          <TouchableOpacity style={styles.boostButton}>
            <Icon name="rocket-launch" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.boostButtonText}>Boost My Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Likes List */
        <FlatList
          data={likes}
          renderItem={renderLikeItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  tabWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  likeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  superLikeBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  likeInfo: {
    flex: 1,
  },
  nameContainer: {
    marginBottom: 8,
  },
  name: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 2,
  },
  distance: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  passButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 44,
    padding: 0,
  },
  likeButton: {
    backgroundColor: colors.primary,
    width: 44,
    padding: 0,
  },
  messageButton: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  buttonText: {
    ...typography.button,
    color: 'white',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  boostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  boostButtonText: {
    ...typography.button,
    color: 'white',
  },
});

export default LikesScreen;
