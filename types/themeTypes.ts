// themeTypes.ts
export type Theme = {
    primaryColor: string | undefined;
    secondaryColor?: string | undefined;
  };
  
  export type ThemeStore = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
  };