import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colors} from '../theme/colors';
import {OptionsList} from '../components/OptionsList';
import {useNavigation} from '../navigation/NavigationContext';

const LOOKING_FOR_OPTIONS = [
  {id: 'new_friends', label: 'New friends'},
  {id: 'online_companion', label: 'Online companion'},
  {id: 'dating', label: 'Dating'},
  {id: 'serious_relationship', label: 'Serious relationship'},
  {id: 'marriage', label: 'Marriage'},
];

export const LookingForScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    console.log('Looking For:', selected);
    navigate('photos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      <View style={styles.content}>
        <OptionsList
          title="What are you looking for"
          subtitle="Select one"
          options={LOOKING_FOR_OPTIONS}
          selected={selected}
          onSelect={setSelected}
        />

        <TouchableOpacity
          style={[styles.nextButton, !selected && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selected}
          activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: colors.brand.purple,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.brand.purple,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: colors.ui.borderDark,
    shadowOpacity: 0,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 1,
  },
});
