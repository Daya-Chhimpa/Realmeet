// Navigation types for type checking
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  GetStarted: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Chat: { chatId: string };
  Matches: undefined;
  Settings: undefined;
  Filter: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  Profile: { userId: string };
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
};

export type HomeTabsParamList = {
  Match: undefined;
  Messages: undefined;
  Notifications: undefined;
  Profile: undefined;
};
