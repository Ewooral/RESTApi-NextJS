// store
import { create } from "zustand";
import { Theme, ThemeStore } from "@/types/themeTypes";


const currentTheme = process.env.NEXT_PUBLIC_CURRENT_THEME 

const useThemeStore = create<ThemeStore>((set) => {
  // Define theme colors based on the current theme
  let primaryColor;

  switch (currentTheme) {
    case "juaben":
      primaryColor = process.env.NEXT_PUBLIC_JUABEN_PRIMARY_COLOR ?? "";
      break;
    case "eganow":
      primaryColor =  process.env.NEXT_PUBLIC_EGANOW_PRIMARY_COLOR;
      break;
    case "dci":
      primaryColor =  process.env.NEXT_PUBLIC_DCI_PRIMARY_COLOR;
      break;
    case "ifinance":
      primaryColor =  process.env.NEXT_PUBLIC_IFINANCE_PRIMARY_COLOR;
      break;
    default:
      primaryColor = process.env.NEXT_PUBLIC_EGANOW_PRIMARY_COLOR;
      break;
  }

  // Define initial theme using colors based on the current theme
  const initialTheme: Theme = {
    primaryColor,
  };

  // Set the initial theme
  set({ theme: initialTheme });

  return {
    theme: initialTheme,
    setTheme: (theme) => set({ theme }),
  };
});

export default useThemeStore;
