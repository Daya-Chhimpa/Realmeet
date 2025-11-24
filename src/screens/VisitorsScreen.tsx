import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {colors} from '../theme/colors';
import {Sidebar} from '../components/Sidebar';
import {useNavigation} from '../navigation/NavigationContext';

interface Visitor {
  id: number;
  name: string;
  age: number;
  image: string;
  visitedTime: string;
  status: 'message_sent' | 'liked' | 'viewed';
}

const VISITORS: Visitor[] = [
  {
    id: 1,
    name: 'Roop',
    age: 27,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    visitedTime: '15 mins ago',
    status: 'message_sent',
  },
  {
    id: 2,
    name: 'Disha',
    age: 23,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    visitedTime: '7 hours ago',
    status: 'message_sent',
  },
  {
    id: 3,
    name: 'Maya',
    age: 24,
    image: 'https://via.placeholder.com/400x500/6B7280/FFFFFF?text=M',
    visitedTime: '10 hours ago',
    status: 'liked',
  },
  {
    id: 4,
    name: 'Yashi',
    age: 30,
    image: 'https://via.placeholder.com/400x500/6B7280/FFFFFF?text=Y',
    visitedTime: '12 hours ago',
    status: 'message_sent',
  },
  {
    id: 5,
    name: 'Priya',
    age: 25,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    visitedTime: '1 day ago',
    status: 'viewed',
  },
  {
    id: 6,
    name: 'Anjali',
    age: 26,
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
    visitedTime: '2 days ago',
    status: 'viewed',
  },
];

export const VisitorsScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleVisitorPress = (visitor: Visitor) => {
    console.log('Visitor pressed:', visitor.name);
    navigate('profiledetail');
  };

  const renderStatusText = (status: string) => {
    switch (status) {
      case 'message_sent':
        return 'Message sent';
      case 'liked':
        return 'Liked!';
      case 'viewed':
        return 'Viewed';
      default:
        return '';
    }
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
        <Text style={styles.headerTitle}>Visitors</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Visitors Grid */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {VISITORS.map(visitor => (
            <TouchableOpacity
              key={visitor.id}
              style={styles.card}
              onPress={() => handleVisitorPress(visitor)}
              activeOpacity={0.8}>
              <Image source={{uri: visitor.image}} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>
                    {visitor.name}, {visitor.age}
                  </Text>
                  <Text style={styles.cardTime}>Visited {visitor.visitedTime}</Text>
                  <Text style={styles.cardStatus}>{renderStatusText(visitor.status)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: colors.background.cardBg,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  cardInfo: {
    gap: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  cardTime: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brand.purple,
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
