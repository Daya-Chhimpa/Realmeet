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

const RELATIONSHIP_OPTIONS = [
  {id: 'single', label: 'Single'},
  {id: 'married', label: 'Married'},
  {id: 'married_kids', label: 'Married with kids'},
  {id: 'divorced', label: 'Divorced'},
  {id: 'divorced_kids', label: 'Divorced with kids'},
  {id: 'widowed', label: 'Widowed'},
  {id: 'widowed_kids', label: 'Widowed with kids'},
  {id: 'separated', label: 'Separated'},
  {id: 'separated_kids', label: 'Separated with kids'},
  {id: 'single_parent', label: 'Single parent'},
];

export const RelationshipStatusScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    console.log('Relationship Status:', selected);
    navigate('lookingfor');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View style={styles.gradientBackground} />

      <View style={styles.content}>
        <OptionsList
          title="What's your current status"
          subtitle="Select one"
          options={RELATIONSHIP_OPTIONS}
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
