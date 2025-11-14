import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Switch,
  StatusBar,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { colors } from '../../theme';
import { typography } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import GlassCard from '../../components/cards/GlassCard';

const { width } = Dimensions.get('window');
const SECTION_HEADER_HEIGHT = 40;

// Mock data for filters
const GENDER_OPTIONS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'non_binary', label: 'Non-binary' },
  { id: 'other', label: 'Other' },
];

const INTEREST_OPTIONS = [
  { id: 'travel', label: 'Travel' },
  { id: 'food', label: 'Food & Cooking' },
  { id: 'music', label: 'Music' },
  { id: 'sports', label: 'Sports' },
  { id: 'art', label: 'Art & Culture' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'reading', label: 'Reading' },
  { id: 'photography', label: 'Photography' },
  { id: 'movies', label: 'Movies & TV' },
  { id: 'pets', label: 'Pets' },
  { id: 'technology', label: 'Technology' },
];

const FilterScreen = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Filter states
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [distance, setDistance] = useState(50);
  const [gender, setGender] = useState([]);
  const [interests, setInterests] = useState([]);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  // Toggle gender selection
  const toggleGender = (genderId) => {
    setGender(prev => 
      prev.includes(genderId)
        ? prev.filter(id => id !== genderId)
        : [...prev, genderId]
    );
  };
  
  // Toggle interest selection
  const toggleInterest = (interestId) => {
    setInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };
  
  // Handle apply filters
  const handleApply = () => {
    const filters = {
      ageRange,
      distance,
      gender,
      interests,
      showOnlineOnly,
      showVerifiedOnly
    };
    
    console.log('Applied filters:', filters);
    navigation.goBack();
  };
  
  // Handle reset filters
  const handleReset = () => {
    setAgeRange([18, 35]);
    setDistance(50);
    setGender([]);
    setInterests([]);
    setShowOnlineOnly(false);
    setShowVerifiedOnly(false);
  };
  
  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  // Render section header
  const renderSectionHeader = (title) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
  
  // Render gender option
  const renderGenderOption = (option) => {
    const isSelected = gender.includes(option.id);
    
    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.genderOption,
          isSelected && styles.genderOptionSelected
        ]}
        onPress={() => toggleGender(option.id)}
      >
        <Text style={[
          styles.genderText,
          isSelected && styles.genderTextSelected
        ]}>
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  // Render interest chip
  const renderInterestChip = (interest) => {
    const isSelected = interests.includes(interest.id);
    
    return (
      <TouchableOpacity
        key={interest.id}
        style={[
          styles.interestChip,
          isSelected && styles.interestChipSelected
        ]}
        onPress={() => toggleInterest(interest.id)}
      >
        <Text style={[
          styles.interestText,
          isSelected && styles.interestTextSelected
        ]}>
          {interest.label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <BlurView
          style={styles.blurView}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor={colors.background}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      {/* Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Age Range */}
        <GlassCard style={styles.section}>
          {renderSectionHeader('Age Range')}
          <View style={styles.ageRangeContainer}>
            <Text style={styles.rangeLabel}>
              {ageRange[0]} - {ageRange[1]} years
            </Text>
            <MultiSlider
              values={[ageRange[0], ageRange[1]]}
              min={18}
              max={60}
              step={1}
              allowOverlap={false}
              minMarkerOverlapDistance={10}
              onValuesChange={(values) => setAgeRange([...values])}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.trackStyle}
              selectedStyle={styles.selectedTrackStyle}
              markerStyle={styles.markerStyle}
              pressedMarkerStyle={styles.pressedMarkerStyle}
            />
          </View>
        </GlassCard>
        
        {/* Distance */}
        <GlassCard style={styles.section}>
          {renderSectionHeader(`Distance: ${distance} km`)}
          <View style={styles.sliderContainer}>
            <Slider
              value={distance}
              minimumValue={1}
              maximumValue={100}
              step={1}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
              thumbTintColor={colors.primary}
              onValueChange={setDistance}
              style={styles.distanceSlider}
            />
            <View style={styles.distanceLabels}>
              <Text style={styles.distanceLabel}>1 km</Text>
              <Text style={styles.distanceLabel}>100+ km</Text>
            </View>
          </View>
        </GlassCard>
        
        {/* Gender */}
        <GlassCard style={styles.section}>
          {renderSectionHeader('I am interested in')}
          <View style={styles.genderContainer}>
            {GENDER_OPTIONS.map(renderGenderOption)}
          </View>
        </GlassCard>
        
        {/* Interests */}
        <GlassCard style={styles.section}>
          {renderSectionHeader('Interests')}
          <View style={styles.interestsContainer}>
            {INTEREST_OPTIONS.map(renderInterestChip)}
          </View>
        </GlassCard>
        
        {/* Additional Filters */}
        <GlassCard style={styles.section}>
          {renderSectionHeader('Additional Filters')}
          <View style={styles.filterRow}>
            <View style={styles.filterLabelContainer}>
              <Text style={styles.filterLabel}>Show online users only</Text>
            </View>
            <Switch
              value={showOnlineOnly}
              onValueChange={setShowOnlineOnly}
              trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: colors.primary }}
              thumbColor="white"
            />
          </View>
          <View style={[styles.filterRow, styles.filterRowLast]}>
            <View style={styles.filterLabelContainer}>
              <Text style={styles.filterLabel}>Show verified profiles only</Text>
            </View>
            <Switch
              value={showVerifiedOnly}
              onValueChange={setShowVerifiedOnly}
              trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: colors.primary }}
              thumbColor="white"
            />
          </View>
        </GlassCard>
        
        {/* Spacer for the apply button */}
        <View style={styles.spacer} />
      </Animated.ScrollView>
      
      {/* Apply Button */}
      <View style={styles.applyButtonContainer}>
        <PrimaryButton
          title="Apply Filters"
          onPress={handleApply}
          style={styles.applyButton}
          textStyle={styles.applyButtonText}
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
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 11, 18, 0.9)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 18,
  },
  resetButton: {
    padding: 8,
  },
  resetText: {
    ...typography.body1,
    color: colors.primary,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 90 : 70,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    height: SECTION_HEADER_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 16,
  },
  ageRangeContainer: {
    padding: 16,
  },
  rangeLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  sliderContainer: {
    paddingHorizontal: 8,
  },
  trackStyle: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedTrackStyle: {
    backgroundColor: colors.primary,
  },
  markerStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: 'white',
  },
  pressedMarkerStyle: {
    height: 28,
    width: 28,
    borderRadius: 14,
  },
  distanceSlider: {
    width: '100%',
    height: 40,
  },
  distanceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  distanceLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  genderOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    margin: 4,
  },
  genderOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderText: {
    ...typography.body2,
    color: colors.textPrimary,
  },
  genderTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  interestChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  interestChipSelected: {
    backgroundColor: 'rgba(161, 89, 255, 0.2)',
    borderColor: colors.primary,
  },
  interestText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  interestTextSelected: {
    color: colors.primary,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  filterRowLast: {
    borderBottomWidth: 0,
  },
  filterLabelContainer: {
    flex: 1,
    marginRight: 16,
  },
  filterLabel: {
    ...typography.body1,
    color: colors.textPrimary,
  },
  spacer: {
    height: 20,
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  applyButton: {
    height: 56,
    borderRadius: 28,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterScreen;
