import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeColors } from "../utils/types/ThemeColors";

type ThemeMode = "light" | "dark";

const lightColors: ThemeColors = {
  background: "#ffffff",
  text: "#333333",
  textSecondary: "#666666",
  primary: "#FF7A00",
  secondary: "#5f0650",
  inputBackground: "#f0f0f0",
  buttonPrimaryBg: "#FF7A00",
  buttonPrimaryText: "#ffffff",
  buttonSecondaryBg: "gray",
  buttonSecondaryText: "#ffffff",
  buttonTertiaryBg: "#e8e8e8",
  buttonTertiaryText: "#1a1a1a",
  onSecondary: "#ffffff",
  tabBarBackground: "#ffffff",
  headerBackground: "#ffffff",
  headerText: "#FF7A00",
  error: "#d32f2f",
  border: "#cccccc"
};

const darkColors: ThemeColors = {
  background: "#121212",
  text: "#e0e0e0",
  textSecondary: "#a0a0a0",
  primary: "#FF9A30",
  secondary: "#c466b8",
  inputBackground: "#2a2a2a",
  buttonPrimaryBg: "#FF7A00",
  buttonPrimaryText: "#ffffff",
  buttonSecondaryBg: "#555555",
  buttonSecondaryText: "#e0e0e0",
  buttonTertiaryBg: "#2a2a2a",
  buttonTertiaryText: "#e0e0e0",
  onSecondary: "#ffffff",
  tabBarBackground: "#1e1e1e",
  headerBackground: "#1e1e1e",
  headerText: "#FF9A30",
  error: "#f78c8a",
  border: "#444444"
};

type ThemeContextType = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  const colors = theme === "dark" ? darkColors : lightColors;
  const isDark = theme === "dark";

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};