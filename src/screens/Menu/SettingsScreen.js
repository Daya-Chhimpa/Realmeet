import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity, 
  Image,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [showAge, setShowAge] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            navigation.reset({
              index: 0,
              routes: [{ name: 'GetStarted' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all your data. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Handle account deletion logic here
            console.log('Account deletion requested');
          },
        },
      ]
    );
  };

  const renderSectionHeader = (title) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSettingItem = ({ 
    icon, 
    label, 
    rightComponent,
    onPress,
    isLast = false 
  }) => (
    <TouchableOpacity 
      style={[
        styles.settingItem,
        !isLast && styles.settingItemBorder,
        onPress && styles.settingItemPressable
      ]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingLeft}>
        {icon && (
          <View style={styles.settingIconContainer}>
            <Icon name={icon} size={20} color={colors.primary} />
          </View>
        )}
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  const renderSwitch = (value, onValueChange) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.textMuted, true: colors.primary }}
      thumbColor="white"
      ios_backgroundColor={colors.textMuted}
    />
  );

  const renderChevron = () => (
    <Icon name="chevron-right" size={24} color={colors.textSecondary} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <GlassCard style={styles.card}>
            {renderSettingItem({
              icon: 'account-edit',
              label: 'Edit Profile',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('EditProfile'),
            })}
            {renderSettingItem({
              icon: 'shield-account',
              label: 'Privacy',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('PrivacySettings'),
            })}
            {renderSettingItem({
              icon: 'lock',
              label: 'Change Password',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('ChangePassword'),
            })}
            {renderSettingItem({
              icon: 'credit-card',
              label: 'Payment Methods',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('PaymentMethods'),
              isLast: true
            })}
          </GlassCard>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <GlassCard style={styles.card}>
            {renderSettingItem({
              icon: 'bell',
              label: 'Notifications',
              rightComponent: renderSwitch(notificationsEnabled, setNotificationsEnabled),
            })}
            {renderSettingItem({
              icon: 'weather-night',
              label: 'Dark Mode',
              rightComponent: renderSwitch(darkMode, setDarkMode),
            })}
            {renderSettingItem({
              icon: 'map-marker',
              label: 'Location Services',
              rightComponent: renderSwitch(locationEnabled, setLocationEnabled),
            })}
            {renderSettingItem({
              icon: 'earth',
              label: 'Show Distance in',
              rightComponent: (
                <View style={styles.settingRight}>
                  <Text style={styles.settingRightText}>Kilometers</Text>
                  {renderChevron()}
                </View>
              ),
              onPress: () => navigation.navigate('DistanceUnit'),
              isLast: true
            })}
          </GlassCard>
        </View>

        {/* Discovery Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discovery Settings</Text>
          <GlassCard style={styles.card}>
            {renderSettingItem({
              icon: 'account',
              label: 'Show My Profile In',
              rightComponent: (
                <View style={styles.settingRight}>
                  <Text style={styles.settingRightText}>Everyone</Text>
                  {renderChevron()}
                </View>
              ),
              onPress: () => navigation.navigate('DiscoverySettings'),
            })}
            {renderSettingItem({
              icon: 'map-marker-radius',
              label: 'Maximum Distance',
              rightComponent: (
                <View style={styles.settingRight}>
                  <Text style={styles.settingRightText}>50 km</Text>
                  {renderChevron()}
                </View>
              ),
              onPress: () => navigation.navigate('DistanceSettings'),
            })}
            {renderSettingItem({
              icon: 'account-group',
              label: 'Show Me',
              rightComponent: (
                <View style={styles.settingRight}>
                  <Text style={styles.settingRightText}>Everyone</Text>
                  {renderChevron()}
                </View>
              ),
              onPress: () => navigation.navigate('ShowMeSettings'),
            })}
            {renderSettingItem({
              icon: 'account-clock',
              label: 'Age Range',
              rightComponent: (
                <View style={styles.settingRight}>
                  <Text style={styles.settingRightText}>18 - 35</Text>
                  {renderChevron()}
                </View>
              ),
              onPress: () => navigation.navigate('AgeRangeSettings'),
              isLast: true
            })}
          </GlassCard>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <GlassCard style={styles.card}>
            {renderSettingItem({
              icon: 'help-circle',
              label: 'Help & Support',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('HelpSupport'),
            })}
            {renderSettingItem({
              icon: 'shield-check',
              label: 'Safety Center',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('SafetyCenter'),
            })}
            {renderSettingItem({
              icon: 'file-document',
              label: 'Terms of Service',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('TermsOfService'),
            })}
            {renderSettingItem({
              icon: 'lock',
              label: 'Privacy Policy',
              rightComponent: renderChevron(),
              onPress: () => navigation.navigate('PrivacyPolicy'),
              isLast: true
            })}
          </GlassCard>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <GlassCard style={styles.card}>
            {renderSettingItem({
              icon: 'logout',
              label: 'Log Out',
              labelStyle: { color: colors.offlineRed },
              onPress: handleLogout,
            })}
            {renderSettingItem({
              icon: 'delete',
              label: 'Delete Account',
              labelStyle: { color: colors.offlineRed },
              onPress: handleDeleteAccount,
              isLast: true
            })}
          </GlassCard>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Spark v1.0.0 (Build 42)</Text>
          <Text style={styles.copyrightText}>© 2025 Spark Dating App. All rights reserved.</Text>
        </View>
      </ScrollView>
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingItemPressable: {
    paddingRight: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(161, 89, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRightText: {
    ...typography.body2,
    color: colors.textSecondary,
    marginRight: 4,
  },
  versionContainer: {
    alignItems: 'center',
    padding: 24,
    marginTop: 8,
  },
  versionText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  copyrightText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

export default SettingsScreen;
