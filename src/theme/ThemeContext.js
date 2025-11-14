import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { colors as appColors } from './colors';

export const ThemeContext = createContext({
  isDark: true,
  colors: appColors.dark,
  setScheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Getting the device color theme, this will also work with react-native-web
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  // Listening to changes of device appearance while in run-time
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const defaultTheme = {
    isDark,
    colors: isDark ? appColors.dark : appColors.light,
    setScheme: (scheme) => setIsDark(scheme === 'dark'),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
// This hook can be used in any component to get the current theme
// Example: const { colors, isDark } = useTheme();
export const useTheme = () => useContext(ThemeContext);
