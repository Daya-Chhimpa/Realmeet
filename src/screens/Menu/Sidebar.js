import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Dimensions,
  Linking
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import GlassCard from '../../components/cards/GlassCard';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8;

// Menu items
const MENU_ITEMS = [
  { id: 'profile', label: 'My Profile', icon: 'account-outline' },
  { id: 'matches', label: 'Matches', icon: 'heart-outline' },
  { id: 'likes', label: 'Likes', icon: 'thumb-up-outline' },
  { id: 'visitors', label: 'Visitors', icon: 'eye-outline' },
  { id: 'messages', label: 'Messages', icon: 'message-text-outline' },
  { id: 'settings', label: 'Settings', icon: 'cog-outline' },
  { id: 'help', label: 'Help & Support', icon: 'help-circle-outline' },
  { id: 'invite', label: 'Invite Friends', icon: 'account-multiple-plus-outline' },
];

const Sidebar = (props) => {
  const navigation = useNavigation();
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isPremium: true,
    likes: 24,
    matches: 8,
  };
  
  const handleMenuItemPress = (itemId) => {
    // Close drawer first
    navigation.closeDrawer();
    
    // Navigate to the selected screen
    switch (itemId) {
      case 'profile':
        navigation.navigate('Profile');
        break;
      case 'matches':
        navigation.navigate('Matches');
        break;
      case 'likes':
        navigation.navigate('Likes');
        break;
      case 'visitors':
        navigation.navigate('Visitors');
        break;
      case 'messages':
        navigation.navigate('Messages');
        break;
      case 'settings':
        navigation.navigate('Settings');
        break;
      case 'help':
        navigation.navigate('Help');
        break;
      case 'invite':
        // Handle invite friends action
        console.log('Invite friends');
        break;
      default:
        break;
    }
  };
  
  const handleEditProfile = () => {
    navigation.closeDrawer();
    navigation.navigate('EditProfile');
  };
  
  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out');
    navigation.reset({
      index: 0,
      routes: [{ name: 'GetStarted' }],
    });
  };
  
  const renderMenuItem = (item) => {
    const isActive = props.state.routes[props.state.index].name.toLowerCase() === item.label.toLowerCase();
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.menuItem,
          isActive && styles.menuItemActive
        ]}
        onPress={() => handleMenuItemPress(item.id)}
      >
        <Icon 
          name={item.icon} 
          size={24} 
          color={isActive ? colors.primary : colors.textPrimary} 
          style={styles.menuIcon} 
        />
        <Text 
          style={[
            styles.menuItemText,
            isActive && styles.menuItemTextActive
          ]}
        >
          {item.label}
        </Text>
        {item.id === 'likes' && user.likes > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user.likes}</Text>
          </View>
        )}
        {item.id === 'messages' && user.matches > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user.matches}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background */}
      <View style={styles.background}>
        <Image 
          source={require('../../../assets/images/sidebar-bg.jpg')} 
          style={styles.backgroundImage}
          blurRadius={10}
        />
        <View style={styles.overlay} />
      </View>
      
      {/* Content */}
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile */}
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatar} 
            />
            {user.isPremium && (
              <View style={styles.premiumBadge}>
                <Icon name="crown" size={14} color="#FFD700" />
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {user.name}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {user.email}
            </Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.likes}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={[styles.statItem, styles.statDivider]} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.matches}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
          </View>
        </View>
        
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map(renderMenuItem)}
        </View>
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>Spark</Text>
          <Text style={styles.appVersion}>v1.0.0</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity 
              style={styles.socialIcon}
              onPress={() => Linking.openURL('https://facebook.com')}
            >
              <Icon name="facebook" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialIcon}
              onPress={() => Linking.openURL('https://twitter.com')}
            >
              <Icon name="twitter" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialIcon}
              onPress={() => Linking.openURL('https://instagram.com')}
            >
              <Icon name="instagram" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color={colors.offlineRed} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 11, 18, 0.9)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileContainer: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 16,
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 20,
    marginBottom: 4,
  },
  userEmail: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 4,
  },
  statValue: {
    ...typography.h3,
    color: colors.primary,
    fontSize: 18,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  menuContainer: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 4,
  },
  menuItemActive: {
    backgroundColor: 'rgba(161, 89, 255, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  menuIcon: {
    width: 32,
  },
  menuItemText: {
    ...typography.body1,
    color: colors.textPrimary,
    flex: 1,
  },
  menuItemTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.offlineRed,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    ...typography.caption,
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  appName: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 4,
  },
  appVersion: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 12,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 90, 122, 0.1)',
  },
  logoutText: {
    ...typography.body1,
    color: colors.offlineRed,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default Sidebar;
