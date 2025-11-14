import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import GetStartedScreen from '../screens/GetStarted/GetStartedScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import MatchScreen from '../screens/Home/MatchScreen';
import ProfileDetailScreen from '../screens/Home/ProfileDetailScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import FilterScreen from '../screens/Home/FilterScreen';
import Sidebar from '../screens/Menu/Sidebar';

// Create navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const HomeTabs = () => {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Match':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Messages':
              iconName = focused ? 'message-text' : 'message-text-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'bell' : 'bell-outline';
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopWidth: 0,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontSize: 12,
          marginTop: -4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Match" 
        component={MatchScreen} 
        options={{ title: 'Discover' }}
      />
      <Tab.Screen 
        name="Messages" 
        component={ChatScreen}
        options={{
          title: 'Messages',
          tabBarBadge: 3, // Example badge
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={MatchScreen} // Replace with actual Notifications screen
        options={{
          title: 'Activity',
          tabBarBadge: 5, // Example badge
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileDetailScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={HomeTabs} />
      <Stack.Screen 
        name="ProfileDetail" 
        component={ProfileDetailScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: '',
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen 
        name="Filter" 
        component={FilterScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

// Auth Stack Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// App Navigator
const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status here (e.g., from AsyncStorage or auth context)
  useEffect(() => {
    // TODO: Implement actual auth check
    // For now, we'll set a timeout to simulate auth check
    const timer = setTimeout(() => {
      setIsAuthenticated(false); // Change to true to skip auth screens
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <NavigationContainer 
      theme={{
        dark: true,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.cardBackground,
          text: colors.textPrimary,
          border: 'transparent',
          notification: colors.primary,
        },
      }}
    >
      {isAuthenticated ? (
        <Drawer.Navigator
          drawerContent={props => <Sidebar {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: 'slide',
            overlayColor: 'transparent',
            drawerStyle: {
              width: '80%',
              backgroundColor: 'transparent',
            },
            sceneContainerStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Drawer.Screen name="Main" component={MainStack} />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
