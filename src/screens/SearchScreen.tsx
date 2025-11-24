import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import {colors} from '../theme/colors';
import {Sidebar} from '../components/Sidebar';
import {useNavigation} from '../navigation/NavigationContext';

export const SearchScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [ageRange, setAgeRange] = useState({min: 18, max: 45});
  const [photosOnly, setPhotosOnly] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSearch = () => {
    console.log('Search with:', {ageRange, photosOnly});
    navigate('matches');
  };

  const handleCitySelect = () => {
    console.log('Select city');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSidebarVisible(true)}>
          <Text style={styles.backIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Form */}
      <View style={styles.content}>
        {/* Age Range */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Age range</Text>
            <Text style={styles.ageRangeText}>
              {ageRange.min} to {ageRange.max}
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <View style={styles.sliderActiveTrack} />
            </View>
            <View style={[styles.sliderThumb, {left: '10%'}]} />
            <View style={[styles.sliderThumb, {left: '70%'}]} />
          </View>
        </View>

        {/* Cities */}
        <TouchableOpacity
          style={styles.section}
          onPress={handleCitySelect}
          activeOpacity={0.7}>
          <Text style={styles.sectionTitle}>Cities</Text>
          <View style={styles.selectRow}>
            <Text style={styles.selectText}>Anywhere in India</Text>
            <Text style={styles.selectIcon}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Photos Only Toggle */}
        <View style={styles.section}>
          <View style={styles.toggleRow}>
            <Text style={styles.sectionTitle}>Show profiles with photos only</Text>
            <Switch
              value={photosOnly}
              onValueChange={setPhotosOnly}
              trackColor={{
                false: colors.ui.borderDark,
                true: colors.brand.purple,
              }}
              thumbColor={colors.text.primary}
            />
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          activeOpacity={0.8}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar Drawer */}
      <Modal
        visible={sidebarVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSidebarVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.sidebarContainer}>
            <Sidebar onClose={() => setSidebarVisible(false)} />
          </View>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setSidebarVisible(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.borderDark,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  ageRangeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.brand.purple,
  },
  sliderContainer: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: colors.ui.borderDark,
    borderRadius: 2,
  },
  sliderActiveTrack: {
    position: 'absolute',
    left: '10%',
    right: '30%',
    height: 4,
    backgroundColor: colors.brand.purple,
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.brand.purple,
    borderWidth: 3,
    borderColor: colors.background.primary,
    shadowColor: colors.brand.purple,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  selectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.borderDark,
  },
  selectText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  selectIcon: {
    fontSize: 24,
    color: colors.text.tertiary,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
  },
  sidebarContainer: {
    width: '75%',
    maxWidth: 300,
    backgroundColor: colors.background.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});
