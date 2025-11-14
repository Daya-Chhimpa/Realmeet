import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import GlassCard from '../../components/cards/GlassCard';

// Mock data for matches
const matches = [
  {
    id: '1',
    name: 'Emma Watson',
    age: 30,
    distance: '2.3',
    lastActive: '2h ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
    hasUnread: true,
  },
  {
    id: '2',
    name: 'Chris Evans',
    age: 40,
    distance: '5.1',
    lastActive: '5h ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
    hasUnread: false,
  },
  {
    id: '3',
    name: 'Sophie Turner',
    age: 26,
    distance: '1.2',
    lastActive: '1d ago',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    isOnline: false,
    hasUnread: true,
  },
  {
    id: '4',
    name: 'Tom Holland',
    age: 26,
    distance: '8.7',
    lastActive: '2d ago',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isOnline: false,
    hasUnread: false,
  },
];

const MatchesScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'recent', 'online'

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.matchItem}
      onPress={() => navigation.navigate('Chat', { matchId: item.id })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.matchInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}, {item.age}
          </Text>
          {item.hasUnread && <View style={styles.unreadBadge} />}
        </View>
        <Text style={styles.distance}>
          {item.distance} km away • {item.lastActive}
        </Text>
      </View>
      <Icon name="chevron-right" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <TouchableOpacity>
          <Icon name="magnify" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All Matches
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
          onPress={() => setActiveTab('recent')}
        >
          <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'online' && styles.activeTab]}
          onPress={() => setActiveTab('online')}
        >
          <View style={styles.tabWithBadge}>
            <Text style={[styles.tabText, activeTab === 'online' && styles.activeTabText]}>
              Online
            </Text>
            <View style={styles.onlineBadge} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Matches List */}
      <FlatList
        data={matches}
        renderItem={renderMatchItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
  tabWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.onlineGreen,
    marginLeft: 4,
  },
  listContent: {
    padding: 16,
  },
  matchItem: {
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
  matchInfo: {
    flex: 1,
    marginRight: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '500',
    marginRight: 8,
  },
  distance: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});

export default MatchesScreen;
