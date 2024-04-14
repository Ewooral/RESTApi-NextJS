import { useReducer } from 'react';
import { Theme, ThemeStore } from '@/types/themeTypes';

// Define action types
const SET_THEME = 'SET_THEME';

// Reducer function to manage theme state
function themeReducer(state: Theme, action: { type: string; payload: Theme }): Theme {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
}

// Custom hook for managing theme state
function useThemeStore(): ThemeStore {
  // Get the current theme from environment variable
  const currentTheme = process.env.NEXT_PUBLIC_CURRENT_THEME;
  console.log("CURRENT THEME:", currentTheme)

  // Initialize theme state based on current theme
  let initialTheme: Theme;

  switch (currentTheme) {
    case 'juaben':
      initialTheme = {
        primaryColor: process.env.NEXT_PUBLIC_JUABEN_PRIMARY_COLOR || '',
        secondaryColor: process.env.NEXT_PUBLIC_JUABEN_SECONDARY_COLOR || '',
      };
      break;
    case 'eganow':
      initialTheme = {
        primaryColor: process.env.NEXT_PUBLIC_EGANOW_PRIMARY_COLOR || '',
        secondaryColor: process.env.NEXT_PUBLIC_EGANOW_SECONDARY_COLOR || '',
      };
      break;
    case 'dci':
      initialTheme = {
        primaryColor: process.env.NEXT_PUBLIC_DCI_PRIMARY_COLOR || '',
        secondaryColor: process.env.NEXT_PUBLIC_DCI_SECONDARY_COLOR || '',
      };
      break;
    case 'ifinance':
      initialTheme = {
        primaryColor: process.env.NEXT_PUBLIC_IFINANCE_PRIMARY_COLOR || '',
        secondaryColor: process.env.NEXT_PUBLIC_IFINANCE_SECONDARY_COLOR || '',
      };
      break;
    default:
      initialTheme = {
        primaryColor: process.env.NEXT_PUBLIC_EGANOW_PRIMARY_COLOR || '',
        secondaryColor: '',
      };
  }

  // Initialize theme state using reducer
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  // Function to set theme
  function setTheme(theme: Theme) {
    dispatch({ type: SET_THEME, payload: theme });
  }

  return {
    theme,
    setTheme,
  };
}

export default useThemeStore;
