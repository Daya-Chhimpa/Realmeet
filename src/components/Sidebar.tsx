import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {colors} from '../theme/colors';
import {useNavigation} from '../navigation/NavigationContext';

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({onClose}) => {
  const {navigate} = useNavigation();

  const handleMenuItemPress = (screen: 'matches' | 'newonline' | 'search' | 'likesyou' | 'visitors' | 'messages') => {
    navigate(screen);
    onClose();
  };

  const handleProfilePress = () => {
    navigate('profiledetail');
    onClose();
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>Daya</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => {
            navigate('editprofile');
            onClose();
          }}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress('matches')}
          activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>🎯</Text>
          </View>
          <Text style={styles.menuText}>Matches</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress('newonline')}
          activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>👥</Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuText}>New and Online</Text>
            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineCount}>11659</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress('search')}
          activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>🔍</Text>
          </View>
          <Text style={styles.menuText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress('likesyou')}
          activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>💜</Text>
          </View>
          <Text style={styles.menuText}>Likes you</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress('messages')}
          activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>💬</Text>
          </View>
          <Text style={styles.menuText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuItemPress('visitors')}
          activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <Text style={styles.menuIconText}>👁️</Text>
          </View>
          <Text style={styles.menuText}>Visitors</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  profileSection: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.borderDark,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: colors.brand.purple,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 24,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIconText: {
    fontSize: 20,
  },
  menuTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.green,
    marginRight: 6,
  },
  onlineCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
