import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <Text style={[styles.sectionLabel, { color: colors.primary }]}>
        Apariencia
      </Text>

      <View style={[styles.section, { backgroundColor: colors.inputBackground }]}>
        <Text style={[styles.currentValue, { color: colors.textSecondary }]}>
          Tema actual: {isDark ? "Oscuro" : "Claro"}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={colors.onSecondary}
        />
      </View>

      <TouchableOpacity
        style={[styles.exitButton, { backgroundColor: colors.error }]}
        onPress={() => {
          logout();
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.exitText}>Salir</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
  },
  section: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 14,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  currentValue: {
    fontSize: 13,
    marginBottom: 10,
  },
  exitButton: {
    padding: 16,
    borderRadius: 9,
    alignItems: "center",
    marginBottom: 10,
    marginTop: "auto",
  },
  exitText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});